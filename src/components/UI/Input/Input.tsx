import React, {useState} from 'react';
import style from './input.module.scss';
import SvgErrorInput from "../../../icons/ErrorInput";
import SvgCheckRound from "../../../icons/CheckRound";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import SvgCopyIcon from "../../../icons/Copy";


interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  maxValue?: number,
  maxValueFunc?: () => void,
  typeValue?: string,
  placeholder?: string,
  id: any,
  name: string,
  tabindex: number,
  type?: string,
  isSuccess: boolean,
  isError: boolean,
  isDisabled?: boolean,
  error: string,
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  label?: string,
  completed?: boolean,
  completedText?: string,
  disabledBright?: boolean,
  copyToClipboard?: boolean
}

const InputText: React.FC<IProps> = ({onChange, value, placeholder, isDisabled, id, isError, isSuccess, type, error, name, onBlur, tabindex, label, completed, maxValue, typeValue, maxValueFunc, disabledBright, completedText, copyToClipboard}: IProps) => {

  const [copied, setCopied] = useState("");

  return (
    <div className={style.container} data-tooltip-text={copied}>
      <div className={style.wrapperLabels}>
        {label && <div className={style.labelInput}>
          {label}
        </div>}
        {maxValue && <div className={style.maxValueInput}>
          {maxValue}<span onClick={maxValueFunc} className={style.maxColor}> MAX</span>
        </div>
        }
      </div>
      <div className={style.wrapperInput}>
        <input
          className={`${style.input} ${isSuccess ? style.inputSuccess : ""} ${isError ? style.inputError : ""} 
          ${isDisabled ? style.inputDisabled : ""} ${disabledBright ? style.disabledBright : ""} ${copyToClipboard ? style.inputCopyToClipboard : ""}`}
          value={value}
          onChange={onChange}
          tabIndex={tabindex}
          id={id}
          name={name}
          type={type || "text"}
          placeholder={placeholder || ""}
          disabled={isDisabled !== undefined ? isDisabled : false}
          onBlur={onBlur}
        />
        <div className={style.blockItemText}>
          {copyToClipboard &&
          <CopyToClipboard text={value} onCopy={()=>{setCopied("Copied!")}}>
            <div className={style.iconButton} onMouseOut={()=>{setCopied("")}}>
              <SvgCopyIcon color={"#5A5D65"}/>
            </div>
          </CopyToClipboard>
          }
        </div>
        <div className={style.typeValue}>{typeValue}</div>
      </div>
      {isError ?
        <div className={style.error}>
          <div className={style.errIcon}><SvgErrorInput/></div>
          <div className={style.errorText}>{error}</div>
        </div>
        : ""}
      {completed ?
        <div className={style.error}>
          <div className={style.errIcon}><SvgCheckRound/></div>
          <div className={style.completedText}>{completedText}</div>
        </div>
        : ""}
    </div>
  )
}

export default InputText;
