import React, {useState, useEffect} from 'react';
import style from './settingsPage.module.scss';
import SvgEdit from "../../icons/Edit";
import InputText from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import UseWeb3 from "../../helpers/web3/UseWeb3";
import {setEmailSettings} from "../../modules/user/actions";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "../../reducers";
import {isFull} from "../../helpers/common";
import {getEmailSettings} from "../../modules/user/actions";
import {validateEmail} from "../../components/UI/Input/types";


const SettingsPage: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmailSettings());
    // }
  }, [dispatch]);

  const {account} = UseWeb3();
  const emailProps = useSelector((state: TStore) => state?.user?.email);
  const {email, emailVerified, arn} = emailProps
  const [verified, setVerified] = useState("Not verified")
  const [arnAccount, setArnAccount] = useState('')
  const [editForm, setEditForm] = useState(false)
  const editFormFunc = () => {
    setEditForm(true)
    setTimeout(() => {
      setEditForm(false)
    }, 10)
  }

  useEffect(() => {

    if (emailVerified === 'true' && isFull(email)) {
      setVerified("Verified")
    }
  }, [emailVerified, email])

  useEffect(() => {
    if (isFull(arn)) {
      setArnAccount(arn)
    }
  }, [arn])

  return (
    <div>
      <div className={style.headerRow}>
        <div className={style.titleRow}>
          <div className={`${style.pageTitleCommon} ${style.pageTitle}`}>
            Settings
          </div>
        </div>
      </div>
      <div className={style.blocksRow}>
        <div className={style.col1}>
          <div className={`${style.block} ${style.blockInfo}`}>
            <div className={style.blockHeader}>
              <div className={style.blockTitle}>
                Account details
              </div>
              <div className={style.blockSubtitle}>
                Update your account information.
              </div>
            </div>
            <div className={style.blockContent}>
              <div className={style.rowBlock}>
                <div className={style.label}>User Wallet:</div>
                <div className={`${style.value} ${style.userWallet}`}>{account}</div>
              </div>
              <div className={style.rowBlock}>
                <div className={style.label}>Arn:</div>
                <div className={style.value}>{arnAccount}</div>
              </div>
              <div className={style.rowBlock}>
                <div className={style.label}>Time Zone:</div>
                <div className={style.value}>Russia, Moscow</div>
              </div>
              <div className={style.rowBlock}>
                <div className={style.label}>Notification Email:</div>
                <div className={style.value}>{verified}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.col2}>
          <div className={style.block}>
            <div className={style.blockHeader}>
              <div className={style.blockHeaderRow}>
                <div className={style.blockHeaderLeft}>
                  <div className={style.blockTitle}>
                    Email
                  </div>
                  <div className={style.blockSubtitle}>
                    (Optional) Email for billing notifications
                  </div>
                </div>
                <div className={style.blockHeaderRight}>
                  <div onClick={() => {
                    editFormFunc()
                  }} className={style.wrapEdit}>
                    <SvgEdit color={"dark"}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.blockContent}>
              <EmailForm editForm={editForm}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SettingsPage;


const EmailForm: React.FC<any> = (props: any) => {
  const emailProps = useSelector((state: TStore) => state?.user?.email);
  const {email, emailVerified} = emailProps
  const dispatch = useDispatch();

  useEffect(() => {
      setEmailValue0(email)
    },
    [email])

  useEffect(() => {
    if (!!props.editForm) {
      setAnimation(0.3)
      setStep(0)
    }
  }, [props.editForm])

  const [emailValue0, setEmailValue0] = useState('');
  const [emailValue1, setEmailValue1] = useState('');


  useEffect(() => {

    if (isFull(emailValue0)) {
      setErrorEmailStep0('')
    }

  }, [emailValue0])

  const [errorEmailStep0, setErrorEmailStep0] = useState("Your email is not required, but highly recommended to avoid data loss from insufficient balances");
  const [errorEmailStep1, setErrorEmailStep1] = useState("");
  const [errorEmailStep2, setErrorEmailStep2] = useState("");

  const [step, setStep] = useState(0); // 0 - no email, 1 - edit email (email + confirm), 2 - error confirm, 3 - success, confirmed email
  const [animation, setAnimation] = useState(0)

  useEffect(() => {
    if (email?.length > 0) {
      setStep(2)
      // setAnimation(0.3)
    }

    if (email?.length > 0 && emailVerified === "true") {
      setStep(3)
    }
  }, [email, emailVerified])

  const onAdd = (email) => {

    setAnimation(0.3)
    if (validateEmail(email)) {
      setErrorEmailStep0('')
      setStep(1)
    } else {
      setErrorEmailStep0('Please enter a valid email address')
    }
  }

  const onSave = (email1, email2) => {
    setAnimation(0.3)
    if (validateEmail(email1) && email1 !== email2) {
      setErrorEmailStep0('')
      setErrorEmailStep1('Please enter correct confirm email address')
    } else if (!validateEmail(email1) && email1 !== email2) {
      setErrorEmailStep0('Please enter a valid email address')
      setErrorEmailStep1('Please enter correct confirm email address')
    } else if (!validateEmail(email1)) {
      setErrorEmailStep0('Please enter a valid email address')
      setErrorEmailStep1('')
    } else if (validateEmail(email1) && email1 === email2) {
      setErrorEmailStep0('')
      setErrorEmailStep1('')
      setStep(2)
    }
  }

  const onVerify = (email) => {
    setAnimation(0.3)
    dispatch(setEmailSettings({
      email: email,
    }))
    setErrorEmailStep2("Please confirm your email address. You will receive an activation email. Select the link in the email to verify your address.")
  }

  const onEdit = (email) => {
    setAnimation(0.3)
    setErrorEmailStep0('')
    setErrorEmailStep1('')
    setErrorEmailStep2('')
    setStep(0)
  }

  return (
    <div className={style.wrapperEmailForms} style={step === 1 ? {height: '320px'} : {height: '248px'}}>
      <div className={`${style.containerEmailForms}`}
           style={{transform: `translateX(-${step * 25}%)`, transition: `all ease-in-out ${animation}s`}}>
        <div className={`${style.emailForm} ${style.emailForm0}`} style={step === 0 ? {opacity: '1'} : {opacity: '0'}}>
          <div className={style.wrapperInput}>
            <InputText onChange={(e) => setEmailValue0(e.target.value)}
                       value={emailValue0}
                       id={"email"} name={"email"}
                       tabindex={0} isSuccess={false}
                       isError={errorEmailStep0?.length > 0}
                       error={errorEmailStep0}
                       label={"Email"}
            />
          </div>
          <div className={style.emailFormButton}>
            <Button size={"small"} onClickHandler={() => {
              onAdd(emailValue0)
            }}>
              Add
            </Button>
          </div>
        </div>
        <div className={`${style.emailForm} ${style.emailForm1}`} style={step === 1 ? {opacity: '1'} : {opacity: '0'}}>
          <div className={style.wrapperInput}>
            <InputText onChange={(e) => setEmailValue0(e.target.value)}
                       value={emailValue0}
                       id={"email"} name={"email"}
                       tabindex={0} isSuccess={false}
                       isError={errorEmailStep0?.length > 0}
                       error={errorEmailStep0}
                       label={"New Email"}
            />
          </div>
          <div className={style.wrapperInput}>
            <InputText onChange={(e) => setEmailValue1(e.target.value)}
                       value={emailValue1}
                       id={"email"} name={"email"}
                       tabindex={0} isSuccess={false}
                       isError={errorEmailStep1?.length > 0}
                       error={errorEmailStep1}
                       label={"New Email Confirmation"}
            />
          </div>
          <div className={style.emailFormButton}>
            <Button size={"small"} onClickHandler={() => {
              onSave(emailValue0, emailValue1)
            }}>
              Save
            </Button>
          </div>
        </div>
        <div className={`${style.emailForm} ${style.emailForm2}`} style={step === 2 ? {opacity: '1'} : {opacity: '0'}}>
          <div className={style.wrapperInput}>
            <InputText onChange={(e) => {
            }}
                       value={emailValue0}
                       isDisabled={true}
                       id={"email"} name={"email"}
                       tabindex={0} isSuccess={false}
                       isError={errorEmailStep2?.length > 0}
                       error={errorEmailStep2}
                       label={step === 0 || step === 3 ? "Email" : "New Email"}
            />
          </div>
          <div className={style.emailFormButton}>
            <Button size={"small"} onClickHandler={() => {
              onVerify(emailValue0)
            }}>
              Verify
            </Button>
          </div>
        </div>
        <div className={`${style.emailForm} ${style.emailForm3}`} style={step === 3 ? {opacity: '1'} : {opacity: '0'}}>
          <div className={style.wrapperInput}>
            <InputText onChange={(e) => {
            }}
                       value={emailValue0}
                       isDisabled={true}
                       id={"email"} name={"email"}
                       tabindex={0}
                       isSuccess={false}
                       isError={false}
                       error={''}
                       label={"Email"}
                       completed={!!emailVerified}
                       completedText={"Email verified"}

            />
          </div>
          <div className={style.emailFormButton}>
            <Button size={"small"} onClickHandler={() => {
              onEdit(email)
            }}>
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
