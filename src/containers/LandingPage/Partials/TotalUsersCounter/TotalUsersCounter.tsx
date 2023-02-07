import React from "react";
import style from "./totalUsersCounter.module.scss";
import CountUp from "react-countup";
import { hideWidthCounter } from "helpers/common";

interface ITotalUsers {
  totalUsers: number;
  visible: boolean;
}

const TotalUsersCounter = ({ visible, totalUsers }: ITotalUsers) => {
  const totalUsersNumber1 = 1062;
  const durationTotalUsers = 4;

  return (
    <>
      <CountUp
        className={style.countUpHide}
        start={hideWidthCounter(8, totalUsers)}
        end={hideWidthCounter(8, totalUsers)}
        duration={0}
        separator=" "
      />
      {visible && (
        <CountUp
          className={style.countUp}
          start={totalUsersNumber1}
          end={totalUsers}
          duration={durationTotalUsers}
          separator=" "
        />
      )}
    </>
  );
};

export default TotalUsersCounter;
