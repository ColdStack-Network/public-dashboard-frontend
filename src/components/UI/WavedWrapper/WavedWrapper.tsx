import styles from "./WavedWrapper.module.scss";
import React from "react";
import clsx from "clsx";

export const WavedWrapper: React.FC<{ className?: string }> = ({ className, children }) => {
  return <div className={clsx(styles.waved, className)}>{children}</div>;
};
