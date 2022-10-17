import React from 'react'
import Modal from "../Modal";
import {isFull} from "../../../../helpers/common";
import LinkComponent from "../../Link/Link";
import { useHistory } from 'react-router-dom';
import style from "./commonErrorModal.module.scss"
import {SvgModalError} from "../../../../icons/ModalIcons";

interface CommonErrorModalProps {
  visible: boolean
  onClose: () => void
  errors?: any []
}

const CommonErrorModal = ({
                          visible = false,
                          onClose,
                          errors,
                        }: CommonErrorModalProps) => {
  const history = useHistory();
  return  (
    <Modal title={""} closeOutClick={true} onClose={onClose} visible={visible} titleMargin={"10px"}>
      {()=>{
        return <div>
          <div className={style.icon}>
            <SvgModalError/>
          </div>
        {
          <div className={style.errors}>
            {
             errors && errors.map((err)=>{
                return <div className={style.errorBlock}>{err?.message}</div>
              })
            }
          </div>
        }
        {
          isFull(errors) && errors?.find((err)=>err?.isBottomText === true) &&
          <div className={style.bottomErrors}>Try again. If the problem persists, create a <LinkComponent onClickHandler={()=>{
            history.push("/support"); onClose();
          }}>ticket</LinkComponent> </div>
        }
      </div>}}
    </Modal>
  )
};

export default CommonErrorModal;
