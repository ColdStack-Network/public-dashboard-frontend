import { takeEvery, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../actions/actionTypes";
import { getStorageClassesInfo } from "./Sagas/getStorageClassesInfo";
import { getBillingDataProcess } from "./Sagas/getBillingDataProcess";
import { getWithdrawBalanceProcess } from "./Sagas/getWithdrawBalanceProcess";
import { getWithdrawComissionsProcess } from "./Sagas/getWithdrawComissionsProcess";
import { getSupportDataProcess } from "./Sagas/getSupportDataProcess";
import { getTicketsProcess } from "./Sagas/getTicketsProcess";
import { createTicketProcess } from "./Sagas/createTicketProcess";
import { createWithdrawProcess } from "./Sagas/createWithdrawProcess";
import { createWithdrawalProcess } from "./Sagas/createWithdrawalProcess";
import { createWithdrawalOldProcess } from "./Sagas/createWithdrawalOldProcess";
import { deleteTicketProcess } from "./Sagas/deleteTicketProcess";
import { setStatusTicketProcess } from "./Sagas/setStatusTicketProcess";
import { getPriceLandingProcess } from "./Sagas/getPriceLanding";
import { sendMigrationFormSaga } from "./Sagas/sendMigrationFormSaga";

export function* accountSaga() {
  yield takeLatest(ActionTypes.GET_STORAGE_CLASSES_INFO, getStorageClassesInfo);
  yield takeEvery(ActionTypes.GET_BILLING_DATA, getBillingDataProcess);
  yield takeEvery(ActionTypes.GET_WITHDRAW_BALANCE_DATA, getWithdrawBalanceProcess);
  yield takeEvery(ActionTypes.GET_WITHDRAW_COMMISSIONS_DATA, getWithdrawComissionsProcess);
  yield takeLatest(ActionTypes.GET_TICKETS, getTicketsProcess);
  yield takeLatest(ActionTypes.GET_SUPPORT_DATA, getSupportDataProcess);
  yield takeLatest(ActionTypes.CREATE_TICKET, createTicketProcess);
  yield takeLatest(ActionTypes.SEND_MIGRATION_FORM, sendMigrationFormSaga);
  yield takeLatest(ActionTypes.CREATE_WITHDRAW, createWithdrawProcess);
  yield takeLatest(ActionTypes.CREATE_WITHDRAWAL, createWithdrawalProcess);
  yield takeLatest(ActionTypes.CREATE_WITHDRAWAL_OLD, createWithdrawalOldProcess);
  yield takeLatest(ActionTypes.DELETE_TICKET, deleteTicketProcess);
  yield takeLatest(ActionTypes.SET_STATUS_TICKET, setStatusTicketProcess);
  yield takeLatest(ActionTypes.GET_PRICE_LANDING_DATA, getPriceLandingProcess);
}
