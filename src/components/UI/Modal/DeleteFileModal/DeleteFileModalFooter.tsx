import style from "./DeleteFileModal.module.scss";
import React from "react";
import Button from "components/UI/Button/Button";

type DeleteFileModalFooterProps = {
  onClose: () => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export const DeleteFileModalFooter: React.FC<DeleteFileModalFooterProps> = ({
  onClose,
  onSubmit,
  disabled = false,
}) => {
  return (
    <div className={style.footer}>
      <div className={style.wrapBtn}>
        <Button onClickHandler={onClose} color="additional" size="small">
          Cancel
        </Button>
      </div>
      <div className={style.wrapBtn}>
        <Button
          color={disabled ? "disabled" : "accent"}
          isDisabled={disabled}
          onClickHandler={() => onSubmit()}
          size="small"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
