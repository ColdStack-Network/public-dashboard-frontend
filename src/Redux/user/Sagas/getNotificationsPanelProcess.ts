import { call, put } from "redux-saga/effects";
import { setCommonError, setNotificationsPanel } from "../Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";
import { NotificationRep } from "models/Notification";
import { ApiClient } from "helpers/ApiClient";

export function* getNotificationsPanelProcess() {
  try {
    const result: NotificationRep = yield call(ApiClient.getNotifications, { last: 3 });
    yield put(setNotificationsPanel(result));
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
