import React from "react";
import style from "./p.module.scss";

interface IProps {
  color?: "accent" | "textSecondary";
  children: React.ReactNode;
  fontWeight?: string;
  size?: "small";
}

const P: React.FC<IProps> = ({ children, color = "textSecondary", size = "small", fontWeight = "400" }: IProps) => {
  return (
    <p
      className={`
       ${style.p} ${size ? style[`p${size}`] : ""} 
       ${color ? style[`p${color}`] : style.textSecondary}
       ${fontWeight ? style[`p${fontWeight}`] : style.p400}
       `}
    >
      {children}
    </p>
  );
};
export default P;
