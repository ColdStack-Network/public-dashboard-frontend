import React, { useRef } from "react";
import styles from "./TextInput.module.scss";
import { nanoid } from "nanoid";
import clsx from "clsx";
import SvgErrorInput from "icons/ErrorInput";

type DefaultInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type TextInputProps = {
  label?: string;
  onChange?: (value: string) => void;
  error?: string;
  labelExtraContent?: JSX.Element;
  inputSign?: string;
} & Omit<DefaultInputProps, "id" | "onChange">;

export const TextInput = React.forwardRef<HTMLInputElement | null, TextInputProps>(
  ({ className, label, onChange, error, labelExtraContent, inputSign, ...props }, ref) => {
    const id = useRef(nanoid()).current;

    return (
      <div className={clsx(styles.wrap, className)}>
        <label className={styles.label} htmlFor={id}>
          <span className={styles.labelText}>{label}</span>
          {labelExtraContent}
        </label>
        <div className={clsx(styles.inputWrapper, !!error && styles.inputError)}>
          <input
            className={styles.input}
            onChange={({ target: { value } }) => onChange?.(value)}
            ref={ref}
            id={id}
            {...props}
          />
          {inputSign && <span className={styles.inputSign}>{inputSign}</span>}
        </div>
        {!!error && (
          <small className={styles.error}>
            <SvgErrorInput />
            <span className={styles.errorText}>{error}</span>
          </small>
        )}
      </div>
    );
  }
);
