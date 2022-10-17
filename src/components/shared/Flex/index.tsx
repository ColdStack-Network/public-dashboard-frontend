import React from 'react';
import style from './style.module.scss';
import { capitalize } from "../../../helpers/common";

interface IProps {
  children: React.ReactNode,
  justifyContent?: string,
  alignItems?: string,
  fullWidth?: boolean,
  fullHeight?: boolean,
  onClick?: () => void
}

const Flex: React.FC<IProps> = ({ children, justifyContent = 'left', alignItems = 'top', fullWidth, fullHeight, onClick }: IProps) => {
  const classes = [
    style.dFlex,
    style[`justifyContent${capitalize(justifyContent)}`],
    style[`alignItems${capitalize(alignItems)}`],
    fullWidth ? style.fullWidth : '',
    fullHeight ? style.fullHeight : ''
  ].join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Flex;
