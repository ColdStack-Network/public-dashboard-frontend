import { IGift } from "../reducer";
import { call, put } from "redux-saga/effects";
import { apiUrl, fetchApi } from "../../../helpers/common";
import { setGift } from "../Actions/userActions";

export function* getGiftSaga() {
  try {
    const gift: IGift = yield call(fetchApi, "post", "201", {
      url: "/gifts/xmas-2023/get",
      mainUrl: apiUrl,
    });
    yield put(setGift(gift));
  } catch (e) {
    console.error(e);
  }
}
