import { IGuideRegion, IStorageClass } from "actions/interfaces";
import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { apiUrl, fetchApi } from "helpers/common";
import { setRegions, setStorageClasses } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* getBucketsGuides() {
  try {
    const classes: AxiosResponse<IStorageClass[]> = yield call(fetchApi, "get", "200", {
      url: `/guide/storage-class`,
      mainUrl: apiUrl,
    });
    const regions: AxiosResponse<IGuideRegion[]> = yield call(fetchApi, "get", "200", {
      url: `/guide/region`,
      mainUrl: apiUrl,
    });
    yield put(setStorageClasses(classes?.data));
    yield put(setRegions(regions?.data));
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
