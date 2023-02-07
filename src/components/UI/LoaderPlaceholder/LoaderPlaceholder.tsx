import React from "react";
import styles from "./LoaderPlaceholder.module.scss";

type LoaderPlaceholderProps = {
  showOverlay?: boolean;
};

export const LoaderPlaceholder: React.FC<LoaderPlaceholderProps> = ({ showOverlay = true }) => {
  return (
    <div className={styles.overlay}>
      <div className="center-absolute">
        <div className={styles.loader} />
      </div>
    </div>
  );
};
