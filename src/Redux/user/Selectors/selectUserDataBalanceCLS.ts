import { createSelector } from "reselect";
import { selectUserData } from "./selectUserData";

export const selectUserDataBalanceCLS = createSelector([selectUserData], (userState) => userState.balanceCLS);
