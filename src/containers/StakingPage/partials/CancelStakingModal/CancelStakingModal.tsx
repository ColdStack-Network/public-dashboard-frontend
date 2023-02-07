import Button, { AsyncButton } from "components/UI/Button/Button";
import { CoreModal } from "components/UI/Modal/Modal";
import { CancelStakingState } from "containers/StakingPage/StakingPage";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelStakeAction } from "Redux/Staking/stakingActions";
import { cancelProcessStakeSelector } from "Redux/Staking/stakingReducer";
import styles from "./CancelStakingModal.module.scss";

export const CancelStakingModal: React.FC<{ state: CancelStakingState; close: () => void }> = ({ state, close }) => {
  const { id, isOpen } = state;
  const dispatch = useDispatch();
  const inProcess = useSelector(cancelProcessStakeSelector);

  const cancelStaking = () => {
    if (inProcess) return false;
    id && dispatch(cancelStakeAction({ id, cb: close }));
  };

  return (
    <CoreModal
      title="Cancel Staking"
      titleMargin="38px"
      className={styles.wrapper}
      closeOutClick
      visible={isOpen}
      onClose={close}
    >
      <div className={styles.inner}>
        <p className={styles.text}>Are you sure you want to cancel staking?</p>
        <p className={styles.text}>You will return back your staked tokens.</p>
        <p className={styles.text}>
          <span className={styles.textWarn}>Your reward will be nullified!</span> This action cannot be undone.
        </p>
      </div>

      <div className={styles.footer}>
        <Button onClickHandler={close} color="gray" className={styles.keepBtn}>
          Keep Staking
        </Button>
        <AsyncButton loading={inProcess} color="accent" onClickHandler={cancelStaking}>
          Cancel Staking
        </AsyncButton>
      </div>
    </CoreModal>
  );
};
