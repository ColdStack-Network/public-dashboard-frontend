import { IGetStatisticsHome } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { setStatisticsHome } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";
import { ApiClient } from "../../../helpers/ApiClient";
import { GetStatisticsRep } from "models/Statistics";
import { BandwidthAnalyticsRecord, GetBandwidthAnalyticsRep, GetStorageUsageAnalyticsRep } from "models/Analytics";

export function* getStatisticsHomeProcess({ payload }: IGetStatisticsHome) {
  const { from, to, callback } = payload;
  let fromBandwidthPush: Date | undefined = from;
  let toBandwidthPush: Date | undefined = to;
  let fromStoragePush = from;
  let toStoragePush = to;
  if (from && to && from > to) {
    fromBandwidthPush = undefined;
    toBandwidthPush = undefined;
  }

  try {
    const { Statistics }: GetStatisticsRep = yield call(ApiClient.getStatisticsHome);
    const { StorageUsageAnalytics }: GetStorageUsageAnalyticsRep = yield call(
      ApiClient.getStorageUsageAnalytics,
      fromStoragePush,
      toStoragePush
    );
    const { BandwidthAnalytics }: GetBandwidthAnalyticsRep = yield call(
      ApiClient.getBandwidthAnalytics,
      fromBandwidthPush,
      toBandwidthPush
    );

    let newbw: BandwidthAnalyticsRecord[] =
      BandwidthAnalytics?.Records &&
      BandwidthAnalytics?.Records.map((el) => {
        const dateMas = typeof el.Date === "string" && el.Date.split("-");
        const date = new Date(+dateMas[0], +dateMas[1] - 1, +dateMas[2]);
        return { ...el, Date: new Date(date) };
      });

    const newUs = StorageUsageAnalytics?.Records;
    newUs.forEach((element) => {
      element.Timestamp = new Date(element.Timestamp);
    });

    newbw.forEach((element) => {
      element.Timestamp = new Date(element.Timestamp);
    });

    yield put(
      setStatisticsHome({
        statistics: Statistics,
        bandwidthAnalytics: { Records: newbw },
        storageUsageAnalytics: { Records: newUs },
      })
    );
    if (typeof callback === "function") {
      callback({
        statistics: Statistics,
        bandwidthAnalytics: { Records: newbw },
        storageUsageAnalytics: { Records: newUs },
      });
    }
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(
        setCommonError({
          message: err?.message ? `Get statistics: ${err?.message}` : err?.code,
          isBottomText: false,
        })
      );
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
  }
}
