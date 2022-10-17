import {useDispatch, useSelector} from "react-redux";
import {TStore} from "../reducers";
import {useCallback, useMemo} from "react";
import {
  clearUploadFiles,
  deleteFileFolder,
  deleteUploadFile, setUpload, setUploadFiles,
  setUploadInfo,
  uploadFiles
} from "../modules/buckets/actions";
import {formatBytes} from "./common";

export default function UseUpload(){
  const dispatch = useDispatch();

  const uploadInfoStore = useSelector((state: TStore) => state.buckets.uploadInfo);
  console.log("uploadInfoStore",uploadInfoStore);
  const upload = useSelector((state: TStore) => state.buckets.upload);
  const {nameBucket, pathFolder, isLoadingFiles, isModalUpload} = upload;
  console.log("isLoadingFiles", isLoadingFiles);
  const onDeleteUploadFile = (item) => {
    const {file, instance, progressValues} = item;
    dispatch(deleteUploadFile(file.filepath))
    if (progressValues?.loaded > 0 && progressValues?.loaded < progressValues?.total) {
      //file is uploading
      instance.abort();
    } else if (progressValues?.loaded === progressValues?.total && typeof progressValues?.loaded !== 'undefined') {
      //file was uploaded
      dispatch(deleteFileFolder({
        type: "file", name: file.filepath, nameBucket, pathFolder,
        onSuccess: () => {
        }
      }))
    } else {
      if (instance){    //file will be upload
        instance.abort();
      }
    }
  }
  const onProgress = (item) => {
    return (progress) => {
      const {filepath} = item;
      console.log("progress",progress);
      dispatch(setUploadInfo({
        filepath,
        info: {
          progress: Math.round((100 * progress.loaded) / progress.total),
          progressValues: {loaded: progress.loaded, total: progress.total}
        }
      }));
    }
  }
  const saveUploadInstance = (item) => {
    return (instance) => {
      const {filepath} = item;
      dispatch(setUploadInfo({filepath, info: {instance}}));
    }
  }
  const onCloseModalUpload = () => {
    dispatch(setUpload({isModalUpload: false}));
    if (!isLoadingFiles) {
      dispatch(clearUploadFiles());
    }
  }
  const onLoadAll = ()=>{
    dispatch(setUpload({isModalUpload: false, isLoadingFiles: false, nameBucket:"", pathFolder: ""}));
    dispatch(clearUploadFiles());
  }
  const size = useMemo(() => {
    const arr= Object.values(uploadInfoStore);
    if (arr?.length > 0) {
      const s = arr.reduce(function (a: any, b: any) {
        return ({file:{ size: a?.file?.size + b?.file?.size}})
      }) as any;
      return formatBytes(s?.file?.size);

    }
    return '0 KB';
  }, [uploadInfoStore]);


  const onUploadFilesToStorage = useCallback(() => {

    dispatch(setUpload({isLoadingFiles: true}))
    dispatch(uploadFiles({
      nameBucket,
      pathFolder,
      onProgress,
      saveUploadInstance,
      onSuccess: onLoadAll
    }))
    //eslint-disable-next-line
  }, [nameBucket, dispatch, pathFolder]);
  const onUploadFiles = (newfiles) => {
    dispatch(setUploadFiles(newfiles))
  }

  const onCancel=()=>{
    if (isLoadingFiles) {
      const files = Object.values(uploadInfoStore);
      for (let i = 0; i < files?.length; i++) {
        onDeleteUploadFile(files[i]);
      }
      dispatch(setUpload({isModalUpload: false, isLoadingFiles: false, nameBucket:"", pathFolder: ""}));
    }else{
      onLoadAll()
    }
  }
  const onClickModalUploadMini=useCallback(()=>{
    dispatch(setUpload({isModalUpload: true}));
  },[dispatch])

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
            onCancel
          },
          uploadMiniProps: {
            onClick: onClickModalUploadMini
          },
          visibleUploadMini: isLoadingFiles && !isModalUpload,
          visibleUpload: isModalUpload,
          isLoadingFiles
        }
}