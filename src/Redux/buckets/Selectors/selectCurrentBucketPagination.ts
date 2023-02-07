import { createSelector } from "reselect";
import { selectCurrentBucket } from "./selectCurrentBucket";

export const selectCurrentBucketPagination = createSelector(
  [selectCurrentBucket],
  (bucketsState) => bucketsState.pagination
);
