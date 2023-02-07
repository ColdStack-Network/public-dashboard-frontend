import { call, put } from "redux-saga/effects";
import { withdrawalUrl, fetchApi } from "../../../helpers/common";
import { setCommonError } from "../../user/Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";
import { ICreateWithdrawal } from "../../../actions/accountActionTypes";

export function* createWithdrawalProcess({ payload }: ICreateWithdrawal) {
  try {
    const { fields, onSuccess } = payload;

    yield call(fetchApi, "post", "200", {
      url: "/withdraw",
      mainUrl: withdrawalUrl,
      body: fields,
    });

    onSuccess();
  } catch (err) {
    if (err?.message) {
      yield put(setCommonError({ message: `Withdraw ticket: ${err?.message}`, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
