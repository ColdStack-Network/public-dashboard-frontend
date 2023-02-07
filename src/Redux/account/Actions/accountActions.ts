import { ActionTypes, ISetConnectingWallet, ISetTickets, ISetUsd } from "actions/actionTypes";
import {
  ICreateTicket,
  ICreateWithdraw,
  ICreateWithdrawal,
  IDeleteTicket,
  IGetBillingData,
  IGetBillingDataPayload,
  IGetSupportData,
  IGetSupportDataPayload,
  IGetTickets,
  ISetBillingData,
  ISetStatusTicket,
  ISetSupportData,
  ISetWithdrawBalanceData,
  IGetWithdrawBalanceData,
  SetWithdrawBalanceDataPayloadType,
  Status,
  IGetWithdrawCommissionsData,
  ISetWithdrawCommissionsData,
  ISetPriceLandingData, IMigrationForm,
} from "actions/accountActionTypes";
import { IStorageClassInfo, ITicket, IWithdraw } from "actions/interfaces";
import { Ticket } from "models/Ticket";
import { SetBillingDataPayloadType } from "../../../models/SetBillingDataPayloadType";
import { PriceLandingPayloadType } from "../../../models/PriceLandingPayloadType";
import { MigrationForm } from "../../../models/MigrationForm";

export const getBillingData = (payload: IGetBillingDataPayload): IGetBillingData => ({
  type: ActionTypes.GET_BILLING_DATA,
  payload,
});

export const getSupportData = (payload: IGetSupportDataPayload): IGetSupportData => ({
  type: ActionTypes.GET_SUPPORT_DATA,
  payload,
});

export const getTickets = (payload: any): IGetTickets => ({
  type: ActionTypes.GET_TICKETS,
  payload,
});

export const createTicket = (payload: ITicket): ICreateTicket => ({
  type: ActionTypes.CREATE_TICKET,
  payload,
});

export const sendMigrationForm = (payload: MigrationForm): IMigrationForm => ({
  type: ActionTypes.SEND_MIGRATION_FORM,
  payload,
})

export const createWithdraw = (payload: IWithdraw): ICreateWithdraw => ({
  type: ActionTypes.CREATE_WITHDRAW,
  payload,
});

export const createWithdrawal = (payload: IWithdraw): ICreateWithdrawal => ({
  type: ActionTypes.CREATE_WITHDRAWAL,
  payload,
});

export const createWithdrawalOld = (payload: ITicket | IWithdraw): ICreateWithdrawal => ({
  type: ActionTypes.CREATE_WITHDRAWAL_OLD,
  payload,
});

export const deleteTicket = (payload: string): IDeleteTicket => ({
  type: ActionTypes.DELETE_TICKET,
  payload,
});

export const setStatusTicket = (payload: { id: string; status: Status }): ISetStatusTicket => ({
  type: ActionTypes.SET_STATUS_TICKET,
  payload,
});

export type ISetStorageClassesInfo = {
  type: ActionTypes.SET_STORAGE_CLASSES_INFO;
  payload: IStorageClassInfo[];
};

export const setConnectingWallet = (payload: string): ISetConnectingWallet => ({
  type: ActionTypes.SET_CONNECTING_WALLET,
  payload,
});

export const setBillingData = (payload: SetBillingDataPayloadType): ISetBillingData => ({
  type: ActionTypes.SET_BILLING_DATA,
  payload,
});

export const setWithdrawBalanceData = (payload: SetWithdrawBalanceDataPayloadType): ISetWithdrawBalanceData => ({
  type: ActionTypes.SET_WITHDRAW_BALANCE_DATA,
  payload,
});

export const getWithdrawBalanceData = (payload = {}): IGetWithdrawBalanceData => ({
  type: ActionTypes.GET_WITHDRAW_BALANCE_DATA,
  payload,
});

export const setWithdrawComissionsData = (payload: any): ISetWithdrawCommissionsData => ({
  type: ActionTypes.SET_WITHDRAW_COMMISSIONS_DATA,
  payload,
});

export const getWithdrawComissionsData = (payload = {}): IGetWithdrawCommissionsData => ({
  type: ActionTypes.GET_WITHDRAW_COMMISSIONS_DATA,
  payload,
});

export const setSupportData = (payload: any): ISetSupportData => ({
  type: ActionTypes.SET_SUPPORT_DATA,
  payload,
});

export const setTickets = (payload: Ticket[]): ISetTickets => ({
  type: ActionTypes.SET_TICKETS,
  payload,
});

export const setUsd = (payload: string): ISetUsd => ({
  type: ActionTypes.SET_USD,
  payload,
});

export const setPriceLanding = (payload: PriceLandingPayloadType): ISetPriceLandingData => ({
  type: ActionTypes.SET_PRICE_LANDING_DATA,
  payload,
});

export const getPriceLanding = () => ({
  type: ActionTypes.GET_PRICE_LANDING_DATA,
});
