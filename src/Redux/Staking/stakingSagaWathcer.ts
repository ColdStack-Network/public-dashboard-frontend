import { takeEvery, takeLatest } from "redux-saga/effects";
import { StakeActionTypes } from "./stakingActions";
import { deleteStakeSaga, getStakesHistory, makeStakeSaga } from "./stakingSagas";

export function* stakingSagaWatcher() {
  yield takeLatest(StakeActionTypes.GET_STAKE_HISTORY, getStakesHistory);
  yield takeEvery(StakeActionTypes.CREATE_STAKE, makeStakeSaga);
  yield takeEvery(StakeActionTypes.CANCEL_STAKE_REQUEST, deleteStakeSaga);
}
