import { ActionTypes, ISetTickets, ISetConnectingWallet } from "actions/actionTypes";
import { Ticket } from "models/Ticket";
import {
  ISetBillingData,
  ISetSupportData,
  ISetWithdrawBalanceData,
  ISetWithdrawCommissionsData,
  SetWithdrawBalanceDataPayloadType,
  ISetPriceLandingData,
} from "actions/accountActionTypes";
import { SupportTopic } from "models/SupportTopic";
import { WithdrawCommissionsData } from "../../models/WithdrawCommissionsData";
import { SetBillingDataPayloadType } from "models/SetBillingDataPayloadType";

const initialState = {
  billingData: [] as unknown as SetBillingDataPayloadType,
  withdrawBalanceData: {},
  withdrawCommissionsData: {},
  tickets: [],
  topics: [] as SupportTopicItem[],
  connectingWallet: "",
  price: {
    standard: {},
    intelligentTiering: {},
    standardIA: {},
    glacier: {},
    deepArchive: {},
  },
};

export type SupportTopicItem = {
  topic: SupportTopic;
  subtopics: SupportTopic[];
};

export interface IAccountState {
  // TODO SetBillingDataPayloadType
  billingData: SetBillingDataPayloadType;
  withdrawBalanceData: SetWithdrawBalanceDataPayloadType;
  withdrawCommissionsData: WithdrawCommissionsData;
  tickets: Ticket[];
  topics: SupportTopicItem[];
  connectingWallet: string;
  price: {
    standard: {};
    intelligentTiering: {};
    standardIA: {};
    glacier: {};
    deepArchive: {};
  };
}

type ActionType =
  | ISetBillingData
  | ISetTickets
  | ISetSupportData
  | ISetConnectingWallet
  | ISetWithdrawBalanceData
  | ISetWithdrawCommissionsData
  | ISetPriceLandingData;

export default function account(state: IAccountState = initialState, action: ActionType): IAccountState {
  switch (action.type) {
    case ActionTypes.SET_BILLING_DATA:
      return { ...state, billingData: action.payload };
    case ActionTypes.SET_TICKETS: {
      return { ...state, tickets: action.payload };
    }
    case ActionTypes.SET_SUPPORT_DATA:
      return { ...state, tickets: action.payload?.[0]?.data, topics: action.payload?.[1] };
    case ActionTypes.SET_CONNECTING_WALLET:
      return { ...state, connectingWallet: action.payload };
    case ActionTypes.SET_WITHDRAW_BALANCE_DATA:
      return { ...state, withdrawBalanceData: action.payload };
    case ActionTypes.SET_WITHDRAW_COMMISSIONS_DATA:
      return { ...state, withdrawCommissionsData: action.payload };
    case ActionTypes.SET_PRICE_LANDING_DATA: {
      return { ...state, price: action.payload };
    }
    default:
      return state;
  }
}
