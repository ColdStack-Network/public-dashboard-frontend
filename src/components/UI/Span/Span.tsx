import React from "react";
import style from "./span.module.scss";

interface IProps {
  color?: "accent" | "textSecondary";
  children: React.ReactNode;
  fontWeight?: string;
  size?: "small";
}

const Span: React.FC<IProps> = ({ children, color = "textSecondary", size = "small", fontWeight = "400" }: IProps) => {
  return (
    <span
      className={`
       ${style.span} ${size ? style[`span${size}`] : ""} 
       ${color ? style[`span${color}`] : style.textSecondary}
       ${fontWeight ? style[`span${fontWeight}`] : style.p400}
       `}
    >
      {children}
    </span>
  );
};
export default Span;
