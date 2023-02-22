import React from "react";
import style from "./footer.module.scss";
import SvgNewLogotype from "icons/NewLogotype";

import linkedinLogo from "images/linkedin.svg";
import mediumLogo from "images/medium.svg";
import telegramLogo from "images/telegram.svg";
import twitterLogo from "images/twitter.svg";
import githubLogo from "images/github.svg";
import { NavLink } from "../HeaderMenuLanding/HeaderMenuLanding";
import { Link } from "react-router-dom";

type Navigation = Array<{ title: string; links: NavLink[] }>;

const Footer = () => {
  const menuItemsArr: Navigation = [
    {
      title: "COMPANY",
      links: [
        {
          name: "About the Company",
          href: "/about/",
          isRouterLink: true,
        },
        {
          name: "Ecosystem",
          href: "/ecosystem",
          isRouterLink: true,
        },
        {
          name: "Careers",
          href: "http://jobs.coldstack.io",
        },
      ],
    },
    {
      title: "SERVICES",
      links: [
        { name: "Dashboard", href: "/dashboard/", isRouterLink: true },
        { name: "Cross-Chain Bridge", href: "/bridge/" },
        { name: "Solutions", href: "/solutions/", isRouterLink: true },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        {
          name: "Pricing",
          href: "/pricing/",
          isRouterLink: true,
        },
        {
          name: "Data Migration",
          href: "/migration/",
          isRouterLink: true,
        },
        {
          name: "Docs",
          href: "https://docs.coldstack.io/",
        },
      ],
    },
    {
      title: "LEGAL",
      links: [
        {
          name: "Terms of Service",
          href: "/terms-and-conditions/",
          isRouterLink: true,
        },
        {
          name: "Acceptable Use Policy",
          href: "/aup/",
          isRouterLink: true,
        },
        {
          name: "Service License Agreement",
          href: "/sla/",
          isRouterLink: true,
        },
        {
          name: "Cookie Policy",
          href: "/cookie-policy/",
          isRouterLink: true,
        },
        {
          name: "Privacy Policy",
          href: "/privacy-policy/",
          isRouterLink: true,
        },
      ],
    },
  ];

  const social = [
    {
      icon: linkedinLogo,
      href: "https://www.linkedin.com/company/coldstack",
      name: "linkedin Logo",
    },
    {
      icon: mediumLogo,
      href: "https://medium.com/coldstack",
      name: "medium Logo",
    },
    {
      icon: telegramLogo,
      href: "https://t.me/coldstackio",
      name: "telegram Logo",
    },
    {
      icon: twitterLogo,
      href: "https://twitter.com/coldstack_io",
      name: "twitter Logo",
    },
    {
      icon: githubLogo,
      href: "https://github.com/ColdStack-Network/",
      name: "github Logo",
    },
  ];

  const Menu = () => (
    <div className={style.menuWrapper}>
      {menuItemsArr.map((itemColumn) => (
        <div key={itemColumn.title} className={style.menuColumn}>
          <div className={style.menuTitle}>{itemColumn.title}</div>
          <div className={style.wrapperLinks}>
            {itemColumn.links.map(({ name, href, isRouterLink }) =>
              isRouterLink ? (
                <Link to={href} key={name} className={style.menuLink}>
                  {name}
                </Link>
              ) : (
                <a key={name} href={href} className={style.menuLink}>
                  {name}
                </a>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.logoWrapperDesktop}>
            <a className={style.logo} href="/">
              <SvgNewLogotype />
            </a>
          </div>
          <Menu />
        </div>
        <div className={style.copyrightSocial}>
          <div className={style.logoWrapperMobile}>
            <a className={style.logo} href="/">
              <SvgNewLogotype />
            </a>
          </div>
          <div className={style.copyright}>ColdStack © {new Date().getFullYear()}. All Rights Reserved.</div>
          <div className={style.socialBlock}>
            {social.map((item) => (
              <a key={item.name} target="_blank" href={item.href}>
                <img src={item.icon} alt={item.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
