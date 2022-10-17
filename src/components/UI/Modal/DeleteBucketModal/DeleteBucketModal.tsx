import React, { useMemo } from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import style from './deleteBucketModal.module.scss';

interface EditBucketModalProps {
  visible: boolean
  onClose: () => void,
  name: string,
  onSubmit: () => void
}


const DeleteBucketModal = ({
                           visible = false,
                           onClose,
                           name,
                           onSubmit
                         }: EditBucketModalProps) => {
  const footer = useMemo(()=>{ return <div className={style.footer}>
    <div className={style.wrapBtn1}>
      <Button onClickHandler={onClose} color={"additional"} size={"small"}>Cancel</Button>
    </div>
    <div className={style.wrapBtn2}>
      <Button onClickHandler={()=>{onSubmit()}} color={"accent"}  size={"small"}>Delete</Button>
    </div>
  </div>}, [onSubmit, onClose])

  return  (
    <Modal title={"Delete Bucket"} closeOutClick={true} onClose={onClose} visible={visible}
           footer={footer}
    >
      {()=>{return <div>
        <div className={style.item}>
          Are you sure you want to delete bucket {name} ?
        </div>
      </div>}}
    </Modal>
  )
};

export default DeleteBucketModal;