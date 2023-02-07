import React, { useEffect, useState } from "react";
import style from "./billingPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/UI/Button/Button";
import SvgWithDraw from "../../icons/Withdraw";
import SvgWalletAlt from "../../icons/Wallet_alt";
import SvgForm from "../../icons/Form";
import { SvgArrowRightLong, SvgArrowLeftLong } from "../../icons/ArrowsLeftRightLong";
import { ChartBilling } from "../../components/Charts/ChartBilling/ChartBilling";
import { formatDateTransactions, isFull, voidCallback } from "../../helpers/common";
import EmptyList from "../../components/EmptyList/EmptyList";
import { DepositingModal } from "../../components/UI/Modal/DepositingModal/DepositingModal";
import OldWithdrawModal from "../../components/UI/Modal/OldWithdrawModal/WithdrawModal";
import { ITicket } from "../../actions/interfaces";
import SvgTimeAttack from "../../icons/TimeAtack";
import { selectTransactionData } from "../../Redux/account/Selectors/selectTransactionData";
import { selectBalanceHistory } from "../../Redux/account/Selectors/selectBalanceHistory";
import { selectTrafficSpending } from "../../Redux/account/Selectors/selectTrafficSpending";
import { selectStorageSpending } from "../../Redux/account/Selectors/selectStorageSpending";
import { createWithdrawalOld, getBillingData } from "../../Redux/account/Actions/accountActions";
import clsx from "clsx";

const TransactionType: React.FC<{ type: string }> = ({ type }) => {
  const specialTypes = ["cancelStaking", "endStaking", "rewardStaking", "startStaking"];
  const specialTypeLabels = {
    cancelStaking: "STAKING",
    endStaking: "STAKING",
    rewardStaking: "REWARD",
    startStaking: "STAKING",
  };
  return (
    <span className={style.fee}>
      {specialTypes.includes(type) ? specialTypeLabels[type] : type.split("_").join(" ")}
    </span>
  );
};

const BillingPage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const from = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const to = new Date(new Date().setHours(23, 59));

    dispatch(getBillingData({ from, to }));
  }, [dispatch]);

  const transactionsData = useSelector(selectTransactionData);
  const balanceHistory = useSelector(selectBalanceHistory);
  const trafficSpending = useSelector(selectTrafficSpending);
  const storageSpending = useSelector(selectStorageSpending);
  const [modalWithdraw, setModalWithdraw] = useState(false);
  const [modalDepositing, setModalDepositing] = useState(false);

  function onWithdraw(params: ITicket) {
    dispatch(createWithdrawalOld(params));
    setModalWithdraw(true);
  }

  const INCOME_TYPES = ["FROM_ETH_TO_PARACHAIN", "GIFT", "cancelStaking", "endStaking", "rewardStaking"];
  const isIncomeTransaction = (type: string) => INCOME_TYPES.includes(type);

  return (
    <div className={style.billingPageContainer}>
      <div className={`${style.headerRow} ${style.headerRowCenter}`}>
        <div className={style.titleRow}>
          <div className={`${style.pageTitleCommon} ${style.pageTitle} ${style.billingTitle}`}>Billing</div>
        </div>
        <div className={style.buttonsRow}>
          <div className={style.buttonWrap}>
            <Button color="accent" size="big" onClickHandler={() => setModalWithdraw(true)}>
              Withdraw Tokens
            </Button>
          </div>
          <div className={style.buttonWrap}>
            <Button color="primary" size="big" onClickHandler={() => setModalDepositing(true)}>
              Deposit Tokens
            </Button>
          </div>
          <div className={style.mobileButtonWrap}>
            <Button color="accent" size="big" onClickHandler={() => setModalWithdraw(true)}>
              <SvgWithDraw />
            </Button>
          </div>
          <div className={style.mobileButtonWrap}>
            <Button color="primary" size="big" onClickHandler={() => setModalDepositing(true)}>
              <SvgWalletAlt color="white" />
            </Button>
          </div>
        </div>
      </div>
      <div className={style.chartBlock}>
        <ChartBilling
          billingTotal={balanceHistory}
          billingBandwidth={trafficSpending}
          billingStorage={storageSpending}
        />
      </div>

      <div className={clsx(style.block, style.transactions)}>
        <div className={style.transactionsTitle}>Transaction history</div>
        {!isFull(transactionsData) && transactionsData !== "error" && (
          <EmptyList onClick={voidCallback} textButton="" noBorder={true} noButton={true} icon={<SvgForm />}>
            You have no transactions yet
          </EmptyList>
        )}
        {transactionsData === "error" && (
          <EmptyList onClick={voidCallback} textButton="" noBorder={true} noButton={true} icon={<SvgTimeAttack />}>
            Retreaving data...
          </EmptyList>
        )}
        {isFull(transactionsData) &&
          Array.isArray(transactionsData) &&
          transactionsData.map((item) => {
            const isSuccess = item.status === "SUCCESS";

            return (
              <div key={item.date} className={style.transactionsRow}>
                <div className={clsx(style.label, isSuccess ? style.labelSuccess : style.labelFailed)}>
                  {isSuccess ? "Success" : "Failed"}
                </div>
                <div className={style.wrapRight}>
                  <div className={style.transactionInfo}>
                    <div className={style.wrapCLS}>{item.type && <TransactionType type={item.type} />}</div>
                    <div className={style.wrapTokens}>
                      <div className={style.arrow}>
                        {isIncomeTransaction(item.type) ? <SvgArrowRightLong /> : <SvgArrowLeftLong />}
                      </div>
                      <div
                        className={clsx(
                          style.tokens,
                          isIncomeTransaction(item.type) ? style.tokensSuccess : style.tokensError
                        )}
                      >
                        {Number(item.amount).toFixed(2)} CLS
                      </div>
                    </div>
                  </div>
                  <div className={style.date}>
                    {formatDateTransactions(item.date)}
                    {/*03.09.2021 14:23*/}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <OldWithdrawModal
        visible={modalWithdraw}
        topic="Withdraw"
        subTopic="!!! Withdraw"
        onClose={() => setModalWithdraw(false)}
        onSubmit={onWithdraw}
      />
      <DepositingModal visible={modalDepositing} onClose={() => setModalDepositing(false)} />
    </div>
  );
};
export default BillingPage;
