import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware, { END } from 'redux-saga';
import { fork } from "redux-saga/effects";
import { rootReducer } from "./reducers";
import { userSaga } from "./modules/user/saga";
import { bucketsSaga } from "./modules/buckets/saga";
import { accountSaga } from "./Redux/account/sagasWatcher";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const makeStore = (initialState)=>{
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  ) as any;

  function* rootSaga() {
    yield fork(userSaga);
    yield fork(bucketsSaga);
    yield fork(accountSaga);
  }

  store.runSaga = sagaMiddleware.run(rootSaga)

  store.close = () => store.dispatch(END);
  return store
}

/*
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch*/
