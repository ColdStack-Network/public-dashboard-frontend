import { call, take, fork, put, cancelled, cancel, takeLatest, delay, select, takeEvery } from "redux-saga/effects";
import { ActionTypes } from "../../actions/actionTypes";
import { apiUrl, fetchApi, getToken, isFull, setToken, urlAuthNode } from "../../helpers/common";
import {
  getNotificationsPanel,
  getUsd,
  setAccessKeys,
  setAuth,
  setAuthError, setCommonError,
  setNotifications,
  setNotificationsPanel,
  getEmailSettings,
  getSettingsInfo,
  setSettingsInfo,
  getNotifications, setUserData, setCurrentAccessKey, showGiftModal, setGift
} from "./actions";
import {defaultRegion, initSDK} from "../../helpers/yandexS3";
import {defaultError} from "../../helpers/errorHandler";
import {TStore} from "../../reducers";
import { setConnectingWallet, setUsd } from "Redux/account/Actions/accountActions";
import { IGift } from './reducer';

function* checkAuthProcess({payload}: any) { // only checks auth (both wallet & token), is used on Mount

  const { checkAuth, invisibleActivate } = payload;
  try {
    const isMetamaskAuth = yield call(checkAuth);

    if (isMetamaskAuth) {
      //const isTokenCorrect = yield call(fetchApi, 'get', "200", {url: "/checkToken"});
      const accessToken = getToken();
      const isTokenCorrect = yield checkToken(accessToken);
      // const isTokenCorrect = true;
      if (isTokenCorrect) {
        yield invisibleActivate();
        yield call(initS3);

        yield put(setAuth({checked: true, result: true}));
      } else {
        yield put(setAuth({checked: true, result: false}))
      }
    } else {
      yield put(setAuth({checked: true, result: false}))
    }
  } catch (err) {
    yield put(setAuth({checked: true, result: false}))
  }
}

function* checkToken(accessToken) {
  try {
    if (!isFull(accessToken)) {
      return false;
    }
    const res = yield call(fetchApi, 'get', "200", {url: `/me`, mainUrl: urlAuthNode});
    yield put(setUserData({me: res}));
    return true;
  } catch (err) {
    return false;
  }
}

export function* finishAuthProcess(action) {
  try {
    console.log("finishAuthProcess", action);
    const { signFunc, account } = action.payload;
    const accessToken = getToken();
    const isTokenCorrect = yield checkToken(accessToken);
    console.log("isTokenCorrect", isTokenCorrect);
    if (isTokenCorrect) {
      yield call(initS3);
      yield put(setAuth({checked: true, result: true}));
      yield put(getUsd());
      yield put(getNotificationsPanel());
    } else {
      const data = yield call(fetchApi, "post", "201", {
        url: "/auth/message-sign-verifications",
        body: { publicKey: account },
        mainUrl: urlAuthNode
      });
      console.log("data", data);
      const res = yield call(signFunc, data?.msg, account);

      const { success, signature, error } = res;
      console.log("success, signature", error, success, signature);
      if (success === true) {
        const token = yield call(fetchApi, "post", "201",
          {
            url: `/auth/message-sign-verifications/${data.id}/verify`,
            body: {signature},
            mainUrl: urlAuthNode
          });
        const {accessToken} = token;
        setToken(accessToken);
        const res2 = yield call(fetchApi, 'get', "200", {url: `/me`, mainUrl: urlAuthNode});
        yield put(setUserData({me: res2}));

        yield call(initS3);
        yield put(setAuth({checked: true, result: true}))
        yield put(getUsd());
        yield put(getNotificationsPanel());
      } else {
        console.error("TEST ERROR::::", success, signature);
        yield put(setAuthError({open: true, errorText: ""}));
        yield put(setConnectingWallet(""));
      }
    }
  } catch (err) {
    console.error(err)
    yield put(setAuthError({open: true, errorText: "Something went wrong, please refresh the page and try again"}));
  }
}

export function* initS3() {
  try {
    const data = yield call(fetchApi, "get", "200", {url: "/access-key-for-dashboard", mainUrl: urlAuthNode})
    const res = yield call(fetchApi, "get", "200", {url: "/access-keys", mainUrl: urlAuthNode})
    yield put(setAccessKeys(res));
    yield call(initSDK, {accessKeyId: data?.id, secretAccessKey: data?.secretKey, region: defaultRegion});
    yield delay(1500);
  } catch (err) {
  }
}

export function* getUsdProcess() {
  try {

    /*const result2 = yield call(fetchApi, "post", "201", {url: "/notifications/for-all-users", mainUrl: apiUrl,
      body: {
        title: "The site is undergoing technical work from 16am - 18pm",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        email: false
      }} );*/

    const result = yield call(fetchApi, "get", "200", {
      url: "",
      mainUrl: "https://oracle.coldstack.io/price?fromSymbol=CLS&toSymbol=USDT"
    });
    yield put(setUsd(result?.price));

  } catch (err) {
    yield put(setCommonError({message: "Failed to request your USD balance", isBottomText: true}))
  }
}

export function* getNotificationsProcess({payload}: any) {
  try {
    const {page, perPage, id} = payload?.pagination;
    let query = {} as any;
    if (isFull(page)) {
      query.page = +page
    }
    if (isFull(perPage)) {
      query.perPage = +perPage
    }
    if (isFull(id)) {
      query.id = id
    }
    const result = yield call(fetchApi, "get", "200", {url: "/notifications", mainUrl: apiUrl, query: query});
    yield put(setNotifications(result));
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({
        message: err?.message ? `Notifications: ${err?.message}` : err?.code,
        isBottomText: false
      }))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

export function* getNotificationsPanelProcess() {
  try {
    const result = yield call(fetchApi, "get", "200", {url: "/notifications", mainUrl: apiUrl, query: {last: 3}});
    yield put(setNotificationsPanel(result));
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({
        message: err?.message ? `Notifications: ${err?.message}` : err?.code,
        isBottomText: false
      }))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}


export function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    // fork return a Task object
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGOUT')
      yield cancel(task)
    //yield call(Api.clearItem, 'token')
  }
}

function* authorize(user, password) {
  try {
  } catch (error) {
    yield put({type: 'LOGIN_ERROR', error})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* getEmailSettingsProcess() {
  try {
    const result = yield call(fetchApi, "get", "200", {url: "/me", mainUrl: urlAuthNode})
    yield put(getSettingsInfo({result}))
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? `Settings: ${err?.message}` : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

export function* setEmailSettingsProcess({payload}: any) {

  const {email} = payload;

  try {
    yield call(fetchApi, "put", "200", {url: "/me", body: {email: email}, mainUrl: urlAuthNode});
    yield put(getEmailSettings())

  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? `Settings: ${err?.message}` : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

export function* getSettingsInfoProcess() {

  try {
    const result = yield call(fetchApi, "get", "200", {url: "/me", mainUrl: urlAuthNode})
    yield put(setSettingsInfo({...result}))
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({message: err?.message ? `Settings: ${err?.message}` : err?.code, isBottomText: false}))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

export function* setMakeAllReadNotificationsProcess({payload}: any) {

  const {pagination, ids} = payload
  try {
    yield call(fetchApi, "post", "201", {url: "/notifications/read-page", body: {ids: ids}, mainUrl: apiUrl})
    yield put(getNotifications({pagination}))
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({
        message: err?.message ? `Notifications: ${err?.message}` : err?.code,
        isBottomText: false
      }))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

export function* createAccessKeyProcess({payload}: any) {
  try {
    const res = yield call(fetchApi, "post", "201", {url: "/access-keys", body: {active: true}, mainUrl: urlAuthNode});
    yield put(setCurrentAccessKey(res));
    payload.onSuccess();
    const res2 = yield call(fetchApi, "get", "200", {url: "/access-keys", mainUrl: urlAuthNode})
    yield put(setAccessKeys(res2));
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({
        message: err?.message ? `Access keys: ${err?.message}` : err?.code,
        isBottomText: false
      }))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
  }
}

export function* deleteAccessKeyProcess() {
  try {
    const currentKey = yield select((state: TStore) => state.user.accessKeyCurrent);
    yield call(fetchApi, "delete", "204", {url: `/access-keys/${currentKey?.id}`, mainUrl: urlAuthNode});
    const res2 = yield call(fetchApi, "get", "200", {url: "/access-keys", mainUrl: urlAuthNode})
    yield put(setAccessKeys(res2));
    yield put(setCurrentAccessKey({} as any));
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({
        message: err?.message ? `Access keys: ${err?.message}` : err?.code,
        isBottomText: false
      }))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
    yield put(setCurrentAccessKey({} as any));
  }
}

export function* changeStatusAccessKeyProcess({payload}: any) {
  try {
    yield call(fetchApi, "put", "200", {
      url: `/access-keys/${payload?.key?.id}/status`,
      body: {active: payload.status}, mainUrl: urlAuthNode
    })
    const res2 = yield call(fetchApi, "get", "200", {url: "/access-keys", mainUrl: urlAuthNode})
    yield put(setAccessKeys(res2));
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({
        message: err?.message ? `Access keys: ${err?.message}` : err?.code,
        isBottomText: false
      }))
    } else {
      yield put(setCommonError({message: defaultError, isBottomText: true}))
    }
    yield put(setCurrentAccessKey({} as any));
  }
}

interface ICheckGift {
  isXmasGiftGiven: boolean;
  userId: string;
}

export function* checkGiftSaga() {
  try {
    const isAuthorized = yield select((state: TStore) => state.user.isAuthorized);
    if (isAuthorized.result) {
      const { isXmasGiftGiven }: ICheckGift = yield call(fetchApi, "get", "200", {url: "/gifts/xmas-2021", mainUrl: apiUrl});
      if (isAuthorized && !isXmasGiftGiven) {
        yield put(showGiftModal());
      }
    }
  }
  catch (e) {
    console.error(e);
  }
}


export function* getGiftSaga() {
  try {
    const gift: IGift = yield call(fetchApi, "post", "201", {url: "/gifts/xmas-2021/get", mainUrl: apiUrl});
    yield put(setGift(gift));
  }
  catch (e) {
    console.error(e);
  }
}

export function* userSaga() {
  yield takeLatest(ActionTypes.CHECK_AUTH, checkAuthProcess);
  yield takeLatest(ActionTypes.FINISH_AUTH, finishAuthProcess);
  yield takeLatest(ActionTypes.GET_USD, getUsdProcess);
  yield takeLatest(ActionTypes.GET_NOTIFICATIONS, getNotificationsProcess);
  yield takeLatest(ActionTypes.GET_NOTIFICATIONS_PANEL, getNotificationsPanelProcess);
  yield takeLatest(ActionTypes.GET_EMAIL_SETTINGS, getEmailSettingsProcess);
  yield takeLatest(ActionTypes.SET_EMAIL_SETTINGS, setEmailSettingsProcess);
  yield takeLatest(ActionTypes.GET_SETTINGS_INFO, getSettingsInfoProcess);
  yield takeLatest(ActionTypes.SET_MAKE_ALL_READ_NOTIFICATIONS, setMakeAllReadNotificationsProcess);
  yield takeLatest(ActionTypes.CREATE_ACCESS_KEY, createAccessKeyProcess);
  yield takeLatest(ActionTypes.DELETE_ACCESS_KEY, deleteAccessKeyProcess);
  yield takeLatest(ActionTypes.CHANGE_STATUS_ACCESS_KEY, changeStatusAccessKeyProcess);
  yield takeEvery(ActionTypes.SET_IS_AUTHORIZED, checkGiftSaga);
  yield takeEvery(ActionTypes.GET_GIFT, getGiftSaga);
}

/*----example---from-saga-docs-----*/
