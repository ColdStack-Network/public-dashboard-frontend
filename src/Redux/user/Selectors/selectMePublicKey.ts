import { createSelector } from "reselect";
import { selectUserData } from "./selectUserData";

export const selectMePublicKey = createSelector([selectUserData], (userState) => userState.me?.publicKey);
