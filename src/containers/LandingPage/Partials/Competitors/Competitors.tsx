import React from "react";
import style from "./competitors.module.scss";
import Title from "components/UI/Title/Title";
import clsx from "clsx";
import ochain from "images/0chain Text Logo1.svg";
import arweave from "images/arweave.svg";
import crust from "images/crust.svg";
import filecoin from "images/filecoin.svg";
import sia from "images/sia.svg";
import storj from "images/storj.svg";
import stratos from "images/Stratos 1.svg";
import bittorent from "images/bittorent.svg";
import ButtonOval from "components/UI/ButtonOval/ButtonOval";
import SubtitleText from "components/UI/SubtitleText/SubtitleText";
import PLanding from "../../../../components/UI/PLanding/PLanding";

const Competitors = () => {
  const AllBrands = () => {
    return (
      <>
        <div className={style.animaItem}>
          <img className={style.image} src={ochain} alt="ochain" />
        </div>
        <div className={style.animaItem}>
          <img className={style.image} src={arweave} alt="arweave" />
        </div>
        <div className={style.animaItem}>
          <img className={style.image} src={crust} alt="crust" />
        </div>
        <div className={style.animaItem}>
          <img className={style.image} src={filecoin} alt="filecoin" />
        </div>
        <div className={style.animaItem}>
          <img className={style.image} src={sia} alt="sia" />
        </div>
        <div className={style.animaItem}>
          <img className={style.image} src={storj} alt="storj" />
        </div>
        <div className={style.animaItem}>
          <img className={style.image} src={stratos} alt="stratos" />
        </div>
        <div className={style.animaItem}>
          <img className={style.image} src={bittorent} alt="bittorent" />
        </div>
      </>
    );
  };

  return (
    <div className={clsx("competitors", style.wrapper)}>
      <div className={style.textWrapper}>
        <Title textAlign="center" type="h2">
          ColdStack — the fastest way to store
          <br />
          all your data in the cloud
        </Title>
        <PLanding textAlign="center">
          Data storage privacy — all data is encrypted at the time of writing to storage
        </PLanding>
        <div className={style.subtitleText}>
          <SubtitleText textalign="center">
            Data storage privacy — all data is encrypted at the time of writing to storage
          </SubtitleText>
        </div>
      </div>
      <div className={style.wrapperSlider}>
        <div className={style.anima}>
          <AllBrands />
          <AllBrands />
          <AllBrands />
          <AllBrands />
          <AllBrands />
          <AllBrands />
        </div>
      </div>
      <div className={style.buttonWrapper}>
        <ButtonOval href="https://coldstack.io/auth/" color="green" text="Get Started" size="medium" />
      </div>
    </div>
  );
};

export default Competitors;
