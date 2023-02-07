import { createSelector } from "reselect";
import { selectCurrentBucket } from "./selectCurrentBucket";

export const selectCurrentBucketPathFolder = createSelector(
  [selectCurrentBucket],
  (bucketsState) => bucketsState.pathFolder
);
