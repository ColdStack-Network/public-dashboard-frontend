import { ISearchFilesResult } from "helpers/yandexS3";
import { Ticket } from "models/Ticket";
import { IBucket, ICurrentBucket, StoreFile } from "Redux/buckets/reducer";
import {
  IBucketDelete,
  IBucketRename,
  IBucketsListData,
  IFilesListData,
  IIsAuthorized,
  ISearchedFilesListData,
  IUserData,
  TSetPagination,
} from "./interfaces";
import { IGift } from "../Redux/user/reducer";
import { AccessKey } from "models/AccessKey";
import { NotificationRep } from "models/Notification";
import { Statistics } from "models/Statistics";
import { BandwidthAnalyticsRecord, StorageUsageAnalyticsRecord } from "models/Analytics";
import { GetStatisticsCallBack } from "components/Charts/ChartStorageUsage";
import { INewBucket } from "containers/BucketsPage/BucketsPage";
import { PrivacyFilePayload } from "../models/PrivacyFilePayload";
import { VersioningBucketStatus } from "components/Table/types";

export enum ActionTypes {
  AUTH_TEST = "AUTH_TEST",
  RUN_REDIRECT = "RUN_REDIRECT",
  CHECK_AUTH = "CHECK_AUTH",
  SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED",
  SET_USER_DATA = "SET_USER_DATA",
  SET_ACCESS_KEYS = "SET_ACCESS_KEYS",
  SET_SKIP_COMMON_ERRORS = "SET_SKIP_COMMON_ERRORS",
  GET_ACCESS_KEYS = "GET_ACCESS_KEYS",
  CREATE_ACCESS_KEY = "CREATE_ACCESS_KEY",
  CHANGE_STATUS_ACCESS_KEY = "CHANGE_STATUS_ACCESS_KEY",
  DELETE_ACCESS_KEY = "DELETE_ACCESS_KEY",
  SET_CURRENT_ACCESS_KEY = "SET_CURRENT_ACCESS_KEY",
  FINISH_AUTH = "FINISH_AUTH",
  REDIRECT_AFTER_SUCCESSFULL_LOG_IN = "REDIRECT_AFTER_SUCCESSFULL_LOG_IN",
  SET_REDIRECT_URL = "SET_REDIRECT_URL",
  SET_AUTH_ERROR = "SET_AUTH_ERROR",
  SET_COMMON_ERROR = "SET_COMMON_ERROR",
  CLEAR_COMMON_ERRORS = "CLEAR_COMMON_ERRORS",
  GET_USD = "GET_USD",
  SET_USD = "SET_USD",
  GET_BUCKETS_LIST = "GET_BUCKETS_LIST",
  SET_BUCKETS_LIST = "SET_BUCKETS_LIST",
  GET_FILES_LIST = "GET_FILES_LIST",
  GET_SEARCHED_FILES_LIST = "GET_SEARCHED_FILES_LIST",
  GET_FILE_INFO = "GET_FILE_INFO",
  SET_FILE_INFO = "SET_FILE_INFO",
  GET_SETTINGS_INFO = "GET_SETTINGS_INFO",
  SET_SETTINGS_INFO = "SET_SETTINGS_INFO",
  SET_FILE_PAGINATION = "SET_FILE_PAGINATION",
  RENAME_FILE_FOLDER = "RENAME_FILE_FOLDER",
  PRIVACY_FILE = "PRIVACY_FILE",
  METADATA_FILE = "METADATA_FILE",
  DELETE_FILE_FOLDER = "DELETE_FILE_FOLDER",
  DELETE_FILE_FOLDER_MULTIPLE = "DELETE_FILE_FOLDER_MULTIPLE",
  DOWNLOAD_FILE_FOLDER = "DOWNLOAD_FILE_FOLDER",
  DOWNLOAD_FILE_FOLDER_MULTIPLE = "DOWNLOAD_FILE_FOLDER_MULTIPLE",
  GET_EMAIL_SETTINGS = "GET_EMAIL_SETTINGS",
  SET_EMAIL_SETTINGS = "SET_EMAIL_SETTINGS",
  SET_FILES_LIST = "SET_FILES_LIST",
  SET_SEARCHED_FILES_LIST = "SET_SEARCHED_FILES_LIST",
  CREATE_BUCKET = "CREATE_BUCKET",
  RENAME_BUCKET = "RENAME_BUCKET",
  DELETE_BUCKET = "DELETE_BUCKET",
  CREATE_FOLDER = "CREATE_FOLDER",
  GET_STORAGE_CLASSES = "GET_STORAGE_CLASSES",
  SET_STORAGE_CLASSES = "SET_STORAGE_CLASSES",
  GET_STORAGE_TYPES = "GET_STORAGE_TYPES",
  GET_REGIONS = "GET_REGIONS",
  SET_REGIONS = "SET_REGIONS",
  GET_BUCKETS_GUIDES = "GET_BUCKETS_GUIDES",
  SET_PAGINATION = "SET_PAGINATION",
  GET_STORAGE_CLASSES_INFO = "GET_STORAGE_CLASSES_INFO",
  SET_STORAGE_CLASSES_INFO = "SET_STORAGE_CLASSES_INFO",
  UPLOAD_FILES = "UPLOAD_FILES",
  SET_UPLOAD_INFO = "SET_UPLOAD_INFO",
  SET_UPLOAD = "SET_UPLOAD",
  SET_UPLOAD_FILES = "SET_UPLOAD_FILES",
  CLEAR_UPLOAD_FILES = "CLEAR_UPLOAD_FILES",
  DELETE_UPLOAD_FILE = "DELETE_UPLOAD_FILE",
  GET_STATISTICS_HOME = "GET_STATISTICS_HOME",
  SET_STATISTICS_HOME = "SET_STATISTICS_HOME",
  GET_TRANSACTIONS = "GET_TRANSACTIONS",
  SET_TRANSACTIONS = "SET_TRANSACTIONS",
  GET_BILLING_DATA = "GET_BILLING_DATA",
  SET_BILLING_DATA = "SET_BILLING_DATA",
  GET_TICKETS = "GET_TICKETS",
  SET_TICKETS = "SET_TICKETS",
  GET_SUPPORT_DATA = "GET_SUPPORT_DATA",
  SET_SUPPORT_DATA = "SET_SUPPORT_DATA",
  CREATE_TICKET = "CREATE_TICKET",
  CREATE_WITHDRAW = "CREATE_WITHDRAW",
  CREATE_WITHDRAWAL = "CREATE_WITHDRAWAL",
  CREATE_WITHDRAWAL_OLD = "CREATE_WITHDRAWAL_OLD",
  DELETE_TICKET = "DELETE_TICKET",
  SET_STATUS_TICKET = "SET_STATUS_TICKET",
  GET_NOTIFICATIONS = "GET_NOTIFICATIONS",
  SET_NOTIFICATIONS = "SET_NOTIFICATIONS",
  SET_NOTIFICATIONS_PAGINATION = "SET_NOTIFICATIONS_PAGINATION",
  GET_NOTIFICATIONS_PANEL = "GET_NOTIFICATIONS_PANEL",
  SET_NOTIFICATIONS_PANEL = "SET_NOTIFICATIONS_PANEL",
  ADD_NEW_NOTICE = "ADD_NEW_NOTICE",
  SET_MAKE_ALL_READ_NOTIFICATIONS = "SET_MAKE_ALL_READ_NOTIFICATIONS",
  SET_CONNECTING_WALLET = "SET_CONNECTING_WALLET",
  SHOW_GIFT_MODAL = "SHOW_GIFT_MODAL",
  CLOSE_GIFT_MODAL = "CLOSE_GIFT_MODAL",
  GET_GIFT = "GET_GIFT",
  SET_GIFT = "SET_GIFT",
  GET_WITHDRAW_BALANCE_DATA = "GET_WITHDRAW_BALANCE_DATA",
  SET_WITHDRAW_BALANCE_DATA = "SET_WITHDRAW_BALANCE_DATA",
  GET_WITHDRAW_COMMISSIONS_DATA = "GET_WITHDRAW_COMMISSIONS_DATA",
  SET_WITHDRAW_COMMISSIONS_DATA = "SET_WITHDRAW_COMMISSIONS_DATA",
  GET_PRICE_LANDING_DATA = "GET_PRICE_LANDING_DATA",
  SET_PRICE_LANDING_DATA = "SET_PRICE_LANDING_DATA",
  SEND_MIGRATION_FORM = "SEND_MIGRATION_FORM",
  UPDATE_USER_BALANCE = "UPDATE_USER_BALANCE",
  REQUEST_UPDATE_USER_BALANCE = "REQUEST_UPDATE_USER_BALANCE",
  REQUEST_VERSIONING_BUCKET = "REQUEST_VERSIONING_BUCKET",
  RESET_USER_STATE = "RESET_USER_STATE",
  UPDATE_BUCKET = "UPDATE_BUCKET",
}

export type RequestVersioningBucketAction = {
  type: ActionTypes.REQUEST_VERSIONING_BUCKET;
  payload: {
    VersioningStatus: VersioningBucketStatus;
    Name: string;
  };
};
type UpdateBucketPayload = Partial<IBucket> & { Name: string };
export type UpdateBucketAction = {
  type: ActionTypes.UPDATE_BUCKET;
  payload: UpdateBucketPayload;
};

export interface ISetAuth {
  type: ActionTypes.SET_IS_AUTHORIZED;
  payload: IIsAuthorized;
}
export interface ISetUserData {
  type: ActionTypes.SET_USER_DATA;
  payload: IUserData;
}
export interface IAuthError {
  type: ActionTypes.SET_AUTH_ERROR;
  payload: {
    open: boolean;
    errorText: string;
  };
}
export interface IGetBuckets {
  type: ActionTypes.GET_BUCKETS_LIST;
  payload: IBucketsListData;
}
export interface ISetBuckets {
  type: ActionTypes.SET_BUCKETS_LIST;
  payload: IBucket[];
}
export interface IGetFiles {
  type: ActionTypes.GET_FILES_LIST;
  payload: IFilesListData;
}
export interface IGetSearchedFiles {
  type: ActionTypes.GET_SEARCHED_FILES_LIST;
  payload: ISearchedFilesListData;
}
export interface ISetFiles {
  type: ActionTypes.SET_FILES_LIST;
  payload: ICurrentBucket;
}
export interface ISetSearchedFiles {
  type: ActionTypes.SET_SEARCHED_FILES_LIST;
  payload: ISearchFilesResult;
}

export interface IGetFileInfoPayload {
  nameFile: any;
  nameBucket: any;
  pathFolder: any;
  afterLoad: any;
}

export interface IGetFileInfo {
  type: ActionTypes.GET_FILE_INFO;
  payload: IGetFileInfoPayload;
}
export interface ISetFileInfo {
  type: ActionTypes.SET_FILE_INFO;
  payload: StoreFile;
}
export interface IGetSettingsInfo {
  type: ActionTypes.GET_SETTINGS_INFO;
  payload: any;
}
export interface ISetSettingsInfo {
  type: ActionTypes.SET_SETTINGS_INFO;
  payload: any;
}
export interface ISetFilePagination {
  type: ActionTypes.SET_FILE_PAGINATION;
  payload: any;
}

export interface IDeleteBucket {
  type: ActionTypes.DELETE_BUCKET;
  payload: IBucketDelete;
}
export interface IRenameBucket {
  type: ActionTypes.RENAME_BUCKET;
  payload: IBucketRename;
}
export interface ICreateBucket {
  type: ActionTypes.CREATE_BUCKET;
  payload: INewBucket;
}
export interface ICreateFolder {
  type: ActionTypes.CREATE_FOLDER;
  payload: any;
}
export interface IRenameFileFolder {
  type: ActionTypes.RENAME_FILE_FOLDER;
  payload: any;
}
export interface IPrivacyFile {
  type: ActionTypes.PRIVACY_FILE;
  payload: PrivacyFilePayload;
}
export interface IMetadataFile {
  type: ActionTypes.METADATA_FILE;
  payload: any;
}
export interface IDeleteFileFolder {
  type: ActionTypes.DELETE_FILE_FOLDER;
  payload: any;
}
export interface IDeleteFileFolderMultiple {
  type: ActionTypes.DELETE_FILE_FOLDER_MULTIPLE;
  payload: any;
}
export interface IDownloadFileFolder {
  type: ActionTypes.DOWNLOAD_FILE_FOLDER;
  payload: any;
}
export interface IDownloadFileFolderMultiple {
  type: ActionTypes.DOWNLOAD_FILE_FOLDER_MULTIPLE;
  payload: any;
}
export interface IGetEmailSettings {
  type: ActionTypes.GET_EMAIL_SETTINGS;
  payload: any;
}
export interface ISetEmailSettings {
  type: ActionTypes.SET_EMAIL_SETTINGS;
  payload: any;
}
export interface IUploadFile {
  type: ActionTypes.UPLOAD_FILES;
  payload: any;
}
export interface IGetStorageClasses {
  type: ActionTypes.GET_STORAGE_CLASSES;
}
export interface IGetRegions {
  type: ActionTypes.GET_REGIONS;
}
export interface IGetBucketsGuides {
  type: ActionTypes.GET_BUCKETS_GUIDES;
}
export interface ISetPagination {
  type: ActionTypes.SET_PAGINATION;
  payload: TSetPagination;
}
export interface IGetStorageClassesInfo {
  type: ActionTypes.GET_STORAGE_CLASSES_INFO;
}
export interface ISetUploadInfo {
  type: ActionTypes.SET_UPLOAD_INFO;
  payload: any;
}
export interface ISetUpload {
  type: ActionTypes.SET_UPLOAD;
  payload: any;
}
export interface ISetUploadFiles {
  type: ActionTypes.SET_UPLOAD_FILES;
  payload: any;
}
export interface IClearUploadFiles {
  type: ActionTypes.CLEAR_UPLOAD_FILES;
}
export interface IDeleteUploadFile {
  type: ActionTypes.DELETE_UPLOAD_FILE;
  payload: string;
}

export type GetStatisticsHomePayload = {
  from: Date | undefined;
  to: Date | undefined;
  callback?: GetStatisticsCallBack;
};

export interface IGetStatisticsHome {
  type: ActionTypes.GET_STATISTICS_HOME;
  payload: GetStatisticsHomePayload;
}

export interface ISetStatisticsHomePayload {
  statistics: Statistics;
  bandwidthAnalytics: {
    Records: BandwidthAnalyticsRecord[];
  };
  storageUsageAnalytics: {
    Records: StorageUsageAnalyticsRecord[];
  };
}

export interface ISetStatisticsHome {
  type: ActionTypes.SET_STATISTICS_HOME;
  payload: ISetStatisticsHomePayload;
}
export interface ISetAccessKeys {
  type: ActionTypes.SET_ACCESS_KEYS;
  payload: AccessKey[];
}
export interface IGetAccessKeys {
  type: ActionTypes.GET_ACCESS_KEYS;
}
export interface ICreateAccessKey {
  type: ActionTypes.CREATE_ACCESS_KEY;
}
export interface IDeleteAccessKey {
  type: ActionTypes.DELETE_ACCESS_KEY;
  payload: any;
}
export interface ISetCurrentAccessKey {
  type: ActionTypes.SET_CURRENT_ACCESS_KEY;
  payload: AccessKey;
}
export type ChangeStatusPayload = {
  key: AccessKey;
  status: boolean;
};
export interface ISetStatusAccessKey {
  type: ActionTypes.CHANGE_STATUS_ACCESS_KEY;
  payload: ChangeStatusPayload;
}
export interface ISetTickets {
  type: ActionTypes.SET_TICKETS;
  payload: Ticket[];
}
export interface ISetUsd {
  type: ActionTypes.SET_USD;
  payload: string;
}
export interface ISetNotifications {
  type: ActionTypes.SET_NOTIFICATIONS;
  payload: any;
}
export interface ISetNotificationsPagination {
  type: ActionTypes.SET_NOTIFICATIONS_PAGINATION;
  payload: any;
}
export interface ISetNotificationsPanel {
  type: ActionTypes.SET_NOTIFICATIONS_PANEL;
  payload: NotificationRep;
}

export interface IAddNewNotice {
  type: ActionTypes.ADD_NEW_NOTICE;
  payload: any;
}

export interface ISetMakeAllReadNotifications {
  type: ActionTypes.SET_MAKE_ALL_READ_NOTIFICATIONS;
  payload: any;
}

export interface ISetCommonError {
  type: ActionTypes.SET_COMMON_ERROR;
  payload: string;
}
export interface ISetSkipCommonErrors {
  type: ActionTypes.SET_SKIP_COMMON_ERRORS;
  payload: boolean;
}
export interface IClearCommonErrors {
  type: ActionTypes.CLEAR_COMMON_ERRORS;
}

export interface ISetConnectingWallet {
  type: ActionTypes.SET_CONNECTING_WALLET;
  payload: string;
}

export interface IShowGiftModal {
  type: ActionTypes.SHOW_GIFT_MODAL;
}

export interface ICloseGiftModal {
  type: ActionTypes.CLOSE_GIFT_MODAL;
}

export interface IGetGift {
  type: ActionTypes.GET_GIFT;
}

export interface ISetGift {
  type: ActionTypes.SET_GIFT;
  payload: IGift;
}

export type RedirectAuthType = {
  type: ActionTypes.SET_REDIRECT_URL;
  payload: string;
};

export type UpdateUserBalance = {
  type: ActionTypes.UPDATE_USER_BALANCE;
  payload: string;
};
export type UpdateUserBalanceRequest = {
  type: ActionTypes.REQUEST_UPDATE_USER_BALANCE;
};
export type ResetUserStateAction = {
  type: ActionTypes.RESET_USER_STATE;
};
