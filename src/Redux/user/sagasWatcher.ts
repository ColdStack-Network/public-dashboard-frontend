import { takeEvery, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../actions/actionTypes";
import { checkAuthProcess } from "./Sagas/checkAuthProcess";
import { finishAuthProcess } from "./Sagas/finishAuthProcess";
import { getUsdProcess } from "./Sagas/getUsdProcess";
import { getNotificationsProcess } from "./Sagas/getNotificationsProcess";
import { getNotificationsPanelProcess } from "./Sagas/getNotificationsPanelProcess";
import { getEmailSettingsProcess } from "./Sagas/getEmailSettingsProcess";
import { setEmailSettingsProcess } from "./Sagas/setEmailSettingsProcess";
import { getSettingsInfoProcess } from "./Sagas/getSettingsInfoProcess";
import { setMakeAllReadNotificationsProcess } from "./Sagas/setMakeAllReadNotificationsProcess";
import { createAccessKeyProcess } from "./Sagas/createAccessKeyProcess";
import { deleteAccessKeyProcess } from "./Sagas/deleteAccessKeyProcess";
import { changeStatusAccessKeyProcess } from "./Sagas/changeStatusAccessKeyProcess";
// import { checkGiftSaga } from "./Sagas/checkGiftSaga";
import { getGiftSaga } from "./Sagas/getGiftSaga";
import { redirectToSaga } from "./Sagas/redirectToSaga";
import { updateUserBalanceSaga } from "./Sagas/updateUserBalanceSaga";

export function* userSaga() {
  yield takeLatest(ActionTypes.CHECK_AUTH, checkAuthProcess);
  yield takeLatest(ActionTypes.FINISH_AUTH, finishAuthProcess);
  yield takeLatest(ActionTypes.GET_USD, getUsdProcess);
  yield takeLatest(ActionTypes.GET_NOTIFICATIONS, getNotificationsProcess);
  yield takeLatest(ActionTypes.GET_NOTIFICATIONS_PANEL, getNotificationsPanelProcess);
  yield takeEvery(ActionTypes.RUN_REDIRECT, redirectToSaga);
  yield takeLatest(ActionTypes.GET_EMAIL_SETTINGS, getEmailSettingsProcess);
  yield takeLatest(ActionTypes.SET_EMAIL_SETTINGS, setEmailSettingsProcess);
  yield takeLatest(ActionTypes.GET_SETTINGS_INFO, getSettingsInfoProcess);
  yield takeLatest(ActionTypes.SET_MAKE_ALL_READ_NOTIFICATIONS, setMakeAllReadNotificationsProcess);
  yield takeLatest(ActionTypes.CREATE_ACCESS_KEY, createAccessKeyProcess);
  yield takeLatest(ActionTypes.DELETE_ACCESS_KEY, deleteAccessKeyProcess);
  yield takeLatest(ActionTypes.CHANGE_STATUS_ACCESS_KEY, changeStatusAccessKeyProcess);
  // yield takeEvery(ActionTypes.SET_IS_AUTHORIZED, checkGiftSaga);
  yield takeEvery(ActionTypes.GET_GIFT, getGiftSaga);
  yield takeLatest(ActionTypes.REQUEST_UPDATE_USER_BALANCE, updateUserBalanceSaga);
}

/*----example---from-saga-docs-----*/
