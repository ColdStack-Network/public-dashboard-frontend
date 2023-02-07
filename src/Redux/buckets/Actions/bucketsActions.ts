import { ISearchFilesResult } from "helpers/yandexS3";
import { ISetStorageClassesInfo } from "Redux/account/Actions/accountActions";
import { IBucket, ICurrentBucket } from "Redux/buckets/reducer";
import {
  ActionTypes,
  IGetBuckets,
  ISetBuckets,
  ISetFiles,
  ISetSearchedFiles,
  IGetFiles,
  IGetSearchedFiles,
  IRenameBucket,
  IDeleteBucket,
  IGetStorageClasses,
  IGetRegions,
  IGetBucketsGuides,
  ICreateBucket,
  ISetPagination,
  IGetStorageClassesInfo,
  ICreateFolder,
  IUploadFile,
  IGetFileInfo,
  ISetFileInfo,
  IRenameFileFolder,
  IDeleteFileFolder,
  IDeleteFileFolderMultiple,
  IDownloadFileFolder,
  IDownloadFileFolderMultiple,
  ISetUploadInfo,
  ISetUploadFiles,
  IClearUploadFiles,
  IDeleteUploadFile,
  IGetStatisticsHome,
  ISetStatisticsHome,
  ISetFilePagination,
  IPrivacyFile,
  IMetadataFile,
  ISetUpload,
  ISetStatisticsHomePayload,
  GetStatisticsHomePayload,
  RequestVersioningBucketAction,
  UpdateBucketAction,
} from "actions/actionTypes";
import {
  IBucketDelete,
  IBucketRename,
  IBucketsListData,
  IFilesListData,
  TSetPagination,
  ISearchedFilesListData,
  IGuideRegion,
  IStorageClassInfo,
} from "actions/interfaces";
import { INewBucket } from "containers/BucketsPage/BucketsPage";
import { INewFolder } from "containers/BucketPage/BucketPage";
import { PrivacyFilePayload } from "../../../models/PrivacyFilePayload";

export const setBucketsList = (payload: IBucket[]): ISetBuckets => ({
  type: ActionTypes.SET_BUCKETS_LIST,
  payload,
});

export const getBucketsList = (payload: IBucketsListData): IGetBuckets => ({
  type: ActionTypes.GET_BUCKETS_LIST,
  payload,
});

export const setFilesList = (payload: ICurrentBucket): ISetFiles => ({
  type: ActionTypes.SET_FILES_LIST,
  payload,
});

export const setSearchedFilesList = (payload: ISearchFilesResult): ISetSearchedFiles => ({
  type: ActionTypes.SET_SEARCHED_FILES_LIST,
  payload,
});

export const getFilesList = (payload: IFilesListData): IGetFiles => ({
  type: ActionTypes.GET_FILES_LIST,
  payload,
});

export const getSearchedFilesList = (payload: ISearchedFilesListData): IGetSearchedFiles => ({
  type: ActionTypes.GET_SEARCHED_FILES_LIST,
  payload,
});

export const getFileInfo = (payload: any): IGetFileInfo => ({
  type: ActionTypes.GET_FILE_INFO,
  payload,
});
export const setFileInfo = (payload: any): ISetFileInfo => ({
  type: ActionTypes.SET_FILE_INFO,
  payload,
});
export const setFilePagination = (payload: any): ISetFilePagination => ({
  type: ActionTypes.SET_FILE_PAGINATION,
  payload,
});
export const updateBucket = (payload: UpdateBucketAction["payload"]): UpdateBucketAction => ({
  type: ActionTypes.UPDATE_BUCKET,
  payload,
});
export const renameBucket = (payload: IBucketRename): IRenameBucket => ({
  type: ActionTypes.RENAME_BUCKET,
  payload,
});
export const renameFileFolder = (payload: any): IRenameFileFolder => ({
  type: ActionTypes.RENAME_FILE_FOLDER,
  payload,
});

export const privacyFile = (payload: PrivacyFilePayload): IPrivacyFile => ({
  type: ActionTypes.PRIVACY_FILE,
  payload,
});

export const metadataFile = (payload: any): IMetadataFile => ({
  type: ActionTypes.METADATA_FILE,
  payload,
});

export const deleteFileFolder = (payload: any): IDeleteFileFolder => ({
  type: ActionTypes.DELETE_FILE_FOLDER,
  payload,
});
export const deleteFileFolderMultiple = (payload: any): IDeleteFileFolderMultiple => ({
  type: ActionTypes.DELETE_FILE_FOLDER_MULTIPLE,
  payload,
});

export const downloadFileFolder = (payload: any): IDownloadFileFolder => ({
  type: ActionTypes.DOWNLOAD_FILE_FOLDER,
  payload,
});
export const downloadFileFolderMultiple = (payload: any): IDownloadFileFolderMultiple => ({
  type: ActionTypes.DOWNLOAD_FILE_FOLDER_MULTIPLE,
  payload,
});

export const deleteBucket = (payload: IBucketDelete): IDeleteBucket => ({
  type: ActionTypes.DELETE_BUCKET,
  payload,
});

export const createBucket = (payload: INewBucket): ICreateBucket => ({
  type: ActionTypes.CREATE_BUCKET,
  payload,
});

export const createFolder = (payload: INewFolder): ICreateFolder => ({
  type: ActionTypes.CREATE_FOLDER,
  payload,
});

export const uploadFiles = (payload: any): IUploadFile => ({
  type: ActionTypes.UPLOAD_FILES,
  payload,
});
export const downloadFile = (payload: any): IDownloadFileFolder => ({
  type: ActionTypes.DOWNLOAD_FILE_FOLDER,
  payload,
});
export const downloadFileMultiple = (payload: any): IDownloadFileFolderMultiple => ({
  type: ActionTypes.DOWNLOAD_FILE_FOLDER_MULTIPLE,
  payload,
});

export const getStorageClasses = (): IGetStorageClasses => ({
  type: ActionTypes.GET_STORAGE_CLASSES,
});
export const getRegions = (): IGetRegions => ({
  type: ActionTypes.GET_REGIONS,
});

export interface ISetStorageClasses {
  type: ActionTypes.SET_STORAGE_CLASSES;
  payload: IGuideRegion[];
}

export const setStorageClasses = (payload: IGuideRegion[]): ISetStorageClasses => ({
  type: ActionTypes.SET_STORAGE_CLASSES,
  payload,
});

export interface ISetRegion {
  type: ActionTypes.SET_REGIONS;
  payload: IGuideRegion[];
}

export const setRegions = (payload: IGuideRegion[]): ISetRegion => ({
  type: ActionTypes.SET_REGIONS,
  payload,
});

export const getBucketsGuides = (): IGetBucketsGuides => ({
  type: ActionTypes.GET_BUCKETS_GUIDES,
});

export const setPagination = (payload: TSetPagination): ISetPagination => ({
  type: ActionTypes.SET_PAGINATION,
  payload,
});

export const getStorageClassesInfo = (): IGetStorageClassesInfo => ({
  type: ActionTypes.GET_STORAGE_CLASSES_INFO,
});

export const setStorageClassesInfo = (payload: IStorageClassInfo[]): ISetStorageClassesInfo => ({
  type: ActionTypes.SET_STORAGE_CLASSES_INFO,
  payload,
});
export const setUploadInfo = (payload: any): ISetUploadInfo => ({
  type: ActionTypes.SET_UPLOAD_INFO,
  payload,
});
export const setUpload = (payload: any): ISetUpload => ({
  type: ActionTypes.SET_UPLOAD,
  payload,
});
export const setUploadFiles = (payload: any): ISetUploadFiles => ({
  type: ActionTypes.SET_UPLOAD_FILES,
  payload,
});
export const clearUploadFiles = (): IClearUploadFiles => ({
  type: ActionTypes.CLEAR_UPLOAD_FILES,
});
export const deleteUploadFile = (payload: string): IDeleteUploadFile => ({
  type: ActionTypes.DELETE_UPLOAD_FILE,
  payload,
});
export const getStatisticsHome = (payload: GetStatisticsHomePayload): IGetStatisticsHome => ({
  type: ActionTypes.GET_STATISTICS_HOME,
  payload,
});
export const setStatisticsHome = (payload: ISetStatisticsHomePayload): ISetStatisticsHome => ({
  type: ActionTypes.SET_STATISTICS_HOME,
  payload,
});
export const requestVersioningBucket = (
  payload: RequestVersioningBucketAction["payload"]
): RequestVersioningBucketAction => ({
  type: ActionTypes.REQUEST_VERSIONING_BUCKET,
  payload,
});
