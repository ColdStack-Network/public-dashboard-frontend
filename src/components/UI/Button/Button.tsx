import React from 'react';
import style from './button.module.scss';

interface IProps {
  type?: "submit" | "button";
  color?:
    | "primary"
    | "secondary"
    | "additional"
    | "gray"
    | "lightgray"
    | "disabled"
    | "accent"
    | "text"
    | "transparent"
  isDisabled?: boolean;
  btnHref?: string;
  onClickHandler?: () => void;
  children: React.ReactNode,
  size?: string
}
const Button: React.FC<IProps > = ({children, type, color = "primary", isDisabled = false, btnHref, onClickHandler, size}: IProps) => {
  return(
    <button className={`${style.button} ${size ? style[`button${size}`] : ""} 
       ${color ? style[`button${color}`] : style.buttonPrimary}
       ${isDisabled ? style[`buttonDisabled${color}`] : ""}
       `}
      type={type || "button"}
      onClick={isDisabled ? ()=> {} : onClickHandler}
    >
      {children}
    </button>
  )
}
export default Button;
