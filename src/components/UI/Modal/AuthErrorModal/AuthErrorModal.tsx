import React from "react";
import { CoreModal } from "../Modal";
import { isFull } from "../../../../helpers/common";
import Button from "../../Button/Button";
import LinkComponent from "../../Link/Link";

interface AuthErrorModalProps {
  visible: boolean;
  onClose: () => void;
  errorText?: string;
}

const AuthErrorModal = ({ visible = false, onClose, errorText }: AuthErrorModalProps) => {
  return (
    <CoreModal
      title="Error"
      closeOutClick={true}
      onClose={onClose}
      footerCenter={true}
      visible={visible}
      footer={
        <div style={{ width: "140px" }}>
          <Button onClickHandler={onClose} color="secondary">
            Try again
          </Button>
        </div>
      }
    >
      <div>
        {isFull(errorText) ? (
          errorText
        ) : (
          <div>
            User cancelled login. If the problem persists please{" "}
            <LinkComponent outerLink={true} href="https://t.me/coldstacksupport">
              Contact support
            </LinkComponent>
          </div>
        )}
      </div>
    </CoreModal>
  );
};

export default AuthErrorModal;
