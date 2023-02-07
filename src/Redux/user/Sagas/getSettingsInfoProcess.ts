import { call, put } from "redux-saga/effects";
import { fetchApi, urlAuthNode } from "../../../helpers/common";
import { setCommonError, setSettingsInfo } from "../Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";

export function* getSettingsInfoProcess() {
  try {
    const result = yield call(fetchApi, "get", "200", {
      url: "/me",
      mainUrl: urlAuthNode,
    });
    yield put(setSettingsInfo({ ...result }));
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(
        setCommonError({
          message: err?.message ? `Settings: ${err?.message}` : err?.code,
          isBottomText: false,
        })
      );
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
