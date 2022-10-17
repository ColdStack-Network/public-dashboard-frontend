import React from 'react';
import style from './emptySearchList.module.scss';

interface IProps {
  icon: React.ReactNode,
  noBorder?: boolean,
  children: React.ReactNode | string,
  noButton?: boolean,
  loading?: boolean
}
const EmptySearchList: React.FC<IProps> = ({ icon, noBorder, loading, children }: IProps) => {

  console.log("children_EmptySearchList",children)
  return (
    <div className={style.wrapper} style={noBorder ? { paddingBottom: "0" } : {}}>
      {loading && <div style={{ position: "absolute", height: "100%", width: "100%", background: "white" }} />}
      <div className={`${style.wrapperGradient} ${noBorder && style.noGradient}`}>
        <div className={style.innerBlock}>
          <div>
            <div className={style.icon}>
              {icon}
            </div>
            <div className={style.text}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptySearchList;
