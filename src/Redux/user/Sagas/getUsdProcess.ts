import { AppConfig } from "config";
import { call, put } from "redux-saga/effects";
import { fetchApi } from "../../../helpers/common";
import { setUsd } from "../../account/Actions/accountActions";
import { setCommonError } from "../Actions/userActions";

export function* getUsdProcess() {
  try {
    const base = AppConfig.isProd ? "https://oracle.coldstack.io" : "https://oracle.coldstack.dev";
    const result = yield call(fetchApi, "get", "200", {
      url: "",
      mainUrl: `${base}/price?fromSymbol=CLS&toSymbol=USDT`,
    });
    yield put(setUsd(result?.price));
  } catch (err) {
    yield put(
      setCommonError({
        message: "Failed to request your USD balance",
        isBottomText: true,
      })
    );
  }
}
