import React from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import style from "./deleteBucketModal.module.scss";

type EditBucketModalProps = {
  visible: boolean;
  name: string;
  onClose: () => void;
  onSubmit: () => void;
};

const DeleteBucketModalFooter = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) => {
  return (
    <div className={style.footer}>
      <div className={style.wrapBtn1}>
        <Button onClickHandler={onClose} color="additional" size="small">
          Cancel
        </Button>
      </div>
      <div className={style.wrapBtn2}>
        <Button onClickHandler={() => onSubmit()} color="accent" size="small">
          Delete
        </Button>
      </div>
    </div>
  );
};

export const DeleteBucketModal = ({ visible = false, onClose, name, onSubmit }: EditBucketModalProps) => {
  return (
    <CoreModal
      className={style.wrap}
      title="Delete Bucket"
      closeOutClick={true}
      onClose={onClose}
      visible={visible}
      footer={<DeleteBucketModalFooter onClose={onClose} onSubmit={onSubmit} />}
    >
      <div className={style.item}>Are you sure you want to delete bucket {name}?</div>
    </CoreModal>
  );
};
