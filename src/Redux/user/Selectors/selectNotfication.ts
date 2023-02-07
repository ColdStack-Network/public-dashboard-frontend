import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectNotifications = createSelector([selectUserState], (userState) => userState.notifications);
