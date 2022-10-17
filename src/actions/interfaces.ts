import {SelectItem} from "../components/UI/SelectCustom/types";

export interface IUserData {
  balanceCLS?: string,
  me?: any
}

export interface IIsAuthorized {
  checked: boolean,
  result: boolean,
}

export interface ICheckAuth {
  checkAuth: ()=>any
}

export interface IFinishAuth {
  signFunc: (account: string, message: string)=>Promise<unknown>,
  account: string
}

export interface IAuthError {
  errorText: string,
  open: boolean
}

export interface IPagination {
  Page: number,
  PerPage: number,
  PagesCount?: number,
  Name?: string,
  Prefix?: string
}

export interface IBucketsListData {
  pagination: IPagination,
  afterLoad: ()=>void
}

export interface IFilesListData {
  nameBucket: string,
  pathFolder: string,
  pagination: IPagination,
  afterLoad: ()=>void
}

export interface ISearchedFilesListData {
  filename: string,
  pagination: IPagination
}

export interface IBucketRename {
  nameBucket: string,
  name: string,
  setOuterError: (message: string)=>void,
  afterLoad: ()=>void
}
export interface IBucketDelete {
  nameBucket: string,
  afterLoad: ()=>void
}
export type TPagination = "files" | "buckets" | "notifications";

export interface TSetPagination {
  pagination: IPagination,
  type: TPagination,
}

export interface ITicket {
  fields: IFieldsNewTicket,
  onSuccess: ()=>void
}

export interface IWithdraw {
  fields: IFieldsNewTicket,
  onSuccess: ()=>void
}

export interface IFieldsNewTicket{
  topic: SelectItem,
  subTopic: SelectItem,
  subject: string,
  email: string,
  ticketDetails: string,
  file?: any []
}

export interface IBalanceHistory {
  date: string;
  amount: number;
}
export interface IStorageSpending {
  date: string;
  amount: number;
}
export interface ITrafficSpending {
  date: string;
  amount: number;
}
export interface ITransactionType {
  status: "FROM_ETH_TO_PARACHAIN" | "FROM_PARACHAIN_TO_ETH";
}

export interface ITransactionStatus {
  status: "SUCCESS" | "FAILED";
}

export interface ITransaction {
  date: string;
  amount: string;
  transactionFee: string;
  transactionFeeUnit: string;
  type: ITransactionType;
  status: ITransactionStatus;
}
