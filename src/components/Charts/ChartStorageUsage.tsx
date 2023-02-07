//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import style from "./charts.module.scss";
import { formatBytes, isFull, voidCallback } from "../../helpers/common";
import EmptyList from "../EmptyList/EmptyList";
import SvgChart from "../../icons/Chart";
import { useDispatch } from "react-redux";
import { getStatisticsHome } from "../../Redux/buckets/Actions/bucketsActions";
import DayPickerRange from "./DayPickerRange/DayPickerRange";
import { Statistics } from "models/Statistics";
import { BandwidthAnalyticsRecord, StorageUsageAnalyticsRecord } from "models/Analytics";
import { subMonths, subYears } from "date-fns";
import { NullAble } from "helpers/ts-helpers";
import clsx from "clsx";

type DateAxis = am4charts.DateAxis<am4charts.AxisRenderer>;
export type GetStatisticsCallBack = {
  (data: {
    statistics: Statistics;
    bandwidthAnalytics: { Records: BandwidthAnalyticsRecord[] };
    storageUsageAnalytics: { Records: StorageUsageAnalyticsRecord[] };
  }): void;
};

function am4themes_myTheme(target: am4core.ITheme) {
  if (target instanceof am4core.ColorSet) {
    target.list = [am4core.color("#AABAF2")];
  }
}

function am4themes_myThemeColumns(target: am4core.ITheme) {
  if (target instanceof am4core.ColorSet) {
    target.list = [am4core.color("#678EDC"), am4core.color("#1FCF90")];
  }
}

export const ChartStorageUsage: React.FC<{
  tabsParent: number;
  dataBandwidth: BandwidthAnalyticsRecord[];
  dataStorage: StorageUsageAnalyticsRecord[];
}> = ({ dataStorage, dataBandwidth, tabsParent = 0 }) => {
  const today = new Date();
  const [tabsParentStage, setTabsParentStage] = useState<NullAble<number>>();
  const [tabs, _setTabs] = useState(0);
  const [chart1, _setChart1] = useState<NullAble<am4charts.XYChart>>(null);
  const [chart2, _setChart2] = useState<NullAble<am4charts.XYChart>>(null);
  const [dateAxis1, _setDateAxis1] = useState<NullAble<DateAxis>>(null);
  const [dateAxis2, _setDateAxis2] = useState<NullAble<DateAxis>>(null);
  const [fromTo, setFromTo] = useState({
    fromInput: subMonths(today, 1),
    toInput: today,
  });
  const dataStorageVisible = dataStorage?.filter((item) => item.UsedStorage > 0);
  const dataBandwidthVisible = dataBandwidth?.filter((item) => item.DownloadBandwidth > 0 || item.UploadBandwidth > 0);

  const dateAxis2Ref = useRef(dateAxis2);
  const chart1Ref = useRef(chart1);
  const chart2Ref = useRef(chart2);
  const tabsRef = useRef(tabs);
  const dateAxis1Ref = useRef(dateAxis1);
  const ref1 = React.createRef<DayPickerRange>();
  const ref2 = React.createRef<DayPickerRange>();
  const dispatch = useDispatch();

  const setTabs = (data: number) => {
    // for chart1 inside eventListener to be actual
    tabsRef.current = data;
    _setTabs(data);
  };
  const setChart1 = (data: am4charts.XYChart) => {
    // for chart1 inside eventListener to be actual
    chart1Ref.current = data;
    _setChart1(data);
  };
  const setChart2 = (data: am4charts.XYChart) => {
    // for chart1 inside eventListener to be actual
    chart2Ref.current = data;
    _setChart2(data);
  };
  const setDateAxis1 = (data: DateAxis) => {
    // for dateAxis1 inside eventListener to be actual
    dateAxis1Ref.current = data;
    _setDateAxis1(data);
  };
  const setDateAxis2 = (data: DateAxis) => {
    // for dateAxis1 inside eventListener to be actual
    dateAxis2Ref.current = data;
    _setDateAxis2(data);
  };
  const customizeGrip = (grip: am4core.ResizeButton) => {
    grip.background.fill = am4core.color("#AABAF2");
    grip.background.disabled = true;
    const img = grip.createChild(am4core.Circle);
    img.width = 23;
    img.height = 23;
    img.fill = am4core.color("#AABAF2");
    img.align = "center";
    img.valign = "middle";

    const line = grip.createChild(am4core.Rectangle);
    line.height = 60;
    line.width = 2;
    line.fill = am4core.color("#AABAF2");
    line.align = "center";
    line.valign = "middle";
  };

  const listenerButtons = (n: number, unit: "month" | "year" | "max") => {
    return () => {
      let from: NullAble<Date>;
      let to: NullAble<Date>;

      if (unit === "month") {
        from = subMonths(today, n);
        to = today;
      }
      if (unit === "year") {
        from = subYears(today, n);
        to = today;
      }
      if (unit === "max") {
        from = undefined;
        to = undefined;
      }

      setFromTo({ fromInput: from, toInput: to });
    };
  };
  const handleFromChange = (from: Date) => setFromTo((prev) => ({ ...prev, fromInput: from }));
  const handleToChange = (to: Date) => setFromTo((prev) => ({ ...prev, toInput: to }));

  useEffect(() => {
    const from = fromTo?.fromInput;
    const to = fromTo?.toInput;
    const MIN_YEAR = 2019;
    try {
      if (from.getFullYear() > MIN_YEAR && from <= to) {
        dispatch(getStatisticsHome({ from, to }));
      }
    } catch (err) {
      console.error(err);
    }
  }, [fromTo, dispatch]);
  useEffect(() => {
    if (tabs === 1 && isFull(dataBandwidth)) {
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_myThemeColumns);

      // Create chart instance
      const chart2 = am4core.create("chartdiv", am4charts.XYChart);
      chart2.zoomOutButton.disabled = true;
      chart2.paddingTop = 0;
      chart2.paddingBottom = "24px";
      chart2.paddingLeft = "24px";
      chart2.paddingRight = "24px";
      chart2.data = dataBandwidth;
      chart2.cursor = new am4charts.XYCursor();
      const dateAxis2 = chart2.xAxes.push(new am4charts.DateAxis());
      dateAxis2.baseInterval = {
        timeUnit: "day",
        count: 1,
      };
      dateAxis2.tooltipDateFormat = "d MMMM";
      dateAxis2.start = 0;
      dateAxis2.keepSelection = true;
      dateAxis2.groupData = false;
      dateAxis2.renderer.labels.template.fill = am4core.color("#5A5D65");
      dateAxis2.renderer.labels.template.location = 0.5;
      dateAxis2.cursorTooltipEnabled = false;
      setDateAxis2(dateAxis2);
      const valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.renderer.inside = true;
      valueAxis2.calculateTotals = true;
      valueAxis2.renderer.labels.template.fill = am4core.color("#5A5D65");
      valueAxis2.cursorTooltipEnabled = false;
      valueAxis2.renderer.grid.template.location = 0.5;
      valueAxis2.renderer.labels.template.dy = -10;
      valueAxis2.renderer.maxLabelPosition = 0.9;
      valueAxis2.min = 0;
      valueAxis2.renderer.labels.template.adapter.add("text", (label, target, key) => {
        if (label) {
          let num = label;
          num = num.replace(/,/g, "");
          num = +num;
          return formatBytes(num);
        }
        return label;
      });

      function createSeries(field, fieldReadable, name, round) {
        // Set up series
        const series = chart2.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.valueYReadable = fieldReadable;
        series.dataFields.dateX = "Date";
        series.name = name;
        series.tooltipHTML = `<table><tr><td>{name}: </td><td>{valueYReadable}</td></tr></table>`;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#ffffff");
        series.tooltip.autoTextColor = false;
        series.tooltip.label.fill = am4core.color("#333333");
        series.tooltip.background.stroke = am4core.color("#D9E1FF");
        series.tooltip.background.strokeWidth = 1;
        series.strokeWidth = 2;
        series.tensionX = 0.95;
        series.tensionY = 0.95;
        series.stacked = true;
        series.fillOpacity = 0.2;
        const labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.locationY = 0.5;
        labelBullet.label.hideOversized = true;
        return series;
      }
      const series2 = createSeries("DownloadBandwidth", "DownloadBandwidthReadable", "Download bandwidth", false);
      const series3 = createSeries("UploadBandwidth", "TotalBandwidthReadable", "Total bandwidth", false);
      const scrollbar2 = new am4charts.XYChartScrollbar();
      chart2.scrollbarX = scrollbar2;
      chart2.scrollbarX.series.push(series2);
      chart2.scrollbarX.series.push(series3);
      chart2.scrollbarX.background.fill = am4core.color("#F3F6FF");
      chart2.scrollbarX.background.fillOpacity = 1;
      chart2.scrollbarX.unselectedOverlay.fill = am4core.color("#FBFCFF");
      chart2.scrollbarX.unselectedOverlay.fillOpacity = 0.7;
      chart2.scrollbarX.scrollbarChart.plotContainer.filters.clear();
      chart2.scrollbarX.parent = chart2.topAxesContainer;
      chart2.topAxesContainer.marginBottom = "36px";
      // Legend
      chart2.legend = new am4charts.Legend();
      customizeGrip(chart2.scrollbarX.startGrip);
      customizeGrip(chart2.scrollbarX.endGrip);
      const scrollAxis = chart2.scrollbarX.scrollbarChart.xAxes.getIndex(0);
      scrollAxis.renderer.grid.template.disabled = true;
      const scrollSeries2 = chart2.scrollbarX.scrollbarChart.series.getIndex(0);
      scrollSeries2.fillOpacity = 0;
      setChart2(chart2);
    }

    if (tabs === 0 && isFull(dataStorage)) {
      /* Chart code */
      // Themes begin
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_myTheme);
      // Themes end
      /* --------------------------------------------------------------------------------------------------------------------------*/

      // Create chart
      const chart = am4core.create("chartdiv2", am4charts.XYChart);
      chart.data = dataStorage;
      chart.plotContainer.background.fill = am4core.color("#ffffff");
      chart.plotContainer.background.fillOpacity = 1;
      chart.paddingTop = 0;
      chart.paddingBottom = "24px";
      chart.paddingLeft = "24px";
      chart.paddingRight = "24px";
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.baseInterval = {
        timeUnit: "day",
        count: 1,
      };
      dateAxis.tooltipDateFormat = "d MMMM";
      dateAxis.start = 0;
      dateAxis.keepSelection = true;
      dateAxis.groupData = false;
      dateAxis.renderer.labels.template.fill = am4core.color("#5A5D65");
      dateAxis.renderer.labels.template.location = 0.5;
      dateAxis.renderer.minLabelPosition = 0.03;
      dateAxis.renderer.maxLabelPosition = 0.98;
      dateAxis.cursorTooltipEnabled = false;
      setDateAxis1(dateAxis);
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.grid.template.location = 0.5;
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.fill = am4core.color("#5A5D65");
      valueAxis.renderer.labels.template.dy = -10;
      valueAxis.renderer.maxLabelPosition = 0.9;
      valueAxis.renderer.labels.template.adapter.add("text", (label, target, key) => {
        if (label) {
          let num = label;
          num = num.replace(/,/g, "");
          num = +num;
          return formatBytes(num);
        }
        return label;
      });
      valueAxis.cursorTooltipEnabled = false;
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "Timestamp";
      series.dataFields.valueY = "UsedStorage";
      series.dataFields.valueYReadable = "UsedStorageReadable";
      series.tooltipHTML = `<table><tr><td>{valueYReadable}</td></tr></table>`;
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color("#ffffff");
      series.tooltip.autoTextColor = false;
      series.tooltip.label.fill = am4core.color("#333333");
      series.tooltip.background.stroke = am4core.color("#D9E1FF");
      series.tooltip.background.strokeWidth = 1;
      series.fillOpacity = 0.3;
      series.tensionX = 0.95;
      series.tensionY = 0.95;
      series.color = am4core.color("#AABAF2");
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.opacity = 0;
      chart.cursor.marginBottom = "20px";
      const scrollbar1 = new am4charts.XYChartScrollbar();
      chart.scrollbarX = scrollbar1;
      chart.scrollbarX.series.push(series);
      chart.scrollbarX.background.fill = am4core.color("#F3F6FF");
      chart.scrollbarX.background.fillOpacity = 1;
      chart.scrollbarX.scrollbarChart.plotContainer.filters.clear();
      chart.scrollbarX.unselectedOverlay.fill = am4core.color("#FBFCFF");
      chart.scrollbarX.unselectedOverlay.fillOpacity = 0.7;
      customizeGrip(chart.scrollbarX.startGrip);
      customizeGrip(chart.scrollbarX.endGrip);
      chart.scrollbarX.parent = chart.topAxesContainer;
      chart.topAxesContainer.marginBottom = "36px";
      const scrollSeries1 = chart.scrollbarX.scrollbarChart.series.getIndex(0);
      scrollSeries1.fillOpacity = 0;
      const scrollAxis1 = chart.scrollbarX.scrollbarChart.xAxes.getIndex(0);
      scrollAxis1.renderer.grid.template.disabled = true;
      chart.zoomOutButton.disabled = true;
      setChart1(chart);
      /* ---------------------------------------END-----------------------------------------------------------------------------------*/
    }
    // eslint-disable-next-line
  }, [tabs, dataStorage, dataBandwidth]);
  useEffect(() => {
    console.log("tabsParent", tabsParent);
    setTabsParentStage(tabsParent);
  }, [tabsParent]);

  useEffect(() => {
    setTimeout(() => {
      if (tabsParentStage > -1) {
        _setTabs(tabsParentStage);
      }
    }, 500);
  }, [tabsParentStage]);

  return (
    <div className={style.block}>
      <div className={style.headerBlockTabsTitleRow}>
        <div className={style.headerBlockTabs}>Analytics</div>
        <div className={style.tabs}>
          <div
            className={clsx(style.tab, tabs === 0 && style.tabActive)}
            onClick={() => {
              setTabs(0);
              setTabsParentStage(0);
            }}
          >
            Storage
          </div>
          <div
            className={clsx(style.tab, tabs === 1 && style.tabActive)}
            onClick={() => {
              setTabs(1);
              setTabsParentStage(1);
            }}
          >
            Bandwidth
          </div>
        </div>
      </div>

      <div style={{ display: tabs === 0 ? "block" : "none" }}>
        <div style={{ width: "100%" }} className={style.controls}>
          <div className={style.inputsRow}>
            <DayPickerRange
              classNameFrom="fromfield"
              classNameTo="tofield"
              handleFromChange={handleFromChange}
              handleToChange={handleToChange}
              from={fromTo?.fromInput}
              to={fromTo?.toInput}
              ref={ref1}
            />
          </div>

          <div className={style.buttons}>
            <button onClick={listenerButtons(1, "month")} id="b1m" className={style.chartButton}>
              1&nbsp;M
            </button>
            <button onClick={listenerButtons(3, "month")} id="b3m" className={style.chartButton}>
              3&nbsp;M
            </button>
            <button onClick={listenerButtons(6, "month")} id="b6m" className={style.chartButton}>
              6&nbsp;M
            </button>
            <button onClick={listenerButtons(1, "year")} id="b1y" className={style.chartButton}>
              1&nbsp;Y
            </button>
            <button onClick={listenerButtons(1, "max")} id="bmax" className={style.chartButton}>
              MAX
            </button>
          </div>
        </div>

        {(!isFull(dataStorage) || dataStorageVisible?.length === 0) && (
          <EmptyList onClick={voidCallback} textButton="" noBorder={true} noButton={true} icon={<SvgChart />}>
            You don't have the data yet
          </EmptyList>
        )}

        {isFull(dataStorage) && dataStorageVisible?.length > 0 && (
          <div className={style.chartWrap}>
            <div id="chartdiv2" className={style.chartStorageContainer} />
          </div>
        )}
      </div>

      <div style={{ display: tabs === 1 ? "block" : "none" }}>
        <div className={style.controls}>
          <div className={style.inputsRow}>
            <DayPickerRange
              classNameFrom="fromfield2"
              classNameTo="tofield2"
              handleFromChange={handleFromChange}
              handleToChange={handleToChange}
              from={fromTo?.fromInput}
              to={fromTo?.toInput}
              ref={ref2}
            />
          </div>
          <div className={style.buttons}>
            <button onClick={listenerButtons(1, "month")} id="b1m2" className={style.chartButton}>
              1&nbsp;M
            </button>
            <button onClick={listenerButtons(3, "month")} id="b3m2" className={style.chartButton}>
              3&nbsp;M
            </button>
            <button onClick={listenerButtons(6, "month")} id="b6m2" className={style.chartButton}>
              6&nbsp;M
            </button>
            <button onClick={listenerButtons(1, "year")} id="b1y2" className={style.chartButton}>
              1&nbsp;Y
            </button>
            <button onClick={listenerButtons(1, "max")} id="bmax2" className={style.chartButton}>
              MAX
            </button>
          </div>
        </div>

        {(!isFull(dataBandwidth) || dataBandwidthVisible?.length === 0) && (
          <EmptyList onClick={voidCallback} textButton="" noBorder={true} noButton={true} icon={<SvgChart />}>
            You don't have the data yet
          </EmptyList>
        )}

        {isFull(dataBandwidth) && dataBandwidthVisible?.length > 0 && (
          <div className={clsx(style.chartWrap, style.chartWrap2)} style={{ background: "white" }}>
            <div id="chartdiv" className={style.chartStorageContainer} />
          </div>
        )}
      </div>
    </div>
  );
};
