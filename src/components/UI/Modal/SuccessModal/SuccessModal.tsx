import SvgSuccess from "icons/SvgSuccess";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSuccesModalState } from "Redux/ui/selectors";
import { closeSuccessModal } from "Redux/ui/uiActions";
import { CoreModal } from "../Modal";
import styles from "./SuccessModal.module.scss";

export const SuccessModal: React.FC = () => {
  const { isOpen, text } = useSelector(selectSuccesModalState);
  const dispatch = useDispatch();
  const close = () => dispatch(closeSuccessModal());

  useEffect(() => {
    !isOpen && close();
  }, [isOpen]);

  return (
    <CoreModal titleMargin="0px" className={styles.successModal} closeOutClick onClose={close} visible={isOpen}>
      <div className={styles.inner}>
        <SvgSuccess />
        <span className={styles.text}>{text}</span>
      </div>
    </CoreModal>
  );
};
