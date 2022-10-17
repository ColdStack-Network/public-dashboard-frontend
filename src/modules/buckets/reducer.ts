import {
  ActionTypes, IClearUploadFiles, IDeleteUploadFile,
  IGetBuckets,
  ISetBuckets, ISetFileInfo, ISetFilePagination,
  ISetFiles, ISetPagination,
  ISetRegions, ISetStatisticsHome,
  ISetStorageClasses, ISetUploadFiles, ISetUploadInfo,
  ISetSearchedFiles, ISetUpload
} from "../../actions/actionTypes";
import {isFull} from "../../helpers/common";
import {ISetStorageClassesInfo} from '../../actions/accountActionTypes';

const initPagination = {Page: 1, PerPage: 10, PagesCount: 1, Name: "", Prefix: ""};

const initialState = {
  bucketsList: [] as any,
  paginationBuckets: initPagination,
  paginationFiles: initPagination,
  paginationNotifications: initPagination,
  currentBucket: {filesList: [], nameBucket: ""} as any,
  file: {} as any,
  loadingPage: "" as string,
  storageClasses:  [] as any [],
  storageClassesInfo:  [] as any [],
  regions:  [] as any [],
  uploadInfo: {},
  upload: {},
  uploadInfoTotal: {} as any,
  statisticsHome: {},
  searchedFiles: [] as any
 };

export interface IBucketsState {
  bucketsList: any,
  currentBucket: any,
  loadingPage: string,
  storageClasses: any [],
  storageClassesInfo: any [],
  regions: any [],
  file: any,
  uploadInfo: any,
  upload: any,
  statisticsHome: any,
  searchedFiles: any,
  uploadInfoTotal: any
}

type ActionType = IGetBuckets | ISetBuckets | ISetFiles | ISetStorageClasses | ISetRegions | ISetPagination
  | ISetStorageClassesInfo | ISetFileInfo | ISetUploadInfo | ISetUploadFiles | IClearUploadFiles | IDeleteUploadFile
  | ISetStatisticsHome | ISetFilePagination | ISetSearchedFiles | ISetUpload;

export default function buckets(state: IBucketsState = initialState, action: ActionType) {
  switch (action.type) {
    case ActionTypes.GET_BUCKETS_LIST:
      return { ...state, loadingPage: "buckets" };
    case ActionTypes.SET_BUCKETS_LIST:
      return { ...state, bucketsList: action.payload };
    case ActionTypes.SET_FILES_LIST: {
      //console.log("action.payload", action.payload);
      return {...state, currentBucket: action.payload}
    }
    case ActionTypes.SET_FILE_INFO:
      return { ...state, file: action.payload };
    case ActionTypes.SET_FILE_PAGINATION:
      //console.log("SET_FILE_PAGINATION", action.payload)
      return { ...state, currentBucket: {...state.currentBucket, pagination:{ ...state.currentBucket?.pagination, ...action.payload}} };
    case ActionTypes.SET_STORAGE_CLASSES:
      return {...state, storageClasses: action.payload }
    case ActionTypes.SET_REGIONS:
      return {...state, regions: action.payload }
    case ActionTypes.SET_STORAGE_CLASSES_INFO:
      return {...state, storageClassesInfo: action.payload }
    case ActionTypes.SET_UPLOAD_INFO:
      const newInfo = {...state.uploadInfo, [action.payload?.filepath]: { ...state.uploadInfo[action.payload?.filepath], ...action.payload.info }};
      const mas = Object.values(newInfo) as any;
      let loadedFilesNumber=0;
      let totalLoaded = 0;
      let total = 0;
      for (let i=0; i<mas.length; i++){
        if (mas[i]?.progressValues?.loaded) {
          totalLoaded += mas[i]?.progressValues?.loaded;
        }
        if (mas[i].progressValues?.total) {
          total += mas[i].progressValues?.total;
        }
        if (mas[i].progress === 100){
          loadedFilesNumber+=1;
        }
      }
      /*@ts-ignore*/
      const totalPercent = (total && totalLoaded) ? (+totalLoaded/+total)*100 : 0;
      const uploadInfoTotal = {
        totalPercent,
        filesNumber: mas.length,
        loadedFilesNumber,
        filesTotalSize: total,
      }
      return {...state, uploadInfo: newInfo, uploadInfoTotal}
    case ActionTypes.SET_UPLOAD:
      return {...state, upload:{ ...state.upload, ...action.payload}}
    case ActionTypes.SET_UPLOAD_FILES: {
      const newFiles = action.payload;
      let obj = {};
      for (let i=0; i<newFiles.length; i++){
        const file = newFiles[i];
        obj[file.filepath] = {file: file}
      }
      /*[action.payload?.filepath]: { ...state.uploadInfo[action.payload?.filepath], ...action.payload.info }*/
      return {...state, uploadInfo: {...state.uploadInfo, ...obj}}
    }
    case ActionTypes.CLEAR_UPLOAD_FILES: {
      return {...state, uploadInfo: {}, uploadInfoTotal: {}}
    }
    case ActionTypes.DELETE_UPLOAD_FILE: {
      let uploadInfoCopy = {...state.uploadInfo};
      delete uploadInfoCopy[action.payload];
      let upload = {...state.upload};
      if (!isFull(uploadInfoCopy)){
        upload={isModalUpload: false, isLoadingFiles: false, nameBucket:"", pathFolder: ""};
      }
      return {...state, uploadInfo: uploadInfoCopy, upload}
    }
    case ActionTypes.SET_STATISTICS_HOME: {
      return {...state, statisticsHome: action.payload}
    }
    case ActionTypes.SET_SEARCHED_FILES_LIST: {
      let searchedFiles = action.payload.Files;

      if(action.payload.Query.page > 1) {
        searchedFiles = [...state.searchedFiles, ...searchedFiles];
      }

      return {
        ...state,
        searchedFiles
      }
    }

    default:
      return state;
  }
}
