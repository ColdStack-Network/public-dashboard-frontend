import React from "react";
import style from "./breadCrumbs.module.scss";
import { useHistory } from "react-router-dom";
import { uriEncode } from "../../../helpers/common";

export type breadCrumbItem = {
  title: string;
  path?: string;
};

interface IProps {
  items: breadCrumbItem[];
  beforeLink: () => void;
}

const Breadcrumbs: React.FC<IProps> = ({ items, beforeLink }) => {
  const history = useHistory();
  const lastIdx = items.length - 1;
  return (
    <div className={style.container}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index < lastIdx && (
            <div
              className={style.item}
              onClick={() => {
                beforeLink();
                history.push(uriEncode(item?.path || "", false));
              }}
            >
              <div className={style.itemText}>{item.title}</div>
              <div className={style.itemAfter}>/</div>
            </div>
          )}
          {index === lastIdx && <div className={`${style.item} ${style.itemActive}`}> {item.title}</div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
