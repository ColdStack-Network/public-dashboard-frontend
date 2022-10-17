import React, {useEffect, useMemo, useState} from 'react';
import style from './layout.module.scss';
import Sidebar from "../Sidebar/Sidebar";
import {ISidebarBlock} from "../Sidebar/types";
import Home from "../../icons/Home";
import Layers from "../../icons/Layers";
import Key from "../../icons/Key";
import SvgWalletAlt from "../../icons/Wallet_alt";
import SvgSettingAltLine from "../../icons/Setting_alt_line";
import SvgQuestion from "../../icons/Question";
import Header from "../Header/Header";
import SvgLogotype from "../../icons/Logotype";
import SvgBucketIcon from "../../icons/Bucket";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "../../reducers";
import {isFull, usePrevious} from "../../helpers/common";
import CommonErrorModal from "../UI/Modal/CommonErrorModal/CommonErrorModal";
import {clearCommonErrors} from "../../modules/user/actions";

interface IProps {
  children: React.ReactNode,
  isAuthorized: boolean
}
const data=[
  {
    title: "Overview",
    items: [
      {
        text: "Dashboard",
        link: "/",
        icon: <Home/>
      },
    ]
  },
  {
    title: "Data Access",
    items: [
      {
        text: "Buckets",
        link: "/buckets",
        icon: <SvgBucketIcon/>
      },
      {
        text: "Storage Classes",
        link: "/storageClasses",
        icon: <Layers/>
      },
      {
        text: "Access Keys",
        link: "/accesskeys",
        icon: <Key/>
      },
    ]
  },
  {
    title: "Account",
    items: [
      {
        text: "Settings",
        link: "/settings",
        icon: <SvgSettingAltLine/>
      },
      {
        text: "Billing",
        link: "/billing",
        icon: <SvgWalletAlt color={"light"}/>
      },
      {
        text: "Support",
        link: "/support",
        icon: <SvgQuestion/>
      },
    ]
  }
] as  ISidebarBlock[];

const Layout: React.FC<IProps> = ({ children, isAuthorized }: IProps) => {

  const [collapsedDesktop, setCollapsedDesktop] = useState(false);
  const [collapsedMobile, setCollapsedMobile] = useState(true);

  const [width, setWidth] = useState(320);

  const resizeHandler = ()=>{
    const width = window.innerWidth;
    setWidth(width);
  }

  useEffect(()=>{
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
  }, [])
/*
  useEffect(()=>{

    if (width < 1440 && width > 767 && !a){
     //setA(true);
   }
    if (prevWidth > 767 && width <= 767){
     // setA(false);
    }
  }, [width, a])*/


  const onClickMenu = ()=>{
    console.log("onClickMenu", width);
    if (width >= 1440) {
      setCollapsedDesktop((prev) => !prev)
    }else{
      setCollapsedMobile((prev) => !prev);
    }
  }



  const isCollapsed = useMemo(()=>{
    if (width >= 1440) {
      return collapsedDesktop
    }else{
      return collapsedMobile
    }
  },[width, collapsedDesktop, collapsedMobile]);

  const collapseMobileClickItem = () => {
    setCollapsedMobile(true)
  }

  const [modalErr, setModalErr] = useState(false);
  const errors = useSelector((state: TStore)=>state.user.commonErrors);
  const prevErrors=usePrevious(errors);
  useEffect(()=>{
    if(prevErrors !== errors && isFull(errors) && !modalErr){
      setModalErr(true)
    }
  },[prevErrors, errors, modalErr])

  useEffect(()=>{
    if(modalErr ) {
       document.body.classList.add('hiddenError');
     }

     if(!modalErr) {
       document.body.classList.remove('hiddenError');
     }
  },[modalErr])

  const dispatch = useDispatch();
  const onCloseError=()=>{
    setModalErr(false);
    dispatch(clearCommonErrors());
  }

  const layoutLoggedIn = <div className={style.layout}>
      <div className={`${style.sidebarWrap} ${collapsedDesktop? style.sidebarWrapCollapsed : ""}  ${collapsedMobile? style.sidebarWrapCollapsedMobile : ""} ${style.sidebarWrapCollapsedTablet}`}>
        <Sidebar collapseMobileClickItem={collapseMobileClickItem} data={data} isCollapsedDesktop={collapsedDesktop} isCollapsedMobile={collapsedMobile} closeMobile={()=>{setCollapsedMobile(true)}}/>

      </div>

      <div className={`${style.rightWrap} ${collapsedDesktop ? style.rightWrapCollapsed : ""} ${style.rightWrapCollapsedTablet}`}>
        <Header onClickMenu={onClickMenu} isCollapsed={isCollapsed}/>
        <div className={style.rightPart}>
          <div className={style.content}>
            {children}
          </div>
        </div>
      </div>
    </div>

  const layoutAuth =  <div className={style.layoutAuth}>
     <a href='https://coldstack.io'
        className={style.sidebarAuth}>
       <SvgLogotype color={"white"}/>
     </a>
     <div className={style.rightAuth}>
       <a href='https://coldstack.io'
          className={style.mobileLogo}>
         <SvgLogotype color={"#0053F1"}/>
       </a>
       <div className={style.contentAuth}>
         {children}
       </div>
      </div>
    </div>;

  return( <div>
    {isAuthorized ? layoutLoggedIn :
    layoutAuth}
    <CommonErrorModal visible={modalErr} errors={errors} onClose={onCloseError}/>
  </div> )

}

export default Layout;
