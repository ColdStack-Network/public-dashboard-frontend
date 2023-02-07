import React, { useEffect, useMemo, useState } from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import Textarea from "../../Textarea/Textarea";
import { IFormInputs, updateInputs, validateInputs } from "../../Input/types";
import style from "./createTicketModal.module.scss";
import { isFull } from "../../../../helpers/common";
import { File, DragAndDrop } from "../../DragAndDrop/DragAndDrop";
import SelectControlled from "../../SelectCustom/SelectControlled";
import { ITicket } from "actions/interfaces";
import { UploadFileType } from "models/UploadFileType";
import { SupportTopicItem } from "Redux/account/reducer";
import { SelectItem } from "components/UI/SelectCustom/types";

interface CreteBucketModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateTicket: (params: ITicket) => void;
  onUploadFiles: (params: UploadFileType[]) => void;
  disabled?: boolean;
  files: UploadFileType[];
  onDeleteUploadFile: (file: UploadFileType) => void;
  topics: SupportTopicItem[];
  email: string;
  emailVerified: boolean;
}

const initialInputs = {
  subject: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false,
  },
  email: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false,
  },
  message: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false,
  },
} as IFormInputs;

export const CreateTicketModal: React.FC<CreteBucketModalProps> = ({
  visible = false,
  onClose,
  onCreateTicket,
  onUploadFiles,
  disabled = false,
  files,
  onDeleteUploadFile,
  topics,
  email,
  emailVerified,
}) => {
  const [inputs, setInputs] = useState(initialInputs);
  const [selectedTopic, setSelectedTopic] = useState<SelectItem | null>(null);
  const [selectedSubTopic, setSelectedSubTopic] = useState<SelectItem | null>(null);
  const [overflowModal, setOverflowModal] = useState("visible");
  const [step, setStep] = useState(0);

  const subTopics = useMemo(() => {
    if (isFull(topics) && isFull(selectedTopic)) {
      return topics.find((item) => item?.topic?.name === selectedTopic?.name)?.subtopics || [];
    }
    return [];
  }, [topics, selectedTopic]);
  const topicsItems = useMemo(() => {
    if (isFull(topics)) {
      return topics.map((item) => item.topic);
    }
    return [];
  }, [topics]);

  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    const newInputs = updateInputs(inputs, name, "value", value);
    const [updatedInputs] = validateInputs(newInputs, [name]);
    setInputs(updatedInputs);
  };
  const onTextareaChange = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    const newInputs = updateInputs(inputs, name, "value", value);
    const [updatedInputs] = validateInputs(newInputs, [name]);
    setInputs(updatedInputs);
  };
  const updateData1 = (item: SelectItem) => {
    const shouldClear = isFull(selectedTopic) && isFull(item) && JSON.stringify(selectedTopic) !== JSON.stringify(item);
    setSelectedTopic(item);
    if (shouldClear && isFull(selectedSubTopic)) {
      setSelectedSubTopic(null);
    }
  };

  const updateData2 = (item: SelectItem) => setSelectedSubTopic(item);
  function onSubmit() {
    let masValidate = ["message", "subject", "email"];
    const [updatedInputs, errors] = validateInputs(inputs, masValidate);
    setInputs(updatedInputs);
    if (!isFull(errors)) {
      if (selectedTopic && selectedSubTopic) {
        onCreateTicket({
          fields: {
            topic: selectedTopic.name,
            subTopic: selectedSubTopic.name,
            subject: inputs.subject.value as string,
            email: inputs.email.value as string,
            ticketDetails: inputs.message.value as string,
            file: files,
          },
          onSuccess: () => {
            setInputs(initialInputs);
            setSelectedTopic(null);
            setSelectedSubTopic(null);
            setStep(1);
          },
        });
      }
    }
  }
  const onCloseModified = () => {
    onClose();
    setStep(0);
    setInputs(initialInputs);
    setSelectedTopic(null);
    setSelectedSubTopic(null);
  };

  useEffect(() => {
    if (isFull(selectedSubTopic) && overflowModal !== "auto") {
      setOverflowModal("auto");
    } else {
      if (overflowModal !== "visible" && !isFull(selectedSubTopic)) {
        setOverflowModal("visible");
      }
    }
  }, [selectedSubTopic, overflowModal]);
  useEffect(() => {
    setInputs((inpts) => ({ ...inpts, email: { ...inpts.email, value: email } }));
  }, [email]);

  return (
    <CoreModal
      className={style.wrap}
      overflow={overflowModal}
      title="Create Ticket"
      closeOutClick={true}
      onClose={onCloseModified}
      visible={visible}
      footer={<CreateTicketModalFooter onSubmit={onSubmit} selectedSubTopic={selectedSubTopic} />}
    >
      <div>
        {step === 0 && (
          <>
            <div className={style.selectLabel}>
              Please help us route your question to the relevant team by choosing a topic.
            </div>
            <div className={style.inputWrapper}>
              <SelectControlled
                onSelect={updateData1}
                items={topicsItems}
                value={selectedTopic}
                placeholder="Select a Ticket Topic"
              />
            </div>
            {isFull(selectedTopic) && (
              <div className={style.inputWrapper}>
                <SelectControlled
                  onSelect={updateData2}
                  items={subTopics}
                  value={selectedSubTopic}
                  placeholder="Select a Subtopic"
                />
              </div>
            )}
            {isFull(selectedSubTopic) && (
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
                    name="subject"
                    placeholder="Subject"
                  />
                </div>
                <div className={style.inputWrapper}>
                  <InputText
                    onChange={onTextInputChange}
                    value={inputs.email.value as string}
                    id={2}
                    name="email"
                    tabindex={1}
                    placeholder="Enter your email"
                    isSuccess={inputs.email.isSuccess}
                    isError={inputs.email.isError}
                    error={inputs.email.error}
                  />
                </div>
                <div className={style.inputWrapper}>
                  <Textarea
                    onChange={onTextareaChange}
                    value={inputs.message.value as string}
                    id={3}
                    name="message"
                    tabindex={1}
                    placeholder="Please let us know the question you have and any further details"
                    isSuccess={inputs.message.isSuccess}
                    isError={inputs.message.isError}
                    error={inputs.message.error}
                  />
                </div>
                <DragAndDrop onUploadFiles={onUploadFiles} disabled={disabled} typePage={"support"} />
                <div className={style.filesList}>
                  {files?.map((file) => {
                    return <File noProgress={true} object={{ file: file }} onDelete={() => onDeleteUploadFile(file)} />;
                  })}
                </div>
              </>
            )}
          </>
        )}
        {step === 1 && (
          <div className={style.successText}>
            Thank you for your message! This is an automatic reply to let you know that we received your email. We will
            reply to you shortly.
          </div>
        )}
      </div>
    </CoreModal>
  );
};

const CreateTicketModalFooter = ({ selectedSubTopic, onSubmit }: { selectedSubTopic: any; onSubmit: () => void }) => {
  if (isFull(selectedSubTopic)) {
    return (
      <div className={style.footer}>
        <Button onClickHandler={onSubmit} color="primary" size="small">
          Submit Ticket
        </Button>
      </div>
    );
  }
  return null;
};
