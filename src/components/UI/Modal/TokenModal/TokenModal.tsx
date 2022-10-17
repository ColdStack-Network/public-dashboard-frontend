import React, {useEffect, useMemo, useState} from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import style from './tokenModal.module.scss';
import {usePrevious} from "../../../../helpers/common";

interface TokenModalProps {
  visible: boolean
  onClose: () => void,
  onSubmit: ()=>void
}


const TokenModal = ({
                           visible = false,
                           onClose,
                           onSubmit
                         }: TokenModalProps) => {



  const footer = useMemo(()=>{ return <div className={style.footer}>
    <div className={style.wrapBtn1}>
      <Button onClickHandler={onClose} color={"additional"} size={"small"}>Cancel</Button>
    </div>
    <Button onClickHandler={()=>{onSubmit()}} color={"primary"}  size={"small"}>Save</Button>
  </div>}, [onSubmit,  onClose])

  return  (
    <Modal title={"Rename Bucket"} closeOutClick={true} onClose={onClose} visible={visible}
           footer={footer}
    >
      {()=>{return <div>
        <div className={style.item}>
          {/*<InputText onChange={onChange} value={name.value} id={1} name={"nameBucket"}
                     tabindex={0} isSuccess={name.isSuccess} label={"Bucket name"}
                     isError={name.isError} error={name.error}/>*/}
        </div>
      </div>}}
    </Modal>
  )
};

export default TokenModal;