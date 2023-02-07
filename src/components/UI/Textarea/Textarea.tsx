import React from "react";
import style from "./textarea.module.scss";
import SvgErrorInput from "../../../icons/ErrorInput";
import clsx from "clsx";

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  placeholder?: string;
  id: any;
  name: string;
  tabindex: number;
  isSuccess: boolean;
  isError: boolean;
  isDisabled?: boolean;
  error: string;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  rows?: number;
  className?: string;
}
const TextArea: React.FC<IProps> = ({
  onChange,
  value,
  placeholder,
  isDisabled,
  id,
  isError,
  isSuccess,
  error,
  name,
  onBlur,
  tabindex,
  label,
  rows,
  className
}: IProps) => {
  return (
    <div className={clsx(style.container, className)}>
      {label && <div className={style.labelInput}>{label}</div>}
      <textarea
        className={`${style.input} ${isSuccess ? style.inputSuccess : ""}  ${isError ? style.inputError : ""}`}
        value={value}
        onChange={onChange}
        tabIndex={tabindex}
        id={id}
        name={name}
        placeholder={placeholder || ""}
        disabled={isDisabled !== undefined ? isDisabled : false}
        onBlur={onBlur}
        rows={rows}
      />
      {isError ? (
        <div className={style.error}>
          <div className={style.errIcon}>
            <SvgErrorInput />
          </div>
          <div className={style.errorText}>{error}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TextArea;
