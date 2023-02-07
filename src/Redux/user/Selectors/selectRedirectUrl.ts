import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectRedirectUrl = createSelector([selectUserState], (userState) => userState.redirect);
