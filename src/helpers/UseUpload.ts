import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import {
  clearUploadFiles,
  deleteFileFolder,
  deleteUploadFile,
  setUpload,
  setUploadFiles,
  setUploadInfo,
  uploadFiles,
} from "../Redux/buckets/Actions/bucketsActions";
import { formatBytes } from "./common";
import { selectUploadInfo } from "../Redux/buckets/Selectors/selectUploadInfo";
import { selectUpload } from "../Redux/buckets/Selectors/selectUpload";

export function useUpload() {
  const dispatch = useDispatch();
  const uploadInfoStore = useSelector(selectUploadInfo);
  const upload = useSelector(selectUpload);
  const { nameBucket, pathFolder, isLoadingFiles, isModalUpload } = upload;

  const onDeleteUploadFile = (item) => {
    const { file, instance, progressValues } = item;
    dispatch(deleteUploadFile(file.filepath));
    if (progressValues?.loaded > 0 && progressValues?.loaded < progressValues?.total) {
      instance.abort();
    } else if (progressValues?.loaded === progressValues?.total && typeof progressValues?.loaded !== "undefined") {
      dispatch(
        deleteFileFolder({
          type: "file",
          name: file.filepath,
          nameBucket,
          pathFolder,
          onSuccess: () => {},
        })
      );
    } else {
      if (instance) {
        instance.abort();
      }
    }
  };
  const onProgress = (item) => {
    return (progress) => {
      const { filepath } = item;
      dispatch(
        setUploadInfo({
          filepath,
          info: {
            progress: Math.round((100 * progress.loaded) / progress.total),
            progressValues: { loaded: progress.loaded, total: progress.total },
          },
        })
      );
    };
  };
  const saveUploadInstance = (item) => {
    return (instance) => {
      const { filepath } = item;
      dispatch(setUploadInfo({ filepath, info: { instance } }));
    };
  };
  const onCloseModalUpload = () => {
    dispatch(setUpload({ isModalUpload: false }));
    if (!isLoadingFiles) {
      dispatch(clearUploadFiles());
    }
  };
  const onLoadAll = () => {
    dispatch(setUpload({ isModalUpload: false, isLoadingFiles: false, nameBucket: "", pathFolder: "" }));
    dispatch(clearUploadFiles());
  };
  const size = useMemo(() => {
    const arr = Object.values(uploadInfoStore);
    if (arr?.length > 0) {
      const result = arr.reduce((a, b) => {
        return a + Number(b?.file?.size);
      }, 0);
      return formatBytes(result);
    }
    return "0 KB";
  }, [uploadInfoStore]);
  const onUploadFilesToStorage = useCallback(
    (storageClass: string) => {
      dispatch(setUpload({ isLoadingFiles: true }));
      dispatch(
        uploadFiles({
          nameBucket,
          pathFolder,
          onProgress,
          saveUploadInstance,
          storageClass,
          onSuccess: onLoadAll,
        })
      );
    },
    [nameBucket, dispatch, pathFolder]
  );
  const onUploadFiles = (newfiles) => {
    dispatch(setUploadFiles(newfiles));
  };
  const onCancel = () => {
    if (isLoadingFiles) {
      const files = Object.values(uploadInfoStore);
      for (let i = 0; i < files?.length; i++) {
        onDeleteUploadFile(files[i]);
      }
      dispatch(setUpload({ isModalUpload: false, isLoadingFiles: false, nameBucket: "", pathFolder: "" }));
    } else {
      onLoadAll();
    }
  };
  const onClickModalUploadMini = useCallback(() => {
    dispatch(setUpload({ isModalUpload: true }));
  }, [dispatch]);

  return {
    modalUploadProps: {
      visible: isModalUpload,
      onClose: onCloseModalUpload,
      onDeleteUploadFile,
      size,
      uploadInfo: Object.values(uploadInfoStore),
      onUploadFiles,
      onUploadFilesToStorage,
      disabled: isLoadingFiles,
      onCancel,
    },
    uploadMiniProps: {
      onClick: onClickModalUploadMini,
    },
    visibleUploadMini: isLoadingFiles && !isModalUpload,
    visibleUpload: isModalUpload,
    isLoadingFiles,
  };
}
