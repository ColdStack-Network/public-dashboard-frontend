import { createSelector } from "reselect";
import { selectCurrentBucket } from "./selectCurrentBucket";

export const selectCurrentBucketNameBucket = createSelector(
  [selectCurrentBucket],
  (bucketsState) => bucketsState.nameBucket
);
