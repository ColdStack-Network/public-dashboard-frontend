import { call, put } from "redux-saga/effects";
import { fetchApi, urlAuthNode } from "../../../helpers/common";
import { setAccessKeys, setCommonError, setCurrentAccessKey } from "../Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";
import { ApiClient } from "helpers/ApiClient";
import { AccessKey } from "models/AccessKey";

export function* changeStatusAccessKeyProcess({ payload }: any) {
  try {
    yield call(fetchApi, "put", "200", {
      url: `/access-keys/${payload?.key?.id}/status`,
      body: { active: payload.status },
      mainUrl: urlAuthNode,
    });
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
    yield put(setCurrentAccessKey({} as any));
  }
}
