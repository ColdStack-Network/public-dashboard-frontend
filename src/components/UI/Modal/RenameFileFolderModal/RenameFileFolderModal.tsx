import React, { useEffect, useMemo, useState } from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import { IFormInputs, updateInputs, validateInputs } from "../../Input/types";
import style from "./renameFileFolderModal.module.scss";
import { capitalize, usePrevious } from "../../../../helpers/common";

type RenameFileFolderModalProps = {
  visible: boolean;
  onClose: () => void;
  onRename: (name: string) => void;
  name: string;
  type: string;
  outerError?: string;
};

const Footer = ({
  onClose,
  onRename,
  inputs,
  fieldName,
}: Pick<RenameFileFolderModalProps, "onClose" | "onRename"> & { inputs: IFormInputs; fieldName: string }) => {
  return (
    <div className={style.footer}>
      <div className={style.wrapBtn1}>
        <Button onClickHandler={onClose} color="additional" size="small">
          Cancel
        </Button>
      </div>
      <Button onClickHandler={() => onRename(inputs[fieldName]?.value as string)} color="primary" size="small">
        Save
      </Button>
    </div>
  );
};

const RenameFileFolderModal: React.FC<RenameFileFolderModalProps> = ({
  visible = false,
  onClose,
  onRename,
  name,
  type,
  outerError,
}) => {
  const fieldName = useMemo(() => (type === "folder" ? "nameFolder" : "nameItem"), [type]);
  const initialInputs: IFormInputs = {
    [fieldName]: {
      value: name,
      error: "",
      isError: false,
      isSuccess: false,
    },
  };
  const [inputs, setInputs] = useState(initialInputs);
  const prevOuterError = usePrevious(outerError);

  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    const newInputs = updateInputs(inputs, name, "value", value);
    const [updatedInputs] = validateInputs(newInputs, [name]);

    setInputs(updatedInputs);
  };

  const renameFolder = (editedField: string) => {
    if (editedField !== name) {
      onRename(editedField);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (prevOuterError !== outerError && outerError && outerError.length > 0) {
      setInputs((prevInputs) => {
        return {
          [fieldName]: {
            ...prevInputs?.[fieldName],
            error: outerError,
            isError: true,
          },
        };
      });
    }
  }, [prevOuterError, outerError, fieldName]);
  useEffect(() => {
    setInputs({
      [fieldName]: {
        value: name,
        error: "",
        isError: false,
        isSuccess: false,
      },
    });
  }, [name, fieldName]);

  return (
    <CoreModal
      className={style.wrap}
      closeOutClick={true}
      title={`Rename ${type}`}
      onClose={onClose}
      visible={visible}
      footer={<Footer fieldName={fieldName} onClose={onClose} onRename={renameFolder} inputs={inputs} />}
    >
      <div className={style.item}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onRename(inputs.nameItem.value as string);
          }}
        >
          <InputText
            onChange={onTextInputChange}
            value={inputs[fieldName]?.value as string}
            id={1}
            name={fieldName}
            label={`${capitalize(type)} name`}
            tabindex={0}
            isSuccess={inputs[fieldName]?.isSuccess}
            isError={inputs[fieldName]?.isError}
            error={inputs[fieldName]?.error}
          />
        </form>
      </div>
    </CoreModal>
  );
};

export default RenameFileFolderModal;
