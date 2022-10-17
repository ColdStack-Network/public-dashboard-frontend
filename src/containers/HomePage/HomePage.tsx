import React, { useEffect, useState } from 'react';
import ChartComponent2 from "../../components/Charts/Chart2";
import DashboardCard, { IDashboardCard } from "../../components/UI/DashboardCard/DashboardCard";
import style from "./homePage.module.scss";
import Support from "../../components/UI/Support/Support";
import { useDispatch, useSelector } from "react-redux";
import { getStatisticsHome } from "../../modules/buckets/actions";
import { TStore } from "../../reducers";
import { isFull } from "../../helpers/common";
import Link from "../../components/UI/Link/Link";
import SvgHeadPhones from "../../icons/Headphones";
import { setConnectingWallet } from "../../Redux/account/Actions/accountActions";

const HomePage: React.FC<any> = () => {

  interface dateType {
    Timestamp: string,
    UsedStorage: string,
    UsedStorageReadable: string,
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
    const toStorage = new Date()
    const fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
    const toBandwidth = new Date()
    dispatch(getStatisticsHome({ fromStorage, toStorage, fromBandwidth, toBandwidth }))
    dispatch(setConnectingWallet(''));
  }, [dispatch]);


  const setCardClick = (item) => {
    if (item === 0) {
      setTabs(0)
    }
    if (item === 1) {
      setTabs(1)
    }
  }

  const statisticsData = useSelector((state: TStore) => state.buckets.statisticsHome);
  const data = [
    {
      title: "Buckets",
      number: statisticsData?.statistics?.Buckets?.Count || 0,
      direction: statisticsData?.statistics?.Buckets?.Arrow === "up" ? true : false,
      link: '/buckets'
    },
    {
      title: "Files",
      number: statisticsData?.statistics?.Objects?.Count || 0,
      direction: statisticsData?.statistics?.Objects?.Arrow === "up" ? true : false,
      link: '/buckets'
    },
    {
      title: "Storage",
      number: statisticsData?.statistics?.UsedStorage?.UsedStorageReadableQuantity || 0,
      numberPostfix: statisticsData?.statistics?.UsedStorage?.UsedStorageReadableUnit || "",
      direction: statisticsData?.statistics?.UsedStorage?.Arrow === "up" ? true : false,
      link: '#analytics',
      setCardClick: setCardClick,
      tabs: 0
    },
    {
      title: "Bandwidth",
      number: statisticsData?.statistics?.Bandwidth?.BandwidthReadableQuantity || 0,
      direction: statisticsData?.statistics?.Bandwidth?.Arrow === "up" ? true : false,
      numberPostfix: statisticsData?.statistics?.Bandwidth?.BandwidthReadableUnit || "",
      link: '#analytics',
      setCardClick: setCardClick,
      tabs: 1
    }
  ] as IDashboardCard[]


  let dataStorageSorted = statisticsData?.storageUsageAnalytics?.Records?.sort(
    (a: dateType, b: dateType) => {
      return new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime();
    }
  );

  // dataStorageSorted?.splice(0, 1);

  // console.log("dataStorage_HomePage", statisticsData?.storageUsageAnalytics?.Records)
  // console.log("bandwidthAnalytics_HomePage", statisticsData?.bandwidthAnalytics?.Records)
  // console.log("dataStorageSorted_HomePage", dataStorageSorted)



  const [tabs, setTabs] = useState(-1)


  return (
    <div className={style.homePageContainer}>
      {isFull(statisticsData) &&
        <>
          <div className={style.cardsRow}>
            {data.map((item) => {
              return <div key={item.title} className={style.wrapCard}><DashboardCard {...item} /></div>
            })}
          </div>

          {/*@ts-ignore*/}
          <Support noClose={false} icon={<SvgHeadPhones />}> <React.Fragment> If you have any questions, <Link className={style.link} href={"/support"}>write&nbsp;to&nbsp;support</Link></React.Fragment></Support>
        </>
      }
      <div className={style.chartWrapper}>
        <div id='analytics' className={style.analyticsAnchor}></div>
        {
          (isFull(statisticsData?.storageUsageAnalytics?.Records) || isFull(statisticsData?.bandwidthAnalytics?.Records)) &&
          <ChartComponent2
            tabsParent={tabs}
            dataBandwidth={statisticsData?.bandwidthAnalytics?.Records}
            dataStorage={statisticsData?.storageUsageAnalytics?.Records} />
        }
      </div>
      {/* {
          <ChartComponent2
            dataBandwidth={statisticsData?.bandwidthAnalytics?.Records}
            dataStorage={statisticsData?.storageUsageAnalytics?.Records}/>
        }*/}
    </div>
  )
}
export default HomePage;
