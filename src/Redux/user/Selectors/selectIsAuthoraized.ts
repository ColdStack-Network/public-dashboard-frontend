import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectIsAuthorized = createSelector([selectUserState], (userState) => userState.isAuthorized);
