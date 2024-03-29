import { takeEvery, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "actions/actionTypes";
import { getBuckets } from "./Sagas/getBuckets";
import { getFilesListProcess } from "./Sagas/getFilesListProcess";
import { searchFiles } from "./Sagas/searchFiles";
import { getFileInfoProcess } from "./Sagas/getFileInfoProcess";
import { renameBucket } from "./Sagas/renameBucket";
import { deleteBucket } from "./Sagas/deleteBucket";
import { getBucketsGuides } from "./Sagas/getBucketsGuides";
import { createBucket } from "./Sagas/createBucket";
import { createFolder } from "./Sagas/createFolder";
import { uploadFilesProcess } from "./Sagas/uploadFilesProcess";
import { renameFileFolderProcess } from "./Sagas/renameFileFolderProcess";
import { privacyFileProcess } from "./Sagas/privacyFileProcess";
import { metadataFileProcess } from "./Sagas/metadataFileProcess";
import { deleteFileFolderProcess } from "./Sagas/deleteFileFolderProcess";
import { deleteFileFolderMultipleProcess } from "./Sagas/deleteFileFolderMultipleProcess";
import { downloadFileProcess } from "./Sagas/downloadFileProcess";
import { downloadFileMultipleProcess } from "./Sagas/downloadFileMultipleProcess";
import { getStatisticsHomeProcess } from "./Sagas/getStatisticsHomeProcess";
import { versioningBucketSaga } from "./Sagas/versioningBucketSaga";

export function* bucketsSaga() {
  yield takeLatest(ActionTypes.GET_BUCKETS_LIST, getBuckets);
  yield takeLatest(ActionTypes.GET_FILES_LIST, getFilesListProcess);
  yield takeLatest(ActionTypes.GET_SEARCHED_FILES_LIST, searchFiles);
  yield takeLatest(ActionTypes.GET_FILE_INFO, getFileInfoProcess);
  yield takeLatest(ActionTypes.RENAME_BUCKET, renameBucket);
  yield takeLatest(ActionTypes.DELETE_BUCKET, deleteBucket);
  yield takeLatest(ActionTypes.GET_BUCKETS_GUIDES, getBucketsGuides);
  yield takeLatest(ActionTypes.CREATE_BUCKET, createBucket);
  yield takeLatest(ActionTypes.CREATE_FOLDER, createFolder);
  yield takeLatest(ActionTypes.UPLOAD_FILES, uploadFilesProcess);
  yield takeLatest(ActionTypes.RENAME_FILE_FOLDER, renameFileFolderProcess);
  yield takeLatest(ActionTypes.PRIVACY_FILE, privacyFileProcess);
  yield takeLatest(ActionTypes.METADATA_FILE, metadataFileProcess);
  yield takeLatest(ActionTypes.DELETE_FILE_FOLDER, deleteFileFolderProcess);
  yield takeLatest(ActionTypes.DELETE_FILE_FOLDER_MULTIPLE, deleteFileFolderMultipleProcess);
  yield takeLatest(ActionTypes.DOWNLOAD_FILE_FOLDER, downloadFileProcess);
  yield takeLatest(ActionTypes.DOWNLOAD_FILE_FOLDER_MULTIPLE, downloadFileMultipleProcess);
  yield takeEvery(ActionTypes.GET_STATISTICS_HOME, getStatisticsHomeProcess);
  yield takeEvery(ActionTypes.REQUEST_VERSIONING_BUCKET, versioningBucketSaga);
}
