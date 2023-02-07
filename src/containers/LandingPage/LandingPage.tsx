import React, { useMemo } from "react";
import style from "./landingPage.module.scss";
import HeaderMenuLanding from "./Partials/HeaderMenuLanding/HeaderMenuLanding";
import FirstBanner from "./Partials/FirstBanner/FirstBanner";
import Bullets from "./Partials/Bullets/Bullets";
import GeneralParameters from "./Partials/GeneralParameters/GeneralParameters";
import clsx from "clsx";
import MajorPartnersIntegrations from "./Partials/MajorPartnersIntegrations/MajorPartnersIntegrations";
import Reviews from "./Partials/Reviews/Reviews";
import Competitors from "./Partials/Competitors/Competitors";
import Footer from "./Partials/Footer/Footer";
import Calculator from "./Partials/Calculator/Calculator";
import { useDispatch, useSelector } from "react-redux";
import { getPriceLanding } from "../../Redux/account/Actions/accountActions";
import { selectPriceLanding } from "../../Redux/account/Selectors/selectPriceLanding";
import MetaTags from "react-meta-tags";
import SvgWalletBullet from "icons/WalletBullet";
import SvgAmazonBullet from "icons/AmazonBullet";
import SvgShieldBullet from "icons/shieldBullet";
import SvgEqualizerBullet from "icons/EqualizerBullet";
import SvgPrivateBullet from "icons/PrivateBullet";
import SvgCloudBullet from "icons/CloudBullet";

const LandingPage = () => {
  const dispatch = useDispatch();
  const price = useSelector(selectPriceLanding);
  useMemo(() => dispatch(getPriceLanding()), [dispatch]);

  const bullets = [
    {
      icon: <SvgWalletBullet />,
      title: "Affordable",
      subtitle: "The best price guaranteed: AI-based storage optimizer",
    },
    {
      icon: <SvgAmazonBullet />,
      title: "Easy",
      subtitle: "Amazon S3 compatible API with simple, seamless integration",
    },
    {
      icon: <SvgShieldBullet />,
      title: "Secure",
      subtitle: "Files are stored across multiple nodes so they're never lost",
    },
    {
      icon: <SvgEqualizerBullet />,
      title: "Sovereign",
      subtitle: "Storage is controlled by you, not corporations",
    },
    {
      icon: <SvgPrivateBullet />,
      title: "Private",
      subtitle: "All users are anonymous, all data is encrypted",
    },
    {
      icon: <SvgCloudBullet />,
      title: "Limitless",
      subtitle: "The combined capacity of any web3 storage",
    },
  ];

  return (
    <div className={style.wrapper}>
      <MetaTags>
        <title>ColdStack: Web3 Clouds Made Simple</title>
        <meta name="description" content="ColdStack: Web3 Clouds Made Simple" />
      </MetaTags>
      <div className={style.header}>
        <div className={style.container}>
          <HeaderMenuLanding />
        </div>
        <div className={style.containerFluid}>
          <FirstBanner />
        </div>
        <div className={clsx(style.containerFluid, style.backgroundColorWhite, style.paddingBottom)}>
          <div className={style.container}>
            <Bullets bullets={bullets} />
          </div>
          <div className={style.container}>
            <GeneralParameters />
          </div>
        </div>
        <div className={clsx(style.containerFluid, style.backgroundColorWhite, style.paddingBottomMin)}>
          <MajorPartnersIntegrations />
        </div>
        <div className={clsx(style.containerFluid, style.backgroundColorWhite)}>
          <div className={style.container}>
            <Calculator price={price} />
          </div>
        </div>
        <div className={style.containerFluid}>
          <Reviews />
        </div>
        <div className={clsx(style.containerFluid, style.backgroundColorWhite, style.paddingBottom)}>
          <Competitors />
        </div>
        <div className={clsx(style.containerFluid, style.backgroundColorWhite)}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
