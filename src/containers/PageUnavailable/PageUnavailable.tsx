import React from "react";
import styles from "./PageUnavailable.module.scss";

export const PageUnavailable: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{text} temporary unavailable</h1>
    </div>
  );
};
