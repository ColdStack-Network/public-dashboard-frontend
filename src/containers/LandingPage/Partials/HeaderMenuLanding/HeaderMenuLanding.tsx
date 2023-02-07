import React, { useEffect, useState } from "react";
import style from "./headerMenuLanding.module.scss";
import SvgNewLogotype from "icons/NewLogotype";
import ButtonOval from "components/UI/ButtonOval/ButtonOval";
import SvgCloseIcon from "icons/Close";
import { selectIsAuthorized } from "Redux/user/Selectors/selectIsAuthoraized";
import { useSelector } from "react-redux";
import { WalletMenu } from "components/WalletMenu/WalletMenu";
import { Link } from "react-router-dom";
import miniLogo from "images/coldstackMiniLogo.png";

export type NavLink = {
  name: string;
  href: string;
  isRouterLink?: boolean;
};

const MENU_ITEMS: NavLink[] = [
  {
    name: "Solutions",
    href: "/solutions",
    isRouterLink: true,
  },
  {
    name: "Pricing",
    href: "/pricing",
    isRouterLink: true,
  },
  {
    name: "Docs",
    href: "https://docs.coldstack.io/",
  },
  {
    name: "Company",
    href: "/about",
    isRouterLink: true,
  },
  {
    name: "Bridge",
    href: "/bridge",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    isRouterLink: true,
  },
];

const HeaderMenuLanding = () => {
  const [mobileMenuState, setMobileMenuState] = useState(false);
  const isAuthorized = useSelector(selectIsAuthorized).result;
  const [width, setWidth] = useState(320);

  const openCloseMobileMenu = () => setMobileMenuState((v) => !v);

  useEffect(() => {
    if (mobileMenuState) {
      document.body.classList.add("hidden");
    }

    if (!mobileMenuState) {
      document.body.classList.remove("hidden");
    }
  }, [mobileMenuState]);

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

  return (
    <div className={style.wrapper}>
      <div className={style.leftBlock}>
        <a className={style.logo} href="/">
          <SvgNewLogotype />
        </a>
        <div className={style.menu}>
          {width >= 1200 &&
            MENU_ITEMS.map(({ name, href, isRouterLink }) => {
              return isRouterLink ? (
                <Link key={name} className={style.menuItem} to={href}>
                  {name}
                </Link>
              ) : (
                <a key={name} className={style.menuItem} href={href}>
                  {name}
                </a>
              );
            })}
        </div>
      </div>
      <div className={style.rightBlock}>
        {width > 767 && !isAuthorized && (
          <div className={style.personal}>
            <ButtonOval color="white" size="small" text="Sign In" href={`/auth/?redirect_to=${window.location.href}`} />
          </div>
        )}
        {isAuthorized && <WalletMenu />}
        {width < 1200 && (
          <button onClick={openCloseMobileMenu} className={style.mobileMenuButton}>
            <span className={style.mobileMenuButtonLine} />
            <span className={style.mobileMenuButtonLine} />
            <span className={style.mobileMenuButtonLine} />
          </button>
        )}
        {width < 1200 && mobileMenuState && (
          <div className={style.mobileMenuWrapper}>
            <div className={style.mobileMenu2}>
              <button className={style.closeButton} onClick={() => setMobileMenuState(false)}>
                <SvgCloseIcon width="32" height="32" />
              </button>
              <Link className={style.miniLogo} to="https://coldstack>io">
                <img src={miniLogo} alt="Coldstack" />
              </Link>

              <div className={style.mobileMenu}>
                {MENU_ITEMS.map((item) => (
                  <a key={item.name} className={style.menuItemMobile} href={item.href}>
                    {item.name}
                  </a>
                ))}
                {width < 768 && !isAuthorized && (
                  <div className={style.personal}>
                    <ButtonOval
                      color="white"
                      size="small"
                      text="Sign In"
                      href={`/auth/?redirect_to=${window.location.href}`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderMenuLanding;
