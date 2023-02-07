import React, { useMemo, useState } from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import { IFormInputs, updateInputs, validateInputs } from "../../Input/types";
import style from "./withdrawModal.module.scss";
import Link from "../../Link/Link";
import { TStore } from "../../../../reducers";
import { useSelector } from "react-redux";
import LinkComponent from "../../Link/Link";
import SvgSuccess from "../../../../icons/SvgSuccess";
import { ITicket } from "actions/interfaces";

interface WithdrawModalProps {
  visible: boolean;
  topic: string;
  subTopic: string;
  onClose: () => void;
  onSubmit: (params: ITicket) => void;
}

const initialInputs = {
  withdraw: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false,
  },
} as IFormInputs;

const WithdrawModal = ({ visible = false, topic, subTopic, onClose, onSubmit }: WithdrawModalProps) => {
  const [inputs, setInputs] = useState(initialInputs);

  const [pending, setPending] = useState(false);

  const balanceCLS = useSelector((state: TStore) => state.user.userData?.balanceCLS);

  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    if (balanceCLS) {
      const newInputs = updateInputs(inputs, name, "value", value);
      const [updatedInputs] = validateInputs(newInputs, [name], balanceCLS, 25);
      setInputs(updatedInputs);
    }
  };

  const submit = () => {
    const [updatedInputs, errors] = validateInputs(inputs, ["withdraw"], balanceCLS, 25);
    setInputs(updatedInputs);

    if (errors?.length === 0) {
      onSubmit({
        fields: {
          topic: topic,
          subTopic: subTopic,
          subject: (("Withdrawal request created with amount of  " + inputs.withdraw.value) as string) + " CLS",
          ticketDetails: (("Withdrawal request created with amount of  " + inputs.withdraw.value) as string) + " CLS",
          email: "not getting through",
          unreadMessage: false,
        },
        onSuccess: () => {
          setInputs({
            withdraw: {
              value: inputs.withdraw?.value,
              error: errors[0],
              isError: true,
              isSuccess: false,
            },
          } as IFormInputs);
          setInputs(initialInputs);
        },
      });
      setPending(true);
    }
  };

  const maxValueFunc = () => {
    inputs.withdraw.value = balanceCLS as string;

    const [updatedInputs] = validateInputs(inputs, ["withdraw"], balanceCLS);
    setInputs(updatedInputs);
  };

  const footer = useMemo(
    () => {
      return (
        <div className={style.footer}>
          <div className={style.wrapBtn1}>
            <Button
              onClickHandler={() => {
                setInputs(initialInputs);
                onClose();
              }}
              color="additional"
              size="small"
            >
              Cancel
            </Button>
          </div>
          {Number(balanceCLS) < 25 ? (
            <Button onClickHandler={submit} isDisabled={true} color="additional" size="small">
              Withdraw
            </Button>
          ) : (
            <Button onClickHandler={submit} color="accent" size="small">
              Withdraw
            </Button>
          )}
        </div>
      );
    },
    // eslint-disable-next-line
    [onSubmit, inputs, balanceCLS]
  );

  return (
    <>
      {!pending && (
        <CoreModal
          className={style.wrap}
          title="Withdraw Tokens"
          closeOutClick={true}
          onClose={() => {
            setInputs(initialInputs);
            onClose();
          }}
          visible={visible}
          footer={footer}
        >
          <div>
            <div className={style.item}>
              <InputText
                onChange={onTextInputChange}
                value={inputs.withdraw.value as string}
                id={1}
                type="number"
                name="withdraw"
                label="You will pay"
                tabindex={0}
                typeValue="CLS"
                isSuccess={inputs.withdraw.isSuccess}
                isError={inputs.withdraw.isError}
                error={inputs.withdraw.error}
                maxValueFunc={maxValueFunc}
                maxValue={Number(balanceCLS)}
                placeholder="Enter an amount"
              />
            </div>
            <div className={style.description}>
              That the minimum for withdrawal is 25 CLS. Current gas fees will be subtracted from the withdrawal sum. If
              you don't receive CLS tokens in your wallet within 4 hours, please contact{" "}
              <Link href="/dashboard/support">support</Link>.
            </div>
          </div>
        </CoreModal>
      )}
      {pending && (
        <CoreModal
          className={style.wrap}
          title={""}
          titleMargin={"0"}
          closeOutClick={true}
          onClose={() => {
            setInputs(initialInputs);
            setPending(false);
            onClose();
          }}
          visible={visible}
          footer={<></>}
        >
          <div className={style.pendingWrapper}>
            <div className={style.pendingIcon}>
              <SvgSuccess />
            </div>
            <div className={style.pendingTitle}>Submitted withdrawal request</div>
            <div className={style.pendingSubtitle}>
              If you will not get CLS tokens on your wallet in 4 hours, please contact{" "}
              <LinkComponent href="/dashboard/support">support</LinkComponent>.
            </div>
          </div>
        </CoreModal>
      )}
    </>
  );
};

export default WithdrawModal;
