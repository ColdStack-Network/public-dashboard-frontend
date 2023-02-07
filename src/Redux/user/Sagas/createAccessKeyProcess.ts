import { call, put } from "redux-saga/effects";
import { fetchApi, urlAuthNode } from "../../../helpers/common";
import { setAccessKeys, setCommonError, setCurrentAccessKey } from "../Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";
import { AccessKey } from "models/AccessKey";
import { ApiClient } from "helpers/ApiClient";
import { SagaWatcherPayload } from "models/SagaWatcherPayload";

export function* createAccessKeyProcess({ payload }: SagaWatcherPayload<{ onSuccess: () => void }>) {
  try {
    const res = yield call(fetchApi, "post", "201", {
      url: "/access-keys",
      body: { active: true },
      mainUrl: urlAuthNode,
    });
    yield put(setCurrentAccessKey(res));
    payload.onSuccess();
    const accessKeys: AccessKey[] = yield call(ApiClient.getAccessKeys);
    yield put(setAccessKeys(accessKeys));
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
  }
}
