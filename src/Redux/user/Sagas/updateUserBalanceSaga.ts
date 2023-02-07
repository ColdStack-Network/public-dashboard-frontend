import { call, put } from "redux-saga/effects";
import { setUserData } from "../Actions/userActions";

const getUserBalance = () => {
  return new Promise<string>((res) => {
    window?.wallet?.getBalance(res);
  });
};

export function* updateUserBalanceSaga() {
  const balance: string = yield call(getUserBalance);
  yield put(setUserData({ balanceCLS: balance }));
}
