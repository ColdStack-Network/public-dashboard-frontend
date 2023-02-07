import React, { useEffect, useMemo, useState } from "react";
import style from "./layout.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import { ISidebarBlock } from "../Sidebar/types";
import Home from "../../icons/Home";
import Layers from "../../icons/Layers";
import Key from "../../icons/Key";
import SvgWalletAlt from "../../icons/Wallet_alt";
import SvgSettingAltLine from "../../icons/Setting_alt_line";
import SvgQuestion from "../../icons/Question";
import { Header } from "../Header/Header";
import SvgLogotype from "../../icons/Logotype";
import SvgBucketIcon from "../../icons/Bucket";
import { useDispatch, useSelector } from "react-redux";
import { isFull, usePrevious } from "../../helpers/common";
import { CommonErrorModal } from "../UI/Modal/CommonErrorModal/CommonErrorModal";
import { clearCommonErrors } from "../../Redux/user/Actions/userActions";
import { selectErrors, selectSkipCommonErr } from "../../Redux/user/Selectors/selectErrors";
import clsx from "clsx";
import { LottoBanner } from "containers/LandingPage/Partials/HeaderMenuLanding/partials/LottoBanner";
import { useLocation } from "react-router-dom";
import { StakingSvg } from "icons/StakingSvg";
import { AppConfig } from "config";

const IS_DEV = !AppConfig.isProd;

const NO_LAYOUT_PATH = [
  "",
  "/",
  "/ecosystem",
  "/ecosystem/",
  "/terms-and-conditions",
  "/terms-and-conditions/",
  "/acceptable-use-policy",
  "/acceptable-use-policy/",
  "/service-level-agreement/",
  "/service-level-agreement",
  "/aup/",
  "/aup",
  "/sla/",
  "/sla",
  "/cookie-policy/",
  "/cookie-policy",
  "/privacy-policy",
  "/privacy-policy/",
  "/migration/",
  "/migration",
  "/pricing/",
  "/pricing",
  "/lotto/",
  "/lotto",
  "/about",
  "/about/",
  "/solutions/",
  "/solutions",
];

interface IProps {
  children: React.ReactNode;
  isAuthorized: boolean;
}

const data = [
  {
    title: "Overview",
    items: [
      {
        text: "Dashboard",
        link: "/dashboard/",
        icon: <Home />,
      },
    ],
  },
  {
    title: "Data Access",
    items: [
      {
        text: "Buckets",
        link: "/dashboard/buckets",
        icon: <SvgBucketIcon />,
      },
      {
        text: "Storage Classes",
        link: "/dashboard/storageClasses",
        icon: <Layers />,
      },
      {
        text: "Access Keys",
        link: "/dashboard/accesskeys",
        icon: <Key />,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        text: "Settings",
        link: "/dashboard/settings",
        icon: <SvgSettingAltLine />,
      },
      {
        text: "Billing",
        link: "/dashboard/billing",
        icon: <SvgWalletAlt color={"light"} />,
      },
      {
        text: "Staking",
        link: "/dashboard/staking",
        icon: <StakingSvg color="#CCD2E3" />,
      },
      {
        text: "Support",
        link: "/dashboard/support",
        icon: <SvgQuestion />,
      },
    ],
  },
] as ISidebarBlock[];

const Layout: React.FC<IProps> = ({ children, isAuthorized }: IProps) => {
  const [collapsedDesktop, setCollapsedDesktop] = useState(false);
  const [collapsedMobile, setCollapsedMobile] = useState(true);
  const [width, setWidth] = useState(320);
  const [modalErr, setModalErr] = useState(false);
  const errors = useSelector(selectErrors);
  const forceSkipErr = useSelector(selectSkipCommonErr);
  const prevErrors = usePrevious(errors);
  const isCollapsed = useMemo(
    () => (width >= 1440 ? collapsedDesktop : collapsedMobile),
    [width, collapsedDesktop, collapsedMobile]
  );
  const { pathname } = useLocation();
  const menuItems = IS_DEV ? data : data.map((x) => ({ ...x, items: x.items.filter((i) => !i.devOnly) }));

  const onClickMenu = () => {
    if (width >= 1440) {
      return setCollapsedDesktop((prev) => !prev);
    }
    setCollapsedMobile((prev) => !prev);
  };
  const collapseMobileClickItem = () => setCollapsedMobile(true);
  const dispatch = useDispatch();
  const onCloseError = () => {
    setModalErr(false);
    dispatch(clearCommonErrors());
  };

  useEffect(() => {
    if (prevErrors !== errors && isFull(errors) && !modalErr && !forceSkipErr) {
      setModalErr(true);
    }
  }, [prevErrors, errors, modalErr, forceSkipErr]);

  useEffect(() => {
    if (modalErr) {
      document.body.classList.add("hiddenError");
    }

    if (!modalErr) {
      document.body.classList.remove("hiddenError");
    }
  }, [modalErr]);
  useEffect(() => {
    const resizeHandler = () => {
      const width = window.innerWidth;
      setWidth(width);
    };

    window.addEventListener("resize", resizeHandler);
    resizeHandler();

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const layoutLoggedIn = (
    <div className={style.layout}>
      <div
        className={`${style.sidebarWrap} ${collapsedDesktop ? style.sidebarWrapCollapsed : ""}  ${
          collapsedMobile ? style.sidebarWrapCollapsedMobile : ""
        } ${style.sidebarWrapCollapsedTablet}`}
      >
        <Sidebar
          collapseMobileClickItem={collapseMobileClickItem}
          data={menuItems}
          isCollapsedDesktop={collapsedDesktop}
          isCollapsedMobile={collapsedMobile}
          closeMobile={() => {
            setCollapsedMobile(true);
          }}
        />
      </div>
      <div
        className={clsx(style.rightWrap, collapsedDesktop && style.rightWrapCollapsed, style.rightWrapCollapsedTablet)}
      >
        <Header onClickMenu={onClickMenu} isCollapsed={isCollapsed} />
        <div className={style.rightPart}>
          <div className={style.content}>{children}</div>
        </div>
      </div>
    </div>
  );

  const layoutAuth = (
    <div className={style.layoutAuth}>
      <a href="https://coldstack.io" className={style.sidebarAuth}>
        <SvgLogotype color="white" />
      </a>
      <div className={style.rightAuth}>
        <a href="https://coldstack.io" className={style.mobileLogo}>
          <SvgLogotype color="#0053F1" />
        </a>
        <div className={style.contentAuth}>{children}</div>
      </div>
    </div>
  );

  return (
    <div>
      {NO_LAYOUT_PATH.includes(pathname) ? (
        <>
          {children}
        </>
      ) : isAuthorized ? (
        layoutLoggedIn
      ) : (
        layoutAuth
      )}
      <CommonErrorModal visible={modalErr} errors={errors} onClose={onCloseError} />
    </div>
  );
};

export default Layout;
