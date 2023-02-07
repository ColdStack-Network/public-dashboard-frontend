import { call } from "redux-saga/effects";

export function* redirectToSaga({ payload }: { payload: string; type: string }) {
  yield call([window.location, window.location.assign], payload);
}
