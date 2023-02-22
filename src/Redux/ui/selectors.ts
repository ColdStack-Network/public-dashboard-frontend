import { TStore } from "reducers";
import { createSelector } from "reselect";

export const selectUIState = (state: TStore) => state.ui;
export const selectIsMob = createSelector([selectUIState], (uiState) => uiState.isMob);
export const selectSuccesModalState = createSelector([selectUIState], (uiState) => uiState.successModal);
export const selectForcedLogoutModalState = createSelector([selectUIState], (uiState) => uiState.forcedLogoutModal);
