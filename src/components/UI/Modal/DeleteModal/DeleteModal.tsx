import React from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import style from "./deleteModal.module.scss";

type DeleteBucketModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  text: string;
  textBtnDelete: string;
};

const DeleteModalFooter: React.FC<Pick<DeleteBucketModalProps, "onClose" | "onSubmit" | "textBtnDelete">> = ({
  onClose,
  onSubmit,
  textBtnDelete,
}) => {
  return (
    <div className={style.footer}>
      <div className={style.wrapBtn}>
        <Button onClickHandler={onClose} color="additional" size="small">
          Cancel
        </Button>
      </div>
      <div className={style.wrapBtn}>
        <Button onClickHandler={() => onSubmit()} color="accent" size="small">
          {textBtnDelete}
        </Button>
      </div>
    </div>
  );
};

export const DeleteModal: React.FC<DeleteBucketModalProps> = ({
  visible = false,
  onClose,
  onSubmit,
  title,
  text,
  textBtnDelete,
}) => {
  return (
    <CoreModal
      className={style.wrap}
      title={title}
      closeOutClick={true}
      onClose={onClose}
      visible={visible}
      footer={<DeleteModalFooter onClose={onClose} onSubmit={onSubmit} textBtnDelete={textBtnDelete} />}
    >
      <div>
        <div className={style.text}>{text}</div>
        <div className={style.warning}>This action cannot be undone!</div>
      </div>
    </CoreModal>
  );
};
