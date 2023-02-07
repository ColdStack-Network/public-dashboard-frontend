import { UserInfo } from "models/UserModel";

export interface IStorageClassInfo {
  name: string;
  Standard: string;
  "Intelligent-Tiering": string;
  "Standard-IA": string;
  "Glacier Instant Retrieval": string;
  "Glacier Flexible Retrieval": string;
  "Glacier Deep Archive": string;
}

export interface IGuideRegion {
  id: number;
  name: string;
}

export interface IStorageClass {
  id: number;
  name: string;
}

export interface IUserData {
  balanceCLS?: string;
  me?: UserInfo;
}

export interface IIsAuthorized {
  checked: boolean;
  result: boolean;
}

export interface ICheckAuth {
  checkAuth: () => any;
}

export interface IFinishAuth {
  signFunc: (account: string, message: string) => Promise<unknown>;
  account: string;
  walletName?: string;
}

export interface IAuthError {
  errorText: string;
  open: boolean;
}

export interface IPagination {
  Page: number;
  PerPage: number;
  PagesCount?: number;
  Name?: string;
  Prefix?: string;
}

export interface IBucketsListData {
  pagination: IPagination;
  afterLoad: () => void;
}

export interface IFilesListData {
  nameBucket: string;
  pathFolder: string;
  pagination: IPagination;
  afterLoad: () => void;
}

export interface ISearchedFilesListData {
  filename: string;
  pagination: IPagination;
}

export interface IBucketRename {
  nameBucket: string;
  name: string;
  setOuterError: (message: string) => void;
  afterLoad: () => void;
}
export interface IBucketDelete {
  nameBucket: string;
  afterLoad: () => void;
}
export type TPagination = "files" | "buckets" | "notifications";

export interface TSetPagination {
  pagination: IPagination;
  type: TPagination;
}

export interface ITicket {
  fields: IFieldsNewTicket | IFieldsNewWithdrawal;
  onSuccess: () => void;
}

export interface INewTicket {
  id: number;
}

export interface IWithdraw {
  fields: IFieldsNewTicket;
  onSuccess: () => void;
}

export interface IFieldsNewTicket {
  topic: string;
  subTopic: string;
  subject: string;
  email: string;
  ticketDetails: string;
  file?: any[];
  unreadMessage?: boolean;
}

export interface IFieldsNewWithdrawal {
  amount: number;
  chain: string;
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
  type: "FROM_ETH_TO_PARACHAIN" | "FROM_PARACHAIN_TO_ETH" | "GIFT";
}

export interface ITransactionStatus {
  status: "SUCCESS" | "FAILED";
}

export interface ITransaction extends ITransactionStatus, ITransactionType {
  date: string;
  amount: string;
  transactionFee: string;
  transactionFeeUnit: string;
}

export interface IStorageDownloadsPrice {
  fromTb: number;
  toTb: null | number;
  price: number;
}

export interface ICloudPrice {
  available: boolean;
  storage: IStorageDownloadsPrice[];
  download: IStorageDownloadsPrice[];
}
