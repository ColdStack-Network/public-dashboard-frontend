import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectGift = createSelector([selectUserState], (userState) => userState.gift);
