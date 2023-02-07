import { IUploadFile } from "actions/actionTypes";
import { all, call, put, select } from "redux-saga/effects";
import { checkCanUpload, ICheckCanUpload, uploadFileS3 } from "helpers/yandexS3";
import { clearUploadFiles, getFilesList, setUpload } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* uploadFilesProcess({ payload }: IUploadFile) {
  const { nameBucket, pathFolder, onProgress, onSuccess, saveUploadInstance, storageClass } = payload;

  try {
    const filesObj = yield select((state) => state.buckets.uploadInfo);
    const files = Object.values(filesObj);
    const canUpload: ICheckCanUpload = yield call(checkCanUpload);
    if (canUpload?.CanUpload === false) {
      yield put(clearUploadFiles());
      yield put(setUpload({ isLoadingFiles: false, isModalUpload: false, nameBucket: "", pathFolder: "" }));
      yield put(
        setCommonError({
          message: canUpload?.Message ? canUpload?.Message : "",
          isBottomText: false,
        })
      );
    } else {
      yield all(
        files.map((item: any) => {
          let path = `${pathFolder ? pathFolder : ""}${pathFolder ? "/" : ""}${item.file.filepath}`;

          path = path.replace("//", "/");

          return call(uploadFileS3, {
            nameBucket,
            path,
            file: item.file,
            storageClass,
            onProgress: onProgress(item.file),
            saveUploadInstance: saveUploadInstance(item.file),
          });
        })
      );

      const pagination = yield select((store) => store.buckets?.currentBucket?.pagination);

      yield put(
        getFilesList({
          nameBucket,
          pathFolder,
          afterLoad: () => {},
          pagination: {
            Page: pagination?.page || 1,
            PerPage: pagination?.perPage || 10,
          },
        })
      );

      onSuccess();
    }
  } catch (err) {
    if (err?.code !== "RequestAbortedError") {
      if (err?.code === "NotEnoughBalance") {
        yield put(clearUploadFiles());
        yield put(setUpload({ isLoadingFiles: false, isModalUpload: false, nameBucket: "", pathFolder: "" }));
        yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
      } else {
        yield put(setUpload({ isLoadingFiles: false, isModalUpload: false, nameBucket: "", pathFolder: "" }));
        if (err?.code || err?.message) {
          yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: true }));
        } else {
          yield put(setCommonError({ message: defaultError, isBottomText: true }));
        }
      }
    }
  }
}
