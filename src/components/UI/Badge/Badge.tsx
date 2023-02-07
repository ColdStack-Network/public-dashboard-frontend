import React from "react";
import style from "./badge.module.scss";

interface IProps {
  active: boolean;
  text: string;
}
const Badge: React.FC<IProps> = ({ active, text }: IProps) => {
  return (
    <div className={style.container} style={{ background: active ? "#1FCF90" : "#A6B4CE" }}>
      {text}
    </div>
  );
};

export default Badge;
