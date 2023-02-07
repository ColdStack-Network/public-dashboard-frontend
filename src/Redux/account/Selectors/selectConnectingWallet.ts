import { createSelector } from "reselect";
import { selectAccountState } from "./selectAccountState";

export const selectConnectingWallet = createSelector(
  [selectAccountState],
  (accountState) => accountState.connectingWallet
);
