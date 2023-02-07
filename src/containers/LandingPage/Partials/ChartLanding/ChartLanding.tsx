import React, { useEffect, useRef, useState } from "react";
import style from "./chartLanding.module.scss";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { DataItem } from "@amcharts/amcharts5";
import { IColumnSeriesDataItem } from "@amcharts/amcharts5/xy";
import { data } from "./ChartLandingData";
// import { gradient } from "./ChartLandingGradient";

type DataItemCustom = Omit<DataItem<IColumnSeriesDataItem>, "dataContext"> & {
  dataContext: { cloud: string; icon: string };
};

const ChartLanding = (props) => {
  const { coldstack, azure, amazon, google } = props;

  const seriesRef = useRef<am5xy.ColumnSeries | null>(null);

  useEffect(() => {
    const root = am5.Root.new("chartdiv");
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
      })
    );

    root.interfaceColors.set("grid", am5.color(0xe6e9f2));
    root.interfaceColors.set("grid", am5.color(0x7e8599));

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "cloud",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
        }),
        bullet: function (root, axis, dataItem) {
          const customDataItems = dataItem as DataItemCustom;

          return am5xy.AxisBullet.new(root, {
            location: 0.5,
            sprite: am5.Picture.new(root, {
              width: 24,
              height: 24,
              x: am5.percent(30),
              y: am5.percent(30),
              centerY: am5.p0,
              centerX: am5.p50,
              src: customDataItems.dataContext.icon,
            }),
          });
        },
      })
    );

    // We don't want zoom-out button to appear while animating, so we hide it
    chart.zoomOutButton.set("forceHidden", true);

    // offset
    if (window.innerWidth > 533) {
      xAxis.get("renderer").labels.template.setAll({
        paddingTop: 60,
      });
    }
    if (window.innerWidth <= 533) {
      xAxis.get("renderer").labels.template.setAll({
        paddingTop: 600,
      });
    }

    xAxis.data.setAll(data(coldstack, azure, amazon, google));

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraMax: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "cloud",
      })
    );
    seriesRef.current = series;

    //gradient
    // series.columns.template.set(
    //   "fillGradient",
    //   am5.LinearGradient.new(root, {
    //     stops: gradient(am5),
    //     rotation: 0,
    //     target: chart.plotContainer,
    //   })
    // );

    if (window.innerWidth > 533) {
      // Add Label bullet
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            text: "${valueYWorking.formatNumber('#,###.')} / yr",
            fill: root.interfaceColors.get("text"),
            centerY: am5.p100,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });
    }

    series.columns.template.setAll({
      strokeOpacity: 0,
      templateField: "columnSettings",
    });

    series.data.setAll(data(coldstack, azure, amazon, google));

    series.appear(1000);
    chart.appear(1000, 100);
  }, []);

  useEffect(() => {
    if (!seriesRef.current) {
      return;
    }
    const series = seriesRef.current;
    const dataItems = series.dataItems as DataItemCustom[];

    am5.array.each(dataItems, function (dataItem) {
      if (dataItem.dataContext.cloud === "Coldstack") {
        let value = coldstack;
        dataItem.set("valueY", value);
        dataItem.animate({
          key: "valueYWorking",
          to: value,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
      if (dataItem.dataContext.cloud === "Microsoft Azure") {
        let value = azure;
        dataItem.set("valueY", value);
        dataItem.animate({
          key: "valueYWorking",
          to: value,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }

      if (dataItem.dataContext.cloud === "Amazon S3") {
        let value = amazon;
        dataItem.set("valueY", value);
        dataItem.animate({
          key: "valueYWorking",
          to: value,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }

      if (dataItem.dataContext.cloud === "Google Cloud") {
        let value = google;
        dataItem.set("valueY", value);
        dataItem.animate({
          key: "valueYWorking",
          to: value,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    });
  }, [coldstack, amazon, google, azure]);

  return <div className={style.wrapper} id="chartdiv" />;
};

export default ChartLanding;
