import {
  ActionTypes,
  ISetStorageClasses,
  ISetTickets,
  ISetConnectingWallet
} from "../../actions/actionTypes";
import { ISetBillingData, ISetStorageClassesInfo, ISetSupportData } from '../../actions/accountActionTypes';


const initialState = {
  storageClasses:  [] as any [],
  storageClassesInfo:  [] as any [],
  billingData: [],
  tickets: [] as any,
  topics: [] as any,
  connectingWallet: '',
};

export interface IAccountState {
  storageClassesInfo: any [],
  billingData: any [],
  tickets: any,
  topics: any
  connectingWallet: string
}

type ActionType =  ISetStorageClasses | ISetBillingData | ISetStorageClassesInfo | ISetTickets | ISetSupportData | ISetConnectingWallet

export default function account(state: IAccountState = initialState, action: ActionType) {
  switch (action.type) {
    case ActionTypes.SET_STORAGE_CLASSES:
      return {...state, storageClasses: action.payload }
    case ActionTypes.SET_STORAGE_CLASSES_INFO:
      return {...state, storageClassesInfo: action.payload }
    case ActionTypes.SET_BILLING_DATA:
      return {...state, billingData: action.payload }
    case ActionTypes.SET_TICKETS:{
      return {...state, tickets: action.payload }
    }
    case ActionTypes.SET_SUPPORT_DATA:
      return {...state, tickets: action.payload?.[0]?.data, topics: action.payload?.[1]  }
    case ActionTypes.SET_CONNECTING_WALLET:
      return {...state, connectingWallet: action.payload  }
    default:
      return state;
  }
}
