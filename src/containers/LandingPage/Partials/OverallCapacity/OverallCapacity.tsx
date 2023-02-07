import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import style from "./overallCapacity.module.scss";
import { hideWidthCounter } from "helpers/common";
import clsx from "clsx";

interface IProps {
  overallCapacity: number;
  visible: boolean;
}

const OverallCapacity = ({ overallCapacity, visible }: IProps) => {
  const overallCapacityNumber4 = overallCapacity;
  const overallCapacityNumber3 = overallCapacityNumber4 - 10740;
  const overallCapacityNumber2 = overallCapacityNumber4 - 1000000;
  const overallCapacityNumber1 = overallCapacity - hideWidthCounter("1", overallCapacity);
  const [roundOverallCapacity, setRoundOverallCapacity] = useState(1);
  const [startNumberOverallCapacity, setStartNumberOverallCapacity] = useState(overallCapacityNumber1);
  const [endNumberOverallCapacity, setEndNumberOverallCapacity] = useState(overallCapacityNumber2);
  const [durationOverallCapacity, setDurationOverallCapacity] = useState(2);
  const countRefContainer = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);

  const [fontSize, setFontsize] = useState<number>(0);
  const changeRound = (roundOverallCapacityTemp, startNumberOverallCapacity, endNumberOverallCapacity) => {
    if (roundOverallCapacityTemp === 1) {
      setStartNumberOverallCapacity(overallCapacityNumber2);
      setEndNumberOverallCapacity(overallCapacityNumber2);
      setRoundOverallCapacity(2);
      setDurationOverallCapacity(0.2);
    } else if (roundOverallCapacityTemp === 2) {
      setStartNumberOverallCapacity(overallCapacityNumber2);
      setEndNumberOverallCapacity(overallCapacityNumber3);
      setRoundOverallCapacity(3);
      setDurationOverallCapacity(1.8);
    } else if (endNumberOverallCapacity < overallCapacity) {
      setStartNumberOverallCapacity(endNumberOverallCapacity + 179);
      setEndNumberOverallCapacity(endNumberOverallCapacity + 179);
      setRoundOverallCapacity(4);
      setDurationOverallCapacity(0.5);
    }
  };

  const ComponentToTrack = () => {
    return (
      <CountUp
        className={clsx(style.countUpVisible, style.countUp)}
        onEnd={
          roundOverallCapacity < 5
            ? () => changeRound(roundOverallCapacity, startNumberOverallCapacity, endNumberOverallCapacity)
            : () => {}
        }
        start={startNumberOverallCapacity}
        end={endNumberOverallCapacity}
        duration={durationOverallCapacity}
        separator=" "
      />
    );
  };

  useEffect(() => {
    const resizeHandler = () => {
      const width = window.innerWidth;
      setWidth(width);
    };
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    const container: number | undefined = countRefContainer.current?.offsetWidth;

    if (container && width > 1200) {
      setFontsize(container / 12);
    }

    if (container && width <= 1200 && width >= 768) {
      setFontsize(container / 12);
    }

    if (container && width < 768) {
      setFontsize((container - 27) / 11.6);
    }

    if (container && width < 533) {
      setFontsize((container - 27) / 11.5);
    }
  }, [width]);

  return (
    <div className={style.overallCapacity}>
      <div className={style.overallCapacityTitle}>Overall capacity</div>
      <div className={style.overallCapacityValue} ref={countRefContainer}>
        <div className={style.countWrapper} style={{ fontSize: fontSize }}>
          <CountUp
            className={clsx(style.countUpHide, style.countUp)}
            start={hideWidthCounter("8", overallCapacity)}
            end={hideWidthCounter("8", overallCapacity)}
            duration={0}
            separator=" "
          />
          {visible && <ComponentToTrack />}
        </div>
        <span className={style.overallCapacityValueLittle}> kb</span>
      </div>
    </div>
  );
};

export default OverallCapacity;
