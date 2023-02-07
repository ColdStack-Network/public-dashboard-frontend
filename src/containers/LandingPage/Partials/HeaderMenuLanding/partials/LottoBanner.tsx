import React from "react";
import { Link } from "react-router-dom";
import styles from "./LottoBanner.module.scss";

export const LottoBanner: React.FC = () => {
  return (
    <div className={styles.lottoBanner}>
      <Link to="/lotto/">ColdStack Anniversary Lottery completed</Link>
    </div>
  );
};
