import { IPrivacyFile } from "actions/actionTypes";
import { call, put, select } from "redux-saga/effects";
import { privacyFileFunc } from "helpers/yandexS3";
import { getFileInfo, getFilesList } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* privacyFileProcess({ payload }: IPrivacyFile) {
  const { nameBucket, nameFile, pathFolder, typePrivacy, typePage } = payload;
  try {
    yield call(privacyFileFunc, { nameBucket, pathFolder, name: nameFile, typePrivacy });
    const pagination = yield select((store) => store.buckets?.currentBucket?.pagination);

    if (typePage === "bucketPage") {
      yield put(
        getFilesList({
          nameBucket,
          pathFolder,
          afterLoad: () => {},
          pagination: { Page: pagination?.page || 1, PerPage: pagination?.perPage || 10 },
        })
      );
    }

    if (typePage === "filePage") {
      yield put(
        getFileInfo({
          nameFile,
          nameBucket,
          pathFolder,
          afterLoad: () => {},
        })
      );
    }
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
