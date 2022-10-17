import {combineReducers} from "redux";
import user from "../modules/user/reducer";
import buckets from "../modules/buckets/reducer";
import account from "../Redux/account/reducer";

export const rootReducer = combineReducers({user: user, buckets: buckets, account: account  });

export type TStore = ReturnType<typeof rootReducer>;
