import { call, put } from "redux-saga/effects";
import { apiUrl, fetchApi } from "helpers/common";
import { setCommonError } from "Redux/user/Actions/userActions";
import { defaultError } from "helpers/errorHandler";
import { IGetBillingData } from "actions/accountActionTypes";
import { setBillingData } from "../Actions/accountActions";
import { IBalanceHistory, IStorageSpending, ITrafficSpending, ITransaction } from "../../../actions/interfaces";

export function* getBillingDataProcess({ payload }: IGetBillingData) {
  try {
    const { from, to, callback } = payload;

    const total: IBalanceHistory[] = yield call(fetchApi, "get", "200", {
      url: `/billing/balance-history`,
      mainUrl: apiUrl,
      query: { format: "json", fromDate: from, toDate: to },
    });
    const storage: IStorageSpending[] = yield call(fetchApi, "get", "200", {
      url: `/billing/storage-spending`,
      mainUrl: apiUrl,
      query: { format: "json", fromDate: from, toDate: to },
    });
    const bandwidth: ITrafficSpending[] = yield call(fetchApi, "get", "200", {
      url: `/billing/traffic-spending`,
      mainUrl: apiUrl,
      query: { format: "json", fromDate: from, toDate: to },
    });

    let transactions: ITransaction[] | string;
    try {
      transactions = yield call(fetchApi, "get", "200", {
        url: `/billing/transactions`,
        mainUrl: apiUrl,
      });
    } catch (err) {
      transactions = "error";
    }

    yield put(setBillingData([transactions, total, bandwidth, storage]));
    if (typeof callback === "function") {
      callback({ total, storage, bandwidth });
    }
  } catch (err) {
    console.error("catch getStatisticsHomeProcess", err);
    if (err?.code || err?.message) {
      yield put(
        setCommonError({
          message: err?.message ? `Get billing data: ${err?.message}` : err?.code,
          isBottomText: false,
        })
      );
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
