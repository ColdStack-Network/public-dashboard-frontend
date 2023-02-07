//@ts-nocheck
import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function am4themes_myTheme(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [am4core.color("#A1BAEA"), am4core.color("#729EF1"), am4core.color("#4E87F3")];
  }
}

const ChartColumns: React.FC = () => {
  useEffect(() => {
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_myTheme);

    // Create chart instance
    const chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        year: "2016",
        europe: 2,
        namerica: 2,
        asia: 4,
        totall: 8,
      },
      {
        year: "2017",
        europe: 20,
        namerica: 5,
        asia: 10,
        totall: 35,
      },
      {
        year: "2018",
        europe: 5,
        namerica: 10,
        asia: 50,
        totall: 65,
      },

      {
        year: "2019",
        europe: 2,
        namerica: 2,
        asia: 4,
        totall: 8,
      },
      {
        year: "2020",
        europe: 20,
        namerica: 5,
        asia: 10,
        totall: 35,
      },
      {
        year: "2021",
        europe: 5,
        namerica: 10,
        asia: 50,
        totall: 65,
      },
      {
        year: "2022",
        europe: 2,
        namerica: 2,
        asia: 4,
        totall: 8,
      },
      {
        year: "2023",
        europe: 20,
        namerica: 5,
        asia: 10,
        totall: 35,
      },
      {
        year: "2024",
        europe: 5,
        namerica: 10,
        asia: 50,
        totall: 65,
      },
    ];

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.calculateTotals = true;

    valueAxis.min = 0;

    // Create series
    function createSeries(field, name, round) {
      // Set up series
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;

      series.dataFields.categoryX = "year";
      series.sequencedInterpolation = true;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY} Gb";

      if (round) {
        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
      }

      // Add label
      const labelBullet = series.bullets.push(new am4charts.LabelBullet());

      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;

      return series;
    }

    createSeries("europe", "delete", false);
    createSeries("namerica", "retrieval", false);
    createSeries("asia", "upload", true);

    // Legend
    chart.legend = new am4charts.Legend();
  }, []);

  return (
    <div>
      <div id="chartdiv" style={{ width: "100%", height: "500px", maxWidth: "100%" }} />
    </div>
  );
};
export default ChartColumns;
