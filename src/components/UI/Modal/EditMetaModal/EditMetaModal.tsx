import React, { useEffect, useState } from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import { IInputText, validateInputs } from "../../Input/types";
import { useDispatch } from "react-redux";
import style from "./editMetaModal.module.scss";
import { arrayClone, uriEncode } from "../../../../helpers/common";
import SvgTrash from "../../../../icons/Trash";
import { metadataFile } from "../../../../Redux/buckets/Actions/bucketsActions";
import { EditMetaModalFooter } from "./EditMetaModalFooter";

type NumberOrNull = number | null;
type FileData = {
  file: string;
  pathFolder: string;
  nameBucket: string;
};
type FileMeta = {
  metadataKey: IInputText;
  metadataValue: IInputText;
};
type CreteBucketModalProps = {
  data: FileData;
  metadata: Record<string, string>;
  visible: boolean;
  onClose: () => void;
};

export const EditMetaModal: React.FC<CreteBucketModalProps> = ({ data, metadata, visible = false, onClose }) => {
  const dispatch = useDispatch();
  const { file, pathFolder, nameBucket } = data;
  const [arrayNewInputs, setArrayNewInputs] = useState<FileMeta[]>([]);
  const [constArrayNewInputs, setConstArrayNewInputs] = useState<FileMeta[]>([]);
  const CopySource = "/" + nameBucket + "/" + pathFolder + "/" + file;
  const disableSave = !!arrayNewInputs.find((item) => item.metadataKey.isError === true);

  const onTextNewInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    const mas = name.split("_");
    const idxRow = mas[0];
    const nameField = mas[1] === "0" ? "metadataKey" : "metadataValue";
    let copy: FileMeta[] = arrayClone(arrayNewInputs);

    if (mas[1] === "0") {
      copy[idxRow].metadataKey.value = value;
    } else {
      copy[idxRow].metadataValue.value = value;
    }

    const [updatedInputs] = validateInputs(copy[idxRow], [nameField]);
    copy[idxRow] = updatedInputs;
    setArrayNewInputs(copy);
  };
  const onAddMeta = () => {
    setArrayNewInputs((prev) => [
      ...prev,
      {
        metadataKey: {
          value: "",
          error: "",
          isError: false,
          isSuccess: false,
        },
        metadataValue: {
          value: "",
          error: "",
          isError: false,
          isSuccess: false,
        },
      },
    ]);
  };
  const onClickSaveMetadata = () => {
    const metaObject: Record<string, string> = {};
    arrayNewInputs?.forEach((element) => {
      metaObject[element.metadataKey.value] = uriEncode(element.metadataValue.value);
    });

    dispatch(
      metadataFile({
        nameBucket: nameBucket,
        nameFile: file,
        CopySource: CopySource.replace("//", "/"),
        pathFolder: pathFolder,
        Metadata: metaObject,
      })
    );
    onClose();
  };
  const deleteNewInput = (idx: number) => {
    setArrayNewInputs(() => [...arrayNewInputs.slice(0, idx), ...arrayNewInputs.slice(idx + 1)]);
  };

  useEffect(() => {
    if (metadata) {
      const array = Object.entries(metadata).map((element) => ({
        metadataKey: {
          value: element[0],
          error: "",
          isError: false,
          isSuccess: false,
        },
        metadataValue: {
          value: decodeURIComponent(element[1]),
          error: "",
          isError: false,
          isSuccess: false,
        },
      }));

      const copy: FileMeta[] = arrayClone(array);
      const result: FileMeta[] = [];
      let idxFileHash: NumberOrNull = null;
      let idxStorage: NumberOrNull = null;
      let idxLocation: NumberOrNull = null;

      copy.forEach((item, index) => {
        if (item.metadataKey.value === "file-hash") {
          idxFileHash = index;
        }
      });

      copy.forEach((item, index) => {
        if (item.metadataKey.value === "storage") {
          idxStorage = index;
        }
      });

      copy.forEach((item, index) => {
        if (item.metadataKey.value === "location") {
          idxLocation = index;
        }
      });

      if (idxFileHash) {
        copy.splice(idxFileHash, 1);
        result.push(array[idxFileHash]);
      }

      if (idxStorage) {
        copy.splice(idxStorage, 1);
        result.push(array[idxStorage]);
      }

      if (idxLocation) {
        copy.splice(idxLocation, 1);
        result.push(array[idxLocation]);
      }

      result.push(...copy);

      setArrayNewInputs(result);
      setConstArrayNewInputs(result);
    }
  }, [metadata]);

  return (
    <CoreModal
      title="Metadata"
      closeOutClick={true}
      onClose={onClose}
      visible={visible}
      footer={
        <EditMetaModalFooter
          disableSave={disableSave}
          onAddMeta={onAddMeta}
          onClickSaveMetadata={onClickSaveMetadata}
        />
      }
      className={style.wrap}
    >
      <div>
        <div className={style.item}>
          <div className={style.label}>
            <div className={style.modalHeadItem}>Key</div>
          </div>
          <div className={style.label}>
            <div className={style.modalHeadItem}>Value</div>
          </div>

          <Button isDisabled={true} color="transparent" size="square" onClickHandler={() => {}}>
            <SvgTrash color="white" />
          </Button>
        </div>

        {arrayNewInputs?.length > 0 &&
          arrayNewInputs.map((elems, key) => {
            return (
              <div key={key} className={style.newInputMetadata}>
                <InputText
                  isDisabled={
                    constArrayNewInputs[key]?.metadataKey.value === "file-hash" ||
                    constArrayNewInputs[key]?.metadataKey.value === "storage" ||
                    constArrayNewInputs[key]?.metadataKey.value === "location"
                  }
                  onChange={onTextNewInputChange}
                  value={elems.metadataKey.value as string}
                  id={key + 2}
                  name={`${key}_0`}
                  tabindex={key + 2}
                  isSuccess={elems.metadataKey.isSuccess}
                  isError={elems.metadataKey.isError}
                  error={elems.metadataKey.error}
                  className={style.inputWrapper}
                />
                <InputText
                  isDisabled={
                    constArrayNewInputs[key]?.metadataKey.value === "file-hash" ||
                    constArrayNewInputs[key]?.metadataKey.value === "storage" ||
                    constArrayNewInputs[key]?.metadataKey.value === "location"
                  }
                  onChange={onTextNewInputChange}
                  value={elems.metadataValue?.value as string}
                  id={key + 2}
                  name={`${key}_1`}
                  tabindex={key + 3}
                  isSuccess={elems.metadataValue.isSuccess}
                  isError={elems.metadataValue.isError}
                  error={elems.metadataValue.error}
                />

                {constArrayNewInputs[key]?.metadataKey.value !== "file-hash" &&
                  constArrayNewInputs[key]?.metadataKey.value !== "storage" &&
                  constArrayNewInputs[key]?.metadataKey.value !== "location" && (
                    <Button
                      isDisabled={
                        arrayNewInputs?.length <= 1 ||
                        constArrayNewInputs[key]?.metadataKey.value === "file-hash" ||
                        constArrayNewInputs[key]?.metadataKey.value === "storage" ||
                        constArrayNewInputs[key]?.metadataKey.value === "location"
                      }
                      color="transparent"
                      size="square"
                      onClickHandler={() => deleteNewInput(key)}
                    >
                      <SvgTrash color={arrayNewInputs?.length <= 1 ? "white" : "red"} />
                    </Button>
                  )}
              </div>
            );
          })}
      </div>
    </CoreModal>
  );
};
