import { IGetSearchedFiles } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { getSearchedFilesList, ISearchFilesResult } from "helpers/yandexS3";
import { setSearchedFilesList } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* searchFiles({ payload }: IGetSearchedFiles) {
  try {
    const list: ISearchFilesResult = yield call(getSearchedFilesList, payload);
    yield put(setSearchedFilesList(list));
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
