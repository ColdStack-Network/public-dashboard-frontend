import { createSelector } from "reselect";
import { selectBillingData } from "./selectBillingData";

export const selectStorageSpending = createSelector([selectBillingData], (accountState) => accountState[3]);
