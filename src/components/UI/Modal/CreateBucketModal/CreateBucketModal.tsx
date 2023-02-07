import React, { useState } from "react";
import { CoreModal } from "../Modal";
import InputText from "../../Input/Input";
import { FormDataType, updateInputs, validateInputs } from "../../Input/types";
import style from "./createBucketModal.module.scss";
import { INewBucketCreate } from "../../../../containers/BucketsPage/BucketsPage";
import { CreateBucketModalFooter } from "./CreateBucketModalFooter";
import { IGuideRegion } from "actions/interfaces";

interface CreteBucketModalProps {
  visible: boolean;
  onClose: () => void;
  storageClasses: IGuideRegion[];
  regions: IGuideRegion[];
  onSubmit: (bucket: INewBucketCreate) => void;
}

const initialInputs: FormDataType = {
  nameBucket: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false,
  },
};

const CreteBucketModal: React.FC<CreteBucketModalProps> = ({ visible = false, onClose, onSubmit }) => {
  const [inputs, setInputs] = useState<FormDataType>(initialInputs);
  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    const newInputs = updateInputs(inputs, name, "value", value);
    const [updatedInputs] = validateInputs(newInputs, [name]);
    setInputs(updatedInputs);
  };
  const setOuterError = (error: string) => {
    setInputs({
      nameBucket: {
        value: inputs.nameBucket?.value as string,
        error: error,
        isError: true,
        isSuccess: false,
      },
    });
  };
  const onSuccess = () => {
    setInputs(initialInputs);
    onClose();
  };

  const submit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    const [updatedInputs, errors] = validateInputs(inputs, ["nameBucket"]);
    setInputs(updatedInputs);
    if (errors?.length === 0) {
      onSubmit({
        name: inputs.nameBucket.value as string,
        storage: null,
        region: null,
        setOuterError,
        onSuccess,
      });
    }
  };

  return (
    <CoreModal
      className={style.wrap}
      title="Create bucket"
      closeOutClick={true}
      onClose={() => {
        setInputs(initialInputs);
        onClose();
      }}
      visible={visible}
      footer={
        <CreateBucketModalFooter
          submit={submit}
          setInputs={setInputs}
          onClose={onClose}
          initialInputs={initialInputs}
        />
      }
    >
      <div className={style.item}>
        <form onSubmit={submit}>
          <InputText
            onChange={onTextInputChange}
            value={inputs.nameBucket.value as string}
            id={1}
            name="nameBucket"
            label="Bucket name"
            tabindex={0}
            isSuccess={inputs.nameBucket.isSuccess}
            isError={inputs.nameBucket.isError}
            error={inputs.nameBucket.error}
          />
        </form>
      </div>
    </CoreModal>
  );
};

export default CreteBucketModal;
