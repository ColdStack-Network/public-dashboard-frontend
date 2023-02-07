import React from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import style from "./tokenModal.module.scss";

type TokenModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const Footer = ({ onClose, onSubmit }: Pick<TokenModalProps, "onClose" | "onSubmit">) => {
  return (
    <div className={style.footer}>
      <div className={style.wrapBtn1}>
        <Button onClickHandler={onClose} color="additional" size="small">
          Cancel
        </Button>
      </div>
      <Button onClickHandler={onSubmit} color="primary" size="small">
        Save
      </Button>
    </div>
  );
};

const TokenModal = ({ visible = false, onClose, onSubmit }: TokenModalProps) => {
  return (
    <CoreModal
      title="Rename Bucket"
      closeOutClick={true}
      onClose={onClose}
      visible={visible}
      footer={<Footer onClose={onClose} onSubmit={onSubmit} />}
    >
      <div>
        <div className={style.item}>
          {/*<InputText onChange={onChange} value={name.value} id={1} name={"nameBucket"}
             tabindex={0} isSuccess={name.isSuccess} label={"Bucket name"}
             isError={name.isError} error={name.error}/>*/}
        </div>
      </div>
    </CoreModal>
  );
};

export default TokenModal;
