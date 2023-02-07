import { Stake, StakingBody } from "models/Staking";
import { StakeId } from "models/TO_IDS";

export enum StakeActionTypes {
  SET_STAKES = "SET_STAKES",
  GET_STAKE_HISTORY = "GET_STAKE_HISTORY",
  CREATE_STAKE = "CREATE_STAKE",
  ADD_STAKE = "ADD_STAKE",
  CANCEL_STAKE_REQUEST = "CANCEL_STAKE_REQUEST",
  UPDATE_STATUS_STAKE = "UPDATE_STATUS_STAKE",
  SET_STAKE_PROCESS = "SET_STAKE_PROCESS",
  SET_CANCEL_PROCESS = "SET_CANCEL_PROCESS",
  SET_HISTORY_PROCESS = "SET_HISTORY_PROCESS",
  SET_STAKING_ERROR = "SET_STAKING_ERROR",
}
export type GetStakesAction = {
  type: StakeActionTypes.GET_STAKE_HISTORY;
};
export type SetStakeProcessAction = {
  type: StakeActionTypes.SET_STAKE_PROCESS;
  payload: boolean;
};
export type SetCancelStakeProcessAction = {
  type: StakeActionTypes.SET_STAKE_PROCESS;
  payload: boolean;
};
export type SetHistoryProcess = {
  type: StakeActionTypes.SET_HISTORY_PROCESS;
  payload: boolean;
};
export type SetStakesHistoryAction = {
  type: StakeActionTypes.SET_STAKES;
  payload: Stake[];
};
export type MakeStakeActionPayload = {
  stake: StakingBody;
  cb: () => void;
};
export type CreateStakeAction = {
  type: StakeActionTypes.CREATE_STAKE;
  payload: MakeStakeActionPayload;
};
export type AddStakeAction = {
  type: StakeActionTypes.ADD_STAKE;
  payload: Stake;
};
export type UpdateStatusStake = {
  type: StakeActionTypes.UPDATE_STATUS_STAKE;
  payload: Stake;
};
export type CancelStakeRequestAction = {
  type: StakeActionTypes.CANCEL_STAKE_REQUEST;
  payload: { id: StakeId; cb: () => void };
};
export const getStakesHistoryAction = () => ({ type: StakeActionTypes.GET_STAKE_HISTORY });
export const setStakeHistoryAction = (payload: Stake[]) => ({
  type: StakeActionTypes.SET_STAKES,
  payload,
});
export const makeStakeAction = (payload: MakeStakeActionPayload) => ({
  type: StakeActionTypes.CREATE_STAKE,
  payload,
});
export const addStakeAction = (payload: Stake) => ({
  type: StakeActionTypes.ADD_STAKE,
  payload,
});
export const updateStakeStatusAction = (payload: Stake) => ({
  type: StakeActionTypes.UPDATE_STATUS_STAKE,
  payload,
});
export const cancelStakeAction = (payload: { id: StakeId; cb: () => void }) => ({
  type: StakeActionTypes.CANCEL_STAKE_REQUEST,
  payload,
});
export const setStakeProcessAction = (payload: boolean) => ({
  type: StakeActionTypes.SET_STAKE_PROCESS,
  payload,
});
export const setCancelStakeProcessAction = (payload: boolean) => ({
  type: StakeActionTypes.SET_CANCEL_PROCESS,
  payload,
});
export const setHistoryProcessAction = (payload: boolean) => ({
  type: StakeActionTypes.SET_HISTORY_PROCESS,
  payload,
});

export type SetStakingErrAction = {
  type: StakeActionTypes.SET_STAKING_ERROR;
  payload: string;
};

export const setStakingError = (error: string) => ({
  type: StakeActionTypes.SET_STAKING_ERROR,
  payload: error,
});
