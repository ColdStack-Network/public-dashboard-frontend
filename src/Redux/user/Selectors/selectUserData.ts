import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectUserData = createSelector([selectUserState], (userState) => userState.userData);
