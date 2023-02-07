import { createSelector } from "reselect";
import { selectBucketsState } from "./selectBucketsState";

export const selectBucketsList = createSelector([selectBucketsState], (bucketsState) => bucketsState.bucketsList);
