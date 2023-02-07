import { createSelector } from "reselect";
import { selectCurrentBucket } from "./selectCurrentBucket";

export const selectCurrentBucketFoldersList = createSelector(
  [selectCurrentBucket],
  (bucketsState) => bucketsState.foldersList
);
