import { fetchApi, getToken, setToken, urlAuthNode } from "../../../helpers/common";
import { extractJwtPayload } from "../../../helpers/extractJwtPayload";
import { call, put, select } from "redux-saga/effects";
import {
  getNotificationsPanel,
  getUsd,
  runRedirect,
  setAuth,
  setAuthError,
  setSkipCommonErr,
  setUserData,
} from "../Actions/userActions";
import { setConnectingWallet } from "../../account/Actions/accountActions";
import { initS3 } from "./initS3";
import { JWTUserPayload } from "../../../models/UserModel";
import { selectRedirectUrl } from "../Selectors/selectRedirectUrl";

export function* finishAuthProcess(action) {
  try {
    const { signFunc, account } = action.payload;
    const accessToken = getToken();
    const redirectUrl = yield select(selectRedirectUrl);

    if (accessToken) {
      const jwtPayload = extractJwtPayload<JWTUserPayload>(accessToken);
      yield put(setUserData({ me: jwtPayload.sub.user }));
      yield call(initS3);
      yield put(setAuth({ checked: true, result: true }));

      if (redirectUrl) {
        yield put(setSkipCommonErr(true));
        return yield put(runRedirect(redirectUrl));
      }

      yield put(getUsd());
      yield put(getNotificationsPanel());
    } else {
      const data = yield call(fetchApi, "post", "201", {
        url: "/auth/message-sign-verifications",
        body: { publicKey: account },
        mainUrl: urlAuthNode,
      });
      const res = yield call(signFunc, data?.msg, account);

      const { success, signature } = res;
      if (success === true) {
        const url =
          action.payload?.walletName === "trezor"
            ? `/auth/message-sign-verifications/trezor/${data.id}/verify`
            : `/auth/message-sign-verifications/${data.id}/verify`;
        const token = yield call(fetchApi, "post", "201", {
          url: url,
          body: { signature },
          mainUrl: urlAuthNode,
        });
        const { accessToken } = token;
        setToken(accessToken);
        const user = extractJwtPayload<JWTUserPayload>(accessToken);
        yield put(setUserData({ me: user.sub.user }));

        yield call(initS3);
        yield put(setAuth({ checked: true, result: true }));
        if (redirectUrl) {
          yield put(setSkipCommonErr(true));
          return yield put(runRedirect(redirectUrl));
        }
        yield put(getUsd());
        yield put(getNotificationsPanel());
      } else {
        yield put(setAuthError({ open: true, errorText: "" }));
        yield put(setConnectingWallet(""));
      }
    }
  } catch (err) {
    yield put(
      setAuthError({
        open: true,
        errorText: "Something went wrong, please refresh the page and try again",
      })
    );
  }
}
