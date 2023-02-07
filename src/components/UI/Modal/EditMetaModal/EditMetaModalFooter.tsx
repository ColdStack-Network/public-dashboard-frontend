import style from "./editMetaModal.module.scss";
import React from "react";
import Button from "components/UI/Button/Button";

export const EditMetaModalFooter: React.FC<{
  onAddMeta: () => void;
  disableSave: boolean;
  onClickSaveMetadata: () => void;
}> = ({ onAddMeta, onClickSaveMetadata, disableSave }) => {
  return (
    <div className={style.footer}>
      <div className={style.wrapBtn1}>
        <Button onClickHandler={onAddMeta} color="secondary" size="small">
          Add metadata
        </Button>
      </div>
      <div className={style.wrapBtn2}>
        <Button isDisabled={disableSave} onClickHandler={onClickSaveMetadata} color="primary" size="small">
          Save
        </Button>
      </div>
    </div>
  );
};
