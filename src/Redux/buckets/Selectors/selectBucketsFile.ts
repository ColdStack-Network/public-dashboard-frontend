import { createSelector } from "reselect";
import { selectBucketsState } from "./selectBucketsState";

export const selectBucketsFile = createSelector([selectBucketsState], (bucketsState) => bucketsState.file);
