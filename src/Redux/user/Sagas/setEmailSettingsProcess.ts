import { call, put } from "redux-saga/effects";
import { fetchApi, urlAuthNode } from "../../../helpers/common";
import { getEmailSettings, setCommonError } from "../Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";

export function* setEmailSettingsProcess({ payload }: any) {
  const { email } = payload;

  try {
    yield call(fetchApi, "put", "200", {
      url: "/me",
      body: { email: email },
      mainUrl: urlAuthNode,
    });
    yield put(getEmailSettings());
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
