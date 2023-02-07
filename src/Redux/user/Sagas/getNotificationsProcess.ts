import { isFull } from "../../../helpers/common";
import { call, put } from "redux-saga/effects";
import { setCommonError, setNotifications } from "../Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";
import { Pagination } from "models/Pagination";
import { SagaWatcherPayload } from "models/SagaWatcherPayload";
import { NotificationRep } from "models/Notification";
import { ApiClient } from "helpers/ApiClient";

export function* getNotificationsProcess({ payload }: SagaWatcherPayload<{ pagination: Pagination }>) {
  try {
    const { page, perPage, id } = payload?.pagination;
    let query = {} as Pagination;
    if (isFull(page)) {
      query.page = +page!;
    }
    if (isFull(perPage)) {
      query.perPage = +perPage!;
    }
    if (isFull(id)) {
      query.id = id;
    }
    const result: NotificationRep = yield call(ApiClient.getNotifications, query);
    yield put(setNotifications(result));
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
