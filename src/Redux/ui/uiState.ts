import { UpdateUIstate, ActionTypesUI, OpenSuccessModalAction, CloseSuccessModalAction } from "./uiActions";

export type UIState = {
  isMob: boolean;
  successModal: {
    isOpen: boolean;
    text: string | null;
  };
};

const initialState: UIState = {
  isMob: false,
  successModal: {
    isOpen: false,
    text: null,
  },
};

type ActionType = UpdateUIstate | OpenSuccessModalAction | CloseSuccessModalAction;

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
    default: {
      return state;
    }
  }
};
