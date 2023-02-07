//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import style from "./charts.module.scss";
import { isFull, voidCallback } from "../../../helpers/common";
import EmptyList from "../../../components/EmptyList/EmptyList";
import SvgChart from "../../../icons/Chart";
import { ChartAlt, Chart, Box } from "../../../icons/BillingChartIcons";
import { useDispatch } from "react-redux";
import DayPickerRange from "../DayPickerRange/DayPickerRange";
import { getBillingData } from "../../../Redux/account/Actions/accountActions";
import clsx from "clsx";
import { NullAble } from "helpers/ts-helpers";
import { subMonths, subYears, setMinutes, setHours } from "date-fns";
import { IBalanceHistory, ITrafficSpending, IStorageSpending } from "actions/interfaces";

const setDayTime = (date: Date, hours: number, minutes: number) => {
  return setMinutes(setHours(date, hours), minutes);
};

enum UnitEnum {
  month = "month",
  year = "year",
  max = "max",
}

type ChartItem = {
  Timestamp: Date;
  UsedStorage: number;
  UsedStorageReadable: number;
};

type DateAxis = am4charts.DateAxis<am4charts.AxisRenderer>;
function am4themes_myTheme(target: am4core.ITheme) {
  if (target instanceof am4core.ColorSet) {
    target.list = [am4core.color("#AABAF2")];
  }
}

export const ChartBilling: React.FC<{
  billingTotal: IBalanceHistory[];
  billingStorage: ITrafficSpending[];
  billingBandwidth: IStorageSpending[];
}> = ({ billingTotal, billingStorage, billingBandwidth }) => {
  const today = new Date();
  const [dateAxis1, _setDateAxis1] = useState<NullAble<DateAxis>>(null);
  const [dateAxis2, _setDateAxis2] = useState<NullAble<DateAxis>>(null);
  const [dateAxis3, _setDateAxis3] = useState<NullAble<DateAxis>>(null);
  const [chart1, _setChart1] = useState<NullAble<am4charts.XYChart>>(null);
  const [chart2, _setChart2] = useState<NullAble<am4charts.XYChart>>(null);
  const [chart3, _setChart3] = useState<NullAble<am4charts.XYChart>>(null);
  const [tabs, _setTabs] = useState(0);
  const [fromTo, setFromTo] = useState({
    fromInput: subMonths(today, 1),
    toInput: today,
  });
  const tabsRef = useRef(tabs);
  const chart1Ref = useRef(chart1);
  const chart2Ref = useRef(chart2);
  const chart3Ref = useRef(chart3);
  const dateAxis1Ref = useRef(dateAxis1);
  const dateAxis2Ref = useRef(dateAxis2);
  const dateAxis3Ref = useRef(dateAxis3);
  const ref1 = React.createRef<DayPickerRange>();
  const ref2 = React.createRef<DayPickerRange>();
  const ref3 = React.createRef<DayPickerRange>();

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
  const setChart3 = (data: am4charts.XYChart) => {
    // for chart1 inside eventListener to be actual
    chart3Ref.current = data;
    _setChart3(data);
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
  const setDateAxis3 = (data: DateAxis) => {
    // for dateAxis1 inside eventListener to be actual
    dateAxis3Ref.current = data;
    _setDateAxis3(data);
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
  const generateChartData = (array: IBalanceHistory[]) => {
    const chartData: ChartItem[] = [];
    const arrayLength = array?.length;

    // current date
    const firstDate = new Date(new Date().setHours(23, 59));
    // now set 50 days back
    firstDate.setDate(firstDate.getDate() - arrayLength);

    array?.forEach((element) => {
      chartData.push({
        Timestamp: new Date(element.date),
        UsedStorage: element.amount,
        UsedStorageReadable: `${parseInt(element.amount * 10000) / 10000} CLS`,
      });
    });
    return chartData;
  };

  const listenerButtons = (n: number, unit: UnitEnum) => {
    return () => {
      let from: NullAble<Date>;
      let to: NullAble<Date>;

      if (unit === UnitEnum.month) {
        from = setDayTime(subMonths(today, n), 0, 1);
        to = setDayTime(today, 23, 59);
      }
      if (unit === UnitEnum.year) {
        from = setDayTime(subYears(today, n), 0, 1);
        to = setDayTime(today, 23, 59);
      }
      if (unit === UnitEnum.max) {
        from = undefined;
        to = undefined;
      }
      setFromTo({ fromInput: from, toInput: to });
      dispatch(getBillingData({ from, to }));
    };
  };
  const handleFromChange = (from: Date) => setFromTo((prev) => ({ ...prev, fromInput: from }));
  const handleToChange = (to: Date) => setFromTo((prev) => ({ ...prev, toInput: to }));

  useEffect(() => {
    const fromFieldDate = fromTo?.fromInput;
    const toFieldDate = fromTo?.toInput;
    const MIN_YEAR = 2019;
    try {
      if (fromfieldDate.getFullYear() > MIN_YEAR && fromfieldDate <= tofieldDate) {
        dispatch(getBillingData({ fromFieldDate, toFieldDate }));
      }
    } catch (err) {}
  }, [fromTo, dispatch]);
  useEffect(() => {
    if (tabs === 0 && billingTotal) {
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_myTheme);

      const chart = am4core.create("chartdiv1", am4charts.XYChart);
      chart.data = generateChartData(billingTotal);
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
      dateAxis.groupData = true;
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
          return parseInt(num * 100) / 100 + " CLS";
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
      series.tensionX = 0.77;
      series.color = am4core.color("#AABAF2");
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.opacity = 0;
      chart.cursor.marginBottom = "20px";
      chart.scrollbarX = new am4charts.XYChartScrollbar();
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
      // scrollAxis1.renderer.labels.template.disabled = true;
      scrollAxis1.renderer.grid.template.disabled = true;
      chart.zoomOutButton.disabled = true;
      setChart1(chart);
      /* ---------------------------------------END-----------------------------------------------------------------------------------*/
    }

    if (tabs === 1 && billingStorage) {
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_myTheme);

      /* --------------------------------------------------------------------------------------------------------------------------*/
      const chart2 = am4core.create("chartdiv2", am4charts.XYChart);
      chart2.data = generateChartData(billingStorage);
      chart2.plotContainer.background.fill = am4core.color("#ffffff");
      chart2.plotContainer.background.fillOpacity = 1;
      chart2.paddingTop = 0;
      chart2.paddingBottom = "24px";
      chart2.paddingLeft = "24px";
      chart2.paddingRight = "24px";
      const dateAxis2 = chart2.xAxes.push(new am4charts.DateAxis());
      dateAxis2.baseInterval = {
        timeUnit: "day",
        count: 1,
      };
      dateAxis2.tooltipDateFormat = "d MMMM";
      dateAxis2.start = 0;
      dateAxis2.keepSelection = true;
      dateAxis2.groupData = true;
      dateAxis2.renderer.labels.template.fill = am4core.color("#5A5D65");
      dateAxis2.renderer.labels.template.location = 0.5;
      dateAxis2.renderer.minLabelPosition = 0.03;
      dateAxis2.renderer.maxLabelPosition = 0.98;
      dateAxis2.cursorTooltipEnabled = false;
      setDateAxis2(dateAxis2);
      const valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.tooltip.disabled = true;
      valueAxis2.renderer.grid.template.location = 0.5;
      valueAxis2.renderer.inside = true;
      valueAxis2.renderer.labels.template.fill = am4core.color("#5A5D65");
      valueAxis2.renderer.labels.template.dy = -10;
      valueAxis2.renderer.maxLabelPosition = 0.9;
      valueAxis2.renderer.labels.template.adapter.add("text", (label, target, key) => {
        if (label) {
          let num = label;
          //num = num.replaceAll(",", "");
          num = num.replace(/,/g, "");
          num = +num;
          return parseInt(num * 100) / 100 + " CLS";
        }
        return label;
      });
      valueAxis2.cursorTooltipEnabled = false;
      const series2 = chart2.series.push(new am4charts.LineSeries());
      series2.dataFields.dateX = "Timestamp";
      series2.dataFields.valueY = "UsedStorage";
      series2.dataFields.valueYReadable = "UsedStorageReadable";
      series2.tooltipHTML = `<table><tr><td>{valueYReadable}</td></tr></table>`;
      series2.tooltip.getFillFromObject = false;
      series2.tooltip.background.fill = am4core.color("#ffffff");
      series2.tooltip.autoTextColor = false;
      series2.tooltip.label.fill = am4core.color("#333333");
      series2.tooltip.background.stroke = am4core.color("#D9E1FF");
      series2.tooltip.background.strokeWidth = 1;
      series2.fillOpacity = 0.3;
      series2.tensionX = 0.77;
      series2.color = am4core.color("#AABAF2");
      chart2.cursor = new am4charts.XYCursor();
      chart2.cursor.lineY.opacity = 0;
      chart2.cursor.marginBottom = "20px";
      chart2.scrollbarX = new am4charts.XYChartScrollbar();
      chart2.scrollbarX.series.push(series2);
      chart2.scrollbarX.background.fill = am4core.color("#F3F6FF");
      chart2.scrollbarX.background.fillOpacity = 1;
      chart2.scrollbarX.scrollbarChart.plotContainer.filters.clear();
      chart2.scrollbarX.unselectedOverlay.fill = am4core.color("#FBFCFF");
      chart2.scrollbarX.unselectedOverlay.fillOpacity = 0.7;
      customizeGrip(chart2.scrollbarX.startGrip);
      customizeGrip(chart2.scrollbarX.endGrip);
      chart2.scrollbarX.parent = chart2.topAxesContainer;
      chart2.topAxesContainer.marginBottom = "36px";
      const scrollSeries2 = chart2.scrollbarX.scrollbarChart.series.getIndex(0);
      scrollSeries2.fillOpacity = 0;
      const scrollAxis2 = chart2.scrollbarX.scrollbarChart.xAxes.getIndex(0);
      scrollAxis2.renderer.grid.template.disabled = true;
      chart2.zoomOutButton.disabled = true;
      setChart2(chart2);
    }

    if (tabs === 2 && billingBandwidth) {
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_myTheme);

      /* --------------------------------------------------------------------------------------------------------------------------*/

      const chart3 = am4core.create("chartdiv3", am4charts.XYChart);
      chart3.data = generateChartData(billingBandwidth);
      chart3.plotContainer.background.fill = am4core.color("#ffffff");
      chart3.plotContainer.background.fillOpacity = 1;
      chart3.paddingTop = 0;
      chart3.paddingBottom = "24px";
      chart3.paddingLeft = "24px";
      chart3.paddingRight = "24px";
      const dateAxis3 = chart3.xAxes.push(new am4charts.DateAxis());
      dateAxis3.baseInterval = {
        timeUnit: "day",
        count: 1,
      };
      dateAxis3.tooltipDateFormat = "d MMMM";
      dateAxis3.start = 0;
      dateAxis3.keepSelection = true;
      dateAxis3.groupData = true;
      dateAxis3.renderer.labels.template.fill = am4core.color("#5A5D65");
      dateAxis3.renderer.labels.template.location = 0.5;
      dateAxis3.renderer.minLabelPosition = 0.03;
      dateAxis3.renderer.maxLabelPosition = 0.98;
      dateAxis3.cursorTooltipEnabled = false;
      setDateAxis3(dateAxis3);
      const valueAxis3 = chart3.yAxes.push(new am4charts.ValueAxis());
      valueAxis3.tooltip.disabled = true;
      valueAxis3.renderer.grid.template.location = 0.5;
      valueAxis3.renderer.inside = true;
      valueAxis3.renderer.labels.template.fill = am4core.color("#5A5D65");
      valueAxis3.renderer.labels.template.dy = -10;
      valueAxis3.renderer.maxLabelPosition = 0.9;
      valueAxis3.renderer.labels.template.adapter.add("text", (label, target, key) => {
        if (label) {
          let num = label;
          //num = num.replaceAll(",", "");
          num = num.replace(/,/g, "");
          num = +num;
          return parseInt(num * 10000) / 10000 + " CLS";
        }
        return label;
      });

      valueAxis3.cursorTooltipEnabled = false;
      const series3 = chart3.series.push(new am4charts.LineSeries());
      series3.dataFields.dateX = "Timestamp";
      series3.dataFields.valueY = "UsedStorage";
      series3.dataFields.valueYReadable = "UsedStorageReadable";
      series3.tooltipHTML = `<table><tr><td>{valueYReadable}</td></tr></table>`;
      series3.tooltip.getFillFromObject = false;
      series3.tooltip.background.fill = am4core.color("#ffffff");
      series3.tooltip.autoTextColor = false;
      series3.tooltip.label.fill = am4core.color("#333333");
      series3.tooltip.background.stroke = am4core.color("#D9E1FF");
      series3.tooltip.background.strokeWidth = 1;
      series3.fillOpacity = 0.3;
      series3.tensionX = 0.77;
      series3.color = am4core.color("#AABAF2");
      chart3.cursor = new am4charts.XYCursor();
      chart3.cursor.lineY.opacity = 0;
      chart3.cursor.marginBottom = "20px";
      chart3.scrollbarX = new am4charts.XYChartScrollbar();
      chart3.scrollbarX.series.push(series3);
      chart3.scrollbarX.background.fill = am4core.color("#F3F6FF");
      chart3.scrollbarX.background.fillOpacity = 1;
      chart3.scrollbarX.scrollbarChart.plotContainer.filters.clear();
      chart3.scrollbarX.unselectedOverlay.fill = am4core.color("#FBFCFF");
      chart3.scrollbarX.unselectedOverlay.fillOpacity = 0.7;
      customizeGrip(chart3.scrollbarX.startGrip);
      customizeGrip(chart3.scrollbarX.endGrip);
      chart3.scrollbarX.parent = chart3.topAxesContainer;
      chart3.topAxesContainer.marginBottom = "36px";
      const scrollSeries3 = chart3.scrollbarX.scrollbarChart.series.getIndex(0);
      scrollSeries3.fillOpacity = 0;
      const scrollAxis3 = chart3.scrollbarX.scrollbarChart.xAxes.getIndex(0);
      scrollAxis3.renderer.grid.template.disabled = true;
      chart3.zoomOutButton.disabled = true;
      setChart3(chart3);
    }

    // eslint-disable-next-line
  }, [billingTotal, billingBandwidth, billingStorage, tabs]);

  return (
    <div className={style.block}>
      <div className={style.headerBlockTabsTitleRow}>
        <div className={style.headerBlockTabs}>Balance history</div>
        <div className={clsx(style.tabs, style.desktopTabs)}>
          <div className={clsx(style.tab, tabs === 0 && style.tabActive)} onClick={() => setTabs(0)}>
            Total
          </div>
          <div className={clsx(style.tab, tabs === 1 && style.tabActive)} onClick={() => setTabs(1)}>
            Storage
          </div>
          <div className={clsx(style.tab, tabs === 2 && style.tabActive)} onClick={() => setTabs(2)}>
            Bandwidth
          </div>
        </div>
        <div className={clsx(style.tabs, style.mobileTabs)}>
          <div className={clsx(style.tab, tabs === 0 && style.tabActive)} onClick={() => setTabs(0)}>
            <ChartAlt />
          </div>
          <div className={clsx(style.tab, tabs === 1 && style.tabActive)} onClick={() => setTabs(1)}>
            <Box />
          </div>
          <div className={clsx(style.tab, tabs === 2 && style.tabActive)} onClick={() => setTabs(2)}>
            <Chart />
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
            <button id="b1m" className={style.chartButton} onClick={listenerButtons(1, UnitEnum.month)}>
              1&nbsp;M
            </button>
            <button id="b3m" className={style.chartButton} onClick={listenerButtons(3, UnitEnum.month)}>
              3&nbsp;M
            </button>
            <button id="b6m" className={style.chartButton} onClick={listenerButtons(6, UnitEnum.month)}>
              6&nbsp;M
            </button>
            <button id="b1y" className={style.chartButton} onClick={listenerButtons(1, UnitEnum.year)}>
              1&nbsp;Y
            </button>
            <button id="bmax" className={style.chartButton} onClick={listenerButtons(1, UnitEnum.max)}>
              MAX
            </button>
          </div>
        </div>

        <div className={style.chartWrap} style={{ background: "white" }}>
          {isFull(billingTotal) && <div id="chartdiv1" style={{ width: "100%", height: "500px", maxWidth: "100%" }} />}
          {!isFull(billingTotal) && (
            <EmptyList onClick={voidCallback} textButton="" noBorder={true} noButton={true} icon={<SvgChart />}>
              You don't have the data yet
            </EmptyList>
          )}
        </div>
      </div>

      <div style={{ display: tabs === 1 ? "block" : "none" }}>
        <div style={{ width: "100%" }} className={style.controls}>
          <div className={style.inputsRow}>
            <DayPickerRange
              classNameFrom="fromfield"
              classNameTo="tofield"
              handleFromChange={handleFromChange}
              handleToChange={handleToChange}
              from={fromTo?.fromInput}
              to={fromTo?.toInput}
              ref={ref2}
            />
          </div>
          <div className={style.buttons}>
            <button id="b1m2" className={style.chartButton} onClick={listenerButtons(1, UnitEnum.month)}>
              1&nbsp;M
            </button>
            <button id="b3m2" className={style.chartButton} onClick={listenerButtons(3, UnitEnum.month)}>
              3&nbsp;M
            </button>
            <button id="b6m2" className={style.chartButton} onClick={listenerButtons(6, UnitEnum.month)}>
              6&nbsp;M
            </button>
            <button id="b1y2" className={style.chartButton} onClick={listenerButtons(1, UnitEnum.year)}>
              1&nbsp;Y
            </button>
            <button id="bmax2" className={style.chartButton} onClick={listenerButtons(1, UnitEnum.max)}>
              MAX
            </button>
          </div>
        </div>

        <div className={clsx(style.chartWrap, style.chartWrap2)} style={{ background: "white" }}>
          {isFull(billingStorage) && (
            <div id="chartdiv2" style={{ width: "100%", height: "500px", maxWidth: "100%" }} />
          )}
          {!isFull(billingStorage) && (
            <EmptyList onClick={voidCallback} textButton="" noBorder={true} noButton={true} icon={<SvgChart />}>
              You don't have the data yet
            </EmptyList>
          )}
        </div>
      </div>

      <div style={{ display: tabs === 2 ? "block" : "none" }}>
        <div style={{ width: "100%" }} className={style.controls}>
          <div className={style.inputsRow}>
            <DayPickerRange
              classNameFrom="fromfield"
              classNameTo="tofield"
              handleFromChange={handleFromChange}
              handleToChange={handleToChange}
              from={fromTo?.fromInput}
              to={fromTo?.toInput}
              ref={ref3}
            />
          </div>
          <div className={style.buttons}>
            <button id="b1m3" className={style.chartButton} onClick={listenerButtons(1, UnitEnum.month)}>
              1&nbsp;M
            </button>
            <button id="b3m3" className={style.chartButton} onClick={listenerButtons(3, UnitEnum.month)}>
              3&nbsp;M
            </button>
            <button id="b6m3" className={style.chartButton} onClick={listenerButtons(6, UnitEnum.month)}>
              6&nbsp;M
            </button>
            <button id="b1y3" className={style.chartButton} onClick={listenerButtons(1, UnitEnum.year)}>
              1&nbsp;Y
            </button>
            <button id="bmax3" className={style.chartButton} onClick={listenerButtons(1, UnitEnum.max)}>
              MAX
            </button>
          </div>
        </div>
        <div className={clsx(style.chartWrap, style.chartWrap2)} style={{ background: "white" }}>
          {isFull(billingBandwidth) && (
            <div id="chartdiv3" style={{ width: "100%", height: "500px", maxWidth: "100%" }} />
          )}
          {!isFull(billingBandwidth) && (
            <EmptyList onClick={voidCallback} textButton="" noBorder={true} noButton={true} icon={<SvgChart />}>
              You don't have the data yet
            </EmptyList>
          )}
        </div>
      </div>
    </div>
  );
};
