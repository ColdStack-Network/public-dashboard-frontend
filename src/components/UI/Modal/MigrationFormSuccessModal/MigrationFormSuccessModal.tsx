import React from "react";
import { CoreModal } from "../Modal";
import ButtonOval from "../../ButtonOval/ButtonOval";
import style from "./migrationFormSuccessModal.module.scss";
import SvgCheckRound from "../../../../icons/CheckRound";

interface IMigrationFormSuccessModal {
  visible: boolean;
  onClose: () => void;
}

const MigrationFormSuccessModal = ({ visible = false, onClose }: IMigrationFormSuccessModal) => {
  return (
    <CoreModal showClose closeOutClick onClose={onClose} visible={visible} size="md">
      <div className={style.modalWaraper}>
        <SvgCheckRound />
        <h2>Thank you for your interest in ColdStack!</h2>
        <p>Your information has been recorded.</p>
        <p className={style.mb32}>Our manager will contact you soon to start your data migration process.</p>
        <p className={style.mb32}>We look forward to speaking to you soon!</p>
        <ButtonOval onClick={onClose} text="Ok" color="green" size="medium" />
      </div>
    </CoreModal>
  );
};

export default MigrationFormSuccessModal;
