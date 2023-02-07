import { createSelector } from "reselect";
import { selectAccountState } from "./selectAccountState";

export const selectBillingData = createSelector([selectAccountState], (accountState) => accountState.billingData);
