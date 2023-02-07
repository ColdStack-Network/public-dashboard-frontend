import { call, put } from "redux-saga/effects";
import { apiUrl, fetchApi } from "helpers/common";
import { setCommonError } from "Redux/user/Actions/userActions";
import { defaultError } from "helpers/errorHandler";
import { IGetPriceLandingData } from "actions/accountActionTypes";
import { setPriceLanding } from "../Actions/accountActions";

export function* getPriceLandingProcess({ payload }: IGetPriceLandingData) {
  try {
    const price = yield call(fetchApi, "get", "200", {
      url: `/billing/costs-estimator-params`,
      mainUrl: apiUrl,
      query: { format: "json" },
    });

    yield put(setPriceLanding(price));
  } catch (err) {
    console.error("catch getPriceLandingProcess", err);
    if (err?.code || err?.message) {
      yield put(
        setCommonError({
          message: err?.message ? `Get price landing data: ${err?.message}` : err?.code,
          isBottomText: false,
        })
      );
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
