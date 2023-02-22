import {
  UpdateUIstate,
  ActionTypesUI,
  OpenSuccessModalAction,
  CloseSuccessModalAction,
  ToggleForcedLogoutModalAction
} from "./uiActions";

export type UIState = {
  isMob: boolean;
  successModal: {
    isOpen: boolean;
    text: string | null;
  };
  forcedLogoutModal: boolean;
};

const initialState: UIState = {
  isMob: false,
  successModal: {
    isOpen: false,
    text: null,
  },
  forcedLogoutModal: false
};

type ActionType = UpdateUIstate | OpenSuccessModalAction | CloseSuccessModalAction | ToggleForcedLogoutModalAction;

export const uiStateReducer = (state = initialState, action: ActionType): UIState => {
  switch (action.type) {
    case ActionTypesUI.UpdateUI: {
      return { ...state, isMob: action.payload };
    }
    case ActionTypesUI.OpenSuccessModal: {
      return { ...state, successModal: action.payload };
    }
    case ActionTypesUI.CloseSuccessModal: {
      return { ...state, successModal: action.payload };
    }
    case ActionTypesUI.ToggleForcedLogoutModal: {
      return { ...state, forcedLogoutModal: action.payload };
    }
    default: {
      return state;
    }
  }
};
