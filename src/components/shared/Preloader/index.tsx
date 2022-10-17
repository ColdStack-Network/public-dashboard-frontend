import React from 'react';
import style from './style.module.scss';

interface IProps {
  children: React.ReactNode;
  effect?: string;
  label?: React.ReactNode | string;
  showSpinner?: boolean;
  className?: string;
}

const Preloader: React.FC<IProps> = ({ children, effect = 'blur', label = 'loading...', showSpinner, className }: IProps) => {
  return (
    <div className={`${style.container} ${className}`}>
      {
        showSpinner ? (
          <div className={style.labelWrapper}>
            {label}
          </div>
        ) : null
      }
      <div className={showSpinner ? `${style[`effect${effect}`]}` : ''}>
        {children}
      </div>
    </div>
  )
}

export default Preloader;
