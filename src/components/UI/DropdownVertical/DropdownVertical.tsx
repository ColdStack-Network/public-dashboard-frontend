import React, {useEffect, useMemo, useRef, useState} from 'react';
import style from './dropdownVertical.module.scss';
import VerticalAlt from "../../../icons/VerticalAlt";

export interface dropItem{
  icon: React.ReactNode,
  text: string,
  isAccent?: boolean,
  onClick: ()=>void,
  section: 1 | 2
}

interface IProps {
  dropdowns:  dropItem [],
  top: number
}
const DropdownVertical: React.FC<IProps > = ({dropdowns, top}: IProps) => {

  const [open, setOpen] = useState(false);

  const dropRef = useRef(null as any);
  const dropPanelRef = useRef(null as any);

  const handleClick = (e)=>{
    if (dropRef && dropRef?.current){
      if (!dropPanelRef?.current?.contains(e.target) && !dropRef?.current?.contains(e.target)){
        setOpen(false);
      }
    }
  }
  useEffect(()=>{
    document.addEventListener("click", handleClick)
    return ()=>{ document.removeEventListener("click", handleClick)}
  },[])


  const dropdownList = useMemo(()=>{
    return <div className={style.dropdown} ref={dropPanelRef} style={{top: `${top}px`}}>
      <div className={style.section}>
        {dropdowns && dropdowns.map((item, i, arr)=>{
          if (i>0 && item.section !== arr[i-1].section){
            return <React.Fragment>
              <div className={style.border}/>
              <div className={style.item} onClick={item.onClick}>
                <div className={style.icon}>{item.icon}</div>
                <div className={`${style.text} ${item.isAccent ? style.textAccent : ""}`}>{item.text}</div>
              </div>
            </React.Fragment>
          } else{
            return  <div className={style.item} onClick={item.onClick}>
              <div className={style.icon}>{item.icon}</div>
              <div className={`${style.text} ${item.isAccent ? style.textAccent : ""}`}>{item.text}</div>
            </div>
          }
        })}
      </div>
    </div>
  }, [dropdowns, top])

  return(
    <div className={style.container} onClick={()=>{setOpen((prev)=>!prev)}}>
      <div className={style.iconMain} ref={dropRef}>
        <VerticalAlt active={open}/>
      </div>
      {open && dropdownList}
    </div>
  )
}
export default DropdownVertical