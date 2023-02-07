import { createSelector } from "reselect";
import { selectAccountState } from "./selectAccountState";

export const selectTopics = createSelector([selectAccountState], (accountState) => accountState.topics);
