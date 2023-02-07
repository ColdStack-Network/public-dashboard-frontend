import Button from "components/UI/Button/Button";
import { FormDataType } from "components/UI/Input/types";
import React from "react";
import style from "./createBucketModal.module.scss";

type CreateBucketModalFooterProps = {
  submit: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  setInputs: (value: FormDataType) => void;
  onClose: () => void;
  initialInputs: FormDataType;
};

export const CreateBucketModalFooter: React.FC<CreateBucketModalFooterProps> = ({
  submit,
  onClose,
  setInputs,
  initialInputs,
}) => {
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
      <div className={style.wrapBtn2}>
        <Button onClickHandler={submit} color="primary" size="small">
          Create bucket
        </Button>
      </div>
    </div>
  );
};
