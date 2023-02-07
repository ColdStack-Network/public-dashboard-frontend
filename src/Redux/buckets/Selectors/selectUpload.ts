import { createSelector } from "reselect";
import { selectBucketsState } from "./selectBucketsState";

export const selectUpload = createSelector([selectBucketsState], (bucketsState) => bucketsState.upload);
