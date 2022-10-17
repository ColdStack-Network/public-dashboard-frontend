import React, {useEffect, useMemo, useState} from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import Textarea from "../../Textarea/Textarea";
import {IFormInputs, updateInputs, validateInputs} from "../../Input/types";
import style from './createTicketModal.module.scss'
import {isFull} from "../../../../helpers/common";
import DragAndDrop, {File} from "../../DragAndDrop/DragAndDrop";
import SelectControlled from "../../SelectCustom/SelectControlled";


interface CreteBucketModalProps {
  visible: boolean
  onClose: () => void
  onCreateTicket: (params: any) => void
  onUploadFiles: (params: any) => void
  disabled: boolean,
  files: any [],
  onDeleteUploadFile: (file: any) => void,
  topics: any [],
  email: string,
  emailVerified: string
}

const initialInputs = {
  subject: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false
  },
  email: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false
  },
  message: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false
  },
} as IFormInputs;

const CreateTicketModal = ({
                             visible = false,
                             onClose,
                             onCreateTicket,
                             onUploadFiles,
                             disabled,
                             files,
                             onDeleteUploadFile,
                             topics,
                             email,
                             emailVerified,
                           }: CreteBucketModalProps) => {

  const [inputs, setInputs] = useState(initialInputs);
  const [selectValue1, setSelectValue1] = useState({} as any);
  const [selectValue2, setSelectValue2] = useState({} as any);
  const [overflowModal, setOverflowModal] = useState('visible');
  const [step, setStep] = useState(0);


  const [emailValue, setEmailValue] = useState('')
  useEffect(() => {
    setEmailValue(email)
  },[email,emailVerified])

  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    console.log("onTextInputChange", evt)
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    switch (name) {
      default: {
        const newInputs = updateInputs(inputs, name, "value", value);
        const [updatedInputs, errors] = validateInputs(newInputs, [name]);
        console.log("updatedInputs default", updatedInputs, errors);
        setInputs(updatedInputs);
      }
    }
  };

  const onTextareaChange = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    console.log("onTextareaChange", evt)
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    switch (name) {
      default: {
        const newInputs = updateInputs(inputs, name, "value", value);
        const [updatedInputs, errors] = validateInputs(newInputs, [name]);
        console.log("updatedTextarea default", updatedInputs, errors);
        setInputs(updatedInputs);
      }
    }
  };

  const footer = useMemo(() => {
      return <>
        {isFull(selectValue2) &&
        <div className={style.footer}>
          <Button onClickHandler={onSubmit} color={"primary"} size={"small"}>Submit Ticket</Button>
        </div>
        }
      </>
    },
    //eslint-disable-next-line
    [inputs, selectValue2, files, selectValue1])


  const updateData1 = (item) => {
    const shouldClear = isFull(selectValue1) && isFull(item) && JSON.stringify(selectValue1) !== JSON.stringify(item);
    setSelectValue1(item);
    console.log("here!!!!", item);
    if (shouldClear && isFull(selectValue2)) {
      setSelectValue2(null)
    }
  }

  const updateData2 = (item) => {
    setSelectValue2(item)
  }
  const subTopics = useMemo(() => {
    if (isFull(topics) && isFull(selectValue1)) {
      return topics.find((item) => {
        return item?.topic?.name === selectValue1?.name
      })?.subtopics;
    } else {
      return [];
    }
  }, [topics, selectValue1])

  const topicsItems = useMemo(() => {
    if (isFull(topics)) {
      return topics.map(item => item.topic)
    }
    return [];
  }, [topics])


  useEffect(() => {
      if (isFull(selectValue2) && overflowModal !== 'auto') {
        setOverflowModal('auto')
      } else {
        if (overflowModal !== 'visible' && !isFull(selectValue2)) {
          setOverflowModal('visible')
        }
      }
    },
    [selectValue2, overflowModal])


  function onSubmit() {
    let masValidate = ["message", "subject"];
    if (!isFull(email)){
      masValidate.push("email")
    }
    const [updatedInputs, errors] = validateInputs(inputs, masValidate);
    setInputs(updatedInputs);
    if (!isFull(errors)) {
      if (selectValue1 && selectValue2) {
        onCreateTicket({
          fields: {
            topic: selectValue1?.name,
            subTopic: selectValue2?.name,
            subject: inputs.subject.value as string,
            email: isFull(email) ? email : inputs.email.value,
            ticketDetails: inputs.message.value,
            file: files
          },
          onSuccess: () => {
            setInputs(initialInputs);
            setSelectValue1(null);
            setSelectValue2(null);
            setStep(1);
          }
        })
      }
    }
  }

  const onCloseModified = () => {
    onClose();
    setStep(0);
    setInputs(initialInputs);
    setSelectValue1(null);
    setSelectValue2(null);
  }
  return (
    <Modal overflow={overflowModal}
           title={"Create Ticket"}
           closeOutClick={true}
           onClose={onCloseModified}
           visible={visible}
           footer={footer}
    >
      {() => {
        return <div>
          {step === 0 &&
          <>
            <div className={style.selectLabel}>
              Please help us route your question to the relevant team by choosing a topic.
            </div>
            <div className={style.inputWrapper}>
              <SelectControlled onSelect={updateData1}
                                items={topicsItems}
                                value={selectValue1}
                                placeholder={"Select a Ticket Topic"}
              />
            </div>
            {isFull(selectValue1) &&
            <div className={style.inputWrapper}>
              <SelectControlled onSelect={updateData2} items={subTopics}
                                value={selectValue2}
                                placeholder={"Select a Subtopic"}/>
            </div>
            }
            {isFull(selectValue2) &&
            <>
              <div className={style.inputWrapper}>
                <InputText
                  value={inputs.subject.value as string}
                  onChange={onTextInputChange}
                  isError={inputs.subject.isError}
                  error={inputs.subject.error}
                  tabindex={1}
                  id={1}
                  isSuccess={inputs.subject.isSuccess}
                  name={"subject"}
                  placeholder={"Subject"}/>
              </div>
              <div className={style.inputWrapper}>
                <InputText
                  onChange={onTextInputChange}
                  //value={inputs.email.value as string}
                  value={emailValue}
                  id={2}
                  name={"email"}
                  tabindex={1}
                  isDisabled={emailVerified === 'true'}
                  placeholder={"Enter your email"}
                  isSuccess={inputs.email.isSuccess}
                  isError={isFull(emailValue)? false : inputs.email.isError}
                  error={inputs.email.error}
                />
              </div>
              <div className={style.inputWrapper}>
                <Textarea
                  onChange={onTextareaChange}
                  value={inputs.message.value as string}
                  id={3}
                  name={"message"}
                  tabindex={1}
                  placeholder={"Please let us know the question you have and any further details"}
                  isSuccess={inputs.message.isSuccess}
                  isError={inputs.message.isError}
                  error={inputs.message.error}
                />
              </div>
              <DragAndDrop onUploadFiles={onUploadFiles} disabled={disabled} typePage={'support'}/>
              <div className={style.filesList}>
                {files?.map((file) => {
                  return <File noProgress={true} file={{file: file}} onDelete={() => {
                    onDeleteUploadFile(file)
                  }}/>
                })}
              </div>
            </>
            }
          </>
          }
          {step === 1 &&
          <div className={style.successText}>
            Thank you for your message! This is an automatic reply to let you know that we received your email. We will
            reply to you shortly.
          </div>
          }
        </div>

      }}
    </Modal>
  )
};


export default CreateTicketModal;
