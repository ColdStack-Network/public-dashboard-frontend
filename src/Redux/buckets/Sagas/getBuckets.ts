import { IGetBuckets } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { getListBuckets, IListAllMyBucketsExtendedResult } from "helpers/yandexS3";
import { setBucketsList } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* getBuckets({ payload }: IGetBuckets) {
  const { afterLoad } = payload;
  try {
    const list: IListAllMyBucketsExtendedResult = yield call(getListBuckets);
    yield put(setBucketsList(list?.Buckets));
    afterLoad();
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
    afterLoad();
  }
}
