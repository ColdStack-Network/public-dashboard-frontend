import { call, put } from "redux-saga/effects";
import { withdrawalUrl, fetchApi } from "helpers/common";
import { setCommonError } from "Redux/user/Actions/userActions";
import { defaultError } from "helpers/errorHandler";
import { setWithdrawBalanceData } from "../Actions/accountActions";

export function* getWithdrawBalanceProcess() {
  try {
    const balance = yield call(fetchApi, "get", "200", {
      url: "/my_balance",
      mainUrl: withdrawalUrl,
    });

    yield put(setWithdrawBalanceData(balance));
  } catch (err) {
    console.error("catch getWithdrawBalanceProcess", err);

    if (err?.code || err?.message) {
      yield put(
        setCommonError({
          message: err?.message ? `Get withdraw balance data: ${err?.message}` : err?.code,
          isBottomText: false,
        })
      );
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
