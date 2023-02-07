import React from "react";
import style from "./dashboardCard.module.scss";
import SvgVerticalAlt from "../../../icons/VerticalAlt";
import { Link } from "react-router-dom";
import SvgBucketIcon from "../../../icons/Bucket";
import SvgStorage from "../../../icons/Storage";
import SvgBandwidth from "../../../icons/Bandwidth";
import SvgFile from "../../../icons/File";

export interface IDashboardCard {
  title: string;
  number: number;
  numberPostfix?: string;
  link: string;
  setCardClick: (item: number) => void;
  tabs: number;
}

const DashboardCard: React.FC<IDashboardCard> = ({
  title,
  number,
  numberPostfix,
  link,
  setCardClick,
  tabs,
}: IDashboardCard) => {
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.titleCardRow}>
          <div className={style.title}>{title}</div>
          {link === "/dashboard/buckets" && (
            <Link to={link}>
              <SvgVerticalAlt />
            </Link>
          )}
          {link === "#analytics" && (
            <a href={link} onClick={() => setCardClick(tabs)}>
              <SvgVerticalAlt />
            </a>
          )}
        </div>
        <div className={style.bottomRow}>
          <div className={style.number}>
            <div className={style.numberValue}>{number}</div>
            {numberPostfix && <div className={style.numberPostfix}>{numberPostfix}</div>}
          </div>
          <div className={style.arrow}>
            {title === "Files" && <SvgFile />}
            {title === "Buckets" && <SvgBucketIcon color="#1FCF90" />}
            {title === "Storage" && <SvgStorage />}
            {title === "Bandwidth" && <SvgBandwidth />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
