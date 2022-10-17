//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import style from "./charts.module.scss";
import {formatBytes, isFull} from "../../helpers/common";
import EmptyList from "../EmptyList/EmptyList";
import SvgChart from "../../icons/Chart";
import {useDispatch} from "react-redux";
import {getStatisticsHome} from "../../modules/buckets/actions"
import DayPickerRange from "./DayPickerRange/DayPickerRange";
import moment from "moment";


function am4themes_myTheme(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      am4core.color("#AABAF2"),
    ];
  }
}

function am4themes_myThemeColumns(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      am4core.color("#AABAF2"),
      am4core.color("#678EDC"),
    ];
  }
}

const ChartComponent2 = ({dataStorage, dataBandwidth, tabsParent = 0}) => {

  const dispatch = useDispatch();


  const [tabsParentStage, setTabsParentStage] = useState()

  useEffect(() => {
    setTabsParentStage(tabsParent)
  }, [tabsParent])

  useEffect(() => {

    setTimeout(() => {
      if (tabsParentStage > -1) {
        _setTabs(tabsParentStage)
      }
    }, 500)
  }, [tabsParentStage])


  const inputFieldFormat = "yyyy-MM-dd";
  const [tabs, _setTabs] = useState(0);
  const tabsRef = useRef(tabs);
  const setTabs = (data) => {
    // for chart1 inside eventListener to be actual
    tabsRef.current = data;
    _setTabs(data);
  };

  const [rendered, setRendered] = useState({0: false, 1: false});
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

  useEffect(() => {

    if (tabs === 1 && isFull(dataBandwidth)) {
      setRendered({0: true, 1: true});
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_myThemeColumns);

      // Create chart instance
      let chart2 = am4core.create("chartdiv", am4charts.XYChart);
      chart2.zoomOutButton.disabled = true;
      chart2.paddingTop = 0;
      chart2.paddingBottom = "24px";
      chart2.paddingLeft = "24px";
      chart2.paddingRight = "24px";

      /*function generateChartData2() {
        let chartData = [];
        // current date
        let firstDate = new Date();
        // now set 50 days back
        firstDate.setDate(firstDate.getDate() - 50);
        // and generate 50 data items

        for (var i = 0; i < 50; i++) {
          let newDate = new Date(firstDate);
          // each time we add one minute
          newDate.setDate(newDate.getDate() + i);
          let download;
          let upload;
          let j = i;
          j = j*10;
          // some random number
          if (i<20){
            download = j + 20;
            upload = j + 50
          }
          if (i>=20 && i < 30){
            download = j - 30;
            upload = j - 10;
          }
          if (i === 23){
            upload = 50;
          }
          if (i > 30){
            download = j -10;
            upload = j + 20
          }
          if (i > 10 && i< 15){
            download = j + 40;
            upload = j + 60
          }
          if (i ===3 || i===4){
            download = j + 10;
            upload = j + 40
          }
          if ( i === 36){
            upload= 100;
            download= 150;
          }
          if (i > 35 && i< 45){
            download = j + 10;
            upload = j
          }
          if ( i === 45){
            upload= 50;
            download= 150;
          }
          // add data item to the array
          chartData.push({
            date: newDate,
            download,
            upload,
          });
        }
        console.log("chartData", chartData);
        return chartData;
      }*/

      // chart2.data = generateChartData2();
      chart2.data = dataBandwidth;

      chart2.cursor = new am4charts.XYCursor();

// Create axes
      /* var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
       categoryAxis.dataFields.category = "year";
       categoryAxis.renderer.grid.template.location = 0;*/


      let dateAxis2 = chart2.xAxes.push(new am4charts.DateAxis());

      dateAxis2.baseInterval = {
        "timeUnit": "day",
        "count": 1
      };
      dateAxis2.tooltipDateFormat = "d MMMM";
      dateAxis2.start = 0;
      dateAxis2.keepSelection = true;
      dateAxis2.groupData = false;
      dateAxis2.renderer.labels.template.fill = am4core.color("#5A5D65");

      dateAxis2.renderer.labels.template.location = 0.5;

      dateAxis2.cursorTooltipEnabled = false;

      setDateAxis2(dateAxis2);

      var valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
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
          return formatBytes(num)
        }
        return label
      });


// Create series
      function createSeries(field, fieldReadable, name, round) {

        // Set up series
        var series = chart2.series.push(new am4charts.LineSeries());

        series.dataFields.valueY = field;
        series.dataFields.valueYReadable = fieldReadable;
        series.dataFields.dateX = "Date";
        series.name = name;
        //series.tooltipText = "[font-size:12px]{name}[/]: [font-size:12px]{valueY} Gb";
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
        // series.sequencedInterpolation = true;

        // Add label
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        /*labelBullet.label.text = "{valueY} Gb";*/

        labelBullet.locationY = 0.5;
        labelBullet.label.hideOversized = true;
        // series.columns.template.width =  am4core.percent(30);
        // series.columns.template.maxWidth =  30;

        return series;
      }

      //const series1 = createSeries("download", "Download bandwidth", false);
      const series2 = createSeries("UploadBandwidth", "UploadBandwidthReadable", "Upload bandwidth", false);
      const series3 = createSeries("DownloadBandwidth", "DownloadBandwidthReadable", "Download bandwidth", false);

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

      var scrollAxis = chart2.scrollbarX.scrollbarChart.xAxes.getIndex(0);
      // scrollAxis.renderer.labels.template.disabled = true;
      scrollAxis.renderer.grid.template.disabled = true;
      const scrollSeries2 = chart2.scrollbarX.scrollbarChart.series.getIndex(0);
      scrollSeries2.fillOpacity = 0;
      setChart2(chart2);
    }


    if (tabs === 0 && isFull(dataStorage)) {
      setRendered((prev) => {
        return {0: true, 1: prev[1]}
      })
      /* Chart code */
// Themes begin
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_myTheme);
// Themes end
      /* --------------------------------------------------------------------------------------------------------------------------*/

      //console.log("dataStorage",dataStorage)
// Create chart
      let chart = am4core.create("chartdiv2", am4charts.XYChart);
      //chart.paddingRight = 20;


      chart.data = dataStorage;
      // chart.data = dataStorageTest();
      // chart.data = dataStorageTest2;
      // chart.data = dataStorageTest3;

      //chart.plotContainer.background.fill = am4core.color("#FBFCFF");
      chart.plotContainer.background.fill = am4core.color("#ffffff");
      chart.plotContainer.background.fillOpacity = 1;

      /*  chart.plotContainer.background.strokeWidth = 1;
        chart.plotContainer.background.strokeOpacity = 1;
        chart.plotContainer.background.stroke = am4core.color("#ff0000");*/

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
      // dateAxis.groupData = true;
      dateAxis.groupData = false;
      dateAxis.renderer.labels.template.fill = am4core.color("#5A5D65");
      dateAxis.renderer.labels.template.location = 0.5;
      dateAxis.renderer.minLabelPosition = 0.03;
      dateAxis.renderer.maxLabelPosition = 0.98;
      dateAxis.cursorTooltipEnabled = false;
      setDateAxis1(dateAxis);

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;


      //valueAxis.renderer.grid.template.location = 0;
      valueAxis.renderer.grid.template.location = 0.5;
      //valueAxis.renderer.labels.template.location = 1;
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.fill = am4core.color("#5A5D65");
      valueAxis.renderer.labels.template.dy = -10;
      valueAxis.renderer.maxLabelPosition = 0.9;

      valueAxis.renderer.labels.template.adapter.add("text", (label, target, key) => {
        if (label) {
          let num = label;
          //num = num.replaceAll(",", "");
          num = num.replace(/,/g, "");
          num = +num;
          return formatBytes(num)
        }
        return label
      });

      valueAxis.cursorTooltipEnabled = false;

      let series = chart.series.push(new am4charts.LineSeries());
      /* series.dataFields.dateX = "date";
       series.dataFields.valueY = "visits";*/
      series.dataFields.dateX = "Timestamp";
      series.dataFields.valueY = "UsedStorage";
      series.dataFields.valueYReadable = "UsedStorageReadable";

      //series.tooltipText = "{valueY}[/] GB";

      series.tooltipHTML = `<table><tr><td>{valueYReadable}</td></tr></table>`;
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color("#ffffff");
      series.tooltip.autoTextColor = false;
      series.tooltip.label.fill = am4core.color("#333333");
      series.tooltip.background.stroke = am4core.color("#D9E1FF");
      series.tooltip.background.strokeWidth = 1;

      series.fillOpacity = 0.3;
      // series.tensionX = 0.77;
      series.tensionX = 0.95;
      series.tensionY = 0.95;
      series.color = am4core.color("#AABAF2");


      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.opacity = 0;
      chart.cursor.marginBottom = "20px";
      const scrollbar1 = new am4charts.XYChartScrollbar();
      chart.scrollbarX = scrollbar1;


      chart.scrollbarX.series.push(series);
      //chart.scrollbarX.background.fill = am4core.color("#FAFBFE");
      chart.scrollbarX.background.fill = am4core.color("#F3F6FF");
      chart.scrollbarX.background.fillOpacity = 1;
      chart.scrollbarX.scrollbarChart.plotContainer.filters.clear();

      chart.scrollbarX.unselectedOverlay.fill = am4core.color("#FBFCFF");
      chart.scrollbarX.unselectedOverlay.fillOpacity = 0.7;


      customizeGrip(chart.scrollbarX.startGrip);
      customizeGrip(chart.scrollbarX.endGrip);

      chart.scrollbarX.parent = chart.topAxesContainer;
      chart.topAxesContainer.marginBottom = "36px";

      // Configure scrollbar series
      const scrollSeries1 = chart.scrollbarX.scrollbarChart.series.getIndex(0);
      scrollSeries1.fillOpacity = 0;


      /*function generateChartData() {
        let chartData = [];
        // current date
        let firstDate = new Date();
        // now set 50 days back
        firstDate.setDate(firstDate.getDate() - 50);
        // and generate 50 data items
        let visits = 50;
        for (var i = 0; i < 50; i++) {
          let newDate = new Date(firstDate);
          // each time we add one minute
          newDate.setDate(newDate.getDate() + i);
          // some random number
          const n = Math.round((Math.random()<0.5?1:-1)*randomInteger(2,5)*10);
          if (visits + n < 0) { visits-=n}
          if (visits + n < 30) { visits+= n + 40*randomInteger(1,3)}
          else{
            visits += n;
          }
          if (i === 20){
            visits = 400;
          }

          if (i === 30){
            visits = 600;
          }
          if (i === 35){
            visits = 800;
          }

          if (i === 40){
            visits = 900;
          }
          if (i === 49){
            visits = 945;
          }

          // add data item to the array
          chartData.push({
            TimeStamp: newDate,
            UsedStorage: visits,
            UsedStorageReadable: `${visits} GB`
          });
        }
        console.log("chartData", chartData);
        return chartData;
      }*/

      var scrollAxis1 = chart.scrollbarX.scrollbarChart.xAxes.getIndex(0);
      // scrollAxis1.renderer.labels.template.disabled = true;
      scrollAxis1.renderer.grid.template.disabled = true;

      chart.zoomOutButton.disabled = true;

      setChart1(chart);

      /* ---------------------------------------END-----------------------------------------------------------------------------------*/

    }
    // eslint-disable-next-line
  }, [tabs, dataStorage, dataBandwidth])

  const thisDate = Number(new Date().getDate()) < 10 ? '0' + Number(new Date().getDate()) : Number(new Date().getDate())
  const thisMonth = Number(new Date().getMonth() + 1) < 10 ? '0' + Number(new Date().getMonth() + 1) : Number(new Date().getMonth() + 1)
  const lastMonth = Number(new Date().getMonth() + 1) < 10 ? '0' + Number(new Date().getMonth()) : Number(new Date().getMonth())
  const thisYear = new Date().getFullYear()

  let toStorage
  let toBandwidth

  let fromStorage
  let fromBandwidth

  function updateFields(numberChart) {
    const dateAxis1 = dateAxis1Ref?.current;
    const dateAxis2 = dateAxis2Ref?.current;
    const chart1 = chart1Ref?.current;
    const chart2 = chart2Ref?.current;
    if (numberChart === 1) {
      let minZoomed = dateAxis1.minZoomed + am4core.time.getDuration(dateAxis1.mainBaseInterval.timeUnit, dateAxis1.mainBaseInterval.count) * 0.5;
      // document.getElementById("fromfield").value = chart1.dateFormatter.format(minZoomed, inputFieldFormat);
      // document.getElementById("tofield").value = chart1.dateFormatter.format(new Date(dateAxis1.maxZoomed), inputFieldFormat);
    } else {
      let minZoomed = dateAxis2.minZoomed + am4core.time.getDuration(dateAxis2.mainBaseInterval.timeUnit, dateAxis2.mainBaseInterval.count) * 0.5;
      // document.getElementById("fromfield2").value = chart2.dateFormatter.format(minZoomed, inputFieldFormat);
      // document.getElementById("tofield2").value = chart2.dateFormatter.format(new Date(dateAxis2.maxZoomed), inputFieldFormat);
    }
  }

  function updateZoom2() {
    const tabs = tabsRef.current;
    const fromfieldDate = fromTo?.fromInput1;
    const tofieldDate = fromTo?.toInput1;
    const fromfield2Date = fromTo?.fromInput2;
    const tofield2Date = fromTo?.toInput2;
    try {
      if (fromfieldDate.getFullYear() > 2019 && tabs === 0 &&
        fromfieldDate <= tofieldDate) {
        fromStorage = fromfieldDate
        toStorage = tofieldDate
        fromBandwidth = thisYear + "-" + lastMonth + "-" + thisDate
        toBandwidth = thisYear + "-" + thisMonth + "-" + thisDate;
        dispatch(getStatisticsHome({fromStorage, toStorage, fromBandwidth, toBandwidth}))
      }

      if (fromfield2Date.getFullYear() > 2019 &&
        fromfield2Date <= tofield2Date &&
        tabs === 1) {
        fromStorage = thisYear + "-" + lastMonth + "-" + thisDate
        toStorage = thisYear + "-" + thisMonth + "-" + thisDate
        fromBandwidth = fromfield2Date
        toBandwidth = tofield2Date
        dispatch(getStatisticsHome({fromStorage, toStorage, fromBandwidth, toBandwidth}))
      }
    } catch (err) {//here are all invalid dates (getFullYear()), do nothing}
    }
  }

  const callbackAfter = (data)=>{

        console.log("callbackAfterHome",data)


    try{
      const dateFromStorage = moment(data.storageUsageAnalytics.Records[0].Timestamp);
      // const dateToStorage = moment(data.storageUsageAnalytics.Records[data.storageUsageAnalytics.Records.length - 1].Timestamp);
      const dateToStorage = moment(new Date());
      const dateFromBandwidth = moment(data.bandwidthAnalytics.Records[0].Date);
      // const dateToBandwidth = moment(data.bandwidthAnalytics.Records[data.bandwidthAnalytics.Records.length - 1].Date);
      const dateToBandwidth = moment(new Date());

      const inputStorageFrom = moment(fromTo.fromInput1);
      const inputStorageTo = moment(fromTo.toInput1);
      const inputBandwidthFrom = moment(fromTo.fromInput2);
      const inputBandwidthTo = moment(fromTo.toInput2);
      if (
        !(dateFromStorage.isSame(inputStorageFrom)) ||
        !(dateToStorage.isSame(inputStorageTo)) ||
        !(dateFromBandwidth.isSame(inputBandwidthFrom)) ||
        !(dateToBandwidth.isSame(inputBandwidthTo))
      ){
        setFromTo({fromInput1: dateFromStorage.toDate(), fromInput2: dateFromBandwidth.toDate(), toInput1: dateToStorage.toDate(), toInput2: dateToBandwidth.toDate()})
      }
    }catch(err){}
  }

  function listenerButtons(n, unit, numberChart) {
    return () => {
      if (numberChart === 1) {
        if (unit === 'month') {
          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - n))
          toStorage = new Date(new Date().setDate(new Date().getDate()))
          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
        if (unit === 'year') {
          fromStorage = new Date(new Date().setFullYear(new Date().getFullYear() - n))
          toStorage = new Date(new Date().setDate(new Date().getDate()))
          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
        if (unit === 'max') {
          fromStorage = undefined
          toStorage = undefined
          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
      }
      if (numberChart === 2) {
        if (unit === 'month') {
          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toStorage = new Date(new Date().setDate(new Date().getDate()))
          fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - n))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
        if (unit === 'year') {
          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toStorage = new Date(new Date().setDate(new Date().getDate()))
          fromBandwidth = new Date(new Date().setFullYear(new Date().getFullYear() - n))
          toBandwidth = new Date(new Date().setDate(new Date().getDate()))
        }
        if (unit === 'max') {
          fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
          toStorage = new Date(new Date().setDate(new Date().getDate()))
          fromBandwidth = undefined
          toBandwidth = undefined
        }
      }
      setFromTo({fromInput1: fromStorage, fromInput2: fromBandwidth, toInput1: toStorage, toInput2: toBandwidth})
      dispatch(getStatisticsHome({fromStorage, toStorage, fromBandwidth, toBandwidth, callback: callbackAfter}))
    }
  }

  useEffect(() => {

// Date format to be used in input fields

    document.getElementById("b1m").addEventListener("click", listenerButtons(1, "month", 1));
    document.getElementById("b3m").addEventListener("click", listenerButtons(3, "month", 1));
    document.getElementById("b6m").addEventListener("click", listenerButtons(6, "month", 1));
    document.getElementById("b1y").addEventListener("click", listenerButtons(1, "year", 1));
    document.getElementById("bmax").addEventListener("click", listenerButtons(1, "max", 1));

    document.getElementById("b1m2").addEventListener("click", listenerButtons(1, "month", 2));
    document.getElementById("b3m2").addEventListener("click", listenerButtons(3, "month", 2));
    document.getElementById("b6m2").addEventListener("click", listenerButtons(6, "month", 2));
    document.getElementById("b1y2").addEventListener("click", listenerButtons(1, "year", 2));
    document.getElementById("bmax2").addEventListener("click", listenerButtons(1, "max", 2));

    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    const dateAxis1 = dateAxis1Ref?.current;
    const dateAxis2 = dateAxis2Ref?.current;

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
  }, [dateAxis1, dateAxis2, tabs, dataStorage, dataBandwidth])


  const [fromTo, setFromTo] = useState(
    {
      fromInput1: new Date(thisYear + "-" + lastMonth + "-" + thisDate),
      toInput1: new Date(thisYear + "-" + thisMonth + "-" + thisDate),
      fromInput2: new Date(thisYear + "-" + lastMonth + "-" + thisDate),
      toInput2: new Date(thisYear + "-" + thisMonth + "-" + thisDate)
  })

  const handleFromChange1 = (from)=>{setFromTo((prev)=>{return {...prev, fromInput1: from}});}
  const handleToChange1 = (to)=>{setFromTo((prev)=>{return {...prev, toInput1: to}});}

  const handleFromChange2 = (from)=>{setFromTo((prev)=>{return {...prev, fromInput2: from}}); }
  const handleToChange2 = (to)=>{setFromTo((prev)=>{return {...prev, toInput2: to}}); }

  useEffect(updateZoom2,[fromTo]);

  const ref1 = React.createRef();
  const ref2 = React.createRef();

  const dataStorageVisible = dataStorage?.filter(item => item.UsedStorage > 0)

  const dataBandwidthVisible = dataBandwidth?.filter(item => item.DownloadBandwidth > 0 || item.UploadBandwidth > 0)

  return (
    <div className={style.block}>
      <div className={style.headerBlockTabsTitleRow}>
        <div className={style.headerBlockTabs}>Analytics</div>
        <div className={style.tabs}>
          <div className={`${style.tab} ${tabs === 0 && style.tabActive}`} onClick={() => {
            setTabs(0);
            setTabsParentStage(0)
          }}>Storage
          </div>
          <div className={`${style.tab} ${tabs === 1 && style.tabActive}`} onClick={() => {
            setTabs(1);
            setTabsParentStage(1)
          }}>Bandwidth
          </div>
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


          <div className={style.buttons}>
            <button id="b1m" className={style.chartButton}>1 M</button>
            <button id="b3m" className={style.chartButton}>3 M</button>
            <button id="b6m" className={style.chartButton}>6 M</button>
            <button id="b1y" className={style.chartButton}>1 Y</button>
            <button id="bmax" className={style.chartButton}>MAX</button>
            {/*  <button id="bytd" className={style.chartButton}>YTD</button>
          <button id="bmax" className={style.chartButton}>MAX</button>*/}
          </div>
        </div>

        {(!isFull(dataStorage) || dataStorageVisible?.length === 0) && <EmptyList onClick={() => {
        }} textButton={""} noBorder={true} noButton={true} icon={<SvgChart/>}>You don't have the data yet</EmptyList>}

        {isFull(dataStorage) && dataStorageVisible?.length > 0 &&
        <div className={`${style.chartWrap}`} style={{background: "white"}}>
          <div id="chartdiv2" style={{width: "100%", height: "500px", maxWidth: "100%"}}/>
        </div>
        }
      </div>

      <div style={{display: tabs === 1 ? "block" : "none"}}>
        <div style={{width: "100%"}} className={style.controls}>
          <div className={style.inputsRow}>
              <DayPickerRange
                  classNameFrom={"fromfield2"}
                  classNameTo={"tofield2"}
                  handleFromChange={handleFromChange2}
                  handleToChange={handleToChange2}
                  from={fromTo?.fromInput2}
                  to={fromTo?.toInput2}
                  ref={ref2}
              />
          </div>
          <div className={style.buttons}>
            <button id="b1m2" className={style.chartButton}>1 M</button>
            <button id="b3m2" className={style.chartButton}>3 M</button>
            <button id="b6m2" className={style.chartButton}>6 M</button>
            <button id="b1y2" className={style.chartButton}>1 Y</button>
            <button id="bmax2" className={style.chartButton}>MAX</button>
            {/*  <button id="bytd" className={style.chartButton}>YTD</button>
          <button id="bmax" className={style.chartButton}>MAX</button>*/}
          </div>
        </div>

        {(!isFull(dataBandwidth) || dataBandwidthVisible?.length === 0) && <EmptyList onClick={() => {
        }} textButton={""} noBorder={true} noButton={true} icon={<SvgChart/>}>You don't have the data yet</EmptyList>}

        {isFull(dataBandwidth) && dataBandwidthVisible?.length > 0 &&
        <div className={`${style.chartWrap} ${style.chartWrap2}`} style={{background: "white"}}>
          <div id="chartdiv" style={{width: "100%", height: "500px", maxWidth: "100%"}}/>
        </div>
        }
      </div>

    </div>
  )
}
export default ChartComponent2;

