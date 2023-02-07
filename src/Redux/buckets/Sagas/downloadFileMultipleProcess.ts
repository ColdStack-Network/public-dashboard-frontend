import { IDownloadFileFolderMultiple } from "actions/actionTypes";
import { all, call, put } from "redux-saga/effects";
import { checkCanDownload, getDownloadLinkS3, ICheckCanDownload } from "helpers/yandexS3";
import { downloadFiles } from "helpers/common";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* downloadFileMultipleProcess({ payload }: IDownloadFileFolderMultiple) {
  try {
    const { nameBucket, pathFolder, items, onSuccess } = payload;
    const filtered = items.filter((item) => item.type !== "folder");
    const canDownload: ICheckCanDownload = yield call(checkCanDownload);
    if (canDownload?.CanDownload === false) {
      yield put(
        setCommonError({
          message: canDownload?.Message ? canDownload?.Message : "",
          isBottomText: false,
        })
      );
    } else {
      const links = yield all(
        filtered.map((item) => {
          return call(getDownloadLinkS3, { nameBucket, nameFile: item?.name, pathFolder });
        })
      );
      yield call(downloadFiles, links);
      onSuccess();
    }
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
