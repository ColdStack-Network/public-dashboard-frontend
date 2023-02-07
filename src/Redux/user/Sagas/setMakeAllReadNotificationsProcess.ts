import { call, put } from "redux-saga/effects";
import { apiUrl, fetchApi } from "../../../helpers/common";
import { getNotifications, setCommonError } from "../Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";

export function* setMakeAllReadNotificationsProcess({ payload }: any) {
  const { pagination, ids } = payload;
  try {
    yield call(fetchApi, "post", "201", {
      url: "/notifications/read-all",
      mainUrl: apiUrl,
    });
    yield put(getNotifications({ pagination }));
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(
        setCommonError({
          message: err?.message ? `Notifications: ${err?.message}` : err?.code,
          isBottomText: false,
        })
      );
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
