import { changeArrayElementByIdx } from "helpers/utils";
import { Stake, StakeStatusEnum } from "models/Staking";
import { TStore } from "reducers";
import { createSelector } from "reselect";
import {
  AddStakeAction,
  GetStakesAction,
  SetHistoryProcess,
  SetStakeProcessAction,
  SetStakesHistoryAction,
  SetStakingErrAction,
  StakeActionTypes,
  UpdateStatusStake,
} from "./stakingActions";
import { filter, sortBy } from "lodash";
import { string } from "yup";

type StakingState = {
  stakes: Stake[];
  inProcess: boolean;
  cancelStakeProcess: boolean;
  historyInProcess: boolean;
  error: string;
};

type ActionType =
  | GetStakesAction
  | SetStakesHistoryAction
  | AddStakeAction
  | UpdateStatusStake
  | SetStakeProcessAction
  | SetHistoryProcess
  | SetStakingErrAction;

const initialState: StakingState = {
  stakes: [],
  inProcess: false,
  cancelStakeProcess: false,
  historyInProcess: false,
  error: "",
};
export const stakingReducer = (state = initialState, action: ActionType): StakingState => {
  switch (action.type) {
    case StakeActionTypes.SET_STAKES: {
      return { ...state, stakes: action.payload };
    }
    case StakeActionTypes.ADD_STAKE: {
      return { ...state, stakes: [...state.stakes, action.payload] };
    }
    case StakeActionTypes.UPDATE_STATUS_STAKE: {
      const oldStakes = state.stakes;
      const idx = oldStakes.findIndex((el) => el.id === action.payload.id);
      if (idx === -1) return state;
      return { ...state, stakes: changeArrayElementByIdx(idx, action.payload, oldStakes) };
    }
    case StakeActionTypes.SET_STAKE_PROCESS: {
      return { ...state, inProcess: action.payload };
    }
    case StakeActionTypes.SET_HISTORY_PROCESS: {
      return { ...state, historyInProcess: action.payload };
    }
    case StakeActionTypes.SET_STAKING_ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
const stakingSelector = (state: TStore) => state.staking;
export const stakingState = createSelector([stakingSelector], (x) => x);
export const selectStakes = createSelector([stakingSelector], (stakingState) => {
  const noCanceledStakes = filter(stakingState.stakes, (x) => x.status !== StakeStatusEnum.cancel);
  const sortedStakes = sortBy(noCanceledStakes, "status");
  return sortedStakes;
});
export const processStakeSelector = createSelector([stakingSelector], (state) => state.inProcess);
export const cancelProcessStakeSelector = createSelector([stakingSelector], (state) => state.cancelStakeProcess);
export const shouldUpdateHistorySelector = createSelector([stakingSelector], ({ historyInProcess, stakes }) => {
  const hasStakeInProcess = stakes.some((stake) => stake.status === StakeStatusEnum.processing);
  return historyInProcess ? false : hasStakeInProcess;
});
