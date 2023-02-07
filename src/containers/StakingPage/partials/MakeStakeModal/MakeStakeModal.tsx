import clsx from "clsx";
import { CoreModal } from "components/UI/Modal/Modal";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "Redux/user/Selectors/selectUserData";
import styles from "./MakeStakeModal.module.scss";
import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledText } from "components/ControlledElements/ControlledElements";
import { DayOption } from "./partrials/DayOption";
import Button, { AsyncButton } from "components/UI/Button/Button";
import { makeStakeAction } from "Redux/Staking/stakingActions";
import { calculateApy } from "containers/StakingPage/StakingPage";
import { processStakeSelector } from "Redux/Staking/stakingReducer";

type FormFields = {
  amount: number;
  days: number;
  maxValue: number;
};
type DayOptionStruct = {
  label: string;
  value: number;
};

const Schema = yup.object({
  amount: yup
    .number()
    .min(1, "Minimum amount is 1 CLS")
    .max(yup.ref("maxValue"), "Insufficient funds in balance")
    .required("Amount CLS must be filled")
    .typeError("Amount CLS must be filled"),
  days: yup.number().required().label("Time"),
});

const DAYS: DayOptionStruct[] = [
  {
    label: "30 days",
    value: 30,
  },
  {
    label: "60 days",
    value: 60,
  },
  {
    label: "90 days",
    value: 90,
  },
];
export const MakeStakeModal: React.FC<{ visible: boolean; close: () => void }> = ({ visible, close }) => {
  const { balanceCLS } = useSelector(selectUserData);
  const { control, trigger, getValues, setValue } = useForm<FormFields>({
    resolver: yupResolver(Schema),
    defaultValues: { amount: 1, days: 30, maxValue: Number(balanceCLS) },
    mode: "all",
  });
  const days = useWatch({
    control,
    name: "days",
  });
  const amount = useWatch({
    control,
    name: "amount",
  });
  const inProcess = useSelector(processStakeSelector);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const valid = await trigger();
    if (!valid || inProcess) return false;
    const { amount, days } = getValues();
    dispatch(makeStakeAction({ stake: { amount: Math.trunc(amount), days }, cb: close }));
  };
  const APY = useMemo(() => calculateApy(days), [days]);
  const onClickMax = () => {
    setValue("amount", Math.trunc(Number(balanceCLS)));
    trigger();
  };
  const calcDayIncome = () => {
    if (!amount) return 0;
    const dailyIncome = (APY / 36_500) * amount;
    return dailyIncome.toFixed(4);
  };

  useEffect(() => {
    setValue("maxValue", Number(balanceCLS));
  }, [balanceCLS]);

  return (
    <CoreModal title="Staking" className={styles.modal} visible={visible} closeOutClick onClose={close}>
      <div className={styles.result}>
        <div className={clsx(styles.resultCol)}>
          <h3 className={styles.resultTitle}>% APY:</h3>
          <span className={clsx(styles.apy, styles.resultValue)}>{APY}%</span>
        </div>
        <div className={clsx(styles.resultCol)}>
          <h3 className={styles.resultTitle}>Daily income:</h3>
          <span className={clsx(styles.income, styles.resultValue)}>~{calcDayIncome()} CLS/Day</span>
        </div>
      </div>

      <div className={styles.formControl}>
        <ControlledText
          labelExtraContent={
            <div className={styles.extra}>
              <span className={styles.extraValue}>{balanceCLS}</span>
              <span onClick={onClickMax} className={styles.max}>
                MAX
              </span>
            </div>
          }
          inputSign="CLS"
          type="number"
          name="amount"
          control={control}
          label="Enter an amount"
        />
      </div>

      <div className={clsx(styles.formControl, styles.formControlDays)}>
        {DAYS.map((day) => (
          <DayOption
            key={day.value}
            className={styles.dayOption}
            optionValue={day.value}
            label={day.label}
            control={control}
            name="days"
          />
        ))}
      </div>

      <div className={styles.footer}>
        <Button onClickHandler={close} className={styles.cancel} color="gray">
          Cancel
        </Button>
        <AsyncButton onClickHandler={onSubmit} loading={inProcess}>
          Stake
        </AsyncButton>
      </div>
    </CoreModal>
  );
};
