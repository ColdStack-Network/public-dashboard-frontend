import { combineReducers } from "redux";
import { userReducer } from "Redux/user/reducer";
import buckets from "../Redux/buckets/reducer";
import account from "../Redux/account/reducer";
import { uiStateReducer } from "Redux/ui/uiState";
import { stakingReducer } from "Redux/Staking/stakingReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  buckets: buckets,
  account: account,
  ui: uiStateReducer,
  staking: stakingReducer,
});

export type TStore = ReturnType<typeof rootReducer>;
