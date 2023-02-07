import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectErrors = createSelector([selectUserState], (userState) => userState.commonErrors);
export const selectSkipCommonErr = createSelector([selectUserState], (userState) => userState.forceSkipCommonErrors);
