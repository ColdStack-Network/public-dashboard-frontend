import {
  ActionTypes,
  IAddNewNotice,
  IAuthError,
  IClearCommonErrors,
  ICloseGiftModal,
  ICreateAccessKey,
  IDeleteAccessKey,
  IGetAccessKeys,
  IGetGift,
  ISetAccessKeys,
  ISetAuth,
  ISetCommonError,
  ISetCurrentAccessKey,
  ISetEmailSettings,
  ISetGift,
  ISetSkipCommonErrors,
  ISetNotifications,
  ISetNotificationsPagination,
  ISetNotificationsPanel,
  ISetSettingsInfo,
  ISetStatusAccessKey,
  ISetUsd,
  ISetUserData,
  IShowGiftModal,
  RedirectAuthType,
  UpdateUserBalance,
  ResetUserStateAction,
} from "../../actions/actionTypes";
import { IIsAuthorized, IUserData } from "../../actions/interfaces";
import { AccessKey } from "models/AccessKey";
import { NotificationRep } from "models/Notification";
import { Pagination } from "models/Pagination";
import { MeRep } from "models/UserModel";

export interface IUserState {
  isAuthorized: IIsAuthorized;
  userData: IUserData;
  accessKeys: AccessKey[];
  authError: {
    open: boolean;
    errorText: string;
  };
  accessKeyCurrent: AccessKey;
  usd: string;
  notifications: NotificationRep;
  notificationsPagination: Pagination;
  notificationsPanel: NotificationRep;
  commonErrors: string[];
  forceSkipCommonErrors: boolean;
  email: MeRep;
  gift: {
    showModal: boolean;
    xsmasGift?: IGift;
  };
  redirect?: string;
}

type ActionType =
  | ISetAuth
  | ISetUserData
  | IAuthError
  | ISetAccessKeys
  | ICreateAccessKey
  | ISetStatusAccessKey
  | ISetCurrentAccessKey
  | IDeleteAccessKey
  | IGetAccessKeys
  | ISetUsd
  | ISetNotifications
  | ISetNotificationsPagination
  | ISetNotificationsPanel
  | ISetCommonError
  | IClearCommonErrors
  | ISetEmailSettings
  | ISetSettingsInfo
  | IAddNewNotice
  | IShowGiftModal
  | IGetGift
  | ISetGift
  | ICloseGiftModal
  | RedirectAuthType
  | ISetSkipCommonErrors
  | UpdateUserBalance
  | ResetUserStateAction;

export interface IGift {
  amount: string;
  isXmasGiftGiven: boolean;
  userId: string;
  userPublicKey: string;
  whenXmasGiftWereGiven: string;
}

export const initPagination = { page: 1, perPage: 10, pagesCount: 1 };

const initialState: IUserState = {
  isAuthorized: { checked: false, result: false } as IIsAuthorized,
  authError: {
    errorText: "",
    open: false,
  },
  userData: {} as IUserData,
  accessKeys: [],
  accessKeyCurrent: {} as AccessKey,
  usd: "",
  email: {} as MeRep,
  notifications: {} as NotificationRep,
  notificationsPagination: initPagination,
  notificationsPanel: {} as NotificationRep,
  commonErrors: [],
  forceSkipCommonErrors: false,
  gift: {
    showModal: false,
    xsmasGift: {} as IGift,
  },
};

export function userReducer(state = initialState, action: ActionType): IUserState {
  switch (action.type) {
    case ActionTypes.RESET_USER_STATE: {
      return { ...initialState, isAuthorized: { checked: true, result: false } };
    }
    case ActionTypes.SET_REDIRECT_URL: {
      return { ...state, redirect: action.payload };
    }
    case ActionTypes.SET_SKIP_COMMON_ERRORS: {
      return { ...state, forceSkipCommonErrors: action.payload };
    }
    case ActionTypes.SHOW_GIFT_MODAL:
      return { ...state, gift: { ...state.gift, showModal: true } };
    case ActionTypes.CLOSE_GIFT_MODAL:
      return { ...state, gift: { ...state.gift, showModal: false } };
    case ActionTypes.SET_GIFT:
      return { ...state, gift: { ...state.gift, xsmasGift: action.payload } };
    case ActionTypes.SET_IS_AUTHORIZED:
      return { ...state, isAuthorized: action.payload };
    case ActionTypes.SET_USER_DATA:
      return { ...state, userData: { ...state.userData, ...action.payload } };
    case ActionTypes.SET_AUTH_ERROR:
      return { ...state, authError: action.payload };
    case ActionTypes.SET_ACCESS_KEYS:
      return { ...state, accessKeys: action.payload };
    case ActionTypes.SET_CURRENT_ACCESS_KEY:
      return { ...state, accessKeyCurrent: action.payload };
    case ActionTypes.SET_USD:
      return { ...state, usd: action.payload };
    case ActionTypes.SET_SETTINGS_INFO:
      return { ...state, email: action.payload };
    case ActionTypes.SET_NOTIFICATIONS: {
      let page = action?.payload?.page ? +action?.payload?.page : 1;
      if (page > action?.payload?.pagesCount) {
        page = action?.payload?.pagesCount;
      }
      if (page === 0) {
        page = 1;
      }
      return {
        ...state,
        notifications: {
          items: action?.payload?.items,
          readCount: action?.payload?.readCount,
          totalCount: action?.payload?.totalCount,
          unreadCount: action?.payload?.unreadCount,
        },
        notificationsPagination: {
          page: page,
          pagesCount: action?.payload?.pagesCount || 1,
          perPage: action?.payload?.perPage || 10,
        },
      };
    }
    case ActionTypes.SET_NOTIFICATIONS_PAGINATION: {
      let page = action?.payload?.page ? +action?.payload?.page : 1;
      if (page > action?.payload?.pagesCount) {
        page = action?.payload?.pagesCount;
      }
      if (page === 0) {
        page = 1;
      }
      return {
        ...state,
        notificationsPagination: { ...action.payload, page },
      };
    }
    case ActionTypes.SET_NOTIFICATIONS_PANEL: {
      return {
        ...state,
        notificationsPanel: action.payload,
      };
    }
    case ActionTypes.ADD_NEW_NOTICE: {
      return {
        ...state,
        notificationsPanel: {
          items: [action?.payload, ...state.notificationsPanel.items],
          last: "3",
          readCount: state.notificationsPanel.readCount,
          totalCount: state.notificationsPanel.totalCount + 1,
          unreadCount: state.notificationsPanel.unreadCount + 1,
        },
      };
    }
    case ActionTypes.SET_COMMON_ERROR: {
      return {
        ...state,
        commonErrors: [...state.commonErrors, action.payload],
      };
    }
    case ActionTypes.CLEAR_COMMON_ERRORS: {
      return {
        ...state,
        commonErrors: [],
      };
    }
    case ActionTypes.UPDATE_USER_BALANCE: {
      const userData = { ...state.userData };
      return { ...state, userData: { ...userData, balanceCLS: action.payload } };
    }
    default:
      return state;
  }
}
