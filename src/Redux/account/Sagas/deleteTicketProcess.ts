import { call, put } from "redux-saga/effects";
import { apiUrl, fetchApi } from "../../../helpers/common";
import { getTickets } from "../Actions/accountActions";
import { setCommonError } from "../../user/Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";
import { IDeleteTicket } from "../../../actions/accountActionTypes";

export function* deleteTicketProcess({ payload }: IDeleteTicket) {
  try {
    yield call(fetchApi, "delete", "200", { url: `/tickets/${payload}`, mainUrl: apiUrl });
    yield put(
      getTickets({
        status: "close",
        afterLoad: () => {},
      })
    );
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(
        setCommonError({
          message: err?.message ? `Delete ticket: ${err?.message}` : err?.code,
          isBottomText: false,
        })
      );
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
