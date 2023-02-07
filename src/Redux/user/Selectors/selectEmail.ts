import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectEmail = createSelector([selectUserState], (accountState) => accountState.email);
