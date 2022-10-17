import React, {useEffect, useMemo, useState} from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import {IFormInputs, updateInputs, validateInputs} from "../../Input/types";
import style from './renameFileFolderModal.module.scss';
import {capitalize, usePrevious} from "../../../../helpers/common";

interface RenameFileFolderModalProps {
  visible: boolean
  onClose: () => void
  onRename: (name: string)=>void
  name: string
  type: string,
  outerError?: string,
}



const RenameFileFolderModal = ({
                            visible = false,
                            onClose,
                            onRename,
                            name,
                            type,
                            outerError
                          }: RenameFileFolderModalProps) => {

  const initialInputs = {
    nameItem: {
      value: name,
      error: "",
      isError: false,
      isSuccess: false
    }
  } as IFormInputs;

  const [inputs, setInputs] = useState(initialInputs);

  useEffect(()=>{
    setInputs({
      nameItem: {
        value: name,
        error: "",
        isError: false,
        isSuccess: false
      }
    })
  },[name])

  const prevOuterError = usePrevious(outerError);
  useEffect(()=>{
    if (prevOuterError !== outerError && outerError && outerError.length > 0){
      setInputs((prevInputs)=>{
        return {
        nameItem: {
          ...prevInputs?.nameItem,
          error: outerError,
          isError: true,
        }}
      })
    }
  },[prevOuterError, outerError])

  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    switch (name) {
      default: {
        const newInputs = updateInputs(inputs,  name, "value", value);
        const [updatedInputs, errors] = validateInputs(newInputs, [name]);
        console.log("updatedInputs default", updatedInputs, errors);
        setInputs(updatedInputs);
      }
    }
  };

  const footer = useMemo(()=>{ return <div className={style.footer}>
    <div className={style.wrapBtn1}>
      <Button onClickHandler={onClose} color={"additional"} size={"small"}>Cancel</Button>
    </div>
    <Button onClickHandler={()=>{onRename(inputs.nameItem.value as string)}} color={"primary"}  size={"small"}>Save</Button>
  </div>}, [inputs, onRename, onClose])

  return  (
    <Modal closeOutClick={true} title={`Rename ${type}`} onClose={onClose} visible={visible}
           footer={footer}
    >
      {()=>{return <div>
        <div className={style.item}>
          <form onSubmit={(e)=>{e.preventDefault(); onRename(inputs.nameItem.value as string)}}>
            <InputText onChange={onTextInputChange} value={inputs.nameItem.value as string} id={1} name={"nameItem"} label={`${capitalize(type)} name`}
                       tabindex={0} isSuccess={inputs.nameItem.isSuccess}
                       isError={inputs.nameItem.isError} error={inputs.nameItem.error}/>
          </form>
        </div>
      </div>}}
    </Modal>
  )
};



export default RenameFileFolderModal;
