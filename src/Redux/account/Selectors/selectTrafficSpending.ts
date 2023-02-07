import { createSelector } from "reselect";
import { selectBillingData } from "./selectBillingData";

export const selectTrafficSpending = createSelector([selectBillingData], (accountState) => accountState[2]);
