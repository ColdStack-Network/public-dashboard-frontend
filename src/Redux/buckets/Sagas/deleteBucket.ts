import { IDeleteBucket } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { deleteBucketFunc } from "helpers/yandexS3";
import { getBucketsList } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* deleteBucket({ payload }: IDeleteBucket) {
  const { nameBucket, afterLoad } = payload;
  try {
    const pagination = { Page: 1, PerPage: 100 };
    yield call(deleteBucketFunc, { nameBucket });
    yield put(getBucketsList({ pagination, afterLoad: afterLoad }));
  } catch (err) {
    afterLoad();
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
