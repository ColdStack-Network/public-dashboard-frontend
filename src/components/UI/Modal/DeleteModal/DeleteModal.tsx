import React, { useMemo } from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import style from './deleteModal.module.scss'

interface DeleteBucketModalProps {
  visible: boolean
  onClose: () => void,
  onSubmit: () => void,
  title: string,
  text: string,
  textBtnDelete: string,
}

const DeleteModal = ({
                       visible = false,
                       onClose,
                       onSubmit,
                       title,
                       text,
                       textBtnDelete,
                       }: DeleteBucketModalProps) => {
  const footer = useMemo(()=>{
    return <div className={style.footer}>
      <div className={style.wrapBtn}>
        <Button onClickHandler={onClose} color={"additional"} size={"small"}>Cancel</Button>
      </div>
      <div className={style.wrapBtn}>
        <Button onClickHandler={()=>{onSubmit()}} color={"accent"}  size={"small"}>{textBtnDelete}</Button>
      </div>
    </div>},
    //eslint-disable-next-line
    [onSubmit, onClose])

  return  (
    <Modal title={title} closeOutClick={true} onClose={onClose} visible={visible}
           footer={footer}
    >
      {()=>{return <div>
        <div className={style.text}>
          {text}
        </div>
        <div className={style.warning}>
          This action cannot be undone!
        </div>
      </div>}}
    </Modal>
  )
};

export default DeleteModal;