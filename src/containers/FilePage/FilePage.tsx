import React, { useCallback, useEffect, useMemo, useState } from "react";
import style from "./filepage.module.scss";
import Button from "../../components/UI/Button/Button";
import Breadcrumbs from "../../components/UI/BreadCrumbs/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { SvgDownloadWhite } from "icons/Download";
import SvgTrash from "../../icons/Trash";
import SvgEdit from "../../icons/Edit";
import Checkbox from "../../components/UI/Checkbox/Checkbox";
import SvgCopyIcon from "../../icons/Copy";
import { EditMetaModal } from "../../components/UI/Modal/EditMetaModal/EditMetaModal";
import { deleteFileFolder, downloadFile, getFileInfo, privacyFile } from "Redux/buckets/Actions/bucketsActions";
import { formatAccount, formatDate, formBreadcrumbs, usePrevious, uriEncode } from "helpers/common";
import { DeleteModal } from "../../components/UI/Modal/DeleteModal/DeleteModal";
import { useLocation, useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { baseUrl, arrayClone } from "helpers/common";
import { selectBucketsFile } from "Redux/buckets/Selectors/selectBucketsFile";
import clsx from "clsx";

interface IProps {
  data: {
    file: string;
    pathFolder: string;
    nameBucket: string;
  };
}

const PAGE_TYPE = "filePage";

const FilePage: React.FC<IProps> = (props) => {
  const { file, pathFolder, nameBucket } = props?.data;
  const fileData = useSelector(selectBucketsFile);
  const [loading, setLoading] = useState(true);
  const [modalDelete, setModalDelete] = useState(false);
  const [arrayMeta, setArrayMeta] = useState([] as any);
  const [copied, setCopied] = useState("");
  const { pathname } = useLocation();
  const history = useHistory();
  const [modalMeta, setModalMeta] = useState(false);
  const prevProps = usePrevious(props);
  const breadcrumbs = useMemo(() => {
    return formBreadcrumbs({
      initElem: { title: "Buckets", path: "/dashboard/buckets" },
      nameBucket: nameBucket,
      pathFolder,
      file: file,
    });
  }, [pathFolder, nameBucket, file]);
  const apiUrl = baseUrl?.replace("https://", "");
  const fileLink =
    "https://" +
    nameBucket +
    "." +
    apiUrl +
    "/" +
    (pathFolder ? uriEncode(pathFolder, false) + "/" : "") +
    uriEncode(file);

  const dispatch = useDispatch();
  const onDownloadFile = useCallback(() => {
    dispatch(downloadFile({ nameBucket, pathFolder, nameFile: file }));
  }, [nameBucket, pathFolder, file, dispatch]);

  const onClickDelete = () => {
    setModalDelete(true);
  };
  const onDeleteFile = () => {
    dispatch(
      deleteFileFolder({
        type: "file",
        name: file,
        nameBucket,
        pathFolder,
        onSuccess: () => history.push(pathname),
      })
    );
  };
  const editMeta = useCallback(() => {
    setModalMeta(true);
  }, []);
  const onClickCheckboxPrivacy = (privacy) => {
    if (privacy === "public-read") {
      onClickMakePrivacy(fileData?.data, "file", "private", file);
    }
    if (privacy === "private") {
      onClickMakePrivacy(fileData?.data, "file", "public-read", file);
    }
  };
  const onClickMakePrivacy = (file, type, typePrivacy, name) => {
    dispatch(
      privacyFile({
        nameBucket,
        pathFolder,
        nameFile: name,
        typePrivacy,
        typePage: PAGE_TYPE,
      })
    );
  };

  const meta = arrayMeta.map((element) => {
    return (
      <div key={element[1]} className={style.blockContent}>
        <div className={style.blockItemRowFull}>
          <div className={style.blockItemTitle} style={{ marginBottom: 0 }}>
            {element[0]}:
          </div>
          <div className={style.blockItemText}>{decodeURIComponent(element[1])}</div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (JSON.stringify(prevProps?.data) !== JSON.stringify(props?.data)) {
      dispatch(
        getFileInfo({
          nameBucket: nameBucket,
          nameFile: file,
          pathFolder: pathFolder,
          afterLoad: () => {
            setLoading(false);
          },
        })
      );
    }
  }, [props?.data, dispatch, file, nameBucket, pathFolder, prevProps?.data]);
  useEffect(() => {
    if (fileData?.data?.Metadata) {
      let array = Object.entries(fileData?.data?.Metadata);
      let copy = arrayClone(array);
      let idxFileHash;
      let idxStorage;
      let idxLocation;
      let result = [] as any;

      copy.forEach((item, index) => {
        if (item[0] === "file-hash") {
          idxFileHash = index;
        }
      });

      copy.forEach((item, index) => {
        if (item[0] === "storage") {
          idxStorage = index;
        }
      });

      copy.forEach((item, index) => {
        if (item[0] === "location") {
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
      setArrayMeta(result);
    }
  }, [fileData?.data?.Metadata, modalMeta]);

  return (
    <React.Fragment>
      <div className={style.headerRow}>
        <div className={style.titleRow}>
          <div className={clsx(style.pageTitleCommon, style.pageTitle)}>{file}</div>
          <Breadcrumbs items={breadcrumbs} beforeLink={() => setLoading(true)} />
        </div>
        <div className={style.buttonsRow}>
          <div className={style.buttonWrap}>
            <Button color="accent" size="big" onClickHandler={onClickDelete}>
              Delete file
            </Button>
          </div>
          <div className={style.buttonWrap}>
            <Button color="primary" size="big" onClickHandler={onDownloadFile}>
              Download
            </Button>
          </div>
          <div className={style.mobileButtonWrap}>
            <Button color="accent" size="big" onClickHandler={onClickDelete}>
              <SvgTrash color="white" />
            </Button>
          </div>
          <div className={style.mobileButtonWrap}>
            <Button color="primary" size="big" onClickHandler={onDownloadFile}>
              <SvgDownloadWhite />
            </Button>
          </div>
        </div>
      </div>

      <EditMetaModal
        metadata={fileData?.data?.Metadata}
        data={props?.data}
        visible={modalMeta}
        onClose={() => setModalMeta(false)}
      />
      <DeleteModal
        visible={modalDelete}
        onClose={() => setModalDelete(false)}
        onSubmit={onDeleteFile}
        title="Delete file"
        text={`Are you sure you want to delete ${file}?`}
        textBtnDelete="Delete"
      />

      <div className={style.content}>
        <div className={style.grid}>
          <div className={style.col1}>
            <div className={style.block}>
              <div className={style.blockHeader}>
                <div className={style.blockTitle}>File Overview</div>
              </div>
              <div className={style.blockContent}>
                <div className={style.blockItemRow}>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>File Name</div>
                    <div className={style.blockItemText}>{file}</div>
                  </div>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>File ID</div>
                    <div className={style.blockItemText}>{fileData?.data?.Metadata?.["file-hash"]}</div>
                  </div>
                </div>
                <div className={style.blockItemRow}>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>Owner</div>
                    <div className={style.blockItemText}>{formatAccount(fileData?.data?.Owner?.DisplayName)}</div>
                  </div>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>ETag</div>
                    <div className={style.blockItemText}>{fileData?.data?.ETag}</div>
                  </div>
                </div>
                <div className={style.blockItemRow}>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>Last Modified</div>
                    <div className={style.blockItemText}>{formatDate(fileData?.data?.LastModified)}</div>
                  </div>
                  <div className={style.blockItem}>
                    <div className={style.blockItemTitle}>Size</div>
                    <div className={style.blockItemText}>{fileData?.data?.SizeReadable}</div>
                  </div>
                </div>
                {fileData?.data?.VersionId && (
                  <div className={style.blockItemRow}>
                    <div className={style.blockItem}>
                      <div className={style.blockItemTitle}>File Version</div>
                      <div className={style.blockItemText}>{fileData?.data?.VersionId}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={style.col2}>
            <div className={clsx(style.block, style.blockTop)}>
              <div className={clsx(style.blockTitleRow, style.blockHeader, style.blockTitleRowIcon)}>
                <div className={style.blockTitle}>File Metadata</div>
                <div className={style.iconButton} onClick={editMeta}>
                  <SvgEdit color={"dark"} />
                </div>
              </div>
              <div className={style.blockContent}>
                <div className={style.blockItemRowFull}>
                  <div className={style.blockItemTitle} style={{ marginBottom: 0 }}>
                    Content-Type:
                  </div>
                  <div className={style.blockItemText}>{fileData?.data?.ContentType}</div>
                </div>
              </div>
              {meta}
            </div>
            <div className={style.block}>
              <div className={style.blockContentFileMeta}>
                <div className={style.blockItemRowFull} style={{ marginBottom: "5px" }}>
                  <div className={style.blockItemTitle}>Make file public:</div>
                  <div className={style.blockItemText}>
                    <Checkbox
                      onChange={() => onClickCheckboxPrivacy(fileData?.data.ACL)}
                      checked={fileData?.data?.ACL === "public-read"}
                      name="filepublic"
                      id="filepublic"
                    />
                  </div>
                </div>
                <div className={style.blockItemRowFull}>
                  <div className={style.blockItemTitle}>Copy file path</div>
                  <div className={clsx(style.blockItemText, style.wrapCopy)} data-tooltip-text={copied}>
                    <CopyToClipboard text={fileLink} onCopy={() => setCopied("Copied!")}>
                      <div className={style.iconButton} onMouseOut={() => setCopied("")}>
                        <SvgCopyIcon color="#BAD2FF" />
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
  );
};
export default FilePage;
