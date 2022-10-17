import {takeEvery, takeLatest} from "redux-saga/effects";
import {ActionTypes} from "../../actions/actionTypes";
import {getStorageClassesInfo} from './Sagas/getStorageClassesInfo';
import {getBillingDataProcess} from './Sagas/getBillingDataProcess';
import {getSupportDataProcess} from './Sagas/getSupportDataProcess';
import {getTicketsProcess} from './Sagas/getTicketsProcess';
import {createTicketProcess} from './Sagas/createTicketProcess';
import {createWithdrawProcess} from './Sagas/createWithdrawProcess';
import {deleteTicketProcess} from './Sagas/deleteTicketProcess';
import {setStatusTicketProcess} from './Sagas/setStatusTicketProcess';


export function* accountSaga() {
  yield takeLatest(ActionTypes.GET_STORAGE_CLASSES_INFO, getStorageClassesInfo);
  yield takeEvery(ActionTypes.GET_BILLING_DATA, getBillingDataProcess);
  yield takeLatest(ActionTypes.GET_TICKETS, getTicketsProcess);
  yield takeLatest(ActionTypes.GET_SUPPORT_DATA, getSupportDataProcess);
  yield takeLatest(ActionTypes.CREATE_TICKET, createTicketProcess);
  yield takeLatest(ActionTypes.CREATE_WITHDRAW, createWithdrawProcess);
  yield takeLatest(ActionTypes.DELETE_TICKET, deleteTicketProcess);
  yield takeLatest(ActionTypes.SET_STATUS_TICKET, setStatusTicketProcess);
}
