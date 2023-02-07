import React, { useEffect, useMemo, useState } from "react";
import ChartLanding from "../ChartLanding/ChartLanding";
import style from "./calculator.module.scss";
import Title from "components/UI/Title/Title";
import ButtonOval from "../../../../components/UI/ButtonOval/ButtonOval";
import { getTrackBackground, Range } from "react-range";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectPriceLanding } from "../../../../Redux/account/Selectors/selectPriceLanding";
import { data } from "../ChartLanding/ChartLandingData";
import { useLocation } from "react-router-dom";

const Calculator = (price) => {
  const [rangeStored, setRangeStored] = useState([500]);
  const [rangeDownloaded, setRangeDownloaded] = useState([100]);
  const [typeSavedMethod, setTypeSavedMethod] = useState("standard");
  const [coldstack, setColdstack] = useState(0);
  const [amazonS3, setAmazonS3] = useState(0);
  const [googleCloud, setGoogleCloud] = useState(0);
  const [azureStorage, setAzureStorage] = useState(0);
  const priceLanding = useSelector(selectPriceLanding);
  const { pathname } = useLocation();

  useEffect(() => {
    if (Object.keys(priceLanding).length !== 0) {
      if (priceLanding[typeSavedMethod]?.coldstack?.available) {
        let priceColdstackStored = priceLanding[typeSavedMethod].coldstack.storage[0].price;
        let priceColdstackDownload = priceLanding[typeSavedMethod].coldstack.download[0].price;

        if (priceLanding[typeSavedMethod]?.coldstack?.storage.length > 1) {
          for (let i = 0; i < priceLanding[typeSavedMethod]?.coldstack?.storage.length; i++) {
            if (
              priceLanding[typeSavedMethod]?.coldstack?.storage[i].fromTb < rangeStored &&
              priceLanding[typeSavedMethod]?.coldstack?.storage[i].toTb > rangeStored
            ) {
            }
          }
        }
        setColdstack(+rangeStored[0] * priceColdstackStored + rangeDownloaded[0] * priceColdstackDownload);
      } else {
        setColdstack(0);
      }

      if (priceLanding[typeSavedMethod]?.amazonS3?.available) {
        setAmazonS3(
          +rangeStored[0] * priceLanding[typeSavedMethod].amazonS3.storage[0].price +
            +rangeDownloaded[0] * priceLanding[typeSavedMethod].amazonS3.download[0].price
        );
      } else {
        setAmazonS3(0);
      }
      if (priceLanding[typeSavedMethod]?.googleCloud?.available) {
        setGoogleCloud(
          +rangeStored[0] * priceLanding[typeSavedMethod].googleCloud.storage[0].price +
            +rangeDownloaded[0] * priceLanding[typeSavedMethod].googleCloud.download[0].price
        );
      } else {
        setGoogleCloud(0);
      }

      if (priceLanding[typeSavedMethod]?.azureStorage?.available) {
        setAzureStorage(
          +rangeStored[0] * priceLanding[typeSavedMethod].azureStorage.storage[0].price +
            +rangeDownloaded[0] * priceLanding[typeSavedMethod].azureStorage.download[0].price
        );
      } else {
        setAzureStorage(0);
      }
    }
  }, [rangeStored, rangeDownloaded, price, typeSavedMethod]);

  const mobileValues = useMemo(() => {
    return data(coldstack, azureStorage, amazonS3, googleCloud).map((item, idx) => {
      return (
        <div key={idx} className={style.mobileRow}>
          <div className={style.mobileRowLeft}>
            <img className={style.mobileValuesImg} src={item.icon} alt={item.cloud} />
            {item.cloud}
          </div>
          <div
            className={clsx(style.mobileRowRight, item.cloud === "Coldstack" && style.mobileRowRightBig)}
            style={{ color: item.color }}
          >
            ${item.value.toFixed(0)} / yr
          </div>
        </div>
      );
    });
  }, [coldstack, azureStorage, amazonS3, googleCloud]);

  return (
    <div className={style.wrapper}>
      <div className={style.wrapperH2}>
        <Title textAlign="center" type="h2">
          Compare cloud storage costs
        </Title>
      </div>

      <div className={style.calculator}>
        <div className={style.rangesBlock}>
          <div className={clsx(style.storedRangeBlock, style.range)}>
            <div className={style.rangeTitle}>Total Data Stored</div>
            <div className={style.rangeValue}>{rangeStored} TB</div>
            <Range
              step={1}
              min={1}
              max={1024}
              values={rangeStored}
              onChange={(values) => setRangeStored(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    borderRadius: "3px",
                    background: getTrackBackground({
                      values: rangeStored,
                      colors: ["#0053F1", "#E6E9F2"],
                      min: 1,
                      max: 1024,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "24px",
                    width: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    border: "6px solid #0053F1",
                    outline: "none",
                    top: 0,
                  }}
                />
              )}
            />
            <div className={style.minMaxWrapper}>
              <div className={style.min}>1 TB</div>
              <div className={style.max}>1 PB</div>
            </div>
          </div>
          <div className={clsx(style.downloadedRangeBlock, style.range)}>
            <div className={style.rangeTitle}>Monthly Downloaded Data</div>
            <div className={style.rangeValue}>{rangeDownloaded} TB</div>
            <Range
              step={1}
              min={0}
              max={1024}
              values={rangeDownloaded}
              onChange={(values) => setRangeDownloaded(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    borderRadius: "3px",
                    background: getTrackBackground({
                      values: rangeDownloaded,
                      colors: ["#0053F1", "#E6E9F2"],
                      min: 0,
                      max: 1024,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "24px",
                    width: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    border: "6px solid #0053F1",
                    outline: "none",
                    top: 0,
                  }}
                />
              )}
            />
            <div className={style.minMaxWrapper}>
              <div className={style.min}>0 TB</div>
              <div className={style.max}>1 PB</div>
            </div>
          </div>
        </div>
        <div className={style.chartWrapper}>
          <ChartLanding azure={azureStorage} coldstack={coldstack} amazon={amazonS3} google={googleCloud} />
        </div>
        <div className={style.wrapperSubtitles}>{mobileValues}</div>
      </div>
      <div className={style.secondaryTextWrapper}>
        <div className={style.secondaryText}>
          Every scenario is a little different, and this calculator uses competitive providers’ published rates for high
          storage tiers in low cost regions — results viewed here are estimates which may vary.
        </div>
      </div>
      <div className={style.buttonsBlock}>
        <ButtonOval href="/migration/" size="big" color="blue" text="Need help with migration?" reactRouterNav />
        <ButtonOval href="/auth/" size="big" color="white" text="Get Started" reactRouterNav />
      </div>
    </div>
  );
};

export default Calculator;
