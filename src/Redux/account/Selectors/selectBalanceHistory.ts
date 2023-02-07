import { createSelector } from "reselect";
import { selectBillingData } from "./selectBillingData";

export const selectBalanceHistory = createSelector([selectBillingData], (accountState) => accountState[1]);
