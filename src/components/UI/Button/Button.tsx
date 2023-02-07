import clsx from "clsx";
import React from "react";
import { SpinnerCute } from "../Spinner/Spinner";
import style from "./button.module.scss";

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
    | "outlined";
  isDisabled?: boolean;
  btnHref?: string;
  onClickHandler?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  size?: string;
  className?: string;
}
const Button: React.FC<IProps> = ({
  children,
  type = "button",
  color = "primary",
  isDisabled = false,
  btnHref,
  onClickHandler,
  size,
  className,
}) => {
  return (
    <button
      className={clsx(
        style.button,
        size && style[`button${size}`],
        color ? style[`button${color}`] : style.buttonPrimary,
        isDisabled && style[`buttonDisabled${color}`],
        className
      )}
      type={type}
      disabled={isDisabled}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};
export default Button;

export const AsyncButton: React.FC<IProps & { loading: boolean }> = ({
  loading,
  color = "primary",
  children,
  ...props
}) => {
  return (
    <Button className={style.asyncBtn} color={color} {...props}>
      {children}
      {loading && (
        <div className={style.asyncBtnSpin}>
          <SpinnerCute />
        </div>
      )}
    </Button>
  );
};
