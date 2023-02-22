import { call, delay, put } from "redux-saga/effects";
import {getSettingsInfo, setAccessKeys} from "../Actions/userActions";
import { defaultRegion, initSDK } from "../../../helpers/yandexS3";
import { ApiClient } from "helpers/ApiClient";
import { AccessKey } from "models/AccessKey";

export function* initS3() {
  try {
    const dashBoardAccessKey: AccessKey = yield call(ApiClient.getDashboardAccessKeys);
    const accessKeys: AccessKey[] = yield call(ApiClient.getAccessKeys);
    yield put(setAccessKeys(accessKeys));
    yield call(initSDK, {
      accessKeyId: dashBoardAccessKey?.id,
      secretAccessKey: dashBoardAccessKey?.secretKey,
      region: defaultRegion,
    });
    yield put(getSettingsInfo({}));
    yield delay(1500);
  } catch (err) {}
}
