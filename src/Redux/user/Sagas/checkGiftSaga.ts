import { call, put, select } from "redux-saga/effects";
import { selectIsAuthorized } from "../Selectors/selectIsAuthoraized";
import { apiUrl, fetchApi } from "../../../helpers/common";
import { showGiftModal } from "../Actions/userActions";

export function* checkGiftSaga() {
  try {
    const isAuthorized = yield select(selectIsAuthorized);
    if (isAuthorized.result) {
      const { isXmasGiftGiven }: ICheckGift = yield call(fetchApi, "get", "200", {
        url: "/gifts/xmas-2023",
        mainUrl: apiUrl,
      });
      if (isAuthorized && !isXmasGiftGiven) {
        yield put(showGiftModal());
      }
    }
  } catch (e) {
    console.error(e);
  }
}

interface ICheckGift {
  isXmasGiftGiven: boolean;
  userId: string;
}
