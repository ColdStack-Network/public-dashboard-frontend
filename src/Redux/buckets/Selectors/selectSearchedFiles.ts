import { createSelector } from "reselect";
import { selectBucketsState } from "./selectBucketsState";

export const selectSearchedFiles = createSelector([selectBucketsState], (bucketsState) => bucketsState.searchedFiles);
