import React, { useState } from "react";
import layout from "../../components/Layout/layout.module.scss";
import { Link } from "react-router-dom";
import HeaderMenuLanding from "../LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";
import style from "./migrationPage.module.scss";
import InputText from "../../components/UI/Input/Input";
import { IFormInputs, updateInputs, validateInputs } from "../../components/UI/Input/types";
import SelectControlled from "../../components/UI/SelectCustom/SelectControlled";
import { SelectItem } from "../../components/UI/SelectCustom/types";
import Textarea from "../../components/UI/Textarea/Textarea";
import Button from "../../components/UI/Button/Button";
import SvgCopyIcon from "../../icons/Copy";
import elliot from "images/Elliot.png";
import SvgWalletBullet from "../../icons/WalletBullet";
import SvgAmazonBullet from "../../icons/AmazonBullet";
import SvgShieldBullet from "../../icons/shieldBullet";
import clsx from "clsx";
import Footer from "../LandingPage/Partials/Footer/Footer";
import ButtonOval from "../../components/UI/ButtonOval/ButtonOval";
import { isFull } from "../../helpers/common";
import { useDispatch } from "react-redux";
import { sendMigrationForm } from "../../Redux/account/Actions/accountActions";
import MigrationFormSuccessModal from "../../components/UI/Modal/MigrationFormSuccessModal/MigrationFormSuccessModal";
import MetaTags from "react-meta-tags";

const select: SelectItem[] = [
  {
    id: 1,
    name: "Under 1TB",
  },
  {
    id: 2,
    name: "1TB - 10TB",
  },
  {
    id: 3,
    name: "10TB - 15TB",
  },
  {
    id: 4,
    name: "50TB - 100TB",
  },
  {
    id: 5,
    name: "Over 100TB",
  },
];

const initialInputs = {
  firstName: {
    value: "",
    label: "First name",
    error: "",
    isError: false,
    isSuccess: false,
  },
  lastName: {
    value: "",
    label: "Last name",
    error: "",
    isError: false,
    isSuccess: false,
  },
  company: {
    value: "",
    label: "Company",
    error: "",
    isError: false,
    isSuccess: false,
  },
  email: {
    value: "",
    label: "Email",
    error: "",
    isError: false,
    isSuccess: false,
  },
  phone: {
    value: "",
    label: "Phone",
    error: "",
    isError: false,
    isSuccess: false,
  },
  storageSize: {
    value: "",
    label: "Storage size",
    error: "",
    isError: false,
    isSuccess: false,
  },
  info: {
    value: "",
    label: "How do you want to use Coldstacks Cloud?",
    error: "",
    isError: false,
    isSuccess: false,
  },
} as IFormInputs;

const MigrationPage: React.FC = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [migrationModalSuccessVisible, setMigrationModalSuccessVisible] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState<SelectItem | null>(null);
  const dispatch = useDispatch();

  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.currentTarget;
    const newInputs = updateInputs(inputs, name, "value", value);
    const [updatedInputs, errors] = validateInputs(newInputs, name === "phone" ? [] : [name]);

    setInputs(updatedInputs);
  };

  const onSelect = (item: SelectItem) => {
    setSelectedStorage(item);
  };

  const onSubmit = () => {
    let validateArr = ["firstName", "lastName", "company", "email"];
    const [updatedInputs, errors] = validateInputs(inputs, validateArr);
    setInputs(updatedInputs);
    if (!isFull(errors) && selectedStorage) {
      dispatch(
        sendMigrationForm({
          form: {
            firstName: inputs.firstName.value as string,
            lastName: inputs.lastName.value as string,
            company: inputs.company.value as string,
            email: inputs.email.value as string,
            phone: inputs.phone.value as string,
            textPayload: inputs.info.value as string,
            storageSize: {
              id: selectedStorage?.id,
              name: selectedStorage?.name,
            },
          },
          onSuccess: () => {
            setInputs(initialInputs);
            setSelectedStorage(null);
            setMigrationModalSuccessVisible(true);
          },
        })
      );
    }
  };

  return (
    <div className={layout.wrapper}>
      <MetaTags>
        <title>ColdStack: Migration</title>
        <meta name="description" content="Free Migration of your Data to ColdStack Storage" />
      </MetaTags>
      <div className={layout.header}>
        <div className={layout.container}>
          <HeaderMenuLanding />
          <div className={layout.headerBanner}>
            <h1>Free Migration of your Data to ColdStack Storage</h1>
          </div>
          <div className={style.migrationFormWrapper}>
            <div className={style.migrationFormDescr}>
              <h3>ColdStack's Cloud to Cloud Migration:</h3>
              <ul>
                <li>Safely and easily transfer data out of other cloud solutions (such as AWS, Google or Azure)</li>
                <li>Absolutely no migration cost or hidden fees</li>
                <li>100% compatibility with Amazon S3</li>
                <li>Regain your privacy and take full control over your data</li>
                <li>Flexible storage pricing to meet your specific needs</li>
              </ul>
              <Link className={style.linkPrice} to="/pricing/">
                <SvgCopyIcon color="#0053F1" />
                ColdStack pricing
              </Link>
              <h2 className={style.migrationFormDescrH2}>
                They allow you to get the best price for your storage and they're the easiest to use
              </h2>
              <div className={style.sign}>
                <img src={elliot} alt="E" />
                <div className={style.signTeextWrap}>
                  <h4>Elliot Wainman</h4>
                  <p>FOUNDER of SuperFarm & Ellio Trades</p>
                </div>
              </div>
            </div>
            <div className={style.migrationForm}>
              <form className={style.form}>
                <h3>Take the first step</h3>
                {Object.keys(inputs).map((input, index) => {
                  switch (input) {
                    case "storageSize":
                      return (
                        <SelectControlled
                          key={index}
                          label="Storage size"
                          placeholder="Please select"
                          value={selectedStorage}
                          items={select}
                          onSelect={onSelect}
                          tabindex={index}
                          className={style.input}
                        />
                      );

                    case "info":
                      return (
                        <Textarea
                          onChange={onTextInputChange}
                          value={inputs.info.value as string}
                          id={7}
                          name="info"
                          tabindex={6}
                          placeholder="How do you want to use Coldstacks Cloud?"
                          isSuccess={inputs.info.isSuccess}
                          isError={inputs.info.isError}
                          error={inputs.info.error}
                          rows={3}
                          key={index}
                          className={style.input}
                        />
                      );

                    default:
                      return (
                        <InputText
                          key={index}
                          onChange={onTextInputChange}
                          value={inputs[input].value as string}
                          id={index}
                          name={input}
                          label={inputs[input].label}
                          tabindex={index}
                          isSuccess={inputs[input].isSuccess}
                          isError={inputs[input].isError}
                          error={inputs[input].error}
                          className={style.input}
                        />
                      );
                  }
                })}
                <Button onClickHandler={() => onSubmit()} color="secondary" size="form">
                  Send
                </Button>
                <p className={style.formBottomtext}>
                  By submitting this form, you are agreeing to be contacted by Coldstack Sales and to receive our
                  Business Newsletter via email
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(layout.backgroundColorWhite, style.reasonToMoveWrapper)}>
        <div className={layout.container}>
          <h2>Reasons to make the move</h2>
          <div className={style.reasons}>
            <div className={style.reason}>
              <SvgWalletBullet color="#0053F1" />
              <h4>Lowest Prices</h4>
              <p>
                Best price guarantee. ColdStack is over 10 times more affordable than other cloud services. See{" "}
                <Link to="/pricing/">Pricing page</Link> to compare.
              </p>
            </div>
            <div className={style.reason}>
              <SvgAmazonBullet color="#0053F1" />
              <h4>Robustness</h4>
              <p>ColdStack has 99.99% uptime, high data availability, and ultimate data at rest protection.</p>
            </div>
            <div className={style.reason}>
              <SvgShieldBullet color="#0053F1" />
              <h4>Easy to Switch</h4>
              <p>
                ColdStack is 100% compatible with mainstream Enterprise storage solutions. Migrating to ColdStack is one
                click away!
              </p>
            </div>
          </div>
          <div className={style.getStartedBanner}>
            <div className={style.getStartedBannerh2Wrap}>
              <h2>ColdStack - most effective way to store your data</h2>
            </div>
            <ButtonOval reactRouterNav={true} href="/auth" size="medium" color="green" text="Get Started" />
          </div>
        </div>
      </div>
      <div className={clsx(layout.containerFluid, layout.backgroundColorWhite)}>
        <Footer />
      </div>
      <MigrationFormSuccessModal
        visible={migrationModalSuccessVisible}
        onClose={() => setMigrationModalSuccessVisible(false)}
      />
    </div>
  );
};

export default MigrationPage;
