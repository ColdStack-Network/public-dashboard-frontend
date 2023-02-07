import { ActionTypes, IMetadataFile } from "actions/actionTypes";
import { call, put, select } from "redux-saga/effects";
import { deleteFileFunc, getListFiles } from "helpers/yandexS3";
import { getFilesList } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { deleteFileFolderMultipleProcess } from "./deleteFileFolderMultipleProcess";
import { setCommonError } from "../../user/Actions/userActions";

export function* deleteFileFolderProcess({ payload }: IMetadataFile) {
  const { nameBucket, name, pathFolder, type, onSuccess, getFilesListAfter } = payload;
  try {
    if (type === "file") {
      yield call(deleteFileFunc, { nameBucket, pathFolder, name });
    } else {
      let path = `${pathFolder ? pathFolder : ""}${pathFolder ? "/" : ""}${name}`;
      path = path.replace("//", "/");
      const data = yield call(getListFiles, {
        nameBucket,
        pathFolder: path,
        Page: 1,
        PerPage: 1000000000000000000,
        allTree: true,
      });
      const items =
        data?.ListExtendedObjects?.Contents &&
        data?.ListExtendedObjects?.Contents?.map((el) => {
          return {
            name: el.Key,
            type: el.FileType === "folder" ? "folder" : "file",
          };
        });
      if (items?.length > 0) {
        yield call(deleteFileFolderMultipleProcess, {
          payload: {
            nameBucket,
            pathFolder: "",
            items: items,
            onSuccess: () => {},
          },
          type: ActionTypes.DELETE_FILE_FOLDER_MULTIPLE,
        });
      }
      yield call(deleteFileFunc, { nameBucket, pathFolder, name: `${name}/` });
    }
    onSuccess();
    const pagination = yield select((store) => store.buckets?.currentBucket?.pagination);
    if (getFilesListAfter !== false) {
      yield put(
        getFilesList({
          nameBucket,
          pathFolder,
          afterLoad: () => {},
          pagination: { Page: pagination?.page || 1, PerPage: pagination?.perPage || 10 },
        })
      );
    }
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
