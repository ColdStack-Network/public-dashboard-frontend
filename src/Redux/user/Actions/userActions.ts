import { ActionTypes, ChangeStatusPayload, ISetAuth, ISetUserData } from "../../../actions/actionTypes";
import { IAuthError, IFinishAuth, IIsAuthorized, IUserData } from "../../../actions/interfaces";
import { IGift } from "../reducer";
import { AccessKey } from "models/AccessKey";
import { NotificationRep } from "models/Notification";

export const setAuth = (payload: IIsAuthorized): ISetAuth => ({
  type: ActionTypes.SET_IS_AUTHORIZED,
  payload,
});

export const checkAuth = (payload: {
  checkAuth: () => Promise<unknown>;
  invisibleActivate: () => Promise<unknown>;
}) => ({
  type: ActionTypes.CHECK_AUTH,
  payload,
});

export const setUserData = (payload: IUserData): ISetUserData => ({
  type: ActionTypes.SET_USER_DATA,
  payload,
});

export const finishAuth = (payload: IFinishAuth) => ({
  type: ActionTypes.FINISH_AUTH,
  payload,
});
export const setRedirectAuth = (url: string) => ({
  type: ActionTypes.SET_REDIRECT_URL,
  payload: url,
});
export const setAuthError = (payload: IAuthError) => ({
  type: ActionTypes.SET_AUTH_ERROR,
  payload,
});
export const setAccessKeys = (payload: AccessKey[]) => ({
  type: ActionTypes.SET_ACCESS_KEYS,
  payload,
});
export const getAccessKeys = () => ({
  type: ActionTypes.GET_ACCESS_KEYS,
});
export const createAccessKey = (payload) => ({
  type: ActionTypes.CREATE_ACCESS_KEY,
  payload,
});
export const deleteAccessKey = () => ({
  type: ActionTypes.DELETE_ACCESS_KEY,
});
export const setCurrentAccessKey = (payload: AccessKey) => ({
  type: ActionTypes.SET_CURRENT_ACCESS_KEY,
  payload,
});
export const setStatusAccessKey = (payload: ChangeStatusPayload) => ({
  type: ActionTypes.CHANGE_STATUS_ACCESS_KEY,
  payload,
});
export const getUsd = () => ({
  type: ActionTypes.GET_USD,
});
export const getNotifications = (payload: any) => ({
  type: ActionTypes.GET_NOTIFICATIONS,
  payload,
});

export const addNewNotice = (payload: Notification) => ({
  type: ActionTypes.ADD_NEW_NOTICE,
  payload,
});
export const setNotifications = (payload: NotificationRep) => ({
  type: ActionTypes.SET_NOTIFICATIONS,
  payload,
});
export const setNotificationsPagination = (payload: any) => ({
  type: ActionTypes.SET_NOTIFICATIONS_PAGINATION,
  payload,
});
export const getNotificationsPanel = () => ({
  type: ActionTypes.GET_NOTIFICATIONS_PANEL,
});
export const setNotificationsPanel = (payload: NotificationRep) => ({
  type: ActionTypes.SET_NOTIFICATIONS_PANEL,
  payload,
});

export const setMakeAllReadNotifications = (payload: any) => ({
  type: ActionTypes.SET_MAKE_ALL_READ_NOTIFICATIONS,
  payload,
});
interface IErr {
  message: string;
  isBottomText: boolean;
}
export const setCommonError = (payload: IErr) => ({
  type: ActionTypes.SET_COMMON_ERROR,
  payload,
});
export const clearCommonErrors = () => ({
  type: ActionTypes.CLEAR_COMMON_ERRORS,
});

export const getEmailSettings = () => ({
  type: ActionTypes.GET_EMAIL_SETTINGS,
});

export const setEmailSettings = (payload: any) => ({
  type: ActionTypes.SET_EMAIL_SETTINGS,
  payload,
});

export const getSettingsInfo = (payload: any) => ({
  type: ActionTypes.GET_SETTINGS_INFO,
  payload,
});

export const setSettingsInfo = (payload: any) => ({
  type: ActionTypes.SET_SETTINGS_INFO,
  payload,
});

export const showGiftModal = () => ({
  type: ActionTypes.SHOW_GIFT_MODAL,
});

export const closeGiftModal = () => ({
  type: ActionTypes.CLOSE_GIFT_MODAL,
});

export const getGift = () => ({
  type: ActionTypes.GET_GIFT,
});

export const setGift = (payload: IGift) => ({
  type: ActionTypes.SET_GIFT,
  payload,
});

export const runRedirect = (payload: string) => ({
  type: ActionTypes.RUN_REDIRECT,
  payload,
});

export const setSkipCommonErr = (payload: boolean) => ({
  type: ActionTypes.SET_SKIP_COMMON_ERRORS,
  payload,
});
export const updateUserBalance = (payload: string) => ({
  type: ActionTypes.UPDATE_USER_BALANCE,
  payload,
});
export const resetUserStateAction = () => ({
  type: ActionTypes.RESET_USER_STATE,
});
