import { call, put, select } from "redux-saga/effects";
import { getToken } from "../../../helpers/common";
import { extractJwtPayload } from "../../../helpers/extractJwtPayload";
import { runRedirect, setAuth, setSkipCommonErr, setUserData } from "../Actions/userActions";
import { initS3 } from "./initS3";
import { JWTUserPayload } from "../../../models/UserModel";
import { selectRedirectUrl } from "../Selectors/selectRedirectUrl";

export function* checkAuthProcess({ payload }: any) {
  const { checkAuth, invisibleActivate } = payload;
  const redirectUrl = yield select(selectRedirectUrl);
  try {
    const isMetamaskAuth = yield call(checkAuth);
    if (isMetamaskAuth) {
      const accessToken = getToken();
      if (accessToken) {
        const jwtPayload = extractJwtPayload<JWTUserPayload>(accessToken);
        yield put(setUserData({ me: jwtPayload.sub.user }));
        yield invisibleActivate();
        yield call(initS3);

        yield put(setAuth({ checked: true, result: true }));
        if (redirectUrl) {
          yield put(setSkipCommonErr(true));
          yield put(runRedirect(redirectUrl));
        }
      } else {
        yield put(setAuth({ checked: true, result: false }));
      }
    } else {
      yield put(setAuth({ checked: true, result: false }));
    }
  } catch (err) {
    yield put(setAuth({ checked: true, result: false }));
  }
}
