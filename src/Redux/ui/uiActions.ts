import { UIState } from "./uiState";

export enum ActionTypesUI {
  UpdateUI = "UpdateUI",
  OpenSuccessModal = "OpenSuccessModal",
  CloseSuccessModal = "CloseSuccessModal",
}

export type UpdateUIstate = {
  type: ActionTypesUI.UpdateUI;
  payload: boolean;
};

export type OpenSuccessModalAction = {
  type: ActionTypesUI.OpenSuccessModal;
  payload: UIState["successModal"];
};

export type CloseSuccessModalAction = {
  type: ActionTypesUI.CloseSuccessModal;
  payload: UIState["successModal"];
};

export const openSuccessModal = (title: string) => ({
  type: ActionTypesUI.OpenSuccessModal,
  payload: {
    isOpen: true,
    title,
  },
});

export const closeSuccessModal = () => ({
  type: ActionTypesUI.CloseSuccessModal,
  payload: {
    isOpen: false,
    title: null,
  },
});

export const setIsMob = (payload: boolean): UpdateUIstate => ({
  type: ActionTypesUI.UpdateUI,
  payload,
});
