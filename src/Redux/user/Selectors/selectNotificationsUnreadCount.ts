import { createSelector } from "reselect";
import { selectNotifications } from "./selectNotfication";

export const selectNotificationsUnreadCount = createSelector(
  [selectNotifications],
  (userState) => userState.unreadCount
);
