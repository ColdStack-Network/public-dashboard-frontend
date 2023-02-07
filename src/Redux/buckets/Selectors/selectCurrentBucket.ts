import { createSelector } from "reselect";
import { selectBucketsState } from "./selectBucketsState";

export const selectCurrentBucket = createSelector([selectBucketsState], (bucketsState) => bucketsState.currentBucket);
