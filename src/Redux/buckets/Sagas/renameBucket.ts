import { IRenameBucket } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { renameBucketFunc } from "helpers/yandexS3";
import { getBucketsList } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* renameBucket({ payload }: IRenameBucket) {
  const { name, nameBucket, afterLoad, setOuterError } = payload;
  try {
    const pagination = { Page: 1, PerPage: 100 };
    yield call(renameBucketFunc, { nameBucket, name });
    yield put(getBucketsList({ pagination, afterLoad: afterLoad }));
  } catch (err) {
    console.log("catch err renameBucket", err?.message, err?.code, err?.Code, err?.status);
    if (err?.message) {
      setOuterError(err?.message);
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
