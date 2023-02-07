import { ICreateFolder } from "actions/actionTypes";
import { call, put, select } from "redux-saga/effects";
import { createFolderS3 } from "helpers/yandexS3";
import { getFilesList } from "../Actions/bucketsActions";
import { defaultError, methods, processError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* createFolder({ payload }: ICreateFolder) {
  const { nameBucket, nameFolder, pathFolder, onSuccess, setOuterError } = payload;
  try {
    yield call(createFolderS3, { nameBucket, nameFolder: `${nameFolder}/`, pathFolder });
    const pagination = yield select((store) => store.buckets?.currentBucket?.pagination);
    yield put(
      getFilesList({
        nameBucket,
        pathFolder,
        afterLoad: () => {},
        pagination: { Page: pagination?.page || 1, PerPage: pagination?.perPage || 10 },
      })
    );
    onSuccess();
  } catch (err) {
    if (err?.message) {
      setOuterError(err?.message);
    } else {
      const text = processError(err, methods.putObject);
      if (text?.length > 0) {
        setOuterError(text);
      } else {
        yield put(setCommonError({ message: defaultError, isBottomText: true }));
      }
    }
  }
}
