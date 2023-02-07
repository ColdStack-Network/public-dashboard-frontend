import React from "react";
import { CoreModal } from "../Modal";
import SvgTimeAttack from "../../../../icons/TimeAtack";
import style from "./deleteFilesProcessModal.module.scss";

interface IDeleteFilesProcessModal {
  visible: boolean;
  onClose: () => void;
}

export const DeleteFilesProcessModal = ({ visible = false, onClose }: IDeleteFilesProcessModal) => {
  return (
    <CoreModal
      className={style.wrap}
      title="Deleting objects"
      closeOutClick={false}
      onClose={onClose}
      visible={visible}
    >
      <div>
        <div className={style.center}>
          <SvgTimeAttack />
        </div>
        <div>This can take from couple of seconds to several minutes</div>
      </div>
    </CoreModal>
  );
};
