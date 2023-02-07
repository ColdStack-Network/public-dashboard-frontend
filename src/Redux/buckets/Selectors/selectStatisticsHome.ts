import { createSelector } from "reselect";
import { selectBucketsState } from "./selectBucketsState";

export const selectStatisticsHome = createSelector([selectBucketsState], (bucketsState) => bucketsState.statisticsHome);
