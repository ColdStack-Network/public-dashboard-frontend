import {call, put, takeLatest, takeEvery, all, select} from "redux-saga/effects";
import {ActionTypes} from "../../actions/actionTypes";
import {apiUrl, downloadFileByLink, downloadFiles, fetchApi} from "../../helpers/common";
import {
  getBucketsList, getFilesList,
  setBucketsList, setFileInfo,
  setFilesList,
  setSearchedFilesList,
  setRegions, setStatisticsHome,
  setStorageClasses,
  getFileInfo, setUpload, clearUploadFiles,
} from "./actions";
import {
  createBucketS3,
  createFolderS3, deleteBucketFunc, deleteFileFunc, getBandwidthAnalytics, getDownloadLinkS3,
  getFileInfoFunc,
  getListBuckets,
  getSearchedFilesList,
  getListFiles, getStatisticsHome, getStorageUsageAnalytics, renameBucketFunc, renameFileFunc, renameFolderFunc,
  uploadFileS3, privacyFileFunc, metadataFileFunc, checkCanUpload, checkCanDownload
} from "../../helpers/yandexS3";
import {setCommonError} from "../user/actions";
import {defaultError, methods, processError} from "../../helpers/errorHandler";
import history from "../../helpers/history";

function* searchFiles({payload}) {
  try {
    const list = yield call(getSearchedFilesList, payload);
    yield put(setSearchedFilesList(list))
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

function* getBuckets({payload}) {
  const {afterLoad} = payload;
  try {
    //const list = yield call(fetchApi, 'get', "200", {url: `/buckets?page=${currentPage}&perpage=${perPage}`});
    const list = yield call(getListBuckets);
    //console.log("list==",list);
    //yield put(setBucketsList(list?.data))
    yield put(setBucketsList(list?.Buckets || list?.data))
    afterLoad();
  } catch (err) {
    //console.log("catch err", err)
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
    afterLoad();
  }
}

function* getFilesListProcess({payload}) {
  //console.log("getFilesListProcess payload", payload);
  const {pagination, nameBucket, pathFolder, afterLoad} = payload;
  const {Page, PerPage} = pagination;
  try {
    //const list = yield call(fetchApi, 'get', "200", {url: `/files/${nameBucket}?page=${currentPage}&perpage=${perPage}`});
    const data = yield call(getListFiles, {nameBucket, pathFolder, Page, PerPage});
    const list = data?.ListExtendedObjects;
    //console.log("data==",data, "prefix", pathFolder);

    /*AvailableKeyCount: 8
    CommonPrefixes: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
    Contents: (2) [{…}, {…}]
    Delimiter: "/"
    IsTruncated: false
    KeyCount: 8
    Name: "newbucket-1"
    Page: 1
    PagesCount: 1
    PerPage: 10
   */
    // yield put(setPagination({type: "files", pagination: { Page: list?.Page, PerPage: list?.PerPage, PagesCount: list?.PagesCount, Name: list?.Name, Prefix: list?.Ptefix}}))

    const filesListNotEmpty = list?.Contents.filter((el) => {
      return el?.Key !== list.Prefix
    });
    const filesList = filesListNotEmpty ? filesListNotEmpty.map(
      (el) => {
        //let key = decodeURIComponent(el?.Key);
        let key = el?.Key;
        const folder = `${pathFolder}/`;
        if (key.indexOf(folder) === 0) {
          key = key.replace(folder, "");
        }
        return {...el, Key: key}
      }) : [];

    const foldersList = list?.CommonPrefixes ? list?.CommonPrefixes.map(
      (el) => {
        //let key = decodeURIComponent(el?.Prefix);
        let key = el?.Prefix;
        const folder = `${pathFolder}/`;
        if (key.indexOf(folder) === 0) {
          key = key.replace(folder, "");
        }
        return {...el, Key: key}
      }) : [];
    const pagination = {
      page: list?.Page > list?.PagesCount ? list?.PagesCount : list?.Page,
      perPage: list?.PerPage,
      pagesCount: list?.PagesCount
    }
    //console.log("pagination setFilesList", pagination, "list", list)
    yield put(setFilesList({
      filesList: filesList,
      foldersList: foldersList,
      nameBucket: nameBucket,
      pathFolder: pathFolder,
      pagination: pagination
    }))

    afterLoad();
  } catch (err) {
    console.log("catch err", err)
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
    afterLoad();
  }
}

export const redirectFunc = (props) => {
  const {to, back} = props;
  if (back) {
    history.back();
  } else {
    history.push(to);
  }
};

function* getFileInfoProcess({payload}) {

  console.log("getFilesInfo payload", payload);
  const {nameFile, nameBucket, pathFolder, afterLoad} = payload;
  try {
    const data = yield call(getFileInfoFunc, {nameFile, nameBucket, pathFolder});
    console.log("data file==", data);
    yield put(setFileInfo({nameBucket, pathFolder, data}))
    afterLoad();
  } catch (err) {
    console.log("catch err123456", err);
    redirectFunc({back: true});
    yield put(setFileInfo({nameBucket, pathFolder, data: {}}));
    if (err?.code || err?.message) {
      yield put(setCommonError({
        message: err?.message ? `Get file info: ${err?.message}` : err?.code,
        isBottomText: false
      }))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
    afterLoad();
  }
}

function* renameBucket({payload}) {
  console.log("renameBucket", payload);
  const {name, nameBucket, afterLoad, setOuterError} = payload;
  try {
    const pagination = {Page: 1, PerPage: 100};
    // const res = yield call(fe, 'patch', "200", {url: `/buckets/${idBucket}`, body: {name: name}});
    yield call(renameBucketFunc, {nameBucket, name})
    yield put(getBucketsList({pagination, afterLoad: afterLoad}))
  } catch (err) {
    console.log("catch err renameBucket", err?.message, err?.code, err?.Code, err?.status)
    if (err?.message) {
      setOuterError(err?.message);
      //yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: true}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

function* deleteBucket({payload}) {
  console.log("deleteBucket", payload);
  const {nameBucket, afterLoad} = payload;
  try {
    const pagination = {Page: 1, PerPage: 100};
    //const res = yield call(fetchApi, 'delete', "200", {url: `/buckets/${idBucket}`});
    const res = yield call(deleteBucketFunc, {nameBucket});
    console.log("res deleteBucket", res)
    yield put(getBucketsList({pagination, afterLoad: afterLoad}))
  } catch (err) {
    afterLoad();
    console.log("catch err deleteBucket", err.message)
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

function* getBucketsGuides() {
  try {
    const classes = yield call(fetchApi, 'get', "200", {url: `/guide/storage-class`, mainUrl: apiUrl});
    const regions = yield call(fetchApi, 'get', "200", {url: `/guide/region`, mainUrl: apiUrl});
    yield put(setStorageClasses(classes?.data));
    yield put(setRegions(regions?.data));
  } catch (err) {
    console.log("catch err", err)
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

function* createBucket({payload}) {
  console.log("createBucket", payload);
  const {name, setOuterError, onSuccess} = payload;
  try {
    const res = yield call(createBucketS3, name);
    console.log("res createee saga", res);
    //const res = yield call(fetchApi, 'post', "200", {url: `/buckets`, body: payload});
    yield put(getBucketsList({pagination: {Page: 1, PerPage: 100}, afterLoad: onSuccess}))
  } catch (err) {
    console.log("catch err createBucket", "message!", err?.message)
    if (err?.message) {
      setOuterError(err?.message)
    } else {
      const text = processError(err, methods.createBucket);
      if (text?.length > 0) {
        setOuterError(text)
      } else {
        yield put(setCommonError({message: defaultError, isBottomText: true}))
      }
    }
  }
}

function* createFolder({payload}) {
  console.log("createFolder", payload);
  const {nameBucket, nameFolder, pathFolder, onSuccess, setOuterError} = payload;
  try {
    const res = yield call(createFolderS3, {nameBucket, nameFolder: `${nameFolder}/`, pathFolder});
    console.log("res createFolder saga", res);
    //const res = yield call(fetchApi, 'post', "200", {url: `/buckets`, body: payload});
    const pagination = yield select(store => store.buckets?.currentBucket?.pagination);
    yield put(getFilesList({
      nameBucket, pathFolder, afterLoad: () => {
      }, pagination: {Page: pagination?.page || 1, PerPage: pagination?.perPage || 10}
    }));
    onSuccess();
  } catch (err) {
    console.log("catch err createFolder", err);
    if (err?.message) {
      setOuterError(err?.message)
    } else {
      const text = processError(err, methods.putObject);
      if (text?.length > 0) {
        setOuterError(text)
      } else {
        yield put(setCommonError({message: defaultError, isBottomText: true}))
      }
    }
  }
}

function* uploadFilesProcess({payload}) {
  console.log("uploadFilesProcess", payload);
  const {nameBucket, pathFolder, onProgress, onSuccess, saveUploadInstance} = payload;

  try {
    const filesObj = yield select((state) => state.buckets.uploadInfo);
    const files = Object.values(filesObj);

    const canUpload = yield call(checkCanUpload);
    if (canUpload?.CanUload === false){
      yield put(clearUploadFiles());
      yield put(setUpload({isLoadingFiles: false, isModalUpload: false, nameBucket: "", pathFolder: ""}))
      yield put(setCommonError({message: canUpload?.Message, isBottomText: false}))
    }else {
      yield all(files.map(
        (item: any) => {
          let path = `${pathFolder ? pathFolder : ""}${pathFolder ? "/" : ""}${item.file.filepath}`;
          path = path.replace("//", "/");
          return call(uploadFileS3, {
            nameBucket, path, file: item.file,
            onProgress: onProgress(item.file), saveUploadInstance: saveUploadInstance(item.file)
          });
          //return put(deleteFileFolder({nameBucket, type: item?.type, pathFolder, name: item?.name, getFilesListAfter: false, onSuccess:()=>{}}))
        }
      ));
      const pagination = yield select(store => store.buckets?.currentBucket?.pagination);
      yield put(getFilesList({
        nameBucket, pathFolder, afterLoad: () => {
        }, pagination: {Page: pagination?.page || 1, PerPage: pagination?.perPage || 10}
      }));
      onSuccess();
    }
  } catch (err) {
    console.log("catch err uploadFilesProcess", err, err?.status, err?.code, err?.message)
    if (err?.code !== "RequestAbortedError") {
      if (err?.code === "NotEnoughBalance"){
        yield put(clearUploadFiles());
        yield put(setUpload({isLoadingFiles: false, isModalUpload: false, nameBucket: "", pathFolder: ""}))
        yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
      }else {
        yield put(setUpload({isLoadingFiles: false, isModalUpload: false, nameBucket: "", pathFolder: ""}))
        if (err?.code || err?.message) {
          yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: true}))
        } else {
          yield put(setCommonError({message: defaultError, isBottomText: true}))
        }
      }
    }
  }
}

function* renameFileFolderProcess({payload}) {
  const {nameBucket, name, pathFolder, newName, type, onSuccess, setOuterError} = payload;

  try {
    let res;
    if (type === "file") {
      res = yield call(renameFileFunc, {nameBucket, pathFolder, name, newName});
    } else {
      res = yield call(renameFolderFunc, {nameBucket, pathFolder, name, newName});
    }
    console.log("res", res, res?.status === 204);
    if (res?.status === 204 || res?.status === 200) {
      onSuccess();
    }
    const pagination = yield select(store => store.buckets?.currentBucket?.pagination);
    yield put(getFilesList({
      nameBucket, pathFolder, afterLoad: () => {
      }, pagination: {Page: pagination?.page || 1, PerPage: pagination?.perPage || 10}
    }));
  } catch (err) {
    console.log("catch err rename", err)
    if (err?.message) {
      setOuterError(err.message);
      //yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

function* deleteFileFolderProcess({payload}) {
  console.log("deleteFileFolder", payload);
  const {nameBucket, name, pathFolder, type, onSuccess, getFilesListAfter} = payload;
  try {
    let res;
    if (type === "file") {
      res = yield call(deleteFileFunc, {nameBucket, pathFolder, name});
    } else {
      let path = `${pathFolder ? pathFolder : ""}${pathFolder ? "/" : ""}${name}`;
      path = path.replace("//", "/");

      //get all objects in folder  (items), then deleteFiles Multiple

      const data = yield call(getListFiles, {
        nameBucket,
        pathFolder: path,
        Page: 1,
        PerPage: 1000000000000000000,
        allTree: true
      });
      console.log("getListFiles data", data);
      const items = data?.ListExtendedObjects?.Contents && data?.ListExtendedObjects?.Contents?.map(el => {
        return {
          name: el.Key, type: el.FileType === "folder" ? "folder" : "file"
        }
      });
      console.log(" items to delete", items);
      if (items?.length > 0) {
        res = yield call(deleteFileFolderMultipleProcess, {
          payload: {
            nameBucket,
            pathFolder: "", //items comes with all path in their names, pathfolder is redundant
            items: items,
            onSuccess: () => {
            }
          }
        });
      }
      //deleteObject folder (empty folder)
      yield call(deleteFileFunc, {nameBucket, pathFolder, name: `${name}/`})
    }
    console.log("res", res);
    onSuccess();
    const pagination = yield select(store => store.buckets?.currentBucket?.pagination);
    if (getFilesListAfter !== false) {
      yield put(getFilesList({
        nameBucket,
        pathFolder,
        afterLoad: () => {
        },
        pagination: {Page: pagination?.page || 1, PerPage: pagination?.perPage || 10}
      }));
    }
  } catch (err) {
    console.log("catch err delete", err)
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

/*function* deleteFolderProcess({payload}){
  console.log("deleteFolder", payload);
  const {nameBucket, name, pathFolder} = payload;
  try {
    let res;
    //get all objects in folder, deleteFiles Multiple
    res = yield call(deleteFileFunc, {nameBucket, pathFolder, name});
    console.log("res", res);
   // yield put(getFilesList({nameBucket, pathFolder, afterLoad: ()=>{}, pagination: {currentPage: 1, perPage: 100}}));
  }catch(err){
    console.log("catch err delete", err)
  }
}*/

function* privacyFileProcess({payload}) {
  const {nameBucket, nameFile, pathFolder, typePrivacy, typePage} = payload;
  // const nameFile = name;
  try {
    yield call(privacyFileFunc, {nameBucket, pathFolder, name: nameFile, typePrivacy});
    const pagination = yield select(store => store.buckets?.currentBucket?.pagination);

    if (typePage === 'bucketPage') {
      yield put(getFilesList({
        nameBucket, pathFolder, afterLoad: () => {
        }, pagination: {Page: pagination?.page || 1, PerPage: pagination?.perPage || 10}
      }));
    }

    if (typePage === 'filePage') {
      yield put(getFileInfo({
        nameFile, nameBucket, pathFolder, afterLoad: () => {
        }
      }))
    }

  } catch (err) {
    console.log("catch err privacy", err)
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

function* metadataFileProcess({payload}) {
  const {nameBucket, nameFile, CopySource, Metadata, pathFolder} = payload;
  console.log("payload Saga", payload)
  try {
    yield call(metadataFileFunc, {nameBucket, nameFile, pathFolder, CopySource, Metadata});
    yield put(getFileInfo({
      nameFile, nameBucket, pathFolder, afterLoad: () => {
      }
    }))
  } catch (err) {
    console.log("catch err metadata", err)
  }
}

function* deleteFileFolderMultipleProcess({payload}) {
  console.log("deleteFileFolderMultipleProcess", payload);
  const {nameBucket, items, pathFolder, onSuccess} = payload;
  try {
    yield all(items.map(
      item => {
        return call(deleteFileFolderProcess, {
          payload: {
            nameBucket,
            type: item?.type,
            pathFolder,
            name: item?.name,
            getFilesListAfter: false,
            onSuccess: () => {
            }
          }
        });
        //return put(deleteFileFolder({nameBucket, type: item?.type, pathFolder, name: item?.name, getFilesListAfter: false, onSuccess:()=>{}}))
      }
    ));
    onSuccess();
    yield put(getFilesList({
      nameBucket, pathFolder, afterLoad: () => {
      }, pagination: {Page: 1, PerPage: 10}
    }));
  } catch (err) {
    console.log("catch err delete", err)
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

function* downloadFileProcess({payload}) {
  console.log("downloadFileProcess payload", payload)
  try {
    const {nameBucket, pathFolder, nameFile} = payload;

    const canDownload = yield call(checkCanDownload);
    if (canDownload?.CanDownload === false) {
      yield put(setCommonError({message: canDownload?.Message, isBottomText: false}))
    }else{
      const link = yield call(getDownloadLinkS3, {nameBucket, nameFile, pathFolder})
      yield call(downloadFileByLink, link?.link, nameFile);
    }
  } catch (err) {
    console.log("catch download", err)
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

function* downloadFileMultipleProcess({payload}) {
  try {
    const {nameBucket, pathFolder, items, onSuccess} = payload;

    const filtered = items.filter((item) => item.type !== "folder");
    const canDownload = yield call(checkCanDownload);
      if (canDownload?.CanDownload === false) {
        yield put(setCommonError({message: canDownload?.message, isBottomText: false}))
      }else{
      const links = yield all(filtered.map(
        item => {
          return call(getDownloadLinkS3, {nameBucket, nameFile: item?.name, pathFolder});
        }
      ));
      yield call(downloadFiles, links);
      onSuccess();
    }
  } catch (err) {
    console.log("catch download", err)
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

function* getStatisticsHomeProcess({payload}) {


  const {fromStorage, toStorage, fromBandwidth, toBandwidth, callback} = payload;
  console.log("getStatisticsHomeProcess payload", payload);

  let fromBandwidthPush = fromBandwidth
  let toBandwidthPush = toBandwidth

  let fromStoragePush = fromStorage
  let toStoragePush = toStorage


  if(fromBandwidth > toBandwidth) {
    fromBandwidthPush = undefined
    toBandwidthPush = undefined
  }

  // if(fromStorage > toStorage) {
  //   fromStoragePush = undefined
  //   toStoragePush = undefined
  // }

  try {
    const data = yield all([call(getStatisticsHome), call(getBandwidthAnalytics, fromBandwidthPush, toBandwidthPush), call(getStorageUsageAnalytics, fromStoragePush, toStoragePush)])
    const bw = data[1]?.BandwidthAnalytics;
    let newbw = bw?.Records && bw?.Records.map((el) => {
      const dateMas = el.Date.split("-");
      const date = new Date(dateMas[0], +dateMas[1] - 1, dateMas[2]);
      return {...el, Date: new Date(date)}
    })


    // newbw = removeEmpty(newbw, "UploadBandwidth", "DownloadBandwidth");
    // const newUs = removeEmpty(data[2]?.StorageUsageAnalytics?.Records, "UsedStorage", ""); // dell zero
    const newUs = data[2]?.StorageUsageAnalytics?.Records;



    newUs.forEach(element => {
      element.Timestamp = new Date(element.Timestamp)
    });

    newbw.forEach(element => {
      element.Timestamp = new Date(element.Timestamp)
    });

    yield put(setStatisticsHome({
      statistics: data[0]?.Statistics,
      bandwidthAnalytics: {Records: newbw},
      storageUsageAnalytics: {Records: newUs}
    }));
    if (typeof callback === "function"){
      callback({
        statistics: data[0]?.Statistics,
        bandwidthAnalytics: {Records: newbw},
        storageUsageAnalytics: {Records: newUs}
      })
    }
  }
    // }
  catch (err) {
    console.log("catch getStatisticsHomeProcess", err)
    if (err?.code || err?.message) {
      yield put(setCommonError({
        message: err?.message ? `Get statistics: ${err?.message}` : err?.code,
        isBottomText: false
      }))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}


// function* getStorageSelectPeriod() {
//   try {
//     const data = yield call(getStorageUsageAnalytics)
//
//     const newUs = data?.StorageUsageAnalytics?.Records;
//
//     yield put(setStatisticsHome({
//       storageUsageAnalytics: {Records: newUs}
//     }));
//   } catch (err) {
//     console.log("catch getStorageSelectPeriod", err)
//     if (err?.code || err?.message) {
//       yield put(setCommonError({
//         message: err?.message ? `Get statistics: ${err?.message}` : err?.code,
//         isBottomText: false
//       }))
//     } else {
//       yield put(setCommonError({message: defaultError, isBottomText: true}))
//     }
//   }
// }


export function* bucketsSaga() {
  //@ts-ignore
  yield takeLatest(ActionTypes.GET_BUCKETS_LIST, getBuckets);
  // @ts-ignore
  yield takeLatest(ActionTypes.GET_FILES_LIST, getFilesListProcess);
  // @ts-ignore
  yield takeLatest(ActionTypes.GET_SEARCHED_FILES_LIST, searchFiles);
  // @ts-ignore
  yield takeLatest(ActionTypes.GET_FILE_INFO, getFileInfoProcess);
  // @ts-ignore
  yield takeLatest(ActionTypes.RENAME_BUCKET, renameBucket);
  // @ts-ignore
  yield takeLatest(ActionTypes.DELETE_BUCKET, deleteBucket);
  // @ts-ignore
  yield takeLatest(ActionTypes.GET_BUCKETS_GUIDES, getBucketsGuides);
  // @ts-ignore
  yield takeLatest(ActionTypes.CREATE_BUCKET, createBucket);
  // @ts-ignore
  yield takeLatest(ActionTypes.CREATE_FOLDER, createFolder);
  // @ts-ignore
  yield takeLatest(ActionTypes.UPLOAD_FILES, uploadFilesProcess);
  // @ts-ignore
  yield takeLatest(ActionTypes.RENAME_FILE_FOLDER, renameFileFolderProcess);
  // @ts-ignore
  yield takeLatest(ActionTypes.PRIVACY_FILE, privacyFileProcess);
  // @ts-ignore
  yield takeLatest(ActionTypes.METADATA_FILE, metadataFileProcess);
  // @ts-ignore
  yield takeLatest(ActionTypes.DELETE_FILE_FOLDER, deleteFileFolderProcess);
  // @ts-ignore
  yield takeLatest(ActionTypes.DELETE_FILE_FOLDER_MULTIPLE, deleteFileFolderMultipleProcess);
  // @ts-ignore
  yield takeLatest(ActionTypes.DOWNLOAD_FILE_FOLDER, downloadFileProcess);
  // @ts-ignore
  yield takeLatest(ActionTypes.DOWNLOAD_FILE_FOLDER_MULTIPLE, downloadFileMultipleProcess);
  // @ts-ignore
  yield takeEvery(ActionTypes.GET_STATISTICS_HOME, getStatisticsHomeProcess);

}
