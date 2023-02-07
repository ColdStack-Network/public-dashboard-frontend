import React, { useState } from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import style from "./createAccessKeyModal.module.scss";
import SvgCopyIcon from "../../../../icons/Copy";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CreteAccessKeyModalProps {
  visible: boolean;
  onClose: () => void;
  secretKey: string;
  myAccessKey: string;
}

const CreteAccessKeyModal: React.FC<CreteAccessKeyModalProps> = ({
  visible = false,
  onClose,
  secretKey,
  myAccessKey,
}) => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState("");
  const keys = `Access key ID: ${myAccessKey} Secret Access Key: ${secretKey}`;

  return (
    <CoreModal
      title="Your access key"
      closeOutClick={true}
      onClose={() => {
        setShow(false);
        onClose();
      }}
      visible={visible}
      titleMargin="24px"
      className={style.wrap}
    >
      <React.Fragment>
        <div className={style.itemKey}>
          <InputText
            onChange={() => {}}
            isDisabled={true}
            disabledBright={true}
            value={myAccessKey}
            id={1}
            name="myAccessKey"
            label="Access Key ID"
            tabindex={0}
            isSuccess={true}
            isError={false}
            error=""
          />
        </div>
        <div className={style.rowAccessKey}>
          <div className={style.labelKey}>Secret Access Key</div>
          <div className={style.btnShowHide} onClick={() => setShow((prev) => !prev)}>
            {show ? "Hide" : "Show"}
          </div>
        </div>
        {show && (
          <div className={style.itemSecret}>
            <InputText
              onChange={() => {}}
              value={secretKey}
              id={1}
              name="secretKey"
              tabindex={1}
              isSuccess={true}
              isDisabled={true}
              disabledBright={true}
              isError={false}
              error=""
            />
          </div>
        )}
        <div className={style.footerSecond}>
          <div className={style.wrapBtnCopy} data-tooltip-text={copied}>
            <CopyToClipboard text={keys} onCopy={() => setCopied("Copied!")}>
              <div onMouseOut={() => setCopied("")}>
                <Button color="primary">
                  <div className={style.btnContent}>
                    <div className={style.btnIcon}>
                      <SvgCopyIcon color="white" />
                    </div>
                    <div>Copy keys to clipboard</div>
                  </div>
                </Button>
              </div>
            </CopyToClipboard>
          </div>
        </div>
      </React.Fragment>
    </CoreModal>
  );
};

export default CreteAccessKeyModal;
