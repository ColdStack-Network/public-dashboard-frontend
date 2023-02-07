import { ICreateBucket } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { createBucketS3 } from "helpers/yandexS3";
import { getBucketsList } from "../Actions/bucketsActions";
import { defaultError, methods, processError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";
import { voidCallback } from "helpers/common";

export function* createBucket({ payload }: ICreateBucket) {
  const { name, setOuterError, onSuccess } = payload;
  try {
    yield call(createBucketS3, name);
    yield put(
      getBucketsList({
        pagination: { Page: 1, PerPage: 100 },
        afterLoad: onSuccess || voidCallback,
      })
    );
  } catch (err) {
    if (err?.message) {
      setOuterError?.(err?.message);
    } else {
      const text = processError(err, methods.createBucket);
      if (text?.length > 0) {
        setOuterError?.(text);
      } else {
        yield put(setCommonError({ message: defaultError, isBottomText: true }));
      }
    }
  }
}
