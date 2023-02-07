import { IDownloadFileFolder } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { checkCanDownload, getDownloadLinkS3, ICheckCanDownload } from "helpers/yandexS3";
import { downloadFileByLink } from "helpers/common";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* downloadFileProcess({ payload }: IDownloadFileFolder) {
  try {
    const { nameBucket, pathFolder, nameFile } = payload;
    const canDownload: ICheckCanDownload = yield call(checkCanDownload);
    if (canDownload?.CanDownload === false) {
      yield put(
        setCommonError({
          message: canDownload?.Message ? canDownload?.Message : "",
          isBottomText: false,
        })
      );
    } else {
      const link = yield call(getDownloadLinkS3, { nameBucket, nameFile, pathFolder });
      yield call(downloadFileByLink, link?.link, nameFile);
    }
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
