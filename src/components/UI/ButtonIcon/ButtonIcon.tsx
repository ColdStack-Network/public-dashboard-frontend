import clsx from "clsx";
import React from "react";
import styles from "./ButtonIcon.module.scss";

type ButtonIconProps = {
  onClick: () => void;
  className?: string;
};

export const ButtonIcon: React.FC<ButtonIconProps> = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={clsx(styles.buttonIcon, className)}>
      {children}
    </button>
  );
};
