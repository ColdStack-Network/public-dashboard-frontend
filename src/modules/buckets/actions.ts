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
  ISetStorageClasses,
  ISetRegions,
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
  IMetadataFile, ISetUpload
} from "../../actions/actionTypes";
import {
  IBucketDelete,
  IBucketRename,
  IBucketsListData,
  IFilesListData, TSetPagination,
  ISearchedFilesListData
} from "../../actions/interfaces";
import {INewBucket} from "../../containers/BucketsPage/BucketsPage";
import { INewFolder} from "../../containers/BucketPage/BucketPage";
import {ISetStorageClassesInfo} from '../../actions/accountActionTypes';

export const setBucketsList = (payload: any): ISetBuckets => ({
  type: ActionTypes.SET_BUCKETS_LIST,
  payload,
});

export const getBucketsList = (payload: IBucketsListData): IGetBuckets => ({
  type: ActionTypes.GET_BUCKETS_LIST,
  payload,
});

export const setFilesList = (payload: any): ISetFiles => ({
  type: ActionTypes.SET_FILES_LIST,
  payload,
});

export const setSearchedFilesList = (payload: any): ISetSearchedFiles => ({
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

export const renameBucket = (payload: IBucketRename): IRenameBucket => ({
  type: ActionTypes.RENAME_BUCKET,
  payload,
});
export const renameFileFolder = (payload: any): IRenameFileFolder => ({
  type: ActionTypes.RENAME_FILE_FOLDER,
  payload,
});

export const privacyFile = (payload: any): IPrivacyFile => ({
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

export const setStorageClasses = (payload: any): ISetStorageClasses => ({
  type: ActionTypes.SET_STORAGE_CLASSES,
  payload
});
export const setRegions = (payload: any): ISetRegions => ({
  type: ActionTypes.SET_REGIONS,
  payload
});

export const getBucketsGuides = (): IGetBucketsGuides => ({
  type: ActionTypes.GET_BUCKETS_GUIDES,
});

export const setPagination = (payload: TSetPagination): ISetPagination => ({
  type: ActionTypes.SET_PAGINATION,
  payload
});

export const getStorageClassesInfo = (): IGetStorageClassesInfo => ({
  type: ActionTypes.GET_STORAGE_CLASSES_INFO,
});

export const setStorageClassesInfo = (payload: any): ISetStorageClassesInfo => ({
  type: ActionTypes.SET_STORAGE_CLASSES_INFO,
  payload
});
export const setUploadInfo = (payload: any): ISetUploadInfo => ({
  type: ActionTypes.SET_UPLOAD_INFO,
  payload
})
export const setUpload = (payload: any): ISetUpload => ({
  type: ActionTypes.SET_UPLOAD,
  payload
})
export const setUploadFiles = (payload: any): ISetUploadFiles => ({
  type: ActionTypes.SET_UPLOAD_FILES,
  payload
});
export const clearUploadFiles = (): IClearUploadFiles => ({
  type: ActionTypes.CLEAR_UPLOAD_FILES,
});
export const deleteUploadFile = (payload: string): IDeleteUploadFile => ({
  type: ActionTypes.DELETE_UPLOAD_FILE,
  payload
});
export const getStatisticsHome = (payload: any): IGetStatisticsHome => ({
  type: ActionTypes.GET_STATISTICS_HOME,
  payload
});
export const setStatisticsHome = (payload: any): ISetStatisticsHome => ({
  type: ActionTypes.SET_STATISTICS_HOME,
  payload
});

