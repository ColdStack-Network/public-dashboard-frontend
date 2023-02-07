import { IBalanceHistory, IStorageSpending, ITrafficSpending, ITransaction } from "../actions/interfaces";

export type TransactionBillingType = ITransaction[] | string;
export type SetBillingDataPayloadType = [
  TransactionBillingType,
  IBalanceHistory[],
  ITrafficSpending[],
  IStorageSpending[]
];
