import React from 'react';
import style from './sidebar.module.scss';
import {ISidebarBlock} from "./types"
import SidebarItem from "./SidebarItem";
import SvgLogotype from "../../icons/Logotype";
import LogotypeSmall from "../../icons/LogotypeSmall";
import SvgCloseIcon from "../../icons/Close";
import { Link } from 'react-router-dom'

interface IProps {
  data: ISidebarBlock[],
  isCollapsedDesktop: boolean,
  isCollapsedMobile: boolean,
  closeMobile: ()=>void,
  collapseMobileClickItem: ()=>void
}
const Sidebar: React.FC<IProps> = ({data, isCollapsedDesktop, isCollapsedMobile, closeMobile, collapseMobileClickItem}: IProps) => {
  return(
    <React.Fragment>
      {/*desktop menu*/}
      <div className={ `${style.sidebar}  ${isCollapsedDesktop ? style.sidebarCollapsedDesktop : ""} ${style.sidebarCollapsedTablet} `}>
        <Link to={'/'} className={`${style.logotype} ${isCollapsedDesktop ? style.logotypeCollapsed : style.mobileCommon}`}>
          <LogotypeSmall />
        </Link>
        <Link to={'/'} className={`${style.logotype} ${isCollapsedDesktop ? "" : style.logotypeCommon}`}>
           <SvgLogotype/>
        </Link>
        <div className={style.items}>
          {data.map((block)=>{
            return <div key={block.title}>
              <div className={`${style.titleBlock} ${isCollapsedDesktop ? style.titleBlockCollapsedDesktop : ""} ${style.titleBlockCollapsedTablet}`} >{block.title}</div>
              {block.items.map((item)=>{
                return <div key={item.text} onClick={() =>collapseMobileClickItem()}>
                  <SidebarItem {...item} isCollapsed={isCollapsedDesktop}/>
                </div>
              })}
            </div>
          })}
        </div>
      </div>
      {/*tablet menu*/}
      <div className={ `${style.sidebar} ${style.sidebarTablet} ${style.sidebarCollapsedTablet} `}>
        <Link to={'/'} className={`${style.logotype}`} style={{display: "block"}}>
          <LogotypeSmall />
        </Link>
        <div className={style.mobileMenuClose} onClick={closeMobile}>
          <SvgCloseIcon color={"#CCD2E3"}/>
        </div>
        <div className={style.items}>
          {data.map((block)=>{
            return <div key={block.title}>
              <div className={`${style.titleBlock} ${isCollapsedDesktop ? style.titleBlockCollapsedDesktop : ""} ${style.titleBlockCollapsedTablet}`} >{block.title}</div>
              {block.items.map((item)=>{
                return <SidebarItem key={item.text} {...item} isCollapsed={true}/>
              })}
            </div>
          })}
        </div>
      </div>
      {/*mobile menu*/}
      <div className={ `${style.sidebar} ${style.sidebarMobile}  ${isCollapsedMobile ? style.sidebarCollapsedMobile : ""} `}>
        <div className={`${style.logotype}`} style={{display: "block"}}>
          <LogotypeSmall />
        </div>
        <div className={style.mobileMenuClose} onClick={collapseMobileClickItem}>
          <SvgCloseIcon color={"#CCD2E3"}/>
        </div>
        <div className={style.items}>
          {data.map((block)=>{
            return <div key={block.title}>
              <div className={`${style.titleBlock} ${isCollapsedMobile ? style.titleBlockCollapsedMobile : ""}`} >{block.title}</div>
              {block.items.map((item)=>{
                return <SidebarItem key={item.text} {...item} isCollapsed={isCollapsedMobile}/>
              })}
            </div>
          })}
        </div>
      </div>
    </React.Fragment>
  )

}

export default Sidebar;
