import { ActionTypes } from "./actionTypes";
import { ITicket } from "./interfaces";
import { SetBillingDataPayloadType } from "../models/SetBillingDataPayloadType";
import { PriceLandingPayloadType } from "../models/PriceLandingPayloadType";
import { MigrationForm } from "../models/MigrationForm";

export type Status = "open" | "close";

export interface IGetBillingDataPayload {
  from: Date;
  to: Date;
  callback?: (any) => void;
}
export interface IGetBillingData {
  type: ActionTypes.GET_BILLING_DATA;
  payload: IGetBillingDataPayload;
}
export interface IGetWithdrawBalanceData {
  type: ActionTypes.GET_WITHDRAW_BALANCE_DATA;
  payload: any;
}
export interface IGetWithdrawCommissionsData {
  type: ActionTypes.GET_WITHDRAW_COMMISSIONS_DATA;
  payload: any;
}

export interface IGetSupportDataPayload {
  status: Status;
  afterLoad: () => void;
}
export interface IGetSupportData {
  type: ActionTypes.GET_SUPPORT_DATA;
  payload: IGetSupportDataPayload;
}

export interface IGetTicketsPayload {
  status: Status;
  afterLoad: () => void;
}
export interface IGetTickets {
  type: ActionTypes.GET_TICKETS;
  payload: IGetTicketsPayload;
}

export interface ICreateTicket {
  type: ActionTypes.CREATE_TICKET;
  payload: ITicket;
}

export interface IMigrationForm {
  type: ActionTypes.SEND_MIGRATION_FORM,
  payload: MigrationForm
}

export interface ICreateWithdraw {
  type: ActionTypes.CREATE_WITHDRAW;
  payload: ITicket;
}

export interface ICreateWithdrawal {
  type: ActionTypes.CREATE_WITHDRAWAL | ActionTypes.CREATE_WITHDRAWAL_OLD;
  payload: ITicket;
}

export interface IDeleteTicket {
  type: ActionTypes.DELETE_TICKET;
  payload: string;
}

export interface ISetStatusTicket {
  type: ActionTypes.SET_STATUS_TICKET;
  payload: { status: Status; id: string };
}

export type SetWithdrawBalanceDataPayloadType = any;

export interface ISetBillingData {
  type: ActionTypes.SET_BILLING_DATA;
  payload: SetBillingDataPayloadType;
}

export interface ISetWithdrawBalanceData {
  type: ActionTypes.SET_WITHDRAW_BALANCE_DATA;
  payload: SetWithdrawBalanceDataPayloadType;
}

export interface ISetWithdrawCommissionsData {
  type: ActionTypes.SET_WITHDRAW_COMMISSIONS_DATA;
  payload: any;
}

export interface ISetSupportData {
  type: ActionTypes.SET_SUPPORT_DATA;
  payload: any;
}

export interface IGetPriceLandingData {
  type: ActionTypes.GET_PRICE_LANDING_DATA;
  payload: PriceLandingPayloadType;
}

export interface ISetPriceLandingData {
  type: ActionTypes.SET_PRICE_LANDING_DATA;
  payload: PriceLandingPayloadType;
}
