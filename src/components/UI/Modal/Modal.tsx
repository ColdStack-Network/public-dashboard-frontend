import React, { ReactElement, useEffect } from "react";
import style from "./modal.module.scss";
import SvgCloseIcon from "../../../icons/Close";
import SvgExpandDown from "../../../icons/Expand_down";
import clsx from "clsx";

interface ModalProps {
  visible: boolean;
  title?: string;
  footer?: ReactElement | string;
  footerCenter?: boolean;
  onClose: () => void;
  titleMargin?: string;
  closeOutClick: boolean;
  overflow?: string;
  uploadFiles?: number;
  disabled?: boolean;
  showClose?: boolean;
  titleClassName?: string;
  size?: "lg" | "md" | "sm" | "xs";
  className?: string;
}

export const CoreModal: React.FC<ModalProps> = ({
  visible = false,
  title = "",
  children,
  footer = "",
  footerCenter = false,
  onClose,
  titleMargin,
  closeOutClick,
  overflow = "auto",
  uploadFiles = 0,
  disabled = false,
  showClose = true,
  titleClassName,
  size = "sm",
  className,
}) => {
  useEffect(() => {
    const onKeydown = ({ key }: KeyboardEvent) => {
      key === "Escape" && onClose();
    };

    if (visible) {
      document.addEventListener("keydown", onKeydown);
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
    //eslint-disable-next-line
  }, [visible]);

  if (!visible) return null;
  return (
    <div className={clsx(style.modal, size)} onClick={closeOutClick ? onClose : () => {}}>
      <div className={clsx(style.modalDialog, className)} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader} style={titleMargin ? { marginBottom: titleMargin } : {}}>
          <h3 className={titleClassName ? titleClassName : style.modalTitle}>{title}</h3>
          {showClose && (
            <span className={style.modalClose} onClick={onClose}>
              {uploadFiles > 0 && disabled ? <SvgExpandDown color="#5A5D65" rotate={false} /> : <SvgCloseIcon />}
            </span>
          )}
        </div>
        <div
          className={style.modalWrapper}
          style={overflow === "visible" ? { overflow: "visible" } : { overflow: "auto" }}
        >
          <div className={style.modalBody}>
            <div className={style.modalContent}>{children}</div>
          </div>
          {footer && <div className={clsx(style.modalFooter, footerCenter && style.modalFooterCenter)}>{footer}</div>}
        </div>
      </div>
    </div>
  );
};
