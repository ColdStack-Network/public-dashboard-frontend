import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectNotificationsPagination = createSelector(
  [selectUserState],
  (userState) => userState.notificationsPagination
);
