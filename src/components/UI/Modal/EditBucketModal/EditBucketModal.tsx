import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import style from './editBucketModal.module.scss';
import {usePrevious, validateBucketName} from "../../../../helpers/common";

interface EditBucketModalProps {
  visible: boolean
  onClose: () => void,
  initName: string,
  onSubmit: (name: string)=>void,
  outerError?: string
}


const EditBucketModal = ({
                         visible = false,
                         onClose,
                         initName,
                         onSubmit,
                         outerError
                       }: EditBucketModalProps) => {

  const [name, setName] = useState({value: initName, isError: false, isSuccess: false, error: ""})

  const onCloseExtended = useCallback(()=>{setName({value: "", isError: false, isSuccess: false, error: ""}); onClose();}, [onClose])

  const prevOuterError = usePrevious(outerError);
  useEffect(()=>{
    if (prevOuterError !== outerError && outerError && outerError.length > 0){
      setName((prevName)=>{return {...prevName, isError: true, error: outerError}})
    }
  },[prevOuterError, outerError])

  const prevInitName = usePrevious(initName);
  useEffect(()=>{
    if (prevInitName !== initName){
      setName({value: initName, isError: false, isSuccess: false, error: ""})
    }
  },[initName, prevInitName])

  const onChange = (evt: React.FormEvent<HTMLInputElement>)=>{
    const value = evt.currentTarget.value;
    const error = validateBucketName(value);
    setName({...name, value, isError:  error?.length > 0, error: error});
  }

  const onSubmitFunc=useCallback((e)=>{
    if (e){e.preventDefault();}
    const error = validateBucketName(name?.value);
    setName({...name, isError:  error?.length > 0, error: error});
    if (error?.length === 0) {
      onSubmit(name.value);
    }
  },[onSubmit, name])

  const footer = useMemo(()=>{ return <div className={style.footer}>
    <div className={style.wrapBtn1}>
      <Button onClickHandler={onCloseExtended} color={"additional"} size={"small"}>Cancel</Button>
    </div>
    {/*@ts-ignore*/}
    <Button onClickHandler={onSubmitFunc} color={"primary"}  size={"small"}>Save</Button>
  </div>}, [onSubmitFunc, onCloseExtended])

  return  (
    <Modal title={"Rename Bucket"} closeOutClick={true} onClose={onCloseExtended} visible={visible}
           footer={footer}
    >
      {()=>{return <div>
        <div className={style.item}>
          <form onSubmit={onSubmitFunc}>
           <InputText onChange={onChange} value={name.value} id={1} name={"nameBucket"}
                     tabindex={0} isSuccess={name.isSuccess} label={"Bucket name"}
                     isError={name.isError} error={name.error}/>
          </form>
        </div>
      </div>}}
    </Modal>
  )
};

export default EditBucketModal;