//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import style from "./charts.module.scss";
import {isFull} from '../../../helpers/common'
import EmptyList from "../../../components/EmptyList/EmptyList";
import SvgChart from "../../../icons/Chart";
import {ChartAlt, Chart, Box} from "../../../icons/BillingChartIcons";
import {useDispatch} from "react-redux";
import DayPickerRange from "../DayPickerRange/DayPickerRange";
import moment from "moment";
import {getBillingData} from '../../../Redux/account/Actions/accountActions';

function am4themes_myTheme(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      am4core.color("#AABAF2"),
    ];
  }
}

const ChartBilling = ({billingTotal, billingStorage, billingBandwidth}) => {

  console.log("billingTotal, billingStorage, billingBandwidth2",billingTotal, billingStorage, billingBandwidth)

  const dispatch = useDispatch();

  const inputFieldFormat = "yyyy-MM-dd";
  const [tabs, _setTabs] = useState(0);
  const tabsRef = useRef(tabs);
  const setTabs = (data) => {
    // for chart1 inside eventListener to be actual
    tabsRef.current = data;
    _setTabs(data);
  };

  const [rendered, setRendered] = useState({0: false, 1: false, 2: false});
  const [chart1, _setChart1] = useState(null as any);
  const chart1Ref = useRef(chart1);

  const setChart1 = (data) => {
    // for chart1 inside eventListener to be actual
    chart1Ref.current = data;
    _setChart1(data);
  };

  const [chart2, _setChart2] = useState(null as any);
  const chart2Ref = useRef(chart2);
  const setChart2 = (data) => {
    // for chart1 inside eventListener to be actual
    chart2Ref.current = data;
    _setChart2(data);
  }

  const [chart3, _setChart3] = useState(null as any);
  const chart3Ref = useRef(chart3);

  const setChart3 = (data) => {
    // for chart1 inside eventListener to be actual
    chart3Ref.current = data;
    _setChart3(data);
  }

  const [dateAxis1, _setDateAxis1] = useState(null as any);

  const dateAxis1Ref = useRef(dateAxis1);
  const setDateAxis1 = (data) => {
    // for dateAxis1 inside eventListener to be actual
    dateAxis1Ref.current = data;
    _setDateAxis1(data);
  }

  const [dateAxis2, _setDateAxis2] = useState(null as any);
  const dateAxis2Ref = useRef(dateAxis2);
  const setDateAxis2 = (data) => {
    // for dateAxis1 inside eventListener to be actual
    dateAxis2Ref.current = data;
    _setDateAxis2(data);
  }

  const [dateAxis3, _setDateAxis3] = useState(null as any);
  const dateAxis3Ref = useRef(dateAxis3);
  const setDateAxis3 = (data) => {
    // for dateAxis1 inside eventListener to be actual
    dateAxis3Ref.current = data;
    _setDateAxis3(data);
  }

  const customizeGrip = (grip) => {
    grip.background.fill = am4core.color("#AABAF2");
    grip.background.disabled = true;
    var img = grip.createChild(am4core.Circle);
    img.width = 23;
    img.height = 23;
    img.fill = am4core.color("#AABAF2");
    img.align = "center";
    img.valign = "middle";


    var line = grip.createChild(am4core.Rectangle);
    line.height = 60;
    line.width = 2;
    line.fill = am4core.color("#AABAF2");
    line.align = "center";
    line.valign = "middle";
  }

  function generateChartData(array) {

    let chartData = [];
    const arrayLength = array?.length;

    // current date
    let firstDate = new Date();
    // now set 50 days back
    firstDate.setDate(firstDate.getDate() - arrayLength);

    array?.forEach((element) => {
        chartData.push({
          Timestamp: new Date(element.date),
          UsedStorage: element.amount,
          UsedStorageReadable: `${(parseInt(element.amount * 10000) / 10000)} CLS`
        });
      }
    );
    return chartData;

  }

  useEffect(() => {


    console.log("billingTotal, billingBandwidth, billingStorage, tabs",billingTotal, billingBandwidth, billingStorage, tabs)


    if (tabs === 0 && billingTotal) {
      setRendered((prev) => {
        return {0: true, 1: prev[1], 2: prev[2]}
      })

      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_myTheme);

      let chart = am4core.create("chartdiv1", am4charts.XYChart);
      chart.data = generateChartData(billingTotal);
      chart.plotContainer.background.fill = am4core.color("#ffffff");
      chart.plotContainer.background.fillOpacity = 1;
      chart.paddingTop = 0;
      chart.paddingBottom = "24px";
      chart.paddingLeft = "24px";
      chart.paddingRight = "24px";

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.baseInterval = {
        "timeUnit": "day",
        "count": 1
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

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
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
          return (parseInt(num * 100) / 100) + " CLS"
        }
        return label
      });

      valueAxis.cursorTooltipEnabled = false;

      let series = chart.series.push(new am4charts.LineSeries());
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


      var scrollAxis1 = chart.scrollbarX.scrollbarChart.xAxes.getIndex(0);
      // scrollAxis1.renderer.labels.template.disabled = true;
      scrollAxis1.renderer.grid.template.disabled = true;
      chart.zoomOutButton.disabled = true;
      setChart1(chart);
      /* ---------------------------------------END-----------------------------------------------------------------------------------*/
    }

    if (tabs === 1 && billingStorage) {
      setRendered((prev) => {
        return {0: prev[0], 1: true, 2: prev[2]}
      })

      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_myTheme);

      /* --------------------------------------------------------------------------------------------------------------------------*/
      let chart2 = am4core.create("chartdiv2", am4charts.XYChart);
      chart2.data = generateChartData(billingStorage);
      chart2.plotContainer.background.fill = am4core.color("#ffffff");
      chart2.plotContainer.background.fillOpacity = 1;
      chart2.paddingTop = 0;
      chart2.paddingBottom = "24px";
      chart2.paddingLeft = "24px";
      chart2.paddingRight = "24px";

      let dateAxis2 = chart2.xAxes.push(new am4charts.DateAxis());
      dateAxis2.baseInterval = {
        "timeUnit": "day",
        "count": 1
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

      let valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
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
          return (parseInt(num * 100) / 100) + " CLS"
        }
        return label
      });

      valueAxis2.cursorTooltipEnabled = false;

      let series2 = chart2.series.push(new am4charts.LineSeries());
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


      var scrollAxis2 = chart2.scrollbarX.scrollbarChart.xAxes.getIndex(0);
      scrollAxis2.renderer.grid.template.disabled = true;
      chart2.zoomOutButton.disabled = true;
      setChart2(chart2);
    }

    if (tabs === 2 && billingBandwidth) {
      setRendered((prev) => {
        return {0: prev[0], 1: prev[1], 2: true}
      })

      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_myTheme);

      /* --------------------------------------------------------------------------------------------------------------------------*/

      console.log("billingBandwidth222",billingBandwidth)
      let chart3 = am4core.create("chartdiv3", am4charts.XYChart);
      chart3.data = generateChartData(billingBandwidth);
      chart3.plotContainer.background.fill = am4core.color("#ffffff");
      chart3.plotContainer.background.fillOpacity = 1;
      chart3.paddingTop = 0;
      chart3.paddingBottom = "24px";
      chart3.paddingLeft = "24px";
      chart3.paddingRight = "24px";

      let dateAxis3 = chart3.xAxes.push(new am4charts.DateAxis());
      dateAxis3.baseInterval = {
        "timeUnit": "day",
        "count": 1
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

      let valueAxis3 = chart3.yAxes.push(new am4charts.ValueAxis());
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
          return (parseInt(num * 10000) / 10000) + " CLS"
        }
        return label
      });

      valueAxis3.cursorTooltipEnabled = false;

      let series3 = chart3.series.push(new am4charts.LineSeries());
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
      var scrollAxis3 = chart3.scrollbarX.scrollbarChart.xAxes.getIndex(0);
      scrollAxis3.renderer.grid.template.disabled = true;
      chart3.zoomOutButton.disabled = true;
      setChart3(chart3);
    }


    // eslint-disable-next-line
  }, [billingTotal, billingBandwidth, billingStorage, tabs])

  const thisDate = Number(new Date().getDate()) < 10 ? '0' + Number(new Date().getDate()) : Number(new Date().getDate())
  const thisMonth = Number(new Date().getMonth() + 1) < 10 ? '0' + Number(new Date().getMonth() + 1) : Number(new Date().getMonth() + 1)
  const lastMonth = Number(new Date().getMonth() + 1) < 10 ? '0' + Number(new Date().getMonth()) : Number(new Date().getMonth())
  const thisYear = new Date().getFullYear()

  const [fromTo, setFromTo] = useState(
    {
      fromInput1: new Date(thisYear + "-" + lastMonth + "-" + thisDate),
      toInput1: new Date(thisYear + "-" + thisMonth + "-" + thisDate),
      fromInput2: new Date(thisYear + "-" + lastMonth + "-" + thisDate),
      toInput2: new Date(thisYear + "-" + thisMonth + "-" + thisDate),
      fromInput3: new Date( thisYear + "-" + lastMonth + "-" + thisDate),
      toInput3: new Date(thisYear + "-" + thisMonth + "-" + thisDate)
    })


  let fromTotal
  let fromStorage
  let fromBandwidth

  let toTotal
  let toStorage
  let toBandwidth

  function updateFields() {
    const tabs = tabsRef.current;
    const dateAxis1 = dateAxis1Ref?.current;
    const dateAxis2 = dateAxis2Ref?.current;
    const dateAxis3 = dateAxis3Ref?.current;
    const chart1 = chart1Ref?.current;
    const chart2 = chart2Ref?.current;
    const chart3 = chart3Ref?.current;
    if (tabs === 0) {

      let minZoomed = dateAxis1.minZoomed + am4core.time.getDuration(dateAxis1.mainBaseInterval.timeUnit, dateAxis1.mainBaseInterval.count) * 0.5;
      // document.getElementById("fromfield1").value = chart1.dateFormatter.format(minZoomed, inputFieldFormat);
      // document.getElementById("tofield1").value = chart1.dateFormatter.format(new Date(dateAxis1.maxZoomed), inputFieldFormat);
    } else if (tabs === 1) {
      let minZoomed = dateAxis2.minZoomed + am4core.time.getDuration(dateAxis2.mainBaseInterval.timeUnit, dateAxis2.mainBaseInterval.count) * 0.5;
      // document.getElementById("fromfield2").value = chart2.dateFormatter.format(minZoomed, inputFieldFormat);
      // document.getElementById("tofield2").value = chart2.dateFormatter.format(new Date(dateAxis2.maxZoomed), inputFieldFormat);
    } else if (tabs === 2) {
      let minZoomed = dateAxis3.minZoomed + am4core.time.getDuration(dateAxis3.mainBaseInterval.timeUnit, dateAxis3.mainBaseInterval.count) * 0.5;
      // document.getElementById("fromfield3").value = chart3.dateFormatter.format(minZoomed, inputFieldFormat);
      // document.getElementById("tofield3").value = chart3.dateFormatter.format(new Date(dateAxis3.maxZoomed), inputFieldFormat);
    }

  }

  // let zoomTimeout;

  function updateZoom() {
    const tabs = tabsRef.current;

    const fromfield1Date = fromTo?.fromInput1;
    const tofield1Date = fromTo?.toInput1;
    const fromfield2Date = fromTo?.fromInput2;
    const tofield2Date = fromTo?.toInput2;
    const fromfield3Date = fromTo?.fromInput2;
    const tofield3Date = fromTo?.toInput2;

    try {
      if (fromfield1Date.getFullYear() > 2019 &&
        fromfield1Date <= tofield1Date &&
        tabs === 0
      ) {
        fromTotal = fromfield1Date
        toTotal = tofield1Date
        fromStorage = thisYear + "-" + lastMonth + "-" + thisDate
        toStorage = thisYear + "-" + thisMonth + "-" + thisDate
        fromBandwidth = thisYear + "-" + lastMonth + "-" + thisDate
        toBandwidth = thisYear + "-" + thisMonth + "-" + thisDate
        dispatch(getBillingData({fromTotal, toTotal, fromStorage, toStorage, fromBandwidth, toBandwidth}))
      }

      if (fromfield2Date.getFullYear() > 2019 &&
        fromfield2Date <= tofield2Date &&
        tabs === 1
      ) {
        fromTotal = thisYear + "-" + lastMonth + "-" + thisDate
        toTotal = thisYear + "-" + thisMonth + "-" + thisDate

        fromStorage = fromfield2Date
        toStorage = tofield2Date
        fromBandwidth = thisYear + "-" + lastMonth + "-" + thisDate
        toBandwidth = thisYear + "-" + thisMonth + "-" + thisDate;
        dispatch(getBillingData({fromTotal, toTotal, fromStorage, toStorage, fromBandwidth, toBandwidth}))
      }

      if (fromfield3Date.getFullYear() > 2019 && tabs === 2 &&
        fromfield3Date <= tofield3Date
      ) {
        fromTotal = thisYear + "-" + lastMonth + "-" + thisDate
        toTotal = thisYear + "-" + thisMonth + "-" + thisDate
        fromStorage = thisYear + "-" + lastMonth + "-" + thisDate
        toStorage = thisYear + "-" + thisMonth + "-" + thisDate
        fromBandwidth = fromfield3Date
        toBandwidth = tofield3Date
        dispatch(getBillingData({fromTotal, toTotal, fromStorage, toStorage, fromBandwidth, toBandwidth}))

      }
    }catch(err){}
  }

  const callbackAfter = (data)=>{

    try{
      const dateFromTotal = moment(data.total[0].date);
      // const dateToTotal = moment(data.total[data.total.length - 1].date);
      const dateToTotal = moment(new Date());

      const dateFromStorage = moment(data.storage[0].date);
      // const dateToStorage = moment(data.storage[data.storage.length - 1].date);
      const dateToStorage = moment(new Date());

      const dateFromBandwidth = moment(data.bandwidth[0].date);
      // const dateToBandwidth = moment(data.bandwidth[data.bandwidth.length - 1].date);
      const dateToBandwidth = moment(new Date());

      const inputTotalFrom = moment(fromTo.fromInput1);
      const inputTotalTo = moment(fromTo.toInput1);
      const inputStorageFrom = moment(fromTo.fromInput2);
      const inputStorageTo = moment(fromTo.toInput2);
      const inputBandwidthFrom = moment(fromTo.fromInput3);
      const inputBandwidthTo = moment(fromTo.toInput3);

      if (
        !(dateFromTotal.isSame(inputTotalFrom)) ||
        !(dateToTotal.isSame(inputTotalTo)) ||
        !(dateFromStorage.isSame(inputStorageFrom)) ||
        !(dateToStorage.isSame(inputStorageTo)) ||
        !(dateFromBandwidth.isSame(inputBandwidthFrom)) ||
        !(dateToBandwidth.isSame(inputBandwidthTo))
      ){
        setFromTo({fromInput1: dateFromTotal.toDate(), fromInput2: dateFromStorage.toDate(), fromInput3: dateFromBandwidth.toDate(),
          toInput1: dateToTotal.toDate() ,toInput2: dateToStorage.toDate(), toInput3: dateToBandwidth.toDate(),
        })
      }
    }catch(err){}
  }

  function listenerButtons(n, unit, numberChart) {
    return () => {
      if (numberChart === 1) {
        if (unit === 'month') {
          fromTotal = new Date(new Date().setMonth(new Date().getMonth() - n))
          toTotal = new Date(new Date().setDate(new Date().getDate()))

          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toStorage = new Date(new Date().setDate(new Date().getDate()))
          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
        if (unit === 'year') {
          fromTotal = new Date(new Date().setFullYear(new Date().getFullYear() - n))
          toTotal = new Date(new Date().setDate(new Date().getDate()))

          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toStorage = new Date(new Date().setDate(new Date().getDate()))
          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
        if (unit === 'max') {
          fromTotal = undefined;
          toTotal = undefined;

          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toStorage = new Date(new Date().setDate(new Date().getDate()))
          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
      }

      if (numberChart === 2) {
        if (unit === 'month') {
          fromTotal = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toTotal = new Date(new Date().setDate(new Date().getDate()))

          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - n))
          toStorage = new Date(new Date().setDate(new Date().getDate()))

          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
        if (unit === 'year') {

          fromTotal = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toTotal = new Date(new Date().setDate(new Date().getDate()))

          fromStorage = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
          toStorage = new Date(new Date().setDate(new Date().getDate()))

          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
        if (unit === 'max') {

          fromTotal = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toTotal = new Date(new Date().setDate(new Date().getDate()))

          fromStorage = undefined;
          toStorage = undefined;
          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toBandwidth = new Date(new Date().setMonth(new Date().getMonth()))

        }
      }

      if (numberChart === 3) {
        if (unit === 'month') {

          fromTotal = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toTotal = new Date(new Date().setDate(new Date().getDate()))

          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toStorage = new Date(new Date().setDate(new Date().getDate()))
          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - n))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
        if (unit === 'year') {

          fromTotal = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toTotal = new Date(new Date().setDate(new Date().getDate()))

          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toStorage = new Date(new Date().setDate(new Date().getDate()))

          fromBandwidth = new Date(new Date().setFullYear(new Date().getFullYear() - n))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))

        }
        if (unit === 'max') {
          fromTotal = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toTotal = new Date(new Date().setDate(new Date().getDate()))

          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toStorage = new Date(new Date().setMonth(new Date().getMonth()))

          fromBandwidth = undefined;
          toBandwidth = undefined;
        }
      }

      setFromTo({fromInput1: fromTotal, toInput1: toTotal, fromInput2: fromStorage, fromInput3: fromBandwidth, toInput2: toStorage, toInput3: toBandwidth})
      dispatch(getBillingData({fromTotal, toTotal, fromStorage, toStorage, fromBandwidth, toBandwidth, callback: callbackAfter}))
    }
  }

  const handleFromChange1 = (from)=>{setFromTo((prev)=>{return {...prev, fromInput1: from}});}
  const handleToChange1 = (to)=>{setFromTo((prev)=>{return {...prev, toInput1: to}});}

  const handleFromChange2 = (from)=>{setFromTo((prev)=>{return {...prev, fromInput2: from}}); }
  const handleToChange2 = (to)=>{setFromTo((prev)=>{return {...prev, toInput2: to}}); }

  const handleFromChange3 = (from)=>{setFromTo((prev)=>{return {...prev, fromInput3: from}}); }
  const handleToChange3 = (to)=>{setFromTo((prev)=>{return {...prev, toInput3: to}}); }

  useEffect(updateZoom,[fromTo]);

  const ref1 = React.createRef();
  const ref2 = React.createRef();
  const ref3 = React.createRef();


  useEffect(() => {
    const dateAxis1 = dateAxis1Ref?.current;
    const dateAxis2 = dateAxis2Ref?.current;
    const dateAxis3 = dateAxis3Ref?.current;

    if (dateAxis1) {
      dateAxis1.events.on("selectionextremeschanged", function () {
        updateFields(1);
      });
      dateAxis1.events.on("extremeschanged", function () {
        updateFields(1)
      });
    }
    if (dateAxis2) {
      dateAxis2.events.on("selectionextremeschanged", function () {
        updateFields(2);
      });
      dateAxis2.events.on("extremeschanged", function () {
        updateFields(2)
      });
    }
    if (dateAxis3) {
      dateAxis3.events.on("selectionextremeschanged", function () {
        updateFields(3);
      });
      dateAxis3.events.on("extremeschanged", function () {
        updateFields(3)
      });
    }
  }, [billingTotal, billingBandwidth, billingStorage, dateAxis1, dateAxis2, dateAxis3, tabs])

  return (
    <div className={style.block}>
      <div className={style.headerBlockTabsTitleRow}>
        <div className={style.headerBlockTabs}>Balance history</div>
        <div className={`${style.tabs} ${style.desktopTabs}`}>
          <div className={`${style.tab} ${tabs === 0 && style.tabActive}`} onClick={() => {
            setTabs(0)
          }}>Total
          </div>
          <div className={`${style.tab} ${tabs === 1 && style.tabActive}`} onClick={() => {
            setTabs(1)
          }}>Storage
          </div>
          <div className={`${style.tab} ${tabs === 2 && style.tabActive}`} onClick={() => {
            setTabs(2)
          }}>Bandwidth
          </div>
        </div>
        <div className={`${style.tabs} ${style.mobileTabs}`}>
          <div className={`${style.tab} ${tabs === 0 && style.tabActive}`} onClick={() => {
            setTabs(0)
          }}><ChartAlt/></div>
          <div className={`${style.tab} ${tabs === 1 && style.tabActive}`} onClick={() => {
            setTabs(1)
          }}><Box/></div>
          <div className={`${style.tab} ${tabs === 2 && style.tabActive}`} onClick={() => {
            setTabs(2)
          }}><Chart/></div>
        </div>
      </div>

      <div style={{display: tabs === 0 ? "block" : "none"}}>
        <div style={{width: "100%"}} className={style.controls}>
          <div className={style.inputsRow}>
            <DayPickerRange
              classNameFrom={"fromfield"}
              classNameTo={"tofield"}
              handleFromChange={handleFromChange1}
              handleToChange={handleToChange1}
              from={fromTo?.fromInput1}
              to={fromTo?.toInput1}
              ref={ref1}
            />
          </div>
          {/*<div className={style.inputsRow}>
            <div className={style.inputWrap}>
              <div className={style.labelInput}>From:</div>
              <input type="text" id="fromfield1" className={`${style.input} ${style.inputChart}`}
                     style={{background: "#FBFCFF"}} onKeyUp={() => {
                updateZoom(1)
              }}
                     disabled={!isFull(billingTotal)}
              />
            </div>
            <div className={style.inputWrap}>
              <div className={style.labelInput}> To:</div>
              <input type="text" id="tofield1" className={`${style.input} ${style.inputChart}`}
                     style={{background: "#FBFCFF"}} onKeyUp={updateZoom} disabled={!isFull(billingTotal)}/>
            </div>
          </div>*/}
          <div className={style.buttons}>
            <button id="b1m" className={style.chartButton} onClick={listenerButtons(1, "month", 1)}>1 M</button>
            <button id="b3m" className={style.chartButton} onClick={listenerButtons(3, "month", 1)}>3 M</button>
            <button id="b6m" className={style.chartButton} onClick={listenerButtons(6, "month", 1)}>6 M</button>
            <button id="b1y" className={style.chartButton} onClick={listenerButtons(1, "year", 1)}>1 Y</button>
            <button id="bmax" className={style.chartButton} onClick={listenerButtons(1, "max", 1)}>MAX</button>
          </div>
        </div>

        <div className={`${style.chartWrap}`} style={{background: "white"}}>
          {isFull(billingTotal) && <div id="chartdiv1" style={{width: "100%", height: "500px", maxWidth: "100%"}}/>}
          {!isFull(billingTotal) && <EmptyList onClick={() => {
          }} textButton={""} noBorder={true} noButton={true} icon={<SvgChart/>}>You don't have the data yet</EmptyList>}
        </div>
      </div>

      <div style={{display: tabs === 1 ? "block" : "none"}}>
        <div style={{width: "100%"}} className={style.controls}>
          <div className={style.inputsRow}>
            <DayPickerRange
              classNameFrom={"fromfield"}
              classNameTo={"tofield"}
              handleFromChange={handleFromChange2}
              handleToChange={handleToChange2}
              from={fromTo?.fromInput2}
              to={fromTo?.toInput2}
              ref={ref2}
            />
          </div>
          {/*<div className={style.inputsRow}>
            <div className={style.inputWrap}>
              <div className={style.labelInput}>From:</div>
              <input type="text" id="fromfield2" className={`${style.input} ${style.inputChart}`}
                     style={{background: "#FBFCFF"}} onKeyUp={updateZoom} disabled={!isFull(billingStorage)}/>
            </div>
            <div className={style.inputWrap}>
              <div className={style.labelInput}> To:</div>
              <input type="text" id="tofield2" className={`${style.input} ${style.inputChart}`}
                     style={{background: "#FBFCFF"}} onKeyUp={updateZoom} disabled={!isFull(billingStorage)}/>
            </div>
          </div>*/}
          <div className={style.buttons}>
            <button id="b1m2" className={style.chartButton} onClick={listenerButtons(1, "month", 2)}>1 M</button>
            <button id="b3m2" className={style.chartButton} onClick={listenerButtons(3, "month", 2)}>3 M</button>
            <button id="b6m2" className={style.chartButton} onClick={listenerButtons(6, "month", 2)}>6 M</button>
            <button id="b1y2" className={style.chartButton} onClick={listenerButtons(1, "year", 2)}>1 Y</button>
            <button id="bmax2" className={style.chartButton} onClick={listenerButtons(1, "max", 2)}>MAX</button>
            {/*  <button id="bytd" className={style.chartButton}>YTD</button>
            <button id="bmax" className={style.chartButton}>MAX</button>*/}
          </div>
        </div>

        <div className={`${style.chartWrap} ${style.chartWrap2}`} style={{background: "white"}}>
          {isFull(billingStorage) && <div id="chartdiv2" style={{width: "100%", height: "500px", maxWidth: "100%"}}/>}
          {!isFull(billingStorage) && <EmptyList onClick={() => {
          }} textButton={""} noBorder={true} noButton={true} icon={<SvgChart/>}>You don't have the data yet</EmptyList>}
        </div>
      </div>

      <div style={{display: tabs === 2 ? "block" : "none"}}>
        <div style={{width: "100%"}} className={style.controls}>
          <div className={style.inputsRow}>
            <DayPickerRange
              classNameFrom={"fromfield"}
              classNameTo={"tofield"}
              handleFromChange={handleFromChange3}
              handleToChange={handleToChange3}
              from={fromTo?.fromInput3}
              to={fromTo?.toInput3}
              ref={ref3}
            />
          </div>
          {/*<div className={style.inputsRow}>
            <div className={style.inputWrap}>
              <div className={style.labelInput}>From:</div>
              <input type="text" id="fromfield3" className={`${style.input} ${style.inputChart}`}
                     style={{background: "#FBFCFF"}} onKeyUp={updateZoom} disabled={!isFull(billingBandwidth)}/>
            </div>
            <div className={style.inputWrap}>
              <div className={style.labelInput}> To:</div>
              <input type="text" id="tofield3" className={`${style.input} ${style.inputChart}`}
                     style={{background: "#FBFCFF"}} onKeyUp={updateZoom} disabled={!isFull(billingBandwidth)}/>
            </div>
          </div>*/}
          <div className={style.buttons}>
            <button id="b1m3" className={style.chartButton} onClick={listenerButtons(1, "month", 3)}>1 M</button>
            <button id="b3m3" className={style.chartButton} onClick={listenerButtons(3, "month", 3)}>3 M</button>
            <button id="b6m3" className={style.chartButton} onClick={listenerButtons(6, "month", 3)}>6 M</button>
            <button id="b1y3" className={style.chartButton} onClick={listenerButtons(1, "year", 3)}>1 Y</button>
            <button id="bmax3" className={style.chartButton} onClick={listenerButtons(1, "max", 3)}>MAX</button>
          </div>
        </div>

        <div className={`${style.chartWrap} ${style.chartWrap2}`} style={{background: "white"}}>
          {isFull(billingBandwidth) && <div id="chartdiv3" style={{width: "100%", height: "500px", maxWidth: "100%"}}/>}
          {!isFull(billingBandwidth) && <EmptyList onClick={() => {
          }} textButton={""} noBorder={true} noButton={true} icon={<SvgChart/>}>You don't have the data
            yet</EmptyList>}        </div>
      </div>


    </div>
  )
}
export default ChartBilling

