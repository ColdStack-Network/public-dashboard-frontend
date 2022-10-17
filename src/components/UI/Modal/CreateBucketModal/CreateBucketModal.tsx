import React, {useMemo, useState} from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import {IFormInputs,  updateInputs, validateInputs} from "../../Input/types";
import style from './createBucketModal.module.scss';

import { INewBucketCreate} from "../../../../containers/BucketsPage/BucketsPage";

interface CreteBucketModalProps {
  visible: boolean
  onClose: () => void,
  storageClasses: any [],
  regions: any [],
  onSubmit: (bucket: INewBucketCreate)=>void
}

const initialInputs = {
  nameBucket: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false
  }
} as IFormInputs;

const CreteBucketModal = ({
                          visible = false,
                          onClose,
                          storageClasses,
                          regions,
                          onSubmit
                        }: CreteBucketModalProps) => {

  const [inputs, setInputs] = useState(initialInputs as any);

  const [storageClass, setStorageClass] = useState(null as any);
  const [region, setRegion] = useState(null as any);
  console.log(setStorageClass, setRegion);
  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    switch (name) {
      default: {
        console.log("inputs",inputs)
        const newInputs = updateInputs(inputs, name, "value", value);
        console.log("newInputs_backet",newInputs)
        const [updatedInputs, errors] = validateInputs(newInputs, [name]);
        console.log("updatedInputs default", updatedInputs, errors);
        setInputs(updatedInputs);
      }
    }
  };
  const setOuterError=(error)=>{
    setInputs({nameBucket: {value: inputs.nameBucket?.value, error: error, isError: true, isSuccess: false }})
  }
  const onSuccess = ()=>{
    setInputs(initialInputs);
    onClose();
  }

  const submit = (e)=>{
    if (e) {
      e.preventDefault();
    }
    const [updatedInputs, errors] = validateInputs(inputs, ["nameBucket"]);
    setInputs(updatedInputs);
    if (errors?.length === 0) {
      onSubmit({
        name: inputs.nameBucket.value as string,
        storage: storageClass,
        region: region,
        setOuterError,
        onSuccess
      });
    }
    //onClose();
  }

  const footer = useMemo(()=>{ return <div className={style.footer}>
    <div className={style.wrapBtn1}>
      <Button onClickHandler={()=>{setInputs(initialInputs); onClose();}} color={"additional"} size={"small"}>Cancel</Button>
    </div>
    <div className={style.wrapBtn2}>
      {/*@ts-ignore*/}
      <Button onClickHandler={submit}
              color={"primary"}
              size={"small"}>
        Create bucket
      </Button>
    </div>
  </div>},
    // eslint-disable-next-line
    [onSubmit, inputs, storageClass, region])

  return  (
    <Modal title={"Create bucket"} closeOutClick={true} onClose={()=>{setInputs(initialInputs); onClose();}} visible={visible}
           footer={footer}
    >
      {()=>{return <div>
        <div className={style.item}>
          <form onSubmit={submit}>
            <InputText onChange={onTextInputChange} value={inputs.nameBucket.value as string} id={1} name={"nameBucket"} label={"Bucket name"} tabindex={0}
                       isSuccess={inputs.nameBucket.isSuccess}
                       isError={inputs.nameBucket.isError}
                       error={inputs.nameBucket.error}/>
          </form>
        </div>
       {/* <div className={style.item}>
          <SelectCustom isError={true} error={"hjgjkhkjh"} items={storageClasses} label={"Storage class"} onSelect={(item)=>{setStorageClass(item)}} />
        </div>
        <div className={style.item}>
          <SelectCustom items={regions} label={"Select region"} onSelect={(item)=>{setRegion(item)}} />
        </div>*/}
      </div>}}
    </Modal>
  )
};



export default CreteBucketModal;
