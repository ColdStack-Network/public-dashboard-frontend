import React from "react";
import style from "./container.module.scss";

interface IProps {
  children: React.ReactNode;
}

const Container: React.FC<IProps> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};
export default Container;
