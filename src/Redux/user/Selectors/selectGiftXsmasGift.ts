import { createSelector } from "reselect";
import { selectUserState } from "./selectUserState";

export const selectGiftXsmasGift = createSelector([selectUserState], (userState) => userState.gift.xsmasGift);
