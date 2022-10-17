//@ts-nocheck
import React, {useEffect, useState} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_rangeSelector from "@amcharts/amcharts4/plugins/rangeSelector";
import style from "./charts.module.scss";

interface IProps{

}

function am4themes_myTheme(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      am4core.color("#6EBADD"),
    ];
  }
}
function am4themes_myThemeColumns(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      am4core.color("#A1BAEA"),
      am4core.color("#729EF1"),
      am4core.color("#4E87F3"),
    ];
  }
}

const ChartComponent: React.FC<IProps > = ({}: IProps) => {


  useEffect(()=>{
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_myThemeColumns);

    // Create chart instance
    let chart2 = am4core.create("chartdiv", am4charts.XYChart);


    function generateChartData2() {
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
        // some random number
        let europe = Math.round(Math.random()*10);
        let namerica = Math.round(Math.random()*10);
        let asia = Math.round(Math.random()*10) + 20;
        // add data item to the array
        chartData.push({
          year: newDate,
          europe,
          namerica,
          asia
        });
      }
      // console.log("chartData", chartData);
      return chartData;
    }

    chart2.data = generateChartData2();

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
    dateAxis2.start = 0.8;
    dateAxis2.keepSelection = true;
    dateAxis2.groupData = true;

    var valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.inside = false;
    valueAxis2.calculateTotals = true;

    valueAxis2.min = 0;

// Create series
    function createSeries(field, name, round) {

      // Set up series
      var series = chart2.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;

      //series.dataFields.categoryX = "year";
      series.dataFields.dateX = "year";
     // series.sequencedInterpolation = true;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{dateX}: {valueY} Gb";

      if (round) {
        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
      }

      // Add label
      var labelBullet = series.bullets.push(new am4charts.LabelBullet());
      /*labelBullet.label.text = "{valueY} Gb";*/

      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;
      series.columns.template.width =  am4core.percent(30);
      series.columns.template.maxWidth =  30;

      return series;
    }

    createSeries("europe", "delete", false);
    createSeries("namerica", "retrieval", false);
    createSeries("asia", "upload", true);


// Legend
    chart2.legend = new am4charts.Legend();


    /*===================================================================================================================================================================================*/

    /* Chart code */
// Themes begin
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_myTheme);
// Themes end
    /* --------------------------------------------------------------------------------------------------------------------------*/

// Create chart
    let chart = am4core.create("chartdiv2", am4charts.XYChart);
    //chart.paddingRight = 20;

    chart.data = generateChartData();

    chart.plotContainer.background.fill = am4core.color("#ffffff");
    chart.plotContainer.background.fillOpacity = 1;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = {
      "timeUnit": "day",
      "count": 1
    };
    dateAxis.tooltipDateFormat = "d MMMM";
    dateAxis.start = 0.5;
    dateAxis.keepSelection = true;
    dateAxis.groupData = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "visits";
    series.tooltipText = "Visits: [bold]{valueY}[/]";
    series.fillOpacity = 0.3;
    series.tensionX = 0.95;
    series.color = am4core.color("#AABAF2");


    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.opacity = 0;
    chart.cursor.marginBottom = "20px";
    const scrollbar = new am4charts.XYChartScrollbar();
    chart.scrollbarX = scrollbar;
    chart2.scrollbarX = scrollbar;
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.background.fill = am4core.color("#ffffff");
    chart.scrollbarX.scrollbarChart.plotContainer.filters.clear();


    chart.scrollbarX.parent = chart.topAxesContainer;
    chart.topAxesContainer.marginBottom = "36px";

    // Configure scrollbar series
    const scrollSeries1 = chart.scrollbarX.scrollbarChart.series.getIndex(0);
    scrollSeries1.fillOpacity = 0;


    function generateChartData() {
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
        visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
        // add data item to the array
        chartData.push({
          date: newDate,
          visits: visits
        });
      }
      //console.log("chartData", chartData);
      return chartData;
    }


    // Style scrollbar
    function customizeGrip(grip) {
      grip.background.fill = am4core.color("#67B7DC");
    }

    customizeGrip(chart.scrollbarX.startGrip);
    customizeGrip(chart.scrollbarX.endGrip);

    chart.zoomOutButton.disabled = true;
    chart2.zoomOutButton.disabled = true;


    /* ---------------------------------------END-----------------------------------------------------------------------------------*/


    /**
     * Set up external controls
     */

// Date format to be used in input fields
    let inputFieldFormat = "yyyy-MM-dd";

    document.getElementById("b1m").addEventListener("click", function() {
      let max = dateAxis.groupMax["day1"];
      //console.log("max===", max);
      let date = new Date(max);
      am4core.time.add(date, "month", -1);

      let max2 = dateAxis2.groupMax["day1"];
      //console.log("max2===", max2);
      let date2 = new Date(max2);

      zoomToDates(date, date2)
    });

    document.getElementById("b3m").addEventListener("click", function() {
      let max = dateAxis.groupMax["day1"];
      let date = new Date(max);
      am4core.time.add(date, "month", -3);

      let max2 = dateAxis2.groupMax["day1"];
      let date2 = new Date(max2);


      zoomToDates(date, date2);
    });

    document.getElementById("b6m").addEventListener("click", function() {
      let max = dateAxis.groupMax["day1"];
      let date = new Date(max);
      am4core.time.add(date, "month", -6);
      let max2 = dateAxis2.groupMax["day1"];
      let date2 = new Date(max2);
      zoomToDates(date, date2);
    });

    document.getElementById("b1y").addEventListener("click", function() {
      let max = dateAxis.groupMax["day1"];
      let date = new Date(max);
      am4core.time.add(date, "year", -1);
      let max2 = dateAxis2.groupMax["day1"];
      let date2 = new Date(max2);
      zoomToDates(date, date2);
    });

    dateAxis.events.on("selectionextremeschanged", function() {
      updateFields();
    });

    dateAxis.events.on("extremeschanged", updateFields);

    function updateFields() {
      let minZoomed = dateAxis.minZoomed + am4core.time.getDuration(dateAxis.mainBaseInterval.timeUnit, dateAxis.mainBaseInterval.count) * 0.5;
      document.getElementById("fromfield2").value = chart.dateFormatter.format(minZoomed, inputFieldFormat);
      document.getElementById("tofield2").value = chart.dateFormatter.format(new Date(dateAxis.maxZoomed), inputFieldFormat);
    }

    document.getElementById("fromfield2").addEventListener("keyup", updateZoom);
    document.getElementById("tofield2").addEventListener("keyup", updateZoom);

    let zoomTimeout;
    function updateZoom() {
      if (zoomTimeout) {
        clearTimeout(zoomTimeout);
      }
      zoomTimeout = setTimeout(function() {
        let start = document.getElementById("fromfield2").value;
        let end = document.getElementById("tofield2").value;
        if ((start.length < inputFieldFormat.length) || (end.length < inputFieldFormat.length)) {
          return;
        }
        let startDate = chart.dateFormatter.parse(start, inputFieldFormat);
        let endDate = chart.dateFormatter.parse(end, inputFieldFormat);

        if (startDate && endDate) {
          dateAxis.zoomToDates(startDate, endDate);
        }
      }, 500);
    }

    function zoomToDates(date, date2) {
      //console.log("date, date2", date, date2);
      let min = dateAxis.groupMin["day1"];
      let max = dateAxis.groupMax["day1"];
      dateAxis.keepSelection = true;
      dateAxis.start = (date.getTime() - min)/(max - min);
      dateAxis.end = 1;

      dateAxis.zoom({start:(date.getTime() - min)/(max - min), end:1});
      dateAxis2.zoom({start:(date.getTime() - min)/(max - min), end:1});

      dateAxis2.keepSelection = true;

    }

    /*====================================================================================================*/


  },[])


  useEffect(()=>{


   /* var selector = new am4plugins_rangeSelector.DateAxisRangeSelector();
    selector.container = document.getElementById("selectordiv");
    selector.axis = dateAxis;
    selector.position = "right";
    selector.periods = [
      { name: "1m", interval: { timeUnit: "month", count: 1 }},
      { name: "3m", interval: { timeUnit: "month", count: 3 } },
      { name: "6m", interval: { timeUnit: "month", count: 6 } },
      { name: "1Y", interval: { timeUnit: "year", count: 1 } }
      ]*/

  }, [])

  const [tabs, setTabs] = useState(0)

  return(
    <div>
      <div className={style.headerChart}>Analytics</div>
      <div id={"selectordiv"}/>
      <div id="controls" style={{width: "100%", overflow: "hidden"}} className={style.controls}>
        <div className={style.inputsRow}>
          <div className={style.inputWrap}>
            <div className={style.labelInput}>From:</div>
            <input type="text" id="fromfield2" className={style.input} style={{background: "white"}}/>
          </div>
          <div className={style.inputWrap}>
            <div className={style.labelInput}>  To: </div>
            <input type="text" id="tofield2" className={style.input}  style={{background: "white"}}/>
          </div>

        </div>
        <div className={style.buttons}>
          <button id="b1m" className={style.chartButton}>1m</button>
          <button id="b3m" className={style.chartButton}>3m</button>
          <button id="b6m" className={style.chartButton}>6m</button>
          <button id="b1y" className={style.chartButton}>1y</button>
        {/*  <button id="bytd" className={style.chartButton}>YTD</button>
          <button id="bmax" className={style.chartButton}>MAX</button>*/}
        </div>
      </div>
      <div>
        <div onClick={()=>{setTabs(0)}}>Storage</div>
        <div onClick={()=>{setTabs(1)}}>Operations</div>
      </div>
      <div style={{background: "white"}}>
        <div id="chartdiv2" style={tabs === 0 ? {width: "100%", height: "500px",  maxWidth: "100%", marginBottom: "40px"} : {display: "none"}}/>
        <div id="chartdiv" style={tabs === 1 ? {width: "100%", height: "500px",  maxWidth: "100%"} : {display: "none"}}/>
      </div>

    </div>
  )
}
export default ChartComponent;

