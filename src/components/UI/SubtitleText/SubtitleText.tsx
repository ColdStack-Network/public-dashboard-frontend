import React from "react";
import style from "./subtitleText.module.scss";

interface ISubtitleText {
  color?: string;
  textalign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
}

const SubtitleText: React.FC<ISubtitleText> = (props, { color = "#6E7E9D", children, textalign = "left" }) => {
  return (
    <div {...props} className={style.secondaryText} style={{ color: color, textAlign: textalign }}>
      {children}
    </div>
  );
};

export default SubtitleText;
