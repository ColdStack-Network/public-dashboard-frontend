import { IGetFileInfo } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { getFileInfoFunc, IObjectExtendedInfo } from "helpers/yandexS3";
import { setFileInfo } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import history from "../../../helpers/history";
import { setCommonError } from "../../user/Actions/userActions";

const redirectFunc = (props) => {
  const { to, back } = props;
  if (back) {
    history.back();
  } else {
    history.push(to);
  }
};

export function* getFileInfoProcess({ payload }: IGetFileInfo) {
  const { nameFile, nameBucket, pathFolder, afterLoad } = payload;
  try {
    const data: IObjectExtendedInfo | undefined = yield call(getFileInfoFunc, {
      nameFile,
      nameBucket,
      pathFolder,
    });
    yield put(setFileInfo({ nameBucket, pathFolder, data }));
    afterLoad();
  } catch (err) {
    redirectFunc({ back: true });
    yield put(setFileInfo({ nameBucket, pathFolder, data: {} }));
    if (err?.code || err?.message) {
      yield put(
        setCommonError({
          message: err?.message ? `Get file info: ${err?.message}` : err?.code,
          isBottomText: false,
        })
      );
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
    afterLoad();
  }
}
