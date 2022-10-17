import React from 'react';
import style from './textarea.module.scss';
import SvgErrorInput from "../../../icons/ErrorInput";

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>)=>void,
  value: string,
  placeholder?: string,
  id: any,
  name: string,
  tabindex: number,
  isSuccess: boolean,
  isError: boolean,
  isDisabled?: boolean,
  error: string,
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>)=>void,
  label?: string,
}
const TextArea: React.FC<IProps > = ({onChange, value, placeholder, isDisabled, id, isError, isSuccess, error, name, onBlur, tabindex, label}: IProps) => {
  return(
    <div className={style.container}>
      {label  &&  <div className={style.labelInput}>
        {label}
      </div> }
      <textarea className={`${style.input} ${isSuccess ? style.inputSuccess : ""}  ${isError ? style.inputError : ""}`} value={value}
                 onChange={onChange}
             tabIndex={tabindex}
             id={id}
             name={name}
             placeholder={placeholder || ""}
             disabled={isDisabled !== undefined ? isDisabled : false}
              onBlur={onBlur}
      />
        {isError ?
          <div className={style.error}>
            <div className={style.errIcon}><SvgErrorInput/></div>
            <div className={style.errorText}>{error}</div>
          </div>
          : ""}
    </div>
  )
}

export default TextArea;
