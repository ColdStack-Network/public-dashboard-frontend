import { IDeleteFileFolderMultiple } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { getFilesList } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";
import { deleteMultiplyFilesFunc } from "helpers/yandexS3";

export function* deleteFileFolderMultipleProcess({ payload }: IDeleteFileFolderMultiple) {
  const { nameBucket, items, pathFolder, onSuccess } = payload;
  try {
    yield call(deleteMultiplyFilesFunc, {
      nameBucket,
      pathFolder: "",
      items,
    });
    onSuccess();
    yield put(
      getFilesList({
        nameBucket,
        pathFolder,
        afterLoad: () => {},
        pagination: { Page: 1, PerPage: 10 },
      })
    );
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
