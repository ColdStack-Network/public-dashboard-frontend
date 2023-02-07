import { IRenameFileFolder } from "actions/actionTypes";
import { call, put, select } from "redux-saga/effects";
import { renameFileFunc, renameFolderFunc } from "helpers/yandexS3";
import { getFilesList } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* renameFileFolderProcess({ payload }: IRenameFileFolder) {
  const { nameBucket, name, pathFolder, newName, type, onSuccess, setOuterError } = payload;

  try {
    let res;
    if (type === "file") {
      res = yield call(renameFileFunc, { nameBucket, pathFolder, name, newName });
    } else {
      res = yield call(renameFolderFunc, { nameBucket, pathFolder, name, newName });
    }
    if (res?.status === 204 || res?.status === 200) {
      onSuccess();
    }
    const pagination = yield select((store) => store.buckets?.currentBucket?.pagination);
    yield put(
      getFilesList({
        nameBucket,
        pathFolder,
        afterLoad: () => {},
        pagination: { Page: pagination?.page || 1, PerPage: pagination?.perPage || 10 },
      })
    );
  } catch (err) {
    if (err?.message) {
      setOuterError(err.message);
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
