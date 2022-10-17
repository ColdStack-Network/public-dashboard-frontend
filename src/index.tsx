//eslint-disable-next-line
import React from 'react';
//eslint-disable-next-line
import ReactDOM from 'react-dom';
//eslint-disable-next-line
import './index.css';
//eslint-disable-next-line
import App from './App';
//eslint-disable-next-line
import { Provider } from 'react-redux';
//eslint-disable-next-line
import { makeStore } from "./store";
//eslint-disable-next-line
import ext from './helpers/ext';

ext();

const store = makeStore({});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
console.log("1");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

