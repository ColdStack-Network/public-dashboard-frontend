import { ActionTypes } from './actionTypes';
import { IBalanceHistory, IStorageSpending, ITicket, ITrafficSpending, ITransaction } from './interfaces';

export type Status = "open" | "close";

export interface IGetBillingDataPayload {
	fromTotal: Date;
	toTotal: Date;
	fromStorage: Date;
	toStorage: Date;
	fromBandwidth: Date;
	toBandwidth: Date;
	callback?: (any) => void;
}
export interface IGetBillingData {
	type: ActionTypes.GET_BILLING_DATA,
	payload: IGetBillingDataPayload
}

export interface IGetSupportDataPayload {
	status: Status;
	afterLoad: () => void;
}
export interface IGetSupportData {
	type: ActionTypes.GET_SUPPORT_DATA,
	payload: IGetSupportDataPayload
}

export interface IGetTicketsPayload {
	status: Status;
	afterLoad: () => void;
}
export interface IGetTickets {
	type: ActionTypes.GET_TICKETS,
	payload: IGetTicketsPayload
}

export interface ICreateTicket {
	type: ActionTypes.CREATE_TICKET,
	payload: ITicket
}

export interface ICreateWithdraw {
	type: ActionTypes.CREATE_WITHDRAW,
	payload: ITicket
}

export interface IDeleteTicket {
	type: ActionTypes.DELETE_TICKET,
	payload: string
}

export interface ISetStatusTicket {
	type: ActionTypes.SET_STATUS_TICKET,
	payload: { status: Status, id: string }
}


export interface ISetStorageClassesInfo {
	type: ActionTypes.SET_STORAGE_CLASSES_INFO,
	payload: any
}

export type SetBillingDataPayloadType = [ITransaction[] | string, IBalanceHistory[], ITrafficSpending[], IStorageSpending[]];

export interface ISetBillingData {
	type: ActionTypes.SET_BILLING_DATA,
	payload: SetBillingDataPayloadType
}

export interface ISetSupportData {
	type: ActionTypes.SET_SUPPORT_DATA,
	payload: any
}
