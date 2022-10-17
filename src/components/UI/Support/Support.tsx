import React, {useCallback, useState} from 'react';
import style from "./support.module.scss";
import SvgCloseIcon from "../../../icons/Close";

const Support = ({children, noClose, icon})=>{
  const [show, setShow] = useState(true);
  const close = useCallback(()=>{setShow(false)}, []);
  if (show) {
    return(
      <div className={style.container}>
        <div className={style.left}>
          <div className={style.icon}>
            {icon}
          </div>
          <div className={style.text}>
            {children}
          </div>
        </div>
        {!noClose &&
        <div className={style.close} onClick={close}>
            <SvgCloseIcon/>
        </div>
        }

      </div>
    )
  }else{
    return null;
  }
}
export default Support;