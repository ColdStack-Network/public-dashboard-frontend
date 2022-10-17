import React from 'react';
import style from "./supportItem.module.scss";
import SvgErrorInput from "../../../icons/ErrorInput";

const SupportItem = ({categoryText, text, date, isRead, isClosed, onClickDelete})=>{
    return(
      <div className={`${style.container}`}>
        <div className={style.left}>
          {/*<div className={style.messageIcon}>
            {isRead && !isClosed? <SvgMessageOpen/> : <SvgMessage/>}
          </div>*/}
          <div className={`${style.label} ${style.labelCategory}`}>{categoryText}</div>
          {/*{!isRead &&
             <div className={`${style.label} ${style.labelNewMessage}`}>New Message</div>
          }*/}
          {isClosed &&
          <div className={`${style.label} ${style.labelClosed}`}>Closed</div>
          }
          <div className={`${style.text}`}>{text}</div>
        </div>
        <div className={style.date}>{date}</div>
        {!isClosed &&
        <div className={style.delete} onClick={onClickDelete}><SvgErrorInput/></div>}
      </div>
    )
}
export default SupportItem;
