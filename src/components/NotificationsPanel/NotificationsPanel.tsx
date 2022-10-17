import style from "./notificationsPanel.module.scss";
import React, {useCallback} from "react";
import {INotificationsItem} from "./types";
import {SvgArrowRight} from "../../icons/ArrowsLeftRight";
import {useHistory} from 'react-router-dom';
import {formatDateTransactions, isFull} from "../../helpers/common";

export const NotificationsPanel = ({items, dropRef, close })=>{
  const history = useHistory();
  const onClick = useCallback(()=>{
    close();
    history.push("/notifications")
  }, [close, history])
  return (
    <div className={style.dropdownPanel} ref={dropRef}>
      {isFull(items) && items.map(({title, createdAt, readAt, id})=>{
        return <NotificationsItem key={createdAt} text={title} onClick={()=>{history.push(`/notifications?id=${id}`); close();}} isNew={!readAt} date={createdAt} />
      })}
      {isFull(items) ?
      <div className={style.seeAllContainer} onClick={onClick}>
        <div className={style.seeAllText}>See all notifications</div>
        <SvgArrowRight color={"secondary"}/>
      </div> : <div className={style.emptyNotifications}>
          You Don't Have Any Notifications Yet
        </div>
      }
    </div>
  )
}

const NotificationsItem = (item: INotificationsItem)=>{
  const {date, isNew, text, onClick} = item;
  return(
      <div onClick={onClick} className={`${style.itemNotification} ${isNew ? style.itemNotificationOpen : ""}`}>
        <div className={style.itemTopRow}>
          <div className={style.itemLeft}>
            <div className={style.itemDate}>{formatDateTransactions(date)}</div>
            {isNew && <div className={style.itemLabel}><LabelNotification text={"new"}/></div> }
          </div>
          <div className={style.itemArrow}>
            <SvgArrowRight color={"main"}/>
          </div>
        </div>
        <div className={style.itemText}>{text}</div>

      </div>
  )
}

export const LabelNotification = ({text})=>{
  return <div className={style.labelNotification}>
    {text}
  </div>
}
