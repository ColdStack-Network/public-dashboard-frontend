import React, {useCallback, useEffect, useMemo, useState} from 'react';
import style from './bucketPage.module.scss';
import {useHistory} from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import EmptyList from "../../components/EmptyList/EmptyList";
import SvgEmptyFiles from "../../icons/EmptyFiles";
import Breadcrumbs from "../../components/UI/BreadCrumbs/BreadCrumbs";
import TableBucket from "../../components/Table/TableBucket/TableBucket";
import {useDispatch, useSelector} from "react-redux";
import {
  createFolder,
  deleteFileFolder, deleteFileFolderMultiple, downloadFile, downloadFileFolderMultiple,
  getFilesList,
  renameFileFolder, setFilePagination,
  privacyFile, setUpload,
} from "../../modules/buckets/actions";
import {TStore} from "../../reducers";
import SvgUpload from "../../icons/Upload";
import {SvgFileFolder} from "../../icons/FileTypes";
import CreateFolderModal from "../../components/UI/Modal/CreateFolderModal/CreateFolderModal";
import RenameFileFolderModal from "../../components/UI/Modal/RenameFileFolderModal/RenameFileFolderModal";
import {capitalize} from "@amcharts/amcharts4/.internal/core/utils/Utils";
import {arrayClone, formBreadcrumbs, isFull, uriEncode, usePrevious} from "../../helpers/common";
import SvgDownload, {SvgDownloadWhite} from "../../icons/Download";
import SvgEdit from "../../icons/Edit";
import SvgTrash from "../../icons/Trash";
import SvgView from "../../icons/View";
import SvgViewHide from "../../icons/ViewHide";
import {dropItem} from "../../components/UI/DropdownVertical/DropdownVertical";
import DeleteModal from "../../components/UI/Modal/DeleteModal/DeleteModal";
import Pagination from "../../components/UI/Pagination/Pagination";
import {SelectItemPagination} from "../../components/UI/Pagination/SelectPagination/types";
import queryString from "query-string";
import {useLocation} from 'react-router-dom';
import DeleteFilesProcessModal from '../../components/UI/Modal/DeleteFilesProcessModal/DeleteFilesProcessModal';


export interface INewFolder {
  nameFolder: string,
  nameBucket: string,
  onSuccess?: any,
  pathFolder?: any,
  setOuterError?: (err: string)=>void
}

export interface INewFile {
  path: string,
  nameBucket: string,
  file: any
}

const BucketPage: React.FC<any> = (props: any) => {
  const {pathFolder, nameBucket} = props?.data;
  const typePage = 'bucketPage';
  const history = useHistory();
  // console.log("props?.data BucketPage", props?.data);
  const dispatch = useDispatch();
  const prevProps = usePrevious(props);
  const [loading, setLoading] = useState(true);
  const [modalFolder, setModalFolder] = useState(false);
  const [modalDelete, setModalDelete] = useState({open: false, isMultiple: false});
  const [modalFileDeleteProcess, setModalFileDeleteProcess] = useState(false);
  const [modalRename, setModalRename] = useState(false);
  const [modalRenameError, setModalRenameError] = useState("");
  const [currentItem, setCurrentItem] = useState({} as any); // {item, type: 'folder' || 'file'}
  const [selectedItems, setSelectedItems] = useState([] as any); // {name: "", type: 'folder' || 'file'}
  const [allSelected, setAllSelected] = useState(false);

  const pagination = useSelector((store: TStore) => {
    return store.buckets.currentBucket?.pagination
  });
  const prevPagination = usePrevious(pagination);
  const currentBucket = useSelector((store: TStore) => {
    return store.buckets.currentBucket?.nameBucket
  });
  const currentPathFolder = useSelector((state: TStore) => state.buckets.currentBucket?.pathFolder);
  const filesListStore = useSelector((state: TStore) => state.buckets.currentBucket?.filesList);
  const foldersListStore = useSelector((state: TStore) => state.buckets.currentBucket?.foldersList);
  const uploadInfoStore = useSelector((state: TStore) => state.buckets.uploadInfo);
  const uploadInfoTotal = useSelector((state: TStore) => state.buckets.uploadInfoTotal);

  console.log("uploadInfoStore", uploadInfoStore, "uploadInfoTotal", uploadInfoTotal);

  const {search} = useLocation()
  const query = queryString.parse(search);
  //console.log("query", query, "window.location", window.location);

  const page = useMemo(() => {
    if (query?.page) {
      return +query.page
    } else {
      return 0
    }
  }, [query]);
  const perPage = useMemo(() => {
    if (query?.perPage) {
      return +query.perPage
    } else {
      return 0
    }
  }, [query]);

  useEffect(() => {
      if (JSON.stringify(prevProps?.data) !== JSON.stringify(props?.data)) { //fetch if folder or bucket has changed
        console.log("here prevProps?.data", prevProps?.data, "props?.data", props?.data );
        setLoading(true);
        const pageToSend = +page > 0 ? +page : 1;
        const perPageToSend = +perPage > 0 ? +perPage : 10;
        // alert("0");
        dispatch(getFilesList({
          pagination: {Page: pageToSend, PerPage: perPageToSend},
          nameBucket: nameBucket,
          pathFolder: pathFolder,
          afterLoad: () => {
            setLoading(false);
            /* const {Page, PerPage} = params
             if (Page !== page || PerPage !== perPage){
               const {pathname, search} = history.location;
               history.replaceState({pathname, search: {...search, page: Page, perPage: PerPage}})
             }*/
          }
        }));
      } else {
        if ((pagination?.page?.toString() !== page?.toString() || pagination?.perPage?.toString() !== perPage?.toString()) && (isFull(pagination))) { //pagination from store != url
          console.log("pagination123", pagination, "page", page, "perPage", perPage);
          const pathname = history?.location?.pathname;
          //alert("1");
          history.replace(`${uriEncode(pathname, false)}?page=${pagination?.page}&perPage=${pagination?.perPage}`);

          if (isFull(prevPagination) && (prevPagination?.page !== pagination.page || prevPagination?.perPage !== pagination.perPage)) {  //pagination in store has changed
            dispatch(getFilesList({
              pagination: {Page: pagination?.page, PerPage: pagination?.perPage},
              nameBucket: nameBucket,
              pathFolder: pathFolder,
              afterLoad: () => {
                setLoading(false)
              }
            }));
          }


        }
      }
    }, [prevProps?.data, props?.data, page, perPage, dispatch, nameBucket, pathFolder, pagination, history, prevPagination]
  );

  useEffect(() => { //fetch if store pagination has changed
    /* if ((pagination?.page?.toString() !== page?.toString() || pagination?.perPage?.toString() !== perPage?.toString()) && (isFull(pagination))) { //pagination from store != url
       const pathname = history?.location?.pathname;
       alert("1");
       dispatch(getFilesList({
         pagination: {Page: pagination?.page, PerPage: pagination?.perPage},
         nameBucket: nameBucket,
         pathFolder: pathFolder,
         afterLoad: (params) => {setLoading(false)}
       }));
       history.replace(`${pathname}?page=${pagination?.page}&perPage=${pagination?.perPage}`);

     }*/
  }, [pagination, page, perPage, history, dispatch, nameBucket, pathFolder]);

  const onClickPage = (page: number) => {
    dispatch(setFilePagination({
      page: page
    }));
    // history.push(`${pathname}?page=${page}&perPage=${pagination?.perPage}`);
  }
  const onSelectPerPage = (elem: SelectItemPagination) => {
    //console.log("onSelectPerPage", "+pagination?.perPage", +pagination?.perPage, "elem?.id", elem?.id, +pagination?.perPage !== elem?.id );
    if (+pagination?.perPage !== elem?.id) {
      //alert("2.1");
      dispatch(setFilePagination({
        perPage: elem?.id
      }));
    }
  }

  useEffect(() => {
      if ((!isFull(selectedItems) && allSelected) || list?.length > selectedItems?.length) {
        setAllSelected(false)
      }
    },
    // eslint-disable-next-line
    [selectedItems])

  const onSelect = (name, type) => {
    return (select) => {
      //console.log("onSelect", name, select, type);
      if (select?.target?.checked) {
        if (typeof selectedItems.find(elem => elem?.name === name) === "undefined") {
          //console.log("SELECT",name);
          const copy = arrayClone(selectedItems);
          copy.push({name, type});
          setSelectedItems(copy)
        }
      } else {
        const idx = selectedItems.findIndex(elem => elem?.name === name);
        //console.log("idx",idx);
        if (idx > -1) {
          let copy = arrayClone(selectedItems);
          copy.splice(idx, 1);
          setSelectedItems(copy)
        }
      }
    }
  }
  const onSelectAll = (select) => {
    if (select?.target?.checked) {
      const all = list.map((item) => {
        return {name: item.Key, type: item?.FileType === "folder" ? "folder" : "file"}
      })
      setSelectedItems(all);
      setAllSelected(true);

    } else {
      setSelectedItems([]);
      setAllSelected(false);
    }
  }
  const onDownloadFile = useCallback((nameFile, type) => {
      //console.log("onDownloadFile nameFile", nameFile);
      dispatch(downloadFile({nameBucket, pathFolder, nameFile}))
    },
    //eslint-disable-next-line
    [nameBucket, pathFolder, dispatch])


  const onClickRename = (file, type) => { //click menu
    return () => {
      setCurrentItem({item: file, type});
      setModalRename(true);
    }
  }
  const onClickDelete = (file, type) => {
    return () => {
      //console.log("delete!!!!");
      setCurrentItem({item: file, type});
      setModalDelete({open: true, isMultiple: false});
    }
  }
  const onClickDeleteMultiple = () => {
    //console.log("delete multiple!!!!");
    setModalDelete({open: true, isMultiple: true});
  }
  const onClickDownload = (file, type) => { //click menu
    //console.log("file, type", file, type);
    return () => {
      if (type !== "folder") {
        setCurrentItem({item: file, type});
        onDownloadFile(file?.Key, type);
      }
    }
  }
  const onClickDownloadMultiple = () => { //click button download upside
    dispatch(downloadFileFolderMultiple({
      items: selectedItems,
      nameBucket,
      pathFolder,
      onSuccess: () => {
        setSelectedItems([]);
      }
    }))
  }

  const onClickMakePrivacy = (file, type, typePrivacy) => {
    /*console.log("onClickMakePrivacy", 'file', file, 'type', type, "typePrivacy", typePrivacy)*/
    return () => {
      dispatch(privacyFile({
        nameBucket,
        pathFolder,
        nameFile: file?.Key,
        typePrivacy,
        typePage,
      }))
    }
  }


  const onRename = (name) => { //click rename button in modal

    dispatch(renameFileFolder({
      nameBucket,
      pathFolder,
      type: currentItem.type,
      name: currentItem?.item?.Key,
      newName: name,
      setOuterError: (message)=>{setModalRenameError(message)},
      onSuccess: () => {
        setModalRename(false);
        setCurrentItem({})
      }
    }))
  }
  const onDeleteFile = () => {
    dispatch(deleteFileFolder({
      type: currentItem?.type, name: currentItem?.item?.Key, nameBucket, pathFolder,
      onSuccess: () => {
        setModalDelete({open: false, isMultiple: false});
      }
    }))
  }
  const onDeleteMultipleFiles = () => {
    setModalDelete({open: false, isMultiple: false});
    setModalFileDeleteProcess(true);
    dispatch(deleteFileFolderMultiple({
      items: selectedItems, nameBucket, pathFolder,
      onSuccess: () => {
        setModalFileDeleteProcess(false);
        setSelectedItems([]);
      }
    }));
  }


  const createFolderFunc = useCallback(() => {
    setModalFolder(true)
  }, []);
  const uploadFilesFunc = useCallback(() => {
    dispatch(setUpload({isModalUpload: true, nameBucket, pathFolder}))
  }, [dispatch, nameBucket, pathFolder]);
  const onCreateFolder = useCallback(({nameFolder, setOuterError}) => {
    dispatch(createFolder({
      nameBucket, pathFolder, nameFolder: nameFolder, onSuccess: () => {
        setModalFolder(false)
      }, setOuterError
    }))
  }, [nameBucket, dispatch, pathFolder]);


  const filesList = useMemo(() => {
    return (nameBucket === currentBucket && pathFolder === currentPathFolder) ? filesListStore : [];
  }, [nameBucket, currentBucket, filesListStore, currentPathFolder, pathFolder])

  const foldersList = useMemo(() => {
    return (nameBucket === currentBucket && pathFolder === currentPathFolder) ? foldersListStore : [];
  }, [nameBucket, currentBucket, foldersListStore, currentPathFolder, pathFolder]);


  const generateDropdowns = ({file, type}) => {
    if (type === "folder") {
      return [
        {
          icon: <SvgEdit color={"light"}/>,
          text: "Rename",
          isAccent: false,
          onClick: onClickRename(file, type),
          section: 1
        },
        {
          icon: <SvgTrash color={"#CCD2E3"}/>,
          text: "Delete",
          isAccent: true,
          onClick: onClickDelete(file, type),
          section: 1
        },
        /* {
           icon: <SvgView color="common"/>,
           text: "Make Public",
           isAccent: false,
           onClick: ()=> {},
           section: 2
         },
         {
           icon: <SvgViewHide/>,
           text: "Make Private",
           isAccent: false,
           onClick: ()=> {},
           section: 2
         }*/
      ] as dropItem[];
    } else {
      return [
        {
          icon: <SvgDownload/>,
          text: "Download",
          isAccent: false,
          onClick: onClickDownload(file, type),
          section: 1
        },
        {
          icon: <SvgEdit color={"light"}/>,
          text: "Rename",
          isAccent: false,
          onClick: onClickRename(file, type),
          section: 1
        },
        {
          icon: <SvgTrash color={"#CCD2E3"}/>,
          text: "Delete",
          isAccent: true,
          onClick: onClickDelete(file, type),
          section: 1
        },
        {
          icon: <SvgView color="common"/>,
          text: "Make Public",
          isAccent: false,
          onClick: onClickMakePrivacy(file, type, "public-read"),
          section: 2
        },
        {
          icon: <SvgViewHide/>,
          text: "Make Private",
          isAccent: false,
          onClick: onClickMakePrivacy(file, type, "private"),
          section: 2
        }
      ] as dropItem[]
    }

  }

  const list = useMemo(() => {
    /* CommonPrefixes: Array(6)
     0:
     Prefix: "HappyFolder2%21%21%21%20%3F%20%60/"
     __proto__: Object
     1:
     Prefix: "HappyFolder2%21%21%21/"
     __proto__: Object
     2: {Prefix: "HappyFolder2/"}
     3: {Prefix: "happyfolder/"}
     4: {Prefix: "new%20folder/"}
     5: {Prefix: "newfolder/"}
     length: 6
     __proto__: Array(0)
     Contents: Array(2)
     0:
     ACL: "private"
     ContentType: "application/octet-stream"
     ETag: "\"cd2bb4adab89d1739ec9ea4593ea2a10\""
     Key: "docotr.jpeg"
     LastModified: "2021-08-30T13:04:54.108Z"
     Size: "26002"
     StorageClass: "STANDARD"*/
    const folders = foldersList ? foldersList.map((item) => {
      //console.log("folders map pathFolder", pathFolder)
      return {
        Key: item?.Key?.slice(0, -1),
        FileType: "folder",
        LastModified: item.LastModified,
        SizeReadable: item.SizeReadable,
        StorageClass: "",
        ACL: item.ACL,
        linkFolder: `/buckets/${nameBucket}${pathFolder ? "/" : ""}${pathFolder}`,
      }
    }) : [];
    const files = filesList ? filesList.map((item) => {
      return {
        ...item,
        linkFolder: `/buckets/${nameBucket}${pathFolder ? "/" : ""}${pathFolder}`,
      }
    }) : [];
    return [...folders, ...files]
  }, [filesList, foldersList, nameBucket, pathFolder])


  const breadcrumbs = useMemo(() => {
    return formBreadcrumbs({
      initElem: {title: "Buckets", path: "/buckets"},
      nameBucket: nameBucket,
      pathFolder,
      file: null
    });
  }, [pathFolder, nameBucket]);
  const textDelete = selectedItems?.length > 1 && modalDelete?.isMultiple ? `Are you sure you want to delete ${selectedItems?.length} files?` : `Are you sure you want to delete ${currentItem?.item?.Key}?`;
  return (
    <React.Fragment>
      <div className={style.headerRow}>
        <div className={style.titleRow}>
          <div className={`${style.pageTitleCommon} ${style.pageTitle}`}>
            {capitalize(nameBucket)}
          </div>
          <Breadcrumbs items={breadcrumbs} beforeLink={() => {
            setLoading(true)
          }}/>
        </div>
        {selectedItems?.length <= 1 ?
          <div className={style.buttonsRow}>
            <div className={style.buttonWrap}>
              <Button color={"secondary"} size={"big"} onClickHandler={createFolderFunc}>Create folder</Button>
            </div>
            <div className={style.buttonWrap}>
              <Button color={"primary"} size={"big"} onClickHandler={uploadFilesFunc}>Upload files</Button>
            </div>
            <div className={style.mobileButtonWrap}>
              <Button color={"secondary"} size={"big"} onClickHandler={createFolderFunc}><SvgFileFolder/></Button>
            </div>
            <div className={style.mobileButtonWrap}>
              <Button color={"primary"} size={"big"} onClickHandler={uploadFilesFunc}><SvgUpload/></Button>
            </div>
          </div> :
          <div className={style.buttonsRow}>
            <div className={style.buttonWrap}>
              <Button color={"accent"} size={"big"} onClickHandler={onClickDeleteMultiple}>Delete files</Button>
            </div>
            <div className={style.buttonWrap}>
              <Button color={"primary"} size={"big"} onClickHandler={onClickDownloadMultiple}>Download</Button>
            </div>
            <div className={style.mobileButtonWrap}>
              <Button color={"accent"} size={"big"} onClickHandler={onClickDeleteMultiple}><SvgTrash
                color={"white"}/></Button>
            </div>
            <div className={style.mobileButtonWrap}>
              <Button color={"primary"} size={"big"} onClickHandler={onClickDownloadMultiple}><SvgDownloadWhite/>
              </Button>
            </div>
          </div>
        }
      </div>
      {list?.length === 0 && !loading &&
      <EmptyList onClick={uploadFilesFunc} icon={<SvgEmptyFiles/>} textButton={"Upload files"}>
        You do not have any uploaded files yet
      </EmptyList>}
      {list?.length > 0 && !loading && <div className={style.content}>
        <TableBucket
          data={list}
          beforeLink={() => {setLoading(true)}}
          generateDropdowns={generateDropdowns}
          selectedItems={selectedItems}
          onSelect={onSelect}
          onSelectAll={onSelectAll} allSelected={allSelected}/>
      </div>}

      <CreateFolderModal visible={modalFolder} onClose={() => {
        setModalFolder(false)
      }} onCreateFolder={onCreateFolder}/>
      <RenameFileFolderModal visible={modalRename}
                             onClose={() => {
                               setModalRename(false);
                               setCurrentItem({})
                             }}
                             outerError={modalRenameError}
                             onRename={onRename}
                             // name={currentItem?.item?.Key}
                             name={currentItem?.item?.Key}
                             type={currentItem?.type}
      />
      <DeleteModal visible={modalDelete?.open} onClose={() => {
        setModalDelete({open: false, isMultiple: false})
      }} onSubmit={modalDelete?.isMultiple ? onDeleteMultipleFiles : onDeleteFile}
                   title={`${selectedItems?.length > 1 ? "Delete files" : "Delete file"}`}
                   text={textDelete} textBtnDelete={"Delete"}/>


      {/* <Pagination count={10} dropdowns={[{id: 10, name: 10}, {id: 25, name: 25}, {id: 50, name: 50}, {id: 100, name: 100}]} onSelect={(option)=>{}} hasSelect={true}/>*/}
      {isFull(pagination) && pagination?.pagesCount > 1 && <Pagination hasSelect={true}
                                         count={pagination?.pagesCount}
                                         onClickPage={onClickPage}
                                         activePage={pagination?.page}
                                         onSelect={onSelectPerPage}
                                         dropdowns={[{id: 10, name: 10}, {id: 25, name: 25}, {id: 50, name: 50}, {id: 100, name: 100}]}
                                         valueDropdown={{id: pagination?.perPage, name: pagination?.perPage}}
      />
      }
      <DeleteFilesProcessModal onClose={() => setModalFileDeleteProcess(false)} visible={modalFileDeleteProcess} />

    </React.Fragment>
  )
}
export default BucketPage;

