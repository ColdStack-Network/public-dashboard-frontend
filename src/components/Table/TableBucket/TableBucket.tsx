import React, {useCallback, useEffect, useState} from 'react';
import style from "../table.module.scss";
import SvgView from "../../../icons/View";
import SvgViewHide from "../../../icons/ViewHide";
import DropdownVertical, {dropItem} from "../../UI/DropdownVertical/DropdownVertical";
import {iconsFiles} from "../types";
import Checkbox from "../../UI/Checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import {formatDate, uriEncode} from "../../../helpers/common";

interface IProps {
  data: any,
  generateDropdowns: (props: any)=>dropItem[],
  selectedItems: any[],
  onSelect: any,
  onSelectAll: any,
  allSelected,
  beforeLink: ()=>void
}

const TableBucket: React.FC<IProps > = ({ data, generateDropdowns, selectedItems, onSelect, onSelectAll, allSelected, beforeLink }: IProps) => {
  // console.log("data====",data);
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
      setWidth(w - 41);
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
                      <div className={style.tableHeadItem}>
                        <div style={{width: "24px"}}>
                          <Checkbox checked={allSelected} onChange={onSelectAll} name={"checkAllFiles"} id={"checkAllFiles"}/>
                        </div>
                      </div>
                      <div className={style.tableHeadItem}>File name</div>
                      <div className={style.tableHeadItem}>Type</div>
                      <div className={style.tableHeadItem}>Storage Classes</div>
                      <div className={`${style.tableHeadItem} ${style.tableTdCenter}`}>Access</div>
                      <div className={`${style.tableHeadItem}`}>Size</div>
                      <div className={style.tableHeadItem}>Last Modified</div>
                      <div className={`${style.tableHeadItem} ${style.tableTdCenter}`}>Actions</div>
                    </div>
                    {data && data.map((item)=>{
                      return <TableRow item={item}
                                       beforeLink={beforeLink}
                               containerCoords={top}
                               checked={selectedItems.findIndex(elem=>elem.name === item?.Key) > -1}
                               onCheck={onSelect}
                               dropdowns={generateDropdowns({file: item, type: item.FileType === "folder" ? "folder" : "file"})}
                              />
                    })}
                  </div>
                </div> : ""
      }
    </div>
  )
}

export default TableBucket;

const TableRow = ({item, containerCoords, checked, onCheck, dropdowns, beforeLink})=>{

  // console.log("item TableRow", item);
  const [top, setTop] = useState(0);
  const refRow = useCallback(node => {
    if (node !== null) {
      setTop(
        node.getBoundingClientRect().bottom - containerCoords);
    }
  }, [containerCoords]);

  const history = useHistory();

  return (
    <div className={style.tableRow} ref={refRow}>
      <div className={style.tableTd} style={{width: "84px"}}>
        <Checkbox checked={checked}
                  onChange={onCheck(item.Key, item?.FileType === "folder" ? "folder" : "file")}
                  name={item.Key}
                  id={item.Key}/>
      </div>
      <div className={style.tableTd}  style={{width: "17%"}}>
        <div className={`${style.cursor} ${item.FileType === "folder" ? style.folder : ""}`}
             onClick={()=>{
               beforeLink();
               if (item.FileType === "folder") {
                 //console.log("item.linkFolder", item.linkFolder, "item.Key", item.Key);
                 // history.push(`${uriEncode(item.linkFolder)}/${uriEncode(item.Key, false)}`)
                 // history.push(`${item.linkFolder}/${uriEncode(item.Key, false)}`)
                 //history.push(`${item.linkFolder}/${uriEncode(item.Key, false)}`)
                 history.push(`${uriEncode(item.linkFolder, false)}/${uriEncode(item.Key, false)}`)
               }else{
                //  history.push(`${uriEncode(item.linkFolder, false)}?file=${uriEncode(item.Key)}`)
                 //history.push(`${item.linkFolder?.replace("%", "%25")}?file=${uriEncode(item.Key)}`)
                 history.push(`${uriEncode(item.linkFolder, false)}?file=${uriEncode(item.Key)}`)
               }
               /*if (item.FileType === "folder") {
                 //console.log("item.linkFolder", item.linkFolder, "item.Key", item.Key);
                 history.push(`${uriEncode(item.linkFolder, false)}/${uriEncode(item.Key)}`)
               }else{
                 history.push(`${uriEncode(item.linkFolder)}?file=${uriEncode(item.Key)}`)
               }*/
               /*if (item.FileType === "folder") {
                 //console.log("item.linkFolder", item.linkFolder, "item.Key", item.Key);
                 history.push(`${encodeURIComponent(item.linkFolder)}/${uriEncode(item.Key, false)}`)
               }else{
                 history.push(`${encodeURIComponent(item.linkFolder)}?file=${uriEncode(item.Key, false)}`)
               }*/
             }}>
               {/*{decodeURIComponent(item.Key)}*/}
               {item.Key}
        </div>
      </div>
      <div className={style.tableTd} style={{width: "9%"}}>{iconsFiles[item.FileType]}</div>
      <div className={style.tableTd} style={{width: "14%"}}>{item.StorageClassReadable || <div style={{paddingLeft: "50px"}}>-</div>}</div>
      <div className={`${style.tableTd} ${style.tableTdCenter}`}  style={{width: "14.5%"}}>
        {item.ACL === "private" ? <SvgViewHide/> : (item.ACL === "public-read" ? <SvgView color="common"/> : "-")}
      </div>
      <div className={`${style.tableTd}`}  style={{width: "10%"}}>{item.SizeReadable}</div>
      <div className={style.tableTd}  style={{width: "20%"}}>{item.LastModified ? formatDate(item.LastModified) : ""}</div>
      <div className={`${style.tableTd} ${style.tableTdCenter}`}><DropdownVertical top={top} dropdowns={dropdowns}/></div>
    </div>
  )
}
