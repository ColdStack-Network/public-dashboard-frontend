import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectAccessKey = createSelector([selectUserState], (userState) => userState.accessKeys);
