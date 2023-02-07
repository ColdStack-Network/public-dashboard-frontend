import { createSelector } from "reselect";
import { selectBucketsState } from "./selectBucketsState";

export const selectUploadInfo = createSelector([selectBucketsState], (bucketsState) => bucketsState.uploadInfo);
