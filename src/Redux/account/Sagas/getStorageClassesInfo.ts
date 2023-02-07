import { IStorageClassInfo } from "actions/interfaces";
import { call, put } from "redux-saga/effects";
import { apiUrl, fetchApi } from "helpers/common";
import { setCommonError } from "Redux/user/Actions/userActions";
import { defaultError } from "helpers/errorHandler";
import { setStorageClassesInfo } from "../../buckets/Actions/bucketsActions";

export function* getStorageClassesInfo() {
  try {
    const classes: IStorageClassInfo[] = yield call(fetchApi, "get", "200", {
      url: `/storage-classes`,
      mainUrl: apiUrl,
    });
    yield put(setStorageClassesInfo(classes));
  } catch (err) {
    console.error(err);
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
