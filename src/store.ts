import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import { fork } from "redux-saga/effects";
import { rootReducer } from "reducers";
import { userSaga } from "Redux/user/sagasWatcher";
import { accountSaga } from "Redux/account/sagasWatcher";
import { bucketsSaga } from "Redux/buckets/sagasWatcher";
import * as Sentry from "@sentry/react";
import { getStakesHistory } from "Redux/Staking/stakingSagas";
import { stakingSagaWatcher } from "Redux/Staking/stakingSagaWathcer";

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options listed below
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (window.location.hostname !== "localhost") {
  Sentry.init({
    dsn: "https://b6e135c77c144471b14144614f4b8a4e@weblog.coldstack.io/2",
    normalizeDepth: 10, // Or however deep you want your state context to be.
    environment: process.env.NODE_ENV,
  });
}

export const makeStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware), sentryReduxEnhancer)
  ) as any;

  function* rootSaga() {
    yield fork(userSaga);
    yield fork(bucketsSaga);
    yield fork(accountSaga);
    yield fork(stakingSagaWatcher);
  }

  store.runSaga = sagaMiddleware.run(rootSaga);

  store.close = () => store.dispatch(END);
  return store;
};
