import React from "react";
import style from "./majorPartnersIntegrations.module.scss";
import ankr from "images/ankr.svg";
import bittorent from "images/bittorent2.svg";
import chainlink from "images/Chainlink.svg";
import akash from "images/Akash.svg";
import Waves from "../Waves/Waves";
import clsx from "clsx";
import Title from "components/UI/Title/Title";

const MajorPartnersIntegrations = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <Title textAlign="center" type="h2">
          Major Partners and Integrations
        </Title>

        <div className={clsx(style.wrapperCard)}>
          <div className={style.cardItem}>
            <div className={style.imageWrapper}>
              <img className={style.image} src={ankr} alt="ankr" />
            </div>
          </div>
          <div className={style.cardItem}>
            <div className={style.imageWrapper}>
              <img className={style.image} src={bittorent} alt="bittorent" />
            </div>
          </div>
          <div className={style.cardItem}>
            <div className={style.imageWrapper}>
              <img className={style.image} src={chainlink} alt="chainlink" />
            </div>
          </div>
          <div className={style.cardItem}>
            <div className={style.imageWrapper}>
              <img className={style.image} src={akash} alt="akash" />
            </div>
          </div>
        </div>
      </div>
      <Waves />
    </div>
  );
};

export default MajorPartnersIntegrations;
