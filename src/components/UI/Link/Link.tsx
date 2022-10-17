import React from 'react';
import style from './link.module.scss';
import {Link} from "react-router-dom";

interface IProps {
  color?:
    | "primary"
    | "secondary"
  href?: string;
  outerLink?: boolean;
  onClickHandler?: () => void;
  children: React.ReactNode
}
const LinkComponent: React.FC<IProps > = ({children, href, onClickHandler, outerLink = false }: IProps) => {
  return(
      <React.Fragment>
        { onClickHandler ?
          <span onClick={onClickHandler} className={style.item}>{children}</span> :
          ( outerLink ?
            <a href={href} target='_blank' className={style.item}>{children}</a>
            : <Link to={href} className={style.item}>{children}</Link> )
        }
      </React.Fragment>
  )
}
export default LinkComponent;
