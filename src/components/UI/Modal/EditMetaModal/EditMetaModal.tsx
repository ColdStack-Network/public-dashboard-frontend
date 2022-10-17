import React, {useEffect, useMemo, useState} from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import {validateInputs} from "../../Input/types";
import {useDispatch} from "react-redux";
import style from './editMetaModal.module.scss';
import {arrayClone, uriEncode} from "../../../../helpers/common";
import SvgTrash from "../../../../icons/Trash";
import {metadataFile} from "../../../../modules/buckets/actions";

interface CreteBucketModalProps {
  data: any
  metadata: object
  visible: boolean
  onClose: () => void
}

const EditMetaModal = ({
                         data,
                         metadata,
                         visible = false,
                         onClose,
                       }: CreteBucketModalProps) => {

  const dispatch = useDispatch();
  const {file, pathFolder, nameBucket} = data;

  const [arrayNewInputs, setArrayNewInputs] = useState([] as any)
  const [constArrayNewInputs, setConstArrayNewInputs] = useState([] as any)

  useEffect(() => {
    if (metadata) {
      const array = Object
        .entries(metadata)
        .map(element => (
          {
            metadataKey: {
              value: element[0],
              error: "",
              isError: false,
              isSuccess: false
            },
            metadataValue: {
              value: decodeURIComponent(element[1]),
              error: "",
              isError: false,
              isSuccess: false
            }
          }
        ));

      let copy = arrayClone(array)
      let idxFileHash;
      let idxStorage;
      let idxLocation;
      let result = [] as any

      copy.forEach((item, index) => {
        if (item.metadataKey.value === 'file-hash') {
          idxFileHash = index
        }
      })

      copy.forEach((item, index) => {
        if (item.metadataKey.value === 'storage') {
          idxStorage = index
        }
      })

      copy.forEach((item, index) => {
        if (item.metadataKey.value === 'location') {
          idxLocation = index
        }
      })

      if (idxFileHash) {
        copy.splice(idxFileHash, 1);
        result.push(array[idxFileHash])
      }

      if (idxStorage) {
        copy.splice(idxStorage, 1);
        result.push(array[idxStorage])
      }

      if (idxLocation) {
        copy.splice(idxLocation, 1);
        result.push(array[idxLocation])
      }

        result.push(...copy)

      setArrayNewInputs(result)
      setConstArrayNewInputs(result)
    }
  }, [metadata])


  const onTextNewInputChange = (evt: React.FormEvent<HTMLInputElement>) => {

    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;

    const mas = name.split("_");
    const idxRow = mas[0];

    const nameField = mas[1] === "0" ? "metadataKey" : "metadataValue";

    let copy = arrayClone(arrayNewInputs);

    if (mas[1] === "0") {
      copy[idxRow].metadataKey.value = value;
    } else {
      copy[idxRow].metadataValue.value = value;
    }

    switch (nameField) {
      default: {
        const [updatedInputs] = validateInputs(copy[idxRow], [nameField]);
        copy[idxRow] = updatedInputs;
        setArrayNewInputs(copy);
      }
    }
  };

  const onAddMeta = () => {
    let copy = arrayClone(arrayNewInputs);
    copy.push({
      metadataKey: {
        value: "",
        error: "",
        isError: false,
        isSuccess: false
      },
      metadataValue: {
        value: "",
        error: "",
        isError: false,
        isSuccess: false
      }
    })
    setArrayNewInputs(copy)
  }

  const onClickSaveMetadata = () => {
    delete metaObject[""];
    dispatch(metadataFile({
      nameBucket: nameBucket,
      nameFile: file,
      CopySource: CopySource.replace('//', '/'),
      pathFolder: pathFolder,
      Metadata: metaObject
    }))
    onClose()
  }

  let disableSave = arrayNewInputs.find(item => item.metadataKey.isError === true);

  const footer = useMemo(() => {
      return <div className={style.footer}>
        <div className={style.wrapBtn1}>
          <Button onClickHandler={onAddMeta} color={"secondary"} size={"small"}>Add metadata</Button>
        </div>
        <div className={style.wrapBtn2}>
        <Button isDisabled={disableSave} onClickHandler={onClickSaveMetadata} color={"primary"} size={"small"}>Save</Button>
        </div>
      </div>
    },
    // eslint-disable-next-line
    [arrayNewInputs])

  const deleteNewInput = (key) => {
    let copy = arrayClone(arrayNewInputs);
    copy.splice(key, 1);
    setArrayNewInputs(copy)
  }

  const CopySource = nameBucket + "/" + pathFolder + "/" + file;

  let metaObject = {};

  arrayNewInputs?.forEach(element => {
    metaObject[element.metadataKey.value] = uriEncode(element.metadataValue.value)
  });

  return (
    <Modal title={"Metadata"} closeOutClick={true} onClose={onClose} visible={visible}
           footer={footer}
    >
      {() => {
        return <div>
          <div className={style.item}>

            <div className={style.label}>
              <div className={style.modalHeadItem}>
                Key
              </div>
            </div>
            <div className={style.label}>
              <div className={style.modalHeadItem}>
                Value
              </div>
            </div>

            <Button isDisabled={true} color={"transparent"} size={"square"} onClickHandler={
              () => {
              }}>
              <SvgTrash color={"white"}/>
            </Button>

          </div>

          {arrayNewInputs?.length > 0 && arrayNewInputs.map((elems, key) => {
            return <div key={key} className={style.newInputMetadata}>
              <InputText isDisabled={constArrayNewInputs[key]?.metadataKey.value === 'file-hash' ||
              constArrayNewInputs[key]?.metadataKey.value === 'storage' ||
              constArrayNewInputs[key]?.metadataKey.value === 'location' }
                         onChange={onTextNewInputChange}
                         value={elems.metadataKey.value as string} id={key + 2}
                         name={`${key}_0`}
                         tabindex={key + 2} isSuccess={elems.metadataKey.isSuccess}
                         isError={elems.metadataKey.isError} error={elems.metadataKey.error}/>
              <InputText isDisabled={constArrayNewInputs[key]?.metadataKey.value === 'file-hash' || constArrayNewInputs[key]?.metadataKey.value === 'storage' || constArrayNewInputs[key]?.metadataKey.value === 'location'} onChange={onTextNewInputChange}
                         value={elems.metadataValue?.value as string} id={key + 2}
                         name={`${key}_1`}
                         tabindex={key + 3} isSuccess={elems.metadataValue.isSuccess}
                         isError={elems.metadataValue.isError} error={elems.metadataValue.error}/>

              {constArrayNewInputs[key]?.metadataKey.value !== 'file-hash' &&
              constArrayNewInputs[key]?.metadataKey.value !== 'storage' &&
              constArrayNewInputs[key]?.metadataKey.value !== 'location' &&
                         <Button isDisabled={arrayNewInputs?.length <= 1
              || constArrayNewInputs[key]?.metadataKey.value === 'file-hash'
              || constArrayNewInputs[key]?.metadataKey.value === 'storage'
              || constArrayNewInputs[key]?.metadataKey.value === 'location' }
                      color={"transparent"}
                      size={"square"} onClickHandler={
                () => {
                  deleteNewInput(key)
                }}>
                <SvgTrash color={arrayNewInputs?.length <= 1 ? "white" : "red"}/>
              </Button> }

            </div>
          })}
        </div>
      }}
    </Modal>
  )
};

export default EditMetaModal;
