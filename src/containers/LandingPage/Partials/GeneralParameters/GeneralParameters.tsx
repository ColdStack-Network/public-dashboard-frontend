import React, { useEffect, useRef, useState } from "react";
import style from "./generalParameters.module.scss";
import OverallCapacity from "../OverallCapacity/OverallCapacity";
import StoredFiles from "../StoredFiles/StoredFiles";
import clsx from "clsx";
import TotalUsersCounter from "../TotalUsersCounter/TotalUsersCounter";
import dots3x3 from "images/dots3x3.png";
import dots3x4 from "images/dots3x4.png";
import dots3x5 from "images/dots3x5.png";
import dots3x6 from "images/dots3x6.png";
import dots6x4 from "images/dots6x4.png";
import dots10x5 from "images/dots10x5.png";
import dots10x6 from "images/dots10x6.png";

interface IProps {
  overallCapacity?: number;
  totalUsers?: number;
  storedFiles?: number;
}

const GeneralParameters: React.FC<IProps> = ({
  overallCapacity = 4271114562039870,
  totalUsers = 5327,
  storedFiles = 492771934,
}) => {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "5px",
      threshold: 0.3,
    };

    let callback = function (entries, observer) {
      for (const entry of entries) {
        const { isIntersecting, target } = entry;
        if (isIntersecting) {
          setVisible(true);
          observer.unobserve(target);
        }
      }
    };

    const observer = new IntersectionObserver(callback, options);
    const target = rootRef.current!;
    observer.observe(target);
  }, []);

  return (
    <div className={style.wrapper} ref={rootRef}>
      <div className={style.overallCapacityWrapper}>
        <OverallCapacity visible={visible} overallCapacity={overallCapacity} />
      </div>
      <div className={style.wrapperTotalUsersSharedFiles}>
        <div className={style.totalUsers}>
          <div className={style.secondaryValue}>
            <TotalUsersCounter visible={visible} totalUsers={totalUsers} />
          </div>
          <div className={style.secondarySubtitle}>Total users</div>
        </div>
        <div className={clsx(style.dots, style.dots3x6)}>
          <img src={dots3x6} alt="dots3x6" />
        </div>
        <div className={clsx(style.dots, style.dots3x5)}>
          <img src={dots3x5} alt="dots3x5" />
        </div>
        <div className={clsx(style.dots, style.dots3x4)}>
          <img src={dots3x4} alt="dots3x4" />
        </div>
        <div className={clsx(style.dots, style.dots3x3)}>
          <img src={dots3x3} alt="dots3x3" />
        </div>
        <div className={style.sharedFiles}>
          <div className={style.secondaryValue}>
            <StoredFiles storedFiles={storedFiles} visible={visible} />
          </div>
          <div className={style.secondarySubtitle}>Stored files</div>
        </div>
        <div className={clsx(style.dots, style.dots10x6)}>
          <img src={dots10x6} alt="dots6x10" />
        </div>
        <div className={clsx(style.dots, style.dots10x5)}>
          <img src={dots10x5} alt="dots10x5" />
        </div>
        <div className={clsx(style.dots, style.dots6x4)}>
          <img src={dots6x4} alt="dots6x4" />
        </div>
      </div>
    </div>
  );
};

export default GeneralParameters;
