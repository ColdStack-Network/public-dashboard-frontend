import { createSelector } from "reselect";
import { selectAccountState } from "./selectAccountState";

export const selectPriceLanding = createSelector([selectAccountState], (accountState) => accountState.price);
