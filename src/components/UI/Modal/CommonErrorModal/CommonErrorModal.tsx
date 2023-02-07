import React from "react";
import { CoreModal } from "../Modal";
import LinkComponent from "../../Link/Link";
import { useHistory } from "react-router-dom";
import style from "./commonErrorModal.module.scss";
import { SvgModalError } from "../../../../icons/ModalIcons";

type ModalErrObjectType = {
  message: string;
  isBottomText?: boolean;
};
type ModalErrStringType = string;
type ModalErr = ModalErrStringType | ModalErrObjectType;
type CommonErrorModalProps = {
  visible: boolean;
  onClose: () => void;
  errors?: ModalErr[];
};

const getObjectsErrType = (errors?: ModalErr[]) => {
  if (!errors) return [];
  return errors.reduce((errs, err) => {
    return typeof err === "object" ? [...errs, err] : [...errs, { message: err }];
  }, [] as ModalErrObjectType[]);
};

export const CommonErrorModal: React.FC<CommonErrorModalProps> = ({ visible = false, onClose, errors }) => {
  const history = useHistory();
  const objErrors = getObjectsErrType(errors);

  return (
    <CoreModal className={style.wrap} closeOutClick={true} onClose={onClose} visible={visible} titleMargin="10px">
      <div>
        <div className={style.icon}>
          <SvgModalError />
        </div>
        <div className={style.errors}>
          {objErrors.map((err, idx) => (
            <div key={idx} className={style.errorBlock}>
              {err?.message}
            </div>
          ))}
        </div>
        {objErrors.find((err) => err.isBottomText) && (
          <div className={style.bottomErrors}>
            Try again. If the problem persists, create a{" "}
            <LinkComponent
              onClickHandler={() => {
                history.push("/dashboard/support");
                onClose();
              }}
            >
              ticket
            </LinkComponent>
          </div>
        )}
      </div>
    </CoreModal>
  );
};
