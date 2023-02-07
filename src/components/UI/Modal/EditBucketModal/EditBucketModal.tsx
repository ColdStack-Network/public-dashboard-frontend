import React, { useCallback, useEffect, useState } from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import style from "./editBucketModal.module.scss";
import { usePrevious, validateBucketName } from "../../../../helpers/common";

type EditBucketModalProps = {
  visible: boolean;
  initName: string;
  outerError?: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

const EditBucketModalFooter = ({
  onCloseExtended,
  onSubmitFunc,
}: {
  onCloseExtended: () => void;
  onSubmitFunc: (e?: React.SyntheticEvent) => void;
}) => {
  return (
    <div className={style.footer}>
      <div className={style.wrapBtn1}>
        <Button onClickHandler={onCloseExtended} color="additional" size="small">
          Cancel
        </Button>
      </div>
      <Button onClickHandler={onSubmitFunc} color="primary" size="small">
        Save
      </Button>
    </div>
  );
};

export const EditBucketModal: React.FC<EditBucketModalProps> = ({
  visible = false,
  onClose,
  initName,
  onSubmit,
  outerError,
}) => {
  const [name, setName] = useState({
    value: initName,
    isError: false,
    isSuccess: false,
    error: "",
  });
  const prevOuterError = usePrevious(outerError);
  const prevInitName = usePrevious(initName);

  const onCloseExtended = useCallback(() => {
    setName({ value: initName, isError: false, isSuccess: false, error: "" });
    onClose();
  }, [onClose]);
  const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    const error = validateBucketName(value);
    setName({ ...name, value, isError: error?.length > 0, error: error });
  };
  const onSubmitFunc = useCallback(
    (e?: React.SyntheticEvent) => {
      e?.preventDefault();
      const error = validateBucketName(name?.value);
      setName({ ...name, isError: error?.length > 0, error: error });
      if (error?.length === 0) {
        onSubmit(name.value);
      }
    },
    [onSubmit, name]
  );

  useEffect(() => {
    if (prevOuterError !== outerError && outerError && outerError.length > 0) {
      setName((prevName) => ({ ...prevName, isError: true, error: outerError }));
    }
  }, [prevOuterError, outerError]);
  useEffect(() => {
    if (prevInitName !== initName) {
      setName({ value: initName, isError: false, isSuccess: false, error: "" });
    }
  }, [initName, prevInitName]);

  return (
    <CoreModal
      className={style.wrap}
      title="Rename Bucket"
      closeOutClick={true}
      onClose={onCloseExtended}
      visible={visible}
      footer={<EditBucketModalFooter onSubmitFunc={onSubmitFunc} onCloseExtended={onCloseExtended} />}
    >
      <div className={style.item}>
        <form onSubmit={onSubmitFunc}>
          <InputText
            onChange={onChange}
            value={name.value ? name.value : ""}
            id={1}
            name="nameBucket"
            tabindex={0}
            isSuccess={name.isSuccess}
            label="Bucket name"
            isError={name.isError}
            error={name.error}
          />
        </form>
      </div>
    </CoreModal>
  );
};
