import { ActionTypes, ISetConnectingWallet, ISetTickets, ISetUsd } from 'actions/actionTypes';
import {
	ICreateTicket,
	ICreateWithdraw,
	IDeleteTicket,
	IGetBillingData,
	IGetBillingDataPayload,
	IGetSupportData,
	IGetSupportDataPayload,
	IGetTickets,
	ISetBillingData,
	ISetStatusTicket,
	ISetStorageClassesInfo,
	ISetSupportData,
	SetBillingDataPayloadType,
	Status
} from 'actions/accountActionTypes';
import { ITicket, IWithdraw } from 'actions/interfaces';


export const getBillingData = (payload: IGetBillingDataPayload): IGetBillingData => ({
	type: ActionTypes.GET_BILLING_DATA,
	payload
});

export const getSupportData = (payload: IGetSupportDataPayload): IGetSupportData => ({
	type: ActionTypes.GET_SUPPORT_DATA,
	payload
});

export const getTickets = (payload: any): IGetTickets => ({
	type: ActionTypes.GET_TICKETS,
	payload
});

export const createTicket = (payload: ITicket): ICreateTicket => ({
	type: ActionTypes.CREATE_TICKET,
	payload
});

export const createWithdraw = (payload: IWithdraw): ICreateWithdraw => ({
	type: ActionTypes.CREATE_WITHDRAW,
	payload
});

export const deleteTicket = (payload: string): IDeleteTicket => ({
	type: ActionTypes.DELETE_TICKET,
	payload
});

export const setStatusTicket = (payload: { id: string, status: Status }): ISetStatusTicket => ({
	type: ActionTypes.SET_STATUS_TICKET,
	payload
});

export const setStorageClassesInfo = (payload: any): ISetStorageClassesInfo => ({
	type: ActionTypes.SET_STORAGE_CLASSES_INFO,
	payload
});

export const setConnectingWallet = (payload: string): ISetConnectingWallet => ({
	type: ActionTypes.SET_CONNECTING_WALLET,
	payload
});

export const setBillingData = (payload: SetBillingDataPayloadType): ISetBillingData => ({
	type: ActionTypes.SET_BILLING_DATA,
	payload
});

export const setSupportData = (payload: any): ISetSupportData => ({
	type: ActionTypes.SET_SUPPORT_DATA,
	payload
});
export const setTickets = (payload: any): ISetTickets => ({
	type: ActionTypes.SET_TICKETS,
	payload
});
export const setUsd = (payload: string): ISetUsd => ({
	type: ActionTypes.SET_USD,
	payload
});
