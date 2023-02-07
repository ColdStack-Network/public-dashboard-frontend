import React, { useState, useMemo, useEffect } from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import style from "./uploadFileModal.module.scss";
import { DragAndDrop, File } from "../../DragAndDrop/DragAndDrop";
import Checkbox from "../../Checkbox/Checkbox";
import Pagination from "../../Pagination/Pagination";
import Dropdown from "components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { TStore } from "reducers";
import { getStorageClassesInfo } from "../../../../Redux/buckets/Actions/bucketsActions";

type UploadFileModalProps = {
  visible: boolean;
  onClose: () => void;
  onUploadFilesToStorage: (string: string) => void;
  onUploadFiles: (files: File[]) => void;
  size: string;
  disabled: boolean;
  onDeleteUploadFile: (file: { file: File }) => void;
  uploadInfo: { file: File }[];
  onCancel: () => void;
};

const PER_PAGE = 5;
const SKIP_STORAGE_CLASS = "name";

export const UploadFileModal: React.FC<UploadFileModalProps> = ({
  visible = false,
  onClose,
  onUploadFilesToStorage,
  onUploadFiles,
  size,
  disabled,
  onDeleteUploadFile,
  uploadInfo,
  onCancel,
}) => {
  const [page, setPage] = useState(1);
  const [selectedStorageClass, setSelectedStorageClass] = useState<string>();
  const fromto = useMemo(() => ({ from: PER_PAGE * (page - 1), to: PER_PAGE * (page - 1) + PER_PAGE }), [page]);
  const dispatch = useDispatch();
  const storageClasses = useSelector((state: TStore) => state.buckets.storageClassesInfo);
  const isFormDisabled = uploadInfo?.length === 0 || !selectedStorageClass;
  const currentFiles = useMemo(() => uploadInfo.slice(fromto?.from, fromto?.to), [fromto, uploadInfo]);
  const options = useMemo(() => {
    if (!storageClasses.length) return [];
    return Object.keys(storageClasses[0])
      .filter((k) => k !== SKIP_STORAGE_CLASS)
      .map((key) => ({ value: key, label: key }));
  }, [storageClasses]);

  useEffect(() => {
    dispatch(getStorageClassesInfo());
  }, [dispatch]);

  return (
    <CoreModal
      uploadFiles={currentFiles.length}
      disabled={disabled}
      closeOutClick={false}
      title="Upload file"
      className={style.wrapper}
      onClose={() => {
        setPage(1);
        onClose();
      }}
      visible={visible}
    >
      <div>
        <div className={style.container}>
          {!disabled && <DragAndDrop onUploadFiles={onUploadFiles} disabled={disabled} typePage="backet" />}
          <br />
          <Dropdown
            defaultValue={options[0]}
            placeholder="Select storage class"
            items={options}
            onSelect={setSelectedStorageClass}
            disabled={isFormDisabled || disabled}
          />
          <div className={style.checkrow}>
            <Checkbox
              checked={true}
              name="alStorage"
              id="al"
              label="AI storage selection"
              isGray={true}
              disabled={true}
              onChange={() => {}}
            />
            <div className={style.textSize}> Total upload size:</div> <div className={style.size}>{size}</div>
          </div>
          <div className={style.buttonsRow}>
            <div className={style.wrapBtn1}>
              <Button onClickHandler={onCancel} color="additional">
                Cancel
              </Button>
            </div>
            <div className={style.wrapBtn2}>
              <Button
                onClickHandler={!isFormDisabled ? () => onUploadFilesToStorage(selectedStorageClass) : () => {}}
                color={isFormDisabled || disabled ? "additional" : "primary"}
                isDisabled={isFormDisabled || disabled}
              >
                Upload files
              </Button>
            </div>
          </div>
          {!isFormDisabled && (
            <div className={style.filesList}>
              {currentFiles?.map((file) => (
                <File
                  key={file?.file?.name}
                  object={file}
                  noProgress={false}
                  onDelete={() => onDeleteUploadFile(file)}
                />
              ))}
            </div>
          )}
          {Math.ceil(uploadInfo?.length / PER_PAGE) > 1 && (
            <Pagination
              hasSelect={false}
              activePage={page}
              count={Math.ceil(uploadInfo?.length / PER_PAGE)}
              onSelect={() => false}
              onClickPage={(num) => setPage(num)}
            />
          )}
        </div>
      </div>
    </CoreModal>
  );
};
