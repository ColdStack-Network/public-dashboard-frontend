import { ActionTypes } from "actions/actionTypes";
import { StakingApiClient } from "helpers/ApiClient";
import { wait } from "helpers/utils";
import { DeleteStakeRep, MakeStakeRep, Stake } from "models/Staking";
import { call, put } from "redux-saga/effects";
import { setCommonError } from "Redux/user/Actions/userActions";
import {
  addStakeAction,
  CancelStakeRequestAction,
  CreateStakeAction,
  setCancelStakeProcessAction,
  setHistoryProcessAction,
  setStakeHistoryAction,
  setStakeProcessAction,
  setStakingError,
  updateStakeStatusAction,
} from "./stakingActions";

export function* getStakesHistory() {
  try {
    yield put(setHistoryProcessAction(true));
    const rep: Stake[] = yield call(StakingApiClient.getStakingHistory);
    yield put(setStakeHistoryAction(rep));
    yield put(setHistoryProcessAction(false));
  } catch (e) {
    yield put(setHistoryProcessAction(false));
    yield put(setStakingError("Please try again later"));
  }
}

const TIME_OUT = 8_000;

export function* makeStakeSaga({ payload: { cb, stake } }: CreateStakeAction) {
  try {
    yield put(setStakeProcessAction(true));
    const newStake: MakeStakeRep = yield call(StakingApiClient.makeStake, stake);

    yield put(addStakeAction(newStake));
    yield put(setStakeProcessAction(false));
    cb();
    yield call(wait, TIME_OUT);
    yield put({ type: ActionTypes.REQUEST_UPDATE_USER_BALANCE });
  } catch (e) {
    console.log("e", e);
    yield put(setStakeProcessAction(false));
    yield put(setCommonError({ message: "Staking is failed, please try again later", isBottomText: true }));
  }
}

export function* deleteStakeSaga({ payload: { cb, id } }: CancelStakeRequestAction) {
  try {
    yield put(setCancelStakeProcessAction(true));
    const canceledStake: DeleteStakeRep = yield call(StakingApiClient.cancelStake, id);
    yield put(setCancelStakeProcessAction(false));
    yield put(updateStakeStatusAction(canceledStake));
    cb();
    yield call(wait, TIME_OUT);
    yield put({ type: ActionTypes.REQUEST_UPDATE_USER_BALANCE });
  } catch (e) {
    console.log(e);
    yield put(setCancelStakeProcessAction(false));
    yield put(setCommonError({ message: "Cancel Staking is failed, please try again later", isBottomText: true }));
  }
}
