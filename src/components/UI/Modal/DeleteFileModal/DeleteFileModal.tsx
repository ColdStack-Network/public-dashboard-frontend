import { BucketSelectItem } from "containers/BucketPage/BucketPage";
import { getListFiles, IContentsFile } from "helpers/yandexS3";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFileFolder, deleteFileFolderMultiple } from "Redux/buckets/Actions/bucketsActions";
import { CoreModal } from "../Modal";
import style from "./DeleteFileModal.module.scss";
import { DeleteFileModalFooter } from "./DeleteFileModalFooter";

type DeleteFileModalProps = {
  visible: boolean;
  onClose: () => void;
  items: BucketSelectItem[];
  setModalFileDeleteProcess: (state: boolean) => void;
  onSuccess: () => void;
  nameBucket: string;
  pathFolder: string;
};

const FOLDER_TYPE = "folder";
const FILE_TYPE = "file";

const getListObjects = async (nameBucket: string, pathFolder: string) => {
  const response = await getListFiles({
    nameBucket,
    pathFolder,
    Page: 1,
    PerPage: 100_000_000_000_000_0000,
    allTree: true,
  });
  if (!response) return [] as IContentsFile[];
  return response.ListExtendedObjects.Contents;
};

const checkIsFolder = (name: string) => {
  const lastSlashIndex = name.lastIndexOf("/");
  return !name.substring(lastSlashIndex + 1).length;
};

export const DeleteFileModal: React.FC<DeleteFileModalProps> = ({
  visible = false,
  onClose,
  items,
  setModalFileDeleteProcess,
  onSuccess,
  pathFolder,
  nameBucket,
}) => {
  const [totalFiles, setTotalFiltes] = useState<BucketSelectItem[]>([]);
  const filesCnt = totalFiles.filter((f) => f.type !== FOLDER_TYPE).length;
  const foldersCnt = totalFiles.filter((f) => f.type === FOLDER_TYPE).length;
  const [resolving, setResolving] = useState(false);

  const dispatch = useDispatch();
  const deleteFile = (type: string, name: string) => {
    dispatch(
      deleteFileFolder({
        type: type,
        name: name,
        nameBucket,
        pathFolder,
        onSuccess: () => onSuccess(),
      })
    );
  };
  const deleteFiles = () => {
    dispatch(
      deleteFileFolderMultiple({
        items: totalFiles,
        nameBucket,
        pathFolder: pathFolder,
        onSuccess: () => onSuccess(),
      })
    );
  };
  const handleDelete = () => {
    onClose();
    setModalFileDeleteProcess(true);
    const singleDeleteFile = totalFiles.length === 1 && totalFiles[0].type === FILE_TYPE;
    singleDeleteFile ? deleteFile(totalFiles[0].type!, totalFiles[0].name) : deleteFiles();
  };

  useEffect(() => {
    const getFullFileList = async () => {
      setResolving(true);
      const folders = items.filter((item) => item.type === FOLDER_TYPE);
      const files = items.filter((item) => item.type === FILE_TYPE);
      if (!folders.length) {
        setTotalFiltes(files);
        return setResolving(false);
      }
      const results = await Promise.all(
        folders.map(({ name }) => getListObjects(nameBucket, `${pathFolder ? pathFolder + "/" : ""}${name}`))
      );
      const contens = results.reduce((acc, next) => {
        if (!next.length) return acc;
        const a = next.map((i) => ({
          name: i.Key,
          type: checkIsFolder(i.Key) ? FOLDER_TYPE : FILE_TYPE,
        }));
        return [...acc, ...a];
      }, [] as BucketSelectItem[]);
      setTotalFiltes([...files, ...contens]);
      setResolving(false);
    };
    visible && getFullFileList();
  }, [items, nameBucket, pathFolder, visible]);

  return (
    <CoreModal
      className={style.wrap}
      title="Delete file"
      closeOutClick={true}
      onClose={onClose}
      visible={visible}
      footer={<DeleteFileModalFooter disabled={resolving} onClose={onClose} onSubmit={handleDelete} />}
    >
      <div>
        <div className={style.text}>Are you sure you want to delete next objects?</div>
        <div className={style.objectList}>
          <b>Folders : {resolving ? <span>loading...</span> : foldersCnt}</b>
          <b>Files : {resolving ? <span>loading...</span> : filesCnt}</b>
        </div>
        <div className={style.warning}>This action cannot be undone!</div>
      </div>
    </CoreModal>
  );
};
