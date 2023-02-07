import { call, put, select } from "redux-saga/effects";
import { selectAccessKeyCurrent } from "../Selectors/selectAccessKeyCurrent";
import { fetchApi, urlAuthNode } from "../../../helpers/common";
import { setAccessKeys, setCommonError, setCurrentAccessKey } from "../Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";
import { ApiClient } from "helpers/ApiClient";
import { AccessKey } from "models/AccessKey";

export function* deleteAccessKeyProcess() {
  try {
    const currentKey = yield select(selectAccessKeyCurrent);
    yield call(fetchApi, "delete", "204", {
      url: `/access-keys/${currentKey?.id}`,
      mainUrl: urlAuthNode,
    });
    const accessKeys: AccessKey[] = yield call(ApiClient.getAccessKeys);
    yield put(setAccessKeys(accessKeys));
    yield put(setCurrentAccessKey({} as any));
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(
        setCommonError({
          message: err?.message ? `Access keys: ${err?.message}` : err?.code,
          isBottomText: false,
        })
      );
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
    yield put(setCurrentAccessKey({} as any));
  }
}
