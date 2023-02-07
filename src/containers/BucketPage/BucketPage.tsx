import React, { useCallback, useEffect, useMemo, useState } from "react";
import style from "./bucketPage.module.scss";
import { useHistory } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import EmptyList from "../../components/EmptyList/EmptyList";
import SvgEmptyFiles from "../../icons/EmptyFiles";
import Breadcrumbs from "../../components/UI/BreadCrumbs/BreadCrumbs";
import TableBucket, { BucketFolder } from "../../components/Table/TableBucket/TableBucket";
import { useDispatch, useSelector } from "react-redux";
import {
  createFolder,
  downloadFile,
  downloadFileFolderMultiple,
  getFilesList,
  renameFileFolder,
  setFilePagination,
  privacyFile,
  setUpload,
} from "../../Redux/buckets/Actions/bucketsActions";
import SvgUpload from "../../icons/Upload";
import { SvgFileFolder } from "../../icons/FileTypes";
import { CreateFolderModal } from "../../components/UI/Modal/CreateFolderModal/CreateFolderModal";
import RenameFileFolderModal from "../../components/UI/Modal/RenameFileFolderModal/RenameFileFolderModal";
import { capitalize } from "@amcharts/amcharts4/.internal/core/utils/Utils";
import { arrayClone, formBreadcrumbs, isFull, uriEncode, usePrevious } from "../../helpers/common";
import SvgDownload, { SvgDownloadWhite } from "../../icons/Download";
import SvgEdit from "../../icons/Edit";
import SvgTrash from "../../icons/Trash";
import SvgView from "../../icons/View";
import SvgViewHide from "../../icons/ViewHide";
import { DropItem } from "../../components/UI/DropdownVertical/DropdownVertical";
import Pagination from "../../components/UI/Pagination/Pagination";
import { SelectItemPagination } from "../../components/UI/Pagination/SelectPagination/types";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { DeleteFilesProcessModal } from "../../components/UI/Modal/DeleteFilesProcessModal/DeleteFilesProcessModal";
import { selectCurrentBucketFilesList } from "../../Redux/buckets/Selectors/selectCurrentBucketFilesList";
import { selectCurrentBucketPathFolder } from "../../Redux/buckets/Selectors/selectCurrentBucketPathFolder";
import { selectCurrentBucketFoldersList } from "../../Redux/buckets/Selectors/selectCurrentBucketFoldersList";
import { selectCurrentBucketPagination } from "../../Redux/buckets/Selectors/selectCurrentBucketPagination";
import { selectCurrentBucketNameBucket } from "../../Redux/buckets/Selectors/selectCurrentBucketNameBucket";
import { DeleteFileModal } from "components/UI/Modal/DeleteFileModal/DeleteFileModal";

export interface INewFolder {
  nameFolder: string;
  nameBucket: string;
  onSuccess?: any;
  pathFolder?: string;
  setOuterError?: (err: string) => void;
}

export interface INewFile {
  path: string;
  nameBucket: string;
  file: any;
}

export type BucketSelectItem = {
  name: string;
  type?: string;
};

export type BucketListItem = {
  Key: string;
  FileType: string;
  LastModified: string;
  SizeReadable: string;
  StorageClass: string;
  ACL: string;
  linkFolder: string;
};

export type OnCreateFolderCallback = {
  (args: { nameFolder: string; setOuterError?: (err: string) => void }): void;
};

const BucketPage: React.FC<any> = (props: any) => {
  const { pathFolder, nameBucket } = props?.data;
  const typePage = "bucketPage";
  const history = useHistory();
  const dispatch = useDispatch();
  const prevProps = usePrevious(props);
  const [loading, setLoading] = useState(true);
  const [modalFolder, setModalFolder] = useState(false);
  const [modalDelete, setModalDelete] = useState({ open: false, clearCheckBox: false });
  const [modalFileDeleteProcess, setModalFileDeleteProcess] = useState(false);
  const [modalRename, setModalRename] = useState(false);
  const [modalRenameError, setModalRenameError] = useState("");
  const [currentItem, setCurrentItem] = useState<{ item: BucketListItem; type: string } | null>(null);
  const [selectedItems, setSelectedItems] = useState<BucketSelectItem[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const pagination = useSelector(selectCurrentBucketPagination);
  const prevPagination = usePrevious(pagination);
  const currentBucket = useSelector(selectCurrentBucketNameBucket);
  const currentPathFolder = useSelector(selectCurrentBucketPathFolder);
  const filesListStore = useSelector(selectCurrentBucketFilesList);
  const foldersListStore = useSelector(selectCurrentBucketFoldersList);
  const { search } = useLocation();
  const location = useLocation();
  const query = queryString.parse(search);
  const page = useMemo(() => (query.page ? +query.page : 0), [query]);
  const perPage = useMemo(() => (query.perPage ? query.perPage : 0), [query]);

  const onClickPage = (page: number) => {
    dispatch(
      setFilePagination({
        page: page,
      })
    );
  };
  const onSelectPerPage = (elem: SelectItemPagination) => {
    if (Number(pagination?.perPage) !== elem?.id) {
      dispatch(
        setFilePagination({
          perPage: elem?.id,
        })
      );
    }
  };
  const onSelect = (name: string, type: string) => {
    return (event: React.ChangeEvent) => {
      const target = event.target as HTMLInputElement;
      if (target.checked) {
        if (typeof selectedItems.find((elem) => elem?.name === name) === "undefined") {
          const copy = arrayClone(selectedItems);
          copy.push({ name, type });
          setSelectedItems(copy);
        }
      } else {
        const idx = selectedItems.findIndex((elem) => elem?.name === name);
        if (idx > -1) {
          let copy = arrayClone(selectedItems);
          copy.splice(idx, 1);
          setSelectedItems(copy);
        }
      }
    };
  };
  const onSelectAll = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      const all = list.map((item) => {
        return { name: item.Key, type: item?.FileType === "folder" ? "folder" : "file" };
      });
      setSelectedItems(all);
      setAllSelected(true);
    } else {
      setSelectedItems([]);
      setAllSelected(false);
    }
  };
  const onDownloadFile = useCallback(
    (nameFile, type) => {
      dispatch(downloadFile({ nameBucket, pathFolder, nameFile }));
    },
    //eslint-disable-next-line
    [nameBucket, pathFolder, dispatch]
  );

  const onClickRename = (file: BucketListItem, type: string) => {
    //click menu
    return () => {
      setCurrentItem({ item: file, type });
      setModalRename(true);
    };
  };
  const onClickDelete = (file: BucketListItem, type: string) => {
    return () => {
      setSelectedItems([{ name: file.Key, type: file.FileType === "folder" ? "folder" : "file" }]);
      setModalDelete({ open: true, clearCheckBox: true });
    };
  };
  const onClickDeleteMultiple = () => {
    setModalDelete({ open: true, clearCheckBox: false });
  };
  const onClickDownload = (file, type) => {
    //click menu
    return () => {
      if (type !== "folder") {
        setCurrentItem({ item: file, type });
        onDownloadFile(file?.Key, type);
      }
    };
  };
  const onClickDownloadMultiple = () => {
    //click button download upside
    dispatch(
      downloadFileFolderMultiple({
        items: selectedItems,
        nameBucket,
        pathFolder,
        onSuccess: () => {
          setSelectedItems([]);
        },
      })
    );
  };

  const onClickMakePrivacy = (file, type, typePrivacy) => {
    return () => {
      dispatch(
        privacyFile({
          nameBucket,
          pathFolder,
          nameFile: file?.Key,
          typePrivacy,
          typePage,
        })
      );
    };
  };

  const onRename = (name: string) => {
    if (currentItem === null) return false;
    dispatch(
      renameFileFolder({
        nameBucket,
        pathFolder,
        type: currentItem.type,
        name: currentItem.item?.Key,
        newName: name,
        setOuterError: (message: string) => {
          setModalRenameError(message);
        },
        onSuccess: () => {
          setModalRename(false);
          setCurrentItem(null);
        },
      })
    );
  };
  const createFolderFunc = useCallback(() => setModalFolder(true), []);
  const uploadFilesFunc = useCallback(() => {
    dispatch(setUpload({ isModalUpload: true, nameBucket, pathFolder }));
  }, [dispatch, nameBucket, pathFolder]);
  const onCreateFolder = useCallback<OnCreateFolderCallback>(
    ({ nameFolder, setOuterError }) => {
      dispatch(
        createFolder({
          nameBucket,
          pathFolder,
          nameFolder: nameFolder,
          onSuccess: () => {
            setModalFolder(false);
          },
          setOuterError,
        })
      );
    },
    [nameBucket, dispatch, pathFolder]
  );

  const filesList = useMemo(() => {
    return nameBucket === currentBucket && pathFolder === currentPathFolder ? filesListStore : [];
  }, [nameBucket, currentBucket, filesListStore, currentPathFolder, pathFolder]);

  const foldersList = useMemo(() => {
    return nameBucket === currentBucket && pathFolder === currentPathFolder ? foldersListStore : [];
  }, [nameBucket, currentBucket, foldersListStore, currentPathFolder, pathFolder]);

  const generateDropdowns = ({ file, type }: { file: BucketFolder; type: string }) => {
    if (type === "folder") {
      const dropDowns: DropItem[] = [
        {
          icon: <SvgEdit color="light" />,
          text: "Rename",
          isAccent: false,
          onClick: onClickRename(file, type),
          section: 1,
        },
        {
          icon: <SvgTrash color="#CCD2E3" />,
          text: "Delete",
          isAccent: true,
          onClick: onClickDelete(file, type),
          section: 1,
        },
      ];
      return dropDowns;
    }
    const dropDowns: DropItem[] = [
      {
        icon: <SvgDownload />,
        text: "Download",
        isAccent: false,
        onClick: onClickDownload(file, type),
        section: 1,
      },
      {
        icon: <SvgEdit color="light" />,
        text: "Rename",
        isAccent: false,
        onClick: onClickRename(file, type),
        section: 1,
      },
      {
        icon: <SvgTrash color="#CCD2E3" />,
        text: "Delete",
        isAccent: true,
        onClick: onClickDelete(file, type),
        section: 1,
      },
      {
        icon: <SvgView color="common" />,
        text: "Make Public",
        isAccent: false,
        onClick: onClickMakePrivacy(file, type, "public-read"),
        section: 2,
      },
      {
        icon: <SvgViewHide />,
        text: "Make Private",
        isAccent: false,
        onClick: onClickMakePrivacy(file, type, "private"),
        section: 2,
      },
    ];
    return dropDowns;
  };

  const list = useMemo(() => {
    const folders = foldersList
      ? foldersList.map((item) => {
          return {
            Key: item?.Key?.slice(0, -1),
            FileType: "folder",
            LastModified: item.LastModified,
            SizeReadable: item.SizeReadable,
            StorageClass: "",
            ACL: item.ACL,
            linkFolder: `${("/dashboard/buckets/" + nameBucket + ("/" + pathFolder).replaceAll("//", "/")).replaceAll(
              "//",
              "/"
            )}`,
          };
        })
      : [];
    const files = filesList
      ? filesList.map((item) => {
          return {
            ...item,
            linkFolder: `${("/dashboard/buckets/" + nameBucket + ("/" + pathFolder).replaceAll("//", "/")).replaceAll(
              "//",
              "/"
            )}`,
          };
        })
      : [];
    return [...folders, ...files];
  }, [filesList, foldersList, nameBucket, pathFolder]);

  const breadcrumbs = useMemo(() => {
    return formBreadcrumbs({
      initElem: { title: "Buckets", path: "/dashboard/buckets" },
      nameBucket: nameBucket,
      pathFolder,
      file: null,
    });
  }, [pathFolder, nameBucket]);

  useEffect(() => {
    if (JSON.stringify(prevProps?.data) !== JSON.stringify(props?.data)) {
      //fetch if folder or bucket has changed
      setLoading(true);
      const pageToSend = +page > 0 ? +page : 1;
      const perPageToSend = +perPage > 0 ? +perPage : 10;
      dispatch(
        getFilesList({
          pagination: { Page: pageToSend, PerPage: perPageToSend },
          nameBucket: nameBucket,
          pathFolder: pathFolder,
          afterLoad: () => setLoading(false),
        })
      );
    } else {
      if (
        (pagination?.page?.toString() !== page?.toString() ||
          pagination?.perPage?.toString() !== perPage?.toString()) &&
        isFull(pagination)
      ) {
        //pagination from store != url
        const pathname = history?.location?.pathname;
        history.replace(`${uriEncode(pathname, false)}?page=${pagination?.page}&perPage=${pagination?.perPage}`);

        if (
          isFull(prevPagination) &&
          (prevPagination?.page !== Number(pagination?.page) || prevPagination?.perPage !== Number(pagination?.perPage))
        ) {
          //pagination in store has changed
          dispatch(
            getFilesList({
              pagination: { Page: Number(pagination?.page), PerPage: Number(pagination?.perPage) },
              nameBucket: nameBucket,
              pathFolder: pathFolder,
              afterLoad: () => {
                setLoading(false);
              },
            })
          );
        }
      }
    }
  }, [
    prevProps?.data,
    props?.data,
    page,
    perPage,
    dispatch,
    nameBucket,
    pathFolder,
    pagination,
    history,
    prevPagination,
  ]);

  useEffect(() => {
    if (list.length > 0 && list.length === selectedItems.length) {
      return setAllSelected(true);
    }
    setAllSelected(false);
  }, [list, selectedItems, allSelected]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setSelectedItems([]);
    }
  }, [location]);

  return (
    <React.Fragment>
      <div className={style.headerRow}>
        <div className={style.titleRow}>
          <div className={`${style.pageTitleCommon} ${style.pageTitle}`}>{capitalize(nameBucket)}</div>
          <Breadcrumbs
            items={breadcrumbs}
            beforeLink={() => {
              setLoading(true);
            }}
          />
        </div>
        {selectedItems?.length === 0 ? (
          <div className={style.buttonsRow}>
            <div className={style.buttonWrap}>
              <Button color={"secondary"} size={"big"} onClickHandler={createFolderFunc}>
                Create folder
              </Button>
            </div>
            <div className={style.buttonWrap}>
              <Button color={"primary"} size={"big"} onClickHandler={uploadFilesFunc}>
                Upload files
              </Button>
            </div>
            <div className={style.mobileButtonWrap}>
              <Button color={"secondary"} size={"big"} onClickHandler={createFolderFunc}>
                <SvgFileFolder />
              </Button>
            </div>
            <div className={style.mobileButtonWrap}>
              <Button color={"primary"} size={"big"} onClickHandler={uploadFilesFunc}>
                <SvgUpload />
              </Button>
            </div>
          </div>
        ) : (
          <div className={style.buttonsRow}>
            <div className={style.buttonWrap}>
              <Button color={"accent"} size={"big"} onClickHandler={onClickDeleteMultiple}>
                Delete files
              </Button>
            </div>
            <div className={style.buttonWrap}>
              <Button color={"primary"} size={"big"} onClickHandler={onClickDownloadMultiple}>
                Download
              </Button>
            </div>
            <div className={style.mobileButtonWrap}>
              <Button color={"accent"} size={"big"} onClickHandler={onClickDeleteMultiple}>
                <SvgTrash color={"white"} />
              </Button>
            </div>
            <div className={style.mobileButtonWrap}>
              <Button color={"primary"} size={"big"} onClickHandler={onClickDownloadMultiple}>
                <SvgDownloadWhite />
              </Button>
            </div>
          </div>
        )}
      </div>
      {list?.length === 0 && !loading && (
        <EmptyList onClick={uploadFilesFunc} icon={<SvgEmptyFiles />} textButton={"Upload files"}>
          You do not have any uploaded files yet
        </EmptyList>
      )}
      {list?.length > 0 && !loading && (
        <div className={style.content}>
          <TableBucket
            data={list}
            beforeLink={() => setLoading(true)}
            generateDropdowns={generateDropdowns}
            selectedItems={selectedItems}
            onSelect={onSelect}
            onSelectAll={onSelectAll}
            allSelected={allSelected}
          />
        </div>
      )}

      <CreateFolderModal visible={modalFolder} onClose={() => setModalFolder(false)} onCreateFolder={onCreateFolder} />
      <RenameFileFolderModal
        visible={modalRename}
        onClose={() => {
          setModalRename(false);
          setCurrentItem(null);
        }}
        outerError={modalRenameError}
        onRename={onRename}
        name={currentItem?.item?.Key || ""}
        type={currentItem?.type || ""}
      />
      <DeleteFileModal
        items={selectedItems}
        visible={modalDelete?.open}
        onClose={() => {
          if (modalDelete.clearCheckBox) {
            setSelectedItems([]);
          }
          setModalDelete({ open: false, clearCheckBox: false });
        }}
        setModalFileDeleteProcess={setModalFileDeleteProcess}
        onSuccess={() => {
          setModalFileDeleteProcess(false);
          setSelectedItems([]);
        }}
        pathFolder={pathFolder}
        nameBucket={nameBucket}
      />

      {isFull(pagination) && Number(pagination?.pagesCount) > 1 && (
        <Pagination
          hasSelect={true}
          count={Number(pagination?.pagesCount)}
          onClickPage={onClickPage}
          activePage={pagination?.page}
          onSelect={onSelectPerPage}
          dropdowns={[
            { id: 10, name: 10 },
            { id: 25, name: 25 },
            { id: 50, name: 50 },
            { id: 100, name: 100 },
          ]}
          valueDropdown={{ id: Number(pagination?.perPage), name: Number(pagination?.perPage) }}
        />
      )}
      <DeleteFilesProcessModal onClose={() => setModalFileDeleteProcess(false)} visible={modalFileDeleteProcess} />
    </React.Fragment>
  );
};
export default BucketPage;
