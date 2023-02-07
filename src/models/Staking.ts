export type StakingDays = 30 | 60 | 90 | number;

export type StakingBody = {
  days: StakingDays;
  amount: number;
};
export enum StakeStatusEnum {
  active = "active",
  processing = "processing",
  cancel = "cancel",
  finish = "finish",
}
// special date format need to be converter w/ formula * 1000 and cast to number
export type StakeDate = string;
export type Stake = {
  id: number;
  finish: StakeDate;
  start: StakeDate;
  status: StakeStatusEnum;
  amount: number;
  reward: number;
};

export type MakeStakeRep = Stake;
export type DeleteStakeRep = Stake;
