import Button from "components/UI/Button/Button";
import { CoreModal } from "components/UI/Modal/Modal";
import { AppConfig } from "config";
import React from "react";
import styles from "./TechnicalPage.module.scss";

export const TechnicalPage = () => {
  const isProd = AppConfig.isProd;

  const redirect = () => {
    window.location.href = isProd ? "https://coldstack.io/" : "https://coldstack.dev/";
  };

  return (
    <CoreModal titleMargin="0" showClose={false} closeOutClick={false} visible onClose={() => false}>
      <div className={styles.popup}>
        <div className={styles.textBlock}>
          The System is under maintenance. <br />
          Please visit again an hour later.
        </div>
        <Button onClickHandler={redirect}>Back</Button>
      </div>
    </CoreModal>
  );
};
