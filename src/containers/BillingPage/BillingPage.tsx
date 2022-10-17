import React, {useEffect, useState} from 'react';
import style from "./billingPage.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "../../reducers";
import Button from "../../components/UI/Button/Button";
import SvgWithDraw from "../../icons/Withdraw";
import SvgWalletAlt from "../../icons/Wallet_alt";
import SvgForm from "../../icons/Form";
import {SvgArrowRightLong, SvgArrowLeftLong} from "../../icons/ArrowsLeftRightLong";
import ChartBilling from "../../components/Charts/ChartBilling/ChartBilling";
import {formatDateTransactions, isFull} from "../../helpers/common";
import EmptyList from "../../components/EmptyList/EmptyList";
import WithdrawModal from "../../components/UI/Modal/WithdrawModal/WithdrawModal";
import DepositingModal from "../../components/UI/Modal/DepositingModal/DepositingModal";
import {ITicket} from "../../actions/interfaces";
import SvgTimeAttack from "../../icons/TimeAtack";
import {createWithdraw, getBillingData} from '../../Redux/account/Actions/accountActions';

const BillingPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  useEffect(() => {


    const fromTotal = new Date(new Date().setMonth(new Date().getMonth() - 1))
    const toTotal = new Date()
    const fromStorage = new Date(new Date().setMonth(new Date().getMonth() - 1))
    const toStorage = new Date()
    const fromBandwidth = new Date(new Date().setMonth(new Date().getMonth() - 1))
    const toBandwidth = new Date()

    dispatch(getBillingData({fromTotal, toTotal, fromStorage, toStorage, fromBandwidth, toBandwidth}))
  }, [dispatch]);


  const transactionsData = useSelector((state: TStore) => state.account.billingData?.[0]);
  const balanceHistory = useSelector((state: TStore) => state.account.billingData?.[1]); // Total
  const trafficSpending = useSelector((state: TStore) => state.account.billingData?.[2]); // Bandwidth
  const storageSpending = useSelector((state: TStore) => state.account.billingData?.[3]); // Storage

  const data = useSelector((state: TStore) => state.account.billingData);


  console.log("state.account.billingData", data)

  const [modalWithdraw, setModalWithdraw] = useState(false);
  const [modalDepositing, setModalDepositing] = useState(false);

  console.log("transactionsData", transactionsData)

  // const onWithdraw = useCallback(( props)=>{
  //   const params = {name : 'email'}
  //
  //
  //       dispatch(createTicket(params));
  //
  // }, [dispatch] )

  function onWithdraw(params: ITicket) {

    console.log("params", params);
    dispatch(createWithdraw(params));
    setModalWithdraw(true)
  }

  return (
    <div className={style.billingPageContainer}>
      <div className={`${style.headerRow} ${style.headerRowCenter}`}>
        <div className={style.titleRow}>
          <div className={`${style.pageTitleCommon} ${style.pageTitle} ${style.billingTitle}`}>
            Billing
          </div>
        </div>

        <div className={style.buttonsRow}>
          <div className={style.buttonWrap}>
            <Button color={"accent"} size={"big"}
                    onClickHandler={() => {
                      setModalWithdraw(true)
                    }}>Withdraw Tokens</Button>
          </div>
          <div className={style.buttonWrap}>
            <Button color={"primary"} size={"big"}
                    onClickHandler={() => {
                      setModalDepositing(true)
                    }}>
              Deposit Tokens</Button>
          </div>
          <div className={style.mobileButtonWrap}>
            <Button color={"accent"} size={"big"} onClickHandler={() => {
              setModalWithdraw(true)
            }}><SvgWithDraw/></Button>
          </div>
          <div className={style.mobileButtonWrap}>
            <Button color={"primary"} size={"big"} onClickHandler={() => {
              setModalDepositing(true)
            }}><SvgWalletAlt color={"white"}/></Button>
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

      <div className={`${style.block} ${style.transactions}`}>
        <div className={style.transactionsTitle}>
          Transaction history
        </div>
        {!isFull(transactionsData) && transactionsData !== "error" && <EmptyList onClick={() => {
        }} textButton={""}
                                                                                 noBorder={true} noButton={true}
                                                                                 icon={<SvgForm/>}>
          You have no transactions yet</EmptyList>
        }
        {transactionsData === "error" &&
        <EmptyList onClick={() => {
        }}
                   textButton={""}
                   noBorder={true} noButton={true}
                   icon={<SvgTimeAttack/>}>
          Retreaving data...</EmptyList>
        }
        {isFull(transactionsData) && transactionsData !== "error" && transactionsData.map((item) => {
          const isSuccess = item.status === "SUCCESS";
          const toRight = item.type === "FROM_ETH_TO_PARACHAIN";
          return <div className={style.transactionsRow}>
            <div
              className={`${style.label} ${isSuccess ? style.labelSuccess : style.labelFailed}`}>{isSuccess ? "Success" : "Failed"}</div>
            <div className={style.wrapRight}>
              <div className={style.transactionInfo}>
                <div className={style.wrapCLS}>
                  {item.transactionFee && item.transactionFeeUnit &&
                  <>
                    <span className={style.amount}>{item.amount} CLS (ETH) +&nbsp;</span>
                    <span className={style.fee}>{item.transactionFee} {item.transactionFeeUnit}</span>
                  </>
                  }
                  {item.type === 'GIFT' &&
                  <span className={style.fee}>GIFT</span>
                  }
                </div>
                <div className={style.wrapTokens}>
                  <div className={style.arrow}>
                    {toRight || item.type === 'GIFT' ? <SvgArrowRightLong/> : <SvgArrowLeftLong/>}
                  </div>
                  <div className={`${style.tokens} ${toRight || item.type === 'GIFT' ? style.tokensSuccess : style.tokensError}`}>
                    {item.amount} CLS
                  </div>
                </div>
              </div>
              <div className={style.date}>
                {formatDateTransactions(item.date)}
                {/*03.09.2021 14:23*/}
              </div>
            </div>
          </div>
        })}
      </div>

      <WithdrawModal
        visible={modalWithdraw}
        topic={'Withdraw'}
        subTopic={'!!! Withdraw'}
        onClose={() => {
          setModalWithdraw(false)
        }}
        onSubmit={onWithdraw}
      />

      <DepositingModal
        visible={modalDepositing}
        onClose={() => {
          setModalDepositing(false)
        }}
      />

    </div>
  )
}
export default BillingPage;
