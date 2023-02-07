import React, { useState } from "react";
import style from "./ecoSystemPage.module.scss";
import HeaderMenuLanding from "../LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";
import clsx from "clsx";
import Footer from "../LandingPage/Partials/Footer/Footer";
import SearchInput from "../../components/UI/SearchInput/SearchInput";
import { partners } from "./partners";
import { partnerTags } from "./partnerTags";
import layout from "../../components/Layout/layout.module.scss";
import MetaTags from "react-meta-tags";

const EcoSystemPage: React.FC = () => {
  const [val, setVal] = useState("");
  const [activeTag, setTag] = useState("All");
  const getTagsCount = (tag: string) => {
    return tag === "All" ? partners.length : partners.filter((item) => item.tags.includes(tag)).length;
  };

  return (
    <div className={layout.wrapper}>
      <MetaTags>
        <title>ColdStack: Ecosystem</title>
        <meta name="description" content="ColdStack: Ecosystem" />
      </MetaTags>
      <div className={layout.header}>
        <div className={layout.container}>
          <HeaderMenuLanding />
          <div className={layout.headerBanner}>
            <h1>Ecosystem</h1>
            <p>
              We bring together some of the greatest projects in Web3 to help push the boundaries of what this
              technology can enable for humanity. View the decentralized ecosystem of our platform right here.
            </p>
          </div>
        </div>
      </div>
      <div className={style.partners}>
        <div className={layout.container}>
          <div className={style.partnersHeader}>
            <div className={style.partnersHeaderLeft}>
              {partnerTags.map((tag, idx) => (
                <div
                  onClick={() => setTag(tag)}
                  className={clsx(style.partnerTag, tag === activeTag && style.partnerTagActive)}
                >
                  {tag}{" "}
                  <span className={clsx(style.partnerTagCount, tag === activeTag && style.partnerTagCountActive)}>
                    {getTagsCount(tag)}
                  </span>
                </div>
              ))}
            </div>
            <div className={style.partnersHeaderRight}>
              <SearchInput
                onSearch={() => {}}
                onKeyUp={() => {}}
                onChange={(e) => setVal(e.target.value)}
                onClear={() => setVal("")}
                value={val}
              />
            </div>
          </div>
          <div className={style.partnerContainer}>
            {partners
              .filter((item) => item.tags.includes(activeTag) || activeTag === "All")
              .filter((item) => item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
              .map((partner, idx) => (
                <div className={style.partner} key={idx}>
                  <div>{partner.icon}</div>
                  <h4>{partner.name}</h4>
                  <p>
                    {partner.tags.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={clsx(layout.containerFluid, layout.backgroundColorWhite)}>
        <Footer />
      </div>
    </div>
  );
};

export default EcoSystemPage;
