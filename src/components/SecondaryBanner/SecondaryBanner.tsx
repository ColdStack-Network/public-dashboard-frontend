import React from "react";
import style from "./secondaryBanner.module.scss";
import HeaderMenuLanding from "containers/LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";

interface ISecondaryBanner {
  title?: string;
  subtitle?: string;
}

const SecondaryBanner: React.FC<ISecondaryBanner> = ({ title, subtitle }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.container}>
          <HeaderMenuLanding />
          <div className={style.headerBanner}>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryBanner;
