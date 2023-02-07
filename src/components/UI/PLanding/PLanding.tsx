import React from "react";
import style from "./pLanding.module.scss";

interface IPLanding {
  color?: string;
  size?: string;
  textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
}

const PLanding: React.FC<IPLanding> = ({ color = "#6E7E9D", size, textAlign, children }) => {
  return (
    <div className={style.pLanding} style={{ color: color, fontSize: size, textAlign: textAlign }}>
      {children}
    </div>
  );
};

export default PLanding;
