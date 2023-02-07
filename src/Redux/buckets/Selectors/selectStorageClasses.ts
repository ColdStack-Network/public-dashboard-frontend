import { createSelector } from "reselect";
import { selectBucketsState } from "./selectBucketsState";

export const selectStorageClasses = createSelector([selectBucketsState], (bucketsState) => bucketsState.storageClasses);
