import React, {useCallback, useEffect, useMemo, useState} from 'react';
import style from "../table.module.scss";
import styleCustom from "./tableBuckets.module.scss";
import SvgViewHide from "../../../icons/ViewHide";
import SvgBucketIcon from "../../../icons/Bucket";
import DropdownVertical, {dropItem} from "../../UI/DropdownVertical/DropdownVertical";
import SvgEdit from "../../../icons/Edit";
import SvgTrash from "../../../icons/Trash";
import {IBucketListItem} from "../types";
import { useHistory } from "react-router-dom";
import {formatAccount, formatDate} from "../../../helpers/common";
import {defaultRegion} from "../../../helpers/yandexS3";
import UseWeb3 from "../../../helpers/web3/UseWeb3";

interface IProps {
  data: IBucketListItem [],
  handleRename: (bucket: IBucketListItem)=>void,
  handleDelete: (bucket: IBucketListItem)=>void
}

const TableBuckets: React.FC<IProps > = ({ data, handleRename, handleDelete }: IProps) => {
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

  //console.log("data TableBucket",data)

  return(
    <div className={style.tableWrapper} ref={refContainer}>
      { width ? <div className={style.scroll} style={{maxWidth: width}}>
                 <div className={style.table}>
                    <div className={style.tableHeadRow}>
                      <div className={style.tableHeadItem}></div>
                      <div className={style.tableHeadItem}>Bucket name</div>
                      <div className={style.tableHeadItem}>Owner</div>
                      <div className={style.tableHeadItem}>Region</div>
                      <div className={`${style.tableHeadItem} ${style.tableTdCenter}`}>Files</div>
                      <div className={`${style.tableHeadItem} ${style.tableTdCenter}`}>Access</div>
                      <div className={style.tableHeadItem}>Created on</div>
                      <div className={`${style.tableHeadItem} ${style.tableTdCenter}`}>Actions</div>
                    </div>
                    {data.map((item)=>{
                      return <TableRow item={item}
                                       handleRename={handleRename}
                                       handleDelete={handleDelete}
                               containerCoords={top}
                              />
                    })}
                  </div>
                </div> : ""
      }
    </div>
  )
}

export default TableBuckets;

const TableRow = ({item, containerCoords, handleRename, handleDelete})=>{
  const {account} = UseWeb3();

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
      icon: <SvgEdit color={"light"}/>,
      text: "Rename",
      isAccent: false,
      onClick: ()=>{handleRename(item)},
      section: 1
    },
    {
      icon:  <SvgTrash color={"#CCD2E3"}/>,
      text: "Delete",
      isAccent: true,
      onClick: ()=> {handleDelete(item)},
      section: 1
    },
   /* {
      icon: <SvgView color="common"/>,
      text: "Make Public",
      isAccent: false,
      onClick: ()=> {},
      section: 2
    },
    {
      icon: <SvgViewHide/>,
      text: "Make Private",
      isAccent: false,
      onClick: ()=> {},
      section: 2
    }*/
  ] as dropItem[] },
    //eslint-disable-next-line
    [item, handleRename]);


  const history = useHistory();

  return (
    <div className={style.tableRow} ref={refRow}>
      <div className={`${style.tableTd} ${styleCustom.tableTdBucketIcon}`} style={{width: "84px"}}><SvgBucketIcon/></div>
      <div className={`${style.tableTd} ${styleCustom.tableTdBucketname}`} style={{width: "17%"}}>
        <div className={`${style.cursor} ${style.folder}`} onClick={()=>{history.push(`/buckets/${item.Name}`)}}>{item.Name}</div></div>
      <div className={style.tableTd}  style={{width: "17%"}}>
        {formatAccount(account)}
       {/* {item.owner?.length > 16 ? formatAccount(item.owner) : item.owner}*/}
      </div>
      <div className={style.tableTd} style={{width: "11.5%"}}>{defaultRegion}</div>
      <div className={`${style.tableTd} ${style.tableTdCenter}`} style={{width: "11%"}}>
        {item.ObjectsWithoutFoldersCount}
      </div>
      <div className={`${style.tableTd} ${style.tableTdCenter}`} style={{width: "13%"}}><SvgViewHide/>  {/*<SvgView color={"common"}/>*/} </div>
      <div className={style.tableTd} style={{width: "16%"}}>{formatDate(item.CreationDate)}</div>
      <div className={`${style.tableTd} ${style.tableTdCenter}`} style={{width: "7%"}}><DropdownVertical top={top} dropdowns={dropdowns}/></div>
    </div>
  )
}
