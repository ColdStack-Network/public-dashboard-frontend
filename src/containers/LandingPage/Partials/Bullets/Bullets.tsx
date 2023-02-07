import React from "react";
import style from "./bullets.module.scss";

type Bullet = { icon: JSX.Element; title: string; subtitle: string };

const Bullets = ({ bullets }: { bullets: Bullet[] }) => {
  return (
    <div className={style.wrapper}>
      {bullets.map((item) => (
        <div key={item.title} className={style.itemWrapper}>
          <div className={style.itemIcon}>{item.icon}</div>
          <div className={style.itemTitle}>{item.title}</div>
          <div className={style.itemSubtitle}>{item.subtitle}</div>
        </div>
      ))}
    </div>
  );
};

export default Bullets;
