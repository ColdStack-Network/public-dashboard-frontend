import {
  ActionTypes,
  IClearUploadFiles,
  IDeleteUploadFile,
  IGetBuckets,
  ISetBuckets,
  ISetFileInfo,
  ISetFilePagination,
  ISetFiles,
  ISetPagination,
  ISetStatisticsHome,
  ISetUploadFiles,
  ISetUploadInfo,
  ISetSearchedFiles,
  ISetUpload,
  UpdateBucketAction,
} from "actions/actionTypes";
import { IGuideRegion, IStorageClassInfo } from "actions/interfaces";
import { isFull } from "helpers/common";
import { mergeObjectInArray } from "helpers/utils";
import { IContentsFile, IFoldersList, IObjectExtendedInfo, ISearchedFile } from "helpers/yandexS3";
import { BandwidthAnalyticsRecord, StorageUsageAnalyticsRecord } from "models/Analytics";
import { BasePagination, BucketPagination } from "models/Pagination";
import { Statistics } from "models/Statistics";
import { ISetStorageClassesInfo } from "Redux/account/Actions/accountActions";
import { ISetRegion, ISetStorageClasses } from "Redux/buckets/Actions/bucketsActions";

const initPagination: BucketPagination = {
  Page: 1,
  PerPage: 10,
  PagesCount: 1,
  Name: "",
  Prefix: "",
};

export interface IBucket {
  Name: string;
  CreationDate: string;
  ObjectsCount: string;
  ObjectsWithoutFoldersCount: string;
  VersioningStatus: "Disabled" | "Enabled";
}

export interface ICurrentBucket {
  filesList?: IContentsFile[];
  foldersList?: IFoldersList[];
  nameBucket?: string;
  pathFolder?: string;
  pagination?: BasePagination;
}

export type StoreFile = {
  nameBucket?: string;
  pathFolder?: string;
  data: IObjectExtendedInfo;
};

export type UploadInfo = {
  [key: string]: {
    file: File;
  };
};

type Upload = {
  isModalUpload: boolean;
  nameBucket: string;
  pathFolder: string;
  isLoadingFiles: boolean;
};

type StatisticsHome = {
  statistics: Statistics;
  bandwidthAnalytics: {
    Records: BandwidthAnalyticsRecord[];
  };
  storageUsageAnalytics: {
    Records: StorageUsageAnalyticsRecord[];
  };
};

type UploadInfoTotal = {
  totalPercent: number;
  filesNumber: number;
  loadedFilesNumber: number;
  filesTotalSize: number;
};

export interface IBucketsState {
  bucketsList: IBucket[];
  currentBucket: ICurrentBucket;
  paginationBuckets: BucketPagination;
  paginationFiles: BucketPagination;
  paginationNotifications: BucketPagination;
  loadingPage: string;
  storageClasses: IGuideRegion[];
  storageClassesInfo: IStorageClassInfo[];
  regions: IGuideRegion[];
  file: StoreFile;
  uploadInfo: UploadInfo;
  upload: Upload;
  statisticsHome: StatisticsHome;
  searchedFiles: ISearchedFile[];
  uploadInfoTotal: UploadInfoTotal;
}

const initialState: IBucketsState = {
  bucketsList: [],
  paginationBuckets: initPagination,
  paginationFiles: initPagination,
  paginationNotifications: initPagination,
  currentBucket: {
    filesList: [],
    nameBucket: "",
  } as ICurrentBucket,
  file: {} as StoreFile,
  loadingPage: "",
  storageClasses: [],
  storageClassesInfo: [],
  regions: [],
  uploadInfo: {} as UploadInfo,
  upload: {} as Upload,
  uploadInfoTotal: {} as UploadInfoTotal,
  statisticsHome: {} as StatisticsHome,
  searchedFiles: [],
};

type ActionType =
  | IGetBuckets
  | ISetBuckets
  | ISetFiles
  | ISetStorageClasses
  | ISetRegion
  | ISetPagination
  | ISetStorageClassesInfo
  | ISetFileInfo
  | ISetUploadInfo
  | ISetUploadFiles
  | IClearUploadFiles
  | IDeleteUploadFile
  | ISetStatisticsHome
  | ISetFilePagination
  | ISetSearchedFiles
  | ISetUpload
  | UpdateBucketAction;

export default function buckets(state: IBucketsState = initialState, action: ActionType): IBucketsState {
  switch (action.type) {
    case ActionTypes.UPDATE_BUCKET: {
      const { bucketsList } = state;
      const newBucketList = mergeObjectInArray(action.payload, bucketsList, "Name");
      return { ...state, bucketsList: newBucketList };
    }
    case ActionTypes.GET_BUCKETS_LIST:
      return { ...state, loadingPage: "buckets" };
    case ActionTypes.SET_BUCKETS_LIST:
      return { ...state, bucketsList: action.payload };
    case ActionTypes.SET_FILES_LIST: {
      return { ...state, currentBucket: action.payload };
    }
    case ActionTypes.SET_FILE_INFO:
      return { ...state, file: action.payload };
    case ActionTypes.SET_FILE_PAGINATION:
      return {
        ...state,
        currentBucket: {
          ...state.currentBucket,
          pagination: { ...state.currentBucket?.pagination, ...action.payload },
        },
      };
    case ActionTypes.SET_STORAGE_CLASSES:
      return { ...state, storageClasses: action.payload };
    case ActionTypes.SET_REGIONS:
      return { ...state, regions: action.payload };
    case ActionTypes.SET_STORAGE_CLASSES_INFO:
      return { ...state, storageClassesInfo: action.payload };
    case ActionTypes.SET_UPLOAD_INFO:
      const newInfo = {
        ...state.uploadInfo,
        [action.payload?.filepath]: {
          ...state.uploadInfo[action.payload?.filepath],
          ...action.payload.info,
        },
      };
      const mas = Object.values(newInfo) as any;
      let loadedFilesNumber = 0;
      let totalLoaded = 0;
      let total = 0;
      for (let i = 0; i < mas.length; i++) {
        if (mas[i]?.progressValues?.loaded) {
          totalLoaded += mas[i]?.progressValues?.loaded;
        }
        if (mas[i].progressValues?.total) {
          total += mas[i].progressValues?.total;
        }
        if (mas[i].progress === 100) {
          loadedFilesNumber += 1;
        }
      }
      /*@ts-ignore*/
      const totalPercent = total && totalLoaded ? (+totalLoaded / +total) * 100 : 0;
      const uploadInfoTotal = {
        totalPercent,
        filesNumber: mas.length,
        loadedFilesNumber,
        filesTotalSize: total,
      };
      return { ...state, uploadInfo: newInfo, uploadInfoTotal };
    case ActionTypes.SET_UPLOAD:
      return { ...state, upload: { ...state.upload, ...action.payload } };
    case ActionTypes.SET_UPLOAD_FILES: {
      const newFiles = action.payload;
      let obj = {};
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        obj[file.filepath] = { file: file };
      }
      return { ...state, uploadInfo: { ...state.uploadInfo, ...obj } };
    }
    case ActionTypes.CLEAR_UPLOAD_FILES: {
      return { ...state, uploadInfo: {}, uploadInfoTotal: {} as UploadInfoTotal };
    }
    case ActionTypes.DELETE_UPLOAD_FILE: {
      let uploadInfoCopy = { ...state.uploadInfo };
      delete uploadInfoCopy[action.payload];
      let upload = { ...state.upload };
      if (!isFull(uploadInfoCopy)) {
        upload = { isModalUpload: false, isLoadingFiles: false, nameBucket: "", pathFolder: "" };
      }
      return { ...state, uploadInfo: uploadInfoCopy, upload };
    }
    case ActionTypes.SET_STATISTICS_HOME: {
      return { ...state, statisticsHome: action.payload };
    }
    case ActionTypes.SET_SEARCHED_FILES_LIST: {
      let searchedFiles = action.payload.Files;

      if (action.payload.Query.page > 1) {
        searchedFiles = [...state.searchedFiles, ...searchedFiles];
      }
      return {
        ...state,
        searchedFiles,
      };
    }
    default:
      return state;
  }
}
