import React, { useEffect, useState } from "react";
import { ChartStorageUsage } from "../../components/Charts/ChartStorageUsage";
import DashboardCard, { IDashboardCard } from "../../components/UI/DashboardCard/DashboardCard";
import style from "./homePage.module.scss";
import Support from "../../components/UI/Support/Support";
import { useDispatch, useSelector } from "react-redux";
import { getStatisticsHome } from "../../Redux/buckets/Actions/bucketsActions";
import { isFull } from "../../helpers/common";
import Link from "../../components/UI/Link/Link";
import SvgHeadPhones from "../../icons/Headphones";
import { setConnectingWallet } from "../../Redux/account/Actions/accountActions";
import { selectStatisticsHome } from "../../Redux/buckets/Selectors/selectStatisticsHome";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [tabs, setTabs] = useState(-1);

  const setCardClick = (item) => {
    if (item === 0) {
      setTabs(0);
    }
    if (item === 1) {
      setTabs(1);
    }
  };

  useEffect(() => {
    const from = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const to = new Date(new Date().setHours(23, 59));
    dispatch(getStatisticsHome({ from, to }));
    dispatch(setConnectingWallet(""));
  }, [dispatch]);

  const statisticsData = useSelector(selectStatisticsHome);
  const data = [
    {
      title: "Buckets",
      number: statisticsData?.statistics?.Buckets?.Count || 0,
      link: "/dashboard/buckets",
    },
    {
      title: "Files",
      number: statisticsData?.statistics?.Objects?.Count || 0,
      link: "/dashboard/buckets",
    },
    {
      title: "Storage",
      number: statisticsData?.statistics?.UsedStorage?.UsedStorageReadableQuantity || 0,
      numberPostfix: statisticsData?.statistics?.UsedStorage?.UsedStorageReadableUnit || "",
      link: "#analytics",
      setCardClick: setCardClick,
      tabs: 0,
    },
    {
      title: "Bandwidth",
      number: statisticsData?.statistics?.Bandwidth?.BandwidthReadableQuantity || 0,
      numberPostfix: statisticsData?.statistics?.Bandwidth?.BandwidthReadableUnit || "",
      link: "#analytics",
      setCardClick: setCardClick,
      tabs: 1,
    },
  ] as IDashboardCard[];

  return (
    <div className={style.homePageContainer}>
      {isFull(statisticsData) && (
        <>
          <div className={style.cardsRow}>
            {data.map((item) => {
              return (
                <div key={item.title} className={style.wrapCard}>
                  <DashboardCard {...item} />
                </div>
              );
            })}
          </div>

          <Support noClose={false} icon={<SvgHeadPhones />}>
            {" "}
            <React.Fragment>
              {" "}
              If you have any questions,{" "}
              <Link className={style.link} href={"/dashboard/support"}>
                write&nbsp;to&nbsp;support
              </Link>
            </React.Fragment>
          </Support>
        </>
      )}
      <div className={style.chartWrapper}>
        <div id="analytics" className={style.analyticsAnchor} />
        {(isFull(statisticsData?.storageUsageAnalytics?.Records) ||
          isFull(statisticsData?.bandwidthAnalytics?.Records)) && (
          <ChartStorageUsage
            tabsParent={tabs}
            dataBandwidth={statisticsData?.bandwidthAnalytics?.Records}
            dataStorage={statisticsData?.storageUsageAnalytics?.Records}
          />
        )}
      </div>
    </div>
  );
};
export default HomePage;
