import React from 'react';
import style from './emptyList.module.scss';
import Button from "../UI/Button/Button";

interface IProps {
  onClick: ()=>void;
  textButton: string,
  icon: React.ReactNode,
  noBorder?: boolean,
  children: React.ReactNode | string,
  noButton?: boolean,
  loading?: boolean
}
const EmptyList: React.FC<IProps > = ({onClick, icon, textButton, noBorder, noButton, loading, children}: IProps) => {
  return(
    <div className={style.wrapper} style={noBorder ? {paddingBottom: "0"}:{}}>
     {loading && <div style={{position: "absolute", height: "100%", width: "100%", background: "white"}}/> }
     <div className={`${style.wrapperGradient} ${noBorder && style.noGradient}`}>
        <div className={style.innerBlock}>
          <div>
            <div className={style.icon}>
              {icon}
            </div>
            <div className={style.text}>
              {children}
            </div>
            {!noButton && <div className={style.wrapButton} style={noBorder ? {width: "168px"}:{}}>
              <Button onClickHandler={onClick} color={"primary"} size={noBorder ? "big" : "small"}>{textButton}</Button>
            </div>}
          </div>
        </div>
     </div>
    </div>
  )
}

export default EmptyList;