import { defaultError } from "helpers/errorHandler";
import { put } from "redux-saga/effects";
import { setCommonError } from "./user/Actions/userActions";

export function* handleSagaError(error: unknown) {
  const err = error as { code?: string; message?: string };
  if (err?.code || err?.message) {
    yield put(setCommonError({ message: err?.message ? err.message : (err?.code as string), isBottomText: false }));
  } else {
    yield put(setCommonError({ message: defaultError, isBottomText: true }));
  }
}
