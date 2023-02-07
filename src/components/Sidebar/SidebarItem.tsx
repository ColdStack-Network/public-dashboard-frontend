import React from "react";
import style from "./sidebar.module.scss";
import { Link } from "react-router-dom";

interface IProps {
  text: string;
  link: string;
  icon: React.ReactNode;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<IProps> = ({ text, link, icon, isCollapsed }: IProps) => {
  return (
    <Link to={link} className={`${style.item} ${isCollapsed ? style.itemCollapsed : ""} ${style.itemCollapsedTablet}`}>
      <div className={style.icon}>{icon}</div>
      <div className={style.itemText}>{text}</div>
    </Link>
  );
};

export default SidebarItem;
