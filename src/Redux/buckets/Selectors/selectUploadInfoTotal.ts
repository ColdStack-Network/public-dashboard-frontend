import { createSelector } from "reselect";
import { selectBucketsState } from "./selectBucketsState";

export const selectUploadInfoTotal = createSelector(
  [selectBucketsState],
  (bucketsState) => bucketsState.uploadInfoTotal
);
