import React, {useCallback, useEffect, useMemo, useState} from 'react';
import style from "../table.module.scss";
import DropdownVertical, {dropItem} from "../../UI/DropdownVertical/DropdownVertical";
import SvgTrash from "../../../icons/Trash";
import {IAccessKeyListItem} from "../types";
import {SvgLock, SvgUnLock} from "../../../icons/LockUnlock";
import SvgKey from "../../../icons/Key";
import {formatAccount, formatDate} from "../../../helpers/common";

interface IProps {
  data: IAccessKeyListItem [],
  handleDelete: (key: IAccessKeyListItem)=>void,
  showKey: (item: IAccessKeyListItem)=>void,
  changeStatusKey: (payload: any)=>void
}


const TableAccessKeys: React.FC<IProps > = ({ data, handleDelete, showKey, changeStatusKey }: IProps) => {
  const [width, setWidth] = useState(null as null | number | string);
  const [top, setTop] = useState(0);

  const refContainer = useCallback(node => {
    if (node !== null) {
      setTop(
        node.getBoundingClientRect().top);
    }
  }, []);

  const resizeHandler = ()=>{
    const w = window.innerWidth;
    if (w < 1440 && w >= 768) {
      setWidth(w - 80 - 50);
    }else if (w < 768){
      setWidth(w - 30);
    }
    else{
      setWidth("100%")
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return(
    <div className={style.tableWrapper} ref={refContainer}>
      { width ? <div className={style.scroll} style={{maxWidth: width}}>
        <div className={style.table}>
          <div className={style.tableHeadRow}>
            <div className={style.tableHeadItem}/>
            <div className={style.tableHeadItem}>User</div>
            <div className={style.tableHeadItem}>Key</div>
            <div className={style.tableHeadItem}>Status</div>
            <div className={style.tableHeadItem}>Created on</div>
            <div className={`${style.tableHeadItem} ${style.tableTdCenter}`}>Actions</div>
          </div>
          {data.map((item)=>{
            return <TableRow item={item}
                             handleDelete={handleDelete}
                             containerCoords={top}
                             showKey={()=>{showKey(item)}}
                             changeStatusKey={changeStatusKey}
            />
          })}
        </div>
      </div> : ""
      }
    </div>
  )
}

export default TableAccessKeys;

const TableRow = ({item, containerCoords, handleDelete, showKey, changeStatusKey})=>{

  const [top, setTop] = useState(0);

  const refRow = useCallback(node => {
    if (node !== null) {
      setTop(
        node.getBoundingClientRect().bottom - containerCoords);
    }
  }, [containerCoords]);

  const dropdowns = useMemo(
    ()=>{return [
     {
        icon: <SvgTrash color={"#CCD2E3"}/>,
        text: "Delete",
        isAccent: true,
        onClick: ()=> {handleDelete(item)},
        section: 1
      },
      {
        icon: <SvgLock/>,
        text: "Activated",
        isAccent: false,
        onClick: ()=> {changeStatusKey({key: item, status: true})},
        section: 2
      },
      {
        icon: <SvgUnLock/>,
        text: "Deactivated",
        isAccent: false,
        onClick: ()=> {changeStatusKey({key: item, status: false})},
        section: 2
      }
    ] as dropItem[] },
    //eslint-disable-next-line
    [item]);

  return (
    <div className={style.tableRow} ref={refRow}>
      <div className={style.tableTd} style={{width: "84px"}}><SvgKey/></div>
      <div className={style.tableTd}  style={{width: "17%"}}><div className={style.cursor} onClick={()=>{}}>0x{formatAccount(item.userId)}</div></div>
      <div className={`${style.tableTd} ${style.accessKey_key} ${style.cursor}`} style={{width: "35.5%"}} onClick={showKey}>{item.id}</div>
      <div className={`${style.tableTd} ${item.active === true ? style.accessKey_status_active : style.accessKey_status_inactive}`} style={{width: "17%"}}>
        {item.active === true ? "Active" : "Inactive"}</div>
      <div className={style.tableTd} style={{width: "25%"}}>{formatDate(item.createdAt)}</div>
      <div className={`${style.tableTd} ${style.tableTdCenter}`}><DropdownVertical top={top} dropdowns={dropdowns}/></div>
    </div>
  )
}
