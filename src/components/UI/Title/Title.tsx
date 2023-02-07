import React from "react";
import style from "./title.module.scss";

interface ITitile {
  color?: string;
  type: string;
  textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
}

const Titile: React.FC<ITitile> = ({ type, color = "#1B2A47", textAlign = "left", children }) => {
  return (
    <>
      {type === "largeTitle" && (
        <h1 className={style.largeTitle} style={{ color: color, textAlign: textAlign }}>
          {children}
        </h1>
      )}

      {type === "largeTitle2" && (
        <h1 className={style.largeTitle2} style={{ color: color, textAlign: textAlign }}>
          {children}
        </h1>
      )}

      {type === "h1" && (
        <h1 className={style.h1} style={{ color: color, textAlign: textAlign }}>
          {children}
        </h1>
      )}

      {type === "h2" && (
        <h2 className={style.h2} style={{ color: color, textAlign: textAlign }}>
          {children}
        </h2>
      )}

      {type === "h3" && (
        <h3 className={style.h3} style={{ color: color, textAlign: textAlign }}>
          {children}
        </h3>
      )}

      {type === "h4" && (
        <h4 className={style.h4} style={{ color: color, textAlign: textAlign }}>
          {children}
        </h4>
      )}

      {type === "h5" && (
        <h5 className={style.h5} style={{ color: color, textAlign: textAlign }}>
          {children}
        </h5>
      )}
    </>
  );
};

export default Titile;
