import { cancel, cancelled, fork, put, take } from "redux-saga/effects";

export function* loginFlow() {
  while (true) {
    const { user, password } = yield take("LOGIN_REQUEST");
    const task = yield fork(authorize, user, password);
    const action = yield take(["LOGOUT", "LOGIN_ERROR"]);
    if (action.type === "LOGOUT") yield cancel(task);
  }
}

function* authorize(user, password) {
  try {
  } catch (error) {
    yield put({ type: "LOGIN_ERROR", error });
  } finally {
    if (yield cancelled()) {
    }
  }
}
