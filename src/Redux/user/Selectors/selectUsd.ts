import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectUsd = createSelector([selectUserState], (userState) => userState.usd);
