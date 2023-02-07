import React, { useEffect, useMemo, useState } from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import { IFormInputs, updateInputs, validateInputs } from "../../Input/types";
import style from "./createFolderModal.module.scss";
import { OnCreateFolderCallback } from "containers/BucketPage/BucketPage";

interface CreteBucketModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateFolder: OnCreateFolderCallback;
}

const initialInputs = {
  nameFolder: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false,
  },
} as IFormInputs;

export const CreateFolderModal: React.FC<CreteBucketModalProps> = ({ visible = false, onClose, onCreateFolder }) => {
  const [inputs, setInputs] = useState(initialInputs);

  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    const newInputs = updateInputs(inputs, name, "value", value);
    const [updatedInputs, errors] = validateInputs(newInputs, [name]);

    setInputs(updatedInputs);
  };
  const setOuterError = (error: string) => {
    setInputs({
      //@ts-ignore
      nameFolder: {
        value: inputs.nameFolder?.value,
        error: error,
        isError: true,
        isSuccess: false,
      },
    });
  };
  const onSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    const [updatedInputs, errors] = validateInputs(inputs, ["nameFolder"]);
    setInputs(updatedInputs);
    if (errors?.length === 0) {
      onCreateFolder({ nameFolder: inputs.nameFolder.value as string, setOuterError });
    }
  };

  const footer = useMemo(
    () => {
      return (
        <div className={style.footer}>
          <div className={style.wrapBtn1}>
            <Button onClickHandler={onClose} color="additional" size="small">
              Cancel
            </Button>
          </div>
          <Button
            onClickHandler={onSubmit}
            color={
              (inputs.nameFolder.value === "" && !inputs.nameFolder.isError) || inputs.nameFolder.isError
                ? "disabled"
                : "primary"
            }
            size="small"
            isDisabled={(inputs.nameFolder.value === "" && !inputs.nameFolder.isError) || inputs.nameFolder.isError}
          >
            Create folder
          </Button>
        </div>
      );
    },
    // eslint-disable-next-line
    [inputs]
  );

  useEffect(() => {
    if (!visible) {
      setInputs(initialInputs);
    }
  }, [visible]);

  return (
    <CoreModal
      className={style.wrap}
      title="Create folder"
      closeOutClick={true}
      onClose={onClose}
      visible={visible}
      footer={footer}
    >
      <div className={style.createFolderContent}>
        <div className={style.item}>
          <form onSubmit={onSubmit}>
            <InputText
              onChange={onTextInputChange}
              value={inputs.nameFolder.value as string}
              id={1}
              name="nameFolder"
              label="Folder name"
              tabindex={0}
              isSuccess={inputs.nameFolder.isSuccess}
              isError={inputs.nameFolder.isError}
              error={inputs.nameFolder.error}
            />
          </form>
        </div>
      </div>
    </CoreModal>
  );
};
