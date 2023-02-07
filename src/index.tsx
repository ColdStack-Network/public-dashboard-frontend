import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { makeStore } from "store";
import ext from "./helpers/ext";
import { observerEtherAddress } from "helpers/EtherAddObserver";

ext();
observerEtherAddress.init();

const store = makeStore({});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
