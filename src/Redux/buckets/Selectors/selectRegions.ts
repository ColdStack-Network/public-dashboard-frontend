import { createSelector } from "reselect";
import { selectBucketsState } from "./selectBucketsState";

export const selectRegions = createSelector([selectBucketsState], (bucketsState) => bucketsState.regions);
