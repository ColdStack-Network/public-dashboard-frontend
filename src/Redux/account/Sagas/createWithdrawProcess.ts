import { call, put } from "redux-saga/effects";
import { apiUrl, fetchApi } from "../../../helpers/common";
import { setCommonError } from "../../user/Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";
import { ICreateWithdraw } from "../../../actions/accountActionTypes";

export function* createWithdrawProcess({ payload }: ICreateWithdraw) {
  try {
    const { fields, onSuccess } = payload;
    let id = yield call(fetchApi, "post", "201", {
      url: "/tickets",
      mainUrl: apiUrl,
      body: fields,
    });
    yield call(fetchApi, "put", "200", {
      url: `/tickets/${id.id}/status`,
      mainUrl: apiUrl,
      body: { status: "close" },
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
