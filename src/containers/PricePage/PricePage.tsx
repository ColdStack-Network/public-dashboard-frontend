import clsx from "clsx";
import Calculator from "containers/LandingPage/Partials/Calculator/Calculator";
import Footer from "containers/LandingPage/Partials/Footer/Footer";
import HeaderMenuLanding from "containers/LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPriceLanding } from "Redux/account/Actions/accountActions";
import { selectPriceLanding } from "Redux/account/Selectors/selectPriceLanding";
import styles from "./PricePage.module.scss";
import MetaTags from "react-meta-tags";
import Title from "../../components/UI/Title/Title";
import Container from "../../components/Container/Container";

const TABLE_DATA = [
  ["Standard", "128 KB", "30 days", "$0.004", "$0.001"],
  ["Intelligent-Tiering", "128 KB", "30 days", "$0.0035", "$0.001"],
  ["Standard-IA", "1,024 KB", "30 days", "$0.003", "$0.0015"],
  ["Glacier Instant Retrieval", "10 Mb", "30 days", "$0.002", "$0.037"],
  ["Glacier Flexible Retrieval", "10 Mb", "90 days", "$0.0017", "$0.032"],
  ["Glacier Deep Archive", "10 Mb", "180 days", "$0.00099", "$0.015"],
];

export const PricePage: React.FC = () => {
  const price = useSelector(selectPriceLanding);
  const dispatch = useDispatch();

  useMemo(() => dispatch(getPriceLanding()), [dispatch]);

  return (
    <div className={styles.wrapper}>
      <MetaTags>
        <title>ColdStack: Price</title>
        <meta name="description" content="ColdStack: Price" />
      </MetaTags>
      <div className={clsx(styles.header, styles.waves)}>
        <Container>
          <div className={styles.hat}>
            <HeaderMenuLanding />
          </div>
          <div className={styles.banner}>
            <h1>
              Cloud Storage <br />
              more affordable than ever
            </h1>
            <p>
              Decentralization means that every person can put their spare computer space to work, ultimately leading to
              more competition and never before seen prices.
            </p>
          </div>
        </Container>
      </div>

      <div className={styles.analysis}>
        <Title type="h2" textAlign="center">
          Current Prices
        </Title>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeadItemFirst}></th>
                <th className={styles.tableHeadItem}>Minimum capacity charge per object</th>
                <th className={styles.tableHeadItem}>Minimum storage duration charge</th>
                <th className={styles.tableHeadItem}>Storage fee, per Gb</th>
                <th className={styles.tableHeadItem}>Bandwidth fee, per Gb</th>
              </tr>
            </thead>

            <tbody className={styles.tableBody}>
              {TABLE_DATA.map((row, idx) => (
                <tr className={styles.tableRow} key={idx}>
                  {row.map((label, r_idx) => (
                    <td key={r_idx}>
                      <span className={clsx(styles.tableItem, r_idx === 0 && styles.tableItemFirstInRow)}>{label}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={clsx(styles.tansparency, styles.waves)}>
        <Title type="h2" textAlign="center">
          Price Transparency
        </Title>
        <p className={styles.tansparencyText}>
          At <b>ColdStack</b>, we believe very strongly in the concept of a fair price and accessibility to all. This
          means that there are no additional hidden charges and you pay only what you see.
        </p>
        <p className={styles.tansparencyText}>
          The pricing is customized based on your requirements and only your requirements, there are no subscription
          fees or membership required.
        </p>
        <p className={styles.tansparencyText}>
          Billing is done every 30 days, to the exact hour of a user's first upload. <br /> Charges are recorded every
          10 minutes.
        </p>
      </div>

      <div className={styles.calculator}>
        <Calculator price={price} />
      </div>

      <Footer />
    </div>
  );
};
