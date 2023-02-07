import { createSelector } from "reselect";
import { selectCurrentBucket } from "./selectCurrentBucket";

export const selectCurrentBucketFilesList = createSelector(
  [selectCurrentBucket],
  (bucketsState) => bucketsState.filesList
);
