import React from "react";
import style from "./calculatorTabs.module.scss";
import clsx from "clsx";

const CalculatorTabs = ({ typeSavedMethod, onChange }) => {
  const tabs = [
    {
      name: "Standard",
      type: "standard",
    },
    {
      name: "Intelligent Tiering",
      type: "intelligentTiering",
    },
    {
      name: "Standard IA",
      type: "standardIA",
    },
    {
      name: "Glacier",
      type: "glacier",
    },
    {
      name: "Deep Archive",
      type: "deepArchive",
    },
  ];

  return (
    <div className={style.tabsBlock}>
      <div className={style.tabsWrapper}>
        <div className={style.tabsContent}>
          {tabs.map((item) => (
            <div
              className={clsx(style.tabItem, item.type === typeSavedMethod && style.tabItemActive)}
              key={item.type}
              onClick={() => onChange(item.type)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorTabs;
