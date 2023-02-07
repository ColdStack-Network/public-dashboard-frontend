import { call, put } from "redux-saga/effects";
import { withdrawalUrl, fetchApi } from "helpers/common";
import { setCommonError } from "Redux/user/Actions/userActions";
import { defaultError } from "helpers/errorHandler";
import { setWithdrawComissionsData } from "../Actions/accountActions";

export function* getWithdrawComissionsProcess() {
  try {
    const balance = yield call(fetchApi, "get", "200", {
      url: "/commissions",
      mainUrl: withdrawalUrl,
    });

    yield put(setWithdrawComissionsData(balance));
  } catch (err) {
    console.error("catch getWithdrawComissionsProcess", err);

    if (err?.code || err?.message) {
      yield put(
        setCommonError({
          message: err?.message ? `Get withdraw commissions data: ${err?.message}` : err?.code,
          isBottomText: false,
        })
      );
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
