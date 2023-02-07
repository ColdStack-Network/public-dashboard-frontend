import { RequestVersioningBucketAction } from "actions/actionTypes";
import { putVersioningBucket } from "helpers/yandexS3";
import { call, put } from "redux-saga/effects";
import { handleSagaError } from "Redux/helpers";
import { updateBucket } from "../Actions/bucketsActions";
import { IBucket } from "../reducer";

export function* versioningBucketSaga({ payload }: RequestVersioningBucketAction) {
  try {
    const rep: IBucket = yield call(putVersioningBucket, payload.VersioningStatus, payload.Name);
    yield put(updateBucket(rep));
  } catch (e) {
    yield handleSagaError(e);
  }
}
