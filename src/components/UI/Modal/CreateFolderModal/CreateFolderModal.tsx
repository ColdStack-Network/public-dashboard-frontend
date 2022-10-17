import React, {useEffect, useMemo, useState} from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import {IFormInputs, updateInputs, validateInputs} from "../../Input/types";
import style from './createFolderModal.module.scss'

interface CreteBucketModalProps {
  visible: boolean
  onClose: () => void
  onCreateFolder: (props: any)=>void
}

const initialInputs = {
  nameFolder: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false
  }
} as IFormInputs;

const CreteFolderModal = ({
                            visible = false,
                            onClose,
                            onCreateFolder
                          }: CreteBucketModalProps) => {

  const [inputs, setInputs] = useState(initialInputs);

  useEffect(()=>{
    if (!visible){
      setInputs(initialInputs)
    }
  },[visible])

  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    switch (name) {
      default: {
        const newInputs = updateInputs(inputs, name, "value", value);
        const [updatedInputs, errors] = validateInputs(newInputs, [name]);
        console.log("updatedInputs default", updatedInputs, errors);
        setInputs(updatedInputs);
      }
    }
  };
  const setOuterError=(error)=>{
    //@ts-ignore
    setInputs({nameFolder: {value: inputs.nameFolder?.value, error: error, isError: true, isSuccess: false }})
  }
  const onSubmit=(e)=>{
    if (e){e.preventDefault()}
    const [updatedInputs, errors] = validateInputs(inputs, ["nameFolder"]);
    setInputs(updatedInputs);
    if (errors?.length === 0) {
      onCreateFolder({nameFolder: inputs.nameFolder.value as string, setOuterError})
    }
  }

  const footer = useMemo(()=>{ return <div className={style.footer}>
    <div className={style.wrapBtn1}>
      <Button onClickHandler={onClose} color={"additional"} size={"small"}>Cancel</Button>
    </div>
    {/*@ts-ignore */}
    <Button onClickHandler={onSubmit} color={"primary"}  size={"small"}>Create folder</Button>
  </div>},
     // eslint-disable-next-line
    [inputs])

  return  (
    <Modal title={"Create folder"} closeOutClick={true} onClose={onClose} visible={visible}
           footer={footer}
    >
      {()=>{return <div className={style.createFolderContent}>
        <div className={style.item}>
          <form onSubmit={onSubmit}>
            <InputText onChange={onTextInputChange} value={inputs.nameFolder.value as string} id={1} name={"nameFolder"} label={"Folder name"} tabindex={0} isSuccess={inputs.nameFolder.isSuccess}
                       isError={inputs.nameFolder.isError} error={inputs.nameFolder.error}/>
          </form>
        </div>
      </div>}}
    </Modal>
  )
};



export default CreteFolderModal;
