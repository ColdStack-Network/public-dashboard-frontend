import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectAccessKeyCurrent = createSelector([selectUserState], (userState) => userState.accessKeyCurrent);
