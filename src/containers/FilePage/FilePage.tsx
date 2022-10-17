import React, {useCallback, useEffect, useMemo, useState} from 'react';
import style from './filepage.module.scss';
import Button from "../../components/UI/Button/Button";
import Breadcrumbs from "../../components/UI/BreadCrumbs/BreadCrumbs";
import {useDispatch, useSelector} from "react-redux";
import {SvgDownloadWhite} from "../../icons/Download";
import SvgTrash from "../../icons/Trash";
import SvgEdit from "../../icons/Edit";
import Checkbox from "../../components/UI/Checkbox/Checkbox";
import SvgCopyIcon from "../../icons/Copy";
import EditMetaModal from "../../components/UI/Modal/EditMetaModal/EditMetaModal";
import {deleteFileFolder, downloadFile, getFileInfo, privacyFile} from "../../modules/buckets/actions";
import {TStore} from "../../reducers";
import {formatAccount, formatDate, formBreadcrumbs, usePrevious, uriEncode} from "../../helpers/common";
import DeleteModal from "../../components/UI/Modal/DeleteModal/DeleteModal";
import {useLocation, useHistory} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {baseUrl, arrayClone} from "../../helpers/common";

interface IProps {
  data: {
    file: string,
    pathFolder: string,
    nameBucket: string
  }
}

const FilePage: React.FC<IProps> = (props: IProps) => {
  const {file, pathFolder, nameBucket} = props?.data;
  const [loading, setLoading] = useState(true);
  const [modalDelete, setModalDelete] = useState(false);
  const [arrayMeta, setArrayMeta] = useState([] as any);
  const [copied, setCopied] = useState("");

  const {pathname} = useLocation();
  const history = useHistory();

  const typePage = 'filePage';

  const dispatch = useDispatch();
  const onDownloadFile = useCallback(() => {
    dispatch(downloadFile({nameBucket, pathFolder, nameFile: file}))
  }, [nameBucket, pathFolder, file, dispatch]);

  const onClickDelete = () => {
    setModalDelete(true);
  }

  const onDeleteFile = () => {
    dispatch(deleteFileFolder({
      type: "file", name: file, nameBucket, pathFolder,
      onSuccess: () => {
        //setModalDelete(false);
        history.push(pathname);
      }
    }))
  }

  const editMeta = useCallback(() => {
    setModalMeta(true)
  }, []);
  const [modalMeta, setModalMeta] = useState(false);
  const prevProps = usePrevious(props);

  useEffect(() => {
    console.log("prevProps", prevProps?.data, "props", props?.data);
    if (JSON.stringify(prevProps?.data) !== JSON.stringify(props?.data)) {
      dispatch(getFileInfo({
        nameBucket: nameBucket,
        nameFile: file,
        pathFolder: pathFolder,
        afterLoad: () => {
          setLoading(false)
        }
      }));
    }

  }, [props?.data, dispatch, file, nameBucket, pathFolder, prevProps?.data]);

  // useEffect(() => {
  //   dispatch(getFileInfo({path: "Screenshot_1.png", nameBucket: nameBucket, afterLoad: ()=>{setLoading(false)}}));
  // }, []);

  const fileData = useSelector((state: TStore) => state?.buckets?.file);

  useEffect(() => {
    if (fileData?.data?.Metadata) {
      let array = Object.entries(fileData?.data?.Metadata)
      let copy = arrayClone(array)
      let idxFileHash;
      let idxStorage;
      let idxLocation;
      let result = [] as any

      copy.forEach((item, index) => {
        if (item[0] === 'file-hash') {
          idxFileHash = index
        }
      })

      copy.forEach((item, index) => {
        if (item[0] === 'storage') {
          idxStorage = index
        }
      })

      copy.forEach((item, index) => {
        if (item[0] === 'location') {
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
      setArrayMeta(result);
    }
  }, [fileData?.data?.Metadata, modalMeta])

  //const filesListStore = useSelector((state: TStore) => state.buckets.currentBucket?.filesList);

  /*data:
    AcceptRanges: "none"
    ContentLength: 26002
    ContentType: "application/octet-stream"
    ETag: "\"cd2bb4adab89d1739ec9ea4593ea2a10\""
    LastModified: Mon Aug 30 2021 15:04:54 GMT+0200 (Восточная Европа, стандартное время) {}
    Metadata: {file-hash: "ee48cc6f39050adcab6bd24ebecd3de92590585e2021ba136164b9ad9182fa66"}
    StorageClass: "STANDARD"

  nameBucket: "newbucket-1"
  pathFolder: ""*/
  const breadcrumbs = useMemo(() => {
    return formBreadcrumbs({
      initElem: {title: "Buckets", path: "/buckets"},
      nameBucket: nameBucket,
      pathFolder,
      file: file
    });
  }, [pathFolder, nameBucket, file]);


  const onClickCheckboxPrivacy = (privacy) => {
    if (privacy === 'public-read') {
      onClickMakePrivacy(fileData?.data, 'file', "private", file)
    }
    if (privacy === 'private') {
      onClickMakePrivacy(fileData?.data, 'file', "public-read", file)
    }
  }

  const onClickMakePrivacy = (file, type, typePrivacy, name) => {
    dispatch(privacyFile({
      nameBucket,
      pathFolder,
      nameFile: name,
      typePrivacy,
      typePage,
    }))
  }

  const apiUrl = baseUrl?.replace("https://", "")
  const fileLink = "https://" + nameBucket + '.' + apiUrl + '/' + (pathFolder ? uriEncode(pathFolder, false) + '/' : '') + uriEncode(file)
  const meta = arrayMeta.map((element) => {
    return <div key={element[1]} className={style.blockContent}>
      <div className={style.blockItemRowFull}>
        <div className={style.blockItemTitle} style={{marginBottom: 0}}>
          {element[0]}:
        </div>
        <div className={style.blockItemText}>
          {decodeURIComponent(element[1])}
        </div>
      </div>
    </div>
  })
  return (
    <React.Fragment>
      <div className={style.headerRow}>
        <div className={style.titleRow}>
          <div className={`${style.pageTitleCommon} ${style.pageTitle}`}>
            {file}
            {/*{decodeURIComponent(file)}*/}
          </div>
          <Breadcrumbs items={breadcrumbs} beforeLink={() => {
            setLoading(true)
          }}/>
        </div>
        <div className={style.buttonsRow}>
          <div className={style.buttonWrap}>
            <Button color={"accent"} size={"big"} onClickHandler={onClickDelete}>Delete file</Button>
          </div>
          <div className={style.buttonWrap}>
            <Button color={"primary"} size={"big"} onClickHandler={onDownloadFile}>Download</Button>
          </div>
          <div className={style.mobileButtonWrap}>
            <Button color={"accent"} size={"big"} onClickHandler={onClickDelete}><SvgTrash color={"white"}/></Button>
          </div>
          <div className={style.mobileButtonWrap}>
            <Button color={"primary"} size={"big"} onClickHandler={onDownloadFile}><SvgDownloadWhite/></Button>
          </div>
        </div>
      </div>

      <EditMetaModal metadata={fileData?.data?.Metadata} data={props?.data} visible={modalMeta} onClose={() => {
        setModalMeta(false)
      }}/>
      <DeleteModal visible={modalDelete} onClose={() => {
        setModalDelete(false)
      }} onSubmit={onDeleteFile}
                   title={"Delete file"}
                   text={`Are you sure you want to delete ${file}`} textBtnDelete={"Delete"}/>

      {/*CacheControl: null
      ContentDisposition: null
      ContentEncoding: null
      ContentLanguage: null
      ContentType: "application/octet-stream"
      ETag: "\"2cbacf748fe84411bb724653271b1fbf\""
      Expires: null
      FileType: "file"
      LastModified: "2021-09-01T14:35:29.023Z"
      Metadata: {file-hash: "995e257d8b2f22b979150fdebaa964416620f880ada32684de571e38110d9065"}
      file-hash: "995e257d8b2f22b979150fdebaa964416620f880ada32684de571e38110d9065"
      Owner: {ID: "0xce481e0cf44f7ee235c0289132bb7bbbde51e714",…}
      DisplayName: "0xce481e0cf44f7ee235c0289132bb7bbbde51e714"
      ID: "0xce481e0cf44f7ee235c0289132bb7bbbde51e714"
      Size: "900"
      SizeReadable: "900 B"
      StorageClass: "STANDARD"
      StorageClassReadable: "Frequent Access"*/}


      <div className={style.content}>
        <div className={style.grid}>
          <div className={style.col1}>
            <div className={style.block}>
              <div className={style.blockHeader}>
                <div className={style.blockTitle}>
                  File Overview
                </div>
              </div>
              <div className={style.blockContent}>
                <div className={style.blockItemRow}>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>
                      File Name
                    </div>
                    <div className={style.blockItemText}>
                      {file}
                    </div>
                  </div>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>
                      File ID
                    </div>
                    <div className={style.blockItemText}>
                      {fileData?.data?.Metadata?.["file-hash"]}
                    </div>
                  </div>
                </div>
                <div className={style.blockItemRow}>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>
                      Owner
                    </div>
                    <div className={style.blockItemText}>
                      {formatAccount(fileData?.data?.Owner?.DisplayName)}
                    </div>
                  </div>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>
                      ETag
                    </div>
                    <div className={style.blockItemText}>
                      {fileData?.data?.ETag}
                    </div>
                  </div>
                </div>
                <div className={style.blockItemRow}>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>
                      Last Modified
                    </div>
                    <div className={style.blockItemText}>
                      {formatDate(fileData?.data?.LastModified)}
                    </div>
                  </div>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>
                      Size
                    </div>
                    <div className={style.blockItemText}>
                      {fileData?.data?.SizeReadable}
                    </div>
                  </div>
                </div>
                {/*<div className={style.blockItemRow}>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>
                      Storage
                    </div>
                    <div className={style.blockItemText}>
                      Filecoin
                    </div>
                  </div>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>
                      Storage Hash
                    </div>
                    <div className={style.blockItemText}>
                      12781102850594914000
                    </div>
                  </div>
                </div>*/}
              </div>
            </div>
          </div>
          <div className={style.col2}>
            <div className={`${style.block} ${style.blockTop}`}>
              <div className={`${style.blockTitleRow} ${style.blockHeader} ${style.blockTitleRowIcon}`}>
                <div className={style.blockTitle}>
                  File Metadata
                </div>
                <div className={style.iconButton} onClick={editMeta}>
                  <SvgEdit color={"dark"}/>
                </div>
              </div>
              <div className={style.blockContent}>
                <div className={style.blockItemRowFull}>
                  <div className={style.blockItemTitle} style={{marginBottom: 0}}>
                    Content Type:
                  </div>
                  <div className={style.blockItemText}>
                    {fileData?.data?.ContentType}
                  </div>
                </div>
              </div>
              {meta}
            </div>
            <div className={style.block}>
              <div className={style.blockContentFileMeta}>
                <div className={style.blockItemRowFull} style={{marginBottom: "5px"}}>
                  <div className={style.blockItemTitle}>
                    Make file public:
                  </div>
                  <div className={style.blockItemText}>
                    <Checkbox
                      onChange={() => onClickCheckboxPrivacy(fileData?.data.ACL)}
                      checked={fileData?.data?.ACL === "public-read"}
                      name={"filepublic"}
                      id={"filepublic"}/>
                  </div>
                </div>
                <div className={style.blockItemRowFull}>
                  <div className={style.blockItemTitle}>
                    Copy file path
                  </div>
                  <div className={`${style.blockItemText} ${style.wrapCopy}`} data-tooltip-text={copied}>
                    <CopyToClipboard text={fileLink} onCopy={()=>{setCopied("Copied!")}}>
                      <div className={style.iconButton}
                           onMouseOut={()=>{
                             setCopied("")
                           }}>
                        <SvgCopyIcon color={"#BAD2FF"}/>
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </React.Fragment>
  )
}
export default FilePage

