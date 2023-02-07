import EmptyList from "components/EmptyList/EmptyList";
import stakeImg from "images/stake.svg";
import React, { useEffect, useState } from "react";
import { StakeButton } from "./partials/StakeButton/StakeButton";
import styles from "./StakingPage.module.scss";
import { format } from "date-fns";
import Button from "components/UI/Button/Button";
import { MakeStakeModal } from "./partials/MakeStakeModal/MakeStakeModal";
import { CancelStakingModal } from "./partials/CancelStakingModal/CancelStakingModal";
import { StakeId } from "models/TO_IDS";
import { useDispatch, useSelector } from "react-redux";
import { selectStakes, shouldUpdateHistorySelector, stakingState } from "Redux/Staking/stakingReducer";
import { Stake, StakeDate, StakeStatusEnum } from "models/Staking";
import { getStakesHistoryAction } from "Redux/Staking/stakingActions";
import clsx from "clsx";
import { Spinner } from "components/UI/Spinner/Spinner";

type TableItem<T> = {
  label: string;
  className?: string;
  render: (x: T) => JSX.Element;
};

export type CancelStakingState = {
  isOpen: boolean;
  id: StakeId | null;
};
const formatCLS = (value: number) => (Number(value) / 1e18).toFixed(2);
const convertStakeDay = (day: StakeDate) => new Date(Number(day) * 1000);
const dateFormatter = (date: StakeDate) => format(convertStakeDay(date), "MM.dd.yyyy");

export const getStakedDays = (stake: Stake) => {
  return parseInt(((parseInt(stake.finish) - parseInt(stake.start)) / (3600 * 24)).toString());
};

export const calculateApy = (days: number) => {
  switch (true) {
    case days < 32: {
      return 8;
    }
    case days < 63: {
      return 10;
    }
    case days < 94: {
      return 12;
    }
    default:
      return 8;
  }
};
enum StatusColorEnum {
  active = "#34d399",
  processing = "#facc15",
  cancel = "#ef4444",
  finish = "#154db8",
}

export const StakingPage: React.FC = () => {
  const stakeHistory = useSelector(selectStakes);
  const shouldRecallStakeHistory = useSelector(shouldUpdateHistorySelector);
  const { error, historyInProcess } = useSelector(stakingState);
  const [cancelState, setCancelState] = useState<CancelStakingState>({ isOpen: false, id: null });
  const [makeStake, setMakeStakeState] = useState(false);
  const items: Array<TableItem<Stake>> = [
    { label: "Start Date", render: (x) => <span>{dateFormatter(x.start)}</span> },
    { label: "End Date", render: (x) => <span>{dateFormatter(x.finish)}</span> },
    { label: "Staked", render: (x) => <span>{formatCLS(x.amount)}</span> },
    { label: "APY", render: (x) => <span>{calculateApy(getStakedDays(x))}%</span> },
    { label: "Reward", render: (x) => <span>{x.status === StakeStatusEnum.cancel ? "-" : formatCLS(x.reward)}</span> },
    {
      label: "Status",
      render: (x) => (
        <span style={{ color: StatusColorEnum[x.status] }}>
          {x.status === StakeStatusEnum.processing ? "depositing" : x.status}
        </span>
      ),
    },
  ];

  const showHistory = !error && !historyInProcess && stakeHistory.length > 0;
  const showEmptyList = !error && !historyInProcess && stakeHistory.length === 0;

  const dispatch = useDispatch();
  const handleCloseCancelStake = () => setCancelState({ isOpen: false, id: null });
  const cancelStake = (id: StakeId) => setCancelState({ isOpen: true, id });

  useEffect(() => {
    dispatch(getStakesHistoryAction());
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (shouldRecallStakeHistory) {
        dispatch(getStakesHistoryAction());
      }
    }, 6_000);

    return () => {
      clearInterval(intervalID);
    };
  }, [shouldRecallStakeHistory]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Staking</h2>
        <StakeButton onClick={() => setMakeStakeState(true)} />
      </div>
      <div className={styles.content}>
        {error && <div>Sorry Service temporary unavalible, try again later...</div>}
        {historyInProcess && <Spinner />}
        {showEmptyList && (
          <EmptyList
            className={styles.emptyList}
            icon={<img src={stakeImg} />}
            onClick={() => setMakeStakeState(true)}
            textButton="Stake Tokens"
          >
            You have not staked anything yet
          </EmptyList>
        )}
        {showHistory && (
          <div className={styles.tableWrapper}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr className={styles.tableHeadRow}>
                    {items.map((x) => (
                      <th className={styles.tableHeadItem} key={x.label}>
                        {x.label}
                      </th>
                    ))}
                    <th className={styles.tableHeadItem}></th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {stakeHistory.map((stake) => (
                    <tr
                      key={stake.id}
                      className={clsx(
                        styles.tableBodyRow,
                        stake.status !== StakeStatusEnum.processing && styles.tableBodyRowCanceled
                      )}
                    >
                      {items.map((x, idx) => (
                        <td key={idx} className={styles.tableBodyRowItem}>
                          {x.render(stake)}
                        </td>
                      ))}
                      <td className={styles.tableBodyRowItem}>
                        {stake.status === StakeStatusEnum.active && (
                          <Button
                            onClickHandler={() => cancelStake(stake.id)}
                            className={styles.cancelButton}
                            color="outlined"
                          >
                            Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <CancelStakingModal state={cancelState} close={handleCloseCancelStake} />
      <MakeStakeModal visible={makeStake} close={() => setMakeStakeState(false)} />
    </div>
  );
};
