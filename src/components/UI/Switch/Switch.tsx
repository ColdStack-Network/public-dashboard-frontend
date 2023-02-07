import clsx from "clsx";
import React from "react";
import styles from "./Switch.module.scss";

type SwitchProps = {
  label?: JSX.Element | string;
  checked?: boolean;
  onChange?: () => void;
  className?: string;
  type?: "checkbox" | "radio";
  labelClasses?: string;
  disabled?: boolean;
};

export const Switch: React.FC<SwitchProps> = ({ labelClasses, label, onChange, checked }) => {
  // wierd thing but controlled elements recieved non undefiend onChange callback
  const handleChange = () => onChange?.();

  return (
    <div className={styles.wrapper}>
      <label className={styles.switch}>
        <input onChange={handleChange} checked={checked} type="checkbox" />
        <span className={clsx(styles.slider, styles.round)}></span>
      </label>
      <span onClick={onChange} className={clsx(styles.label, labelClasses)}>
        {label}
      </span>
    </div>
  );
};
