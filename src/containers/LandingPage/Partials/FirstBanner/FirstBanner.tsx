import React, { useEffect, useState } from "react";
import style from "./firstBanner.module.scss";
import ButtonOval from "../../../../components/UI/ButtonOval/ButtonOval";
import Dots4x3 from "../../../../icons/Dots4x3";
import dashboardImg from "images/fullQuality.jpg";
import Waves from "../Waves/Waves";

const FirstBanner = () => {
  //temporarily unused component
  const [width, setWidth] = useState(320);

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
    <>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.leftBlock}>
            <h1 className={style.title}>
              Web3 Clouds
              <br />
              Made Simple
            </h1>
            <div className={style.subtitle}>
              First to Market
              <br />
              Decentralized Storage Aggregator
            </div>
            <div className={style.buttonsBlock}>
              <div className={style.buttonOvalWrapper}>
                <ButtonOval href="https://coldstack.io/auth/" color="green" size="medium" text="Explore the Cloud" />
                <div className={style.wrapperDots12}>
                  <Dots4x3 />
                </div>
              </div>
              {/*temporarily unused component*/}
              {/*{width > 1199 ? <ButtonPlay /> : <></>}*/}
            </div>
          </div>
        </div>
        <div className={style.rightBlock}>
          <img className={style.dashBoardImage} src={dashboardImg} alt="dashboard" />
          {/*temporarily unused component*/}
          {/*{width < 1199 ? (*/}
          {/*  <div className={style.wrapperButtonPlay}>*/}
          {/*    <ButtonPlay />*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  <></>*/}
          {/*)}*/}
        </div>
        <Waves />
      </div>
    </>
  );
};

export default FirstBanner;

//temporarily unused component
const ButtonPlay = () => {
  return (
    <div className={style.contentButtonPlay}>
      <button onClick={() => {}} className={style.buttonPlay}>
        <div className={style.triangle} />
      </button>
    </div>
  );
};
