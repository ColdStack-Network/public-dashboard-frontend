import React from "react";
import style from "./link.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface IProps {
  color?: "primary" | "secondary";
  href?: string;
  outerLink?: boolean;
  onClickHandler?: () => void;
  children: React.ReactNode;
  className?: string;
}
const LinkComponent: React.FC<IProps> = ({ children, href, onClickHandler, outerLink = false, className }: IProps) => {
  return (
    <React.Fragment>
      {onClickHandler ? (
        <span onClick={onClickHandler} className={clsx(style.item, className)}>
          {children}
        </span>
      ) : outerLink ? (
        <a rel="noreferrer" href={href} target="_blank" className={clsx(style.item, className)}>
          {children}
        </a>
      ) : (
        <Link to={href} className={clsx(style.item, className)}>
          {children}
        </Link>
      )}
    </React.Fragment>
  );
};
export default LinkComponent;
