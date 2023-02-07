import { createSelector } from "reselect";
import { selectBillingData } from "./selectBillingData";

export const selectTransactionData = createSelector([selectBillingData], (accountState) => accountState[0]);
