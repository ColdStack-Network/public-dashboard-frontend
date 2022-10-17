import React, {useCallback, useEffect, useState} from 'react';
import style from './bucketsPage.module.scss';
import Button from "../../components/UI/Button/Button";
import EmptyList from "../../components/EmptyList/EmptyList";
import SvgBigTrashIcon from "../../icons/BigTarsh";
import TableBuckets from "../../components/Table/TableBuckets/TableBuckets";
import CreateBucketModal from "../../components/UI/Modal/CreateBucketModal/CreateBucketModal";
import SvgPlus from "../../icons/Plus";

import {useDispatch, useSelector} from "react-redux";
import {
  createBucket,
  deleteBucket,
  getBucketsGuides,
  getBucketsList,
  renameBucket
} from "../../modules/buckets/actions";
import {TStore} from "../../reducers";
import {isFull} from "../../helpers/common";
import EditBucketModal from "../../components/UI/Modal/EditBucketModal/EditBucketModal";
import {IBucketListItem} from "../../components/Table/types";
import DeleteBucketModal from "../../components/UI/Modal/DeleteBucketModal/DeleteBucketModal";
import UseWeb3 from "../../helpers/web3/UseWeb3";
import {ISelectCustom} from "../../components/UI/SelectCustom/types";

export interface INewBucket {
  name: string,
  owner: string,
  region: ISelectCustom,
  storage: ISelectCustom
  access: boolean,
  setOuterError?: (err: string)=>void,
  onSuccess?: ()=>void,
}

export interface INewBucketCreate {
  name: string,
  region: ISelectCustom,
  storage: ISelectCustom,
  setOuterError?: (err: string)=>void,
  onSuccess?: ()=>void,
}

const BucketsPage: React.FC<any> = (props:any) => {

  const {account} = UseWeb3();
  const [isLoading, setLoading] = useState(true)
  const createBucketFunc = useCallback(() => {
    setModal(true)
  }, []);

  const [modal, setModal] = useState(false);
  const [modalRename, setModalRename] = useState(false);
  const [modalRenameError, setModalRenameError] = useState("");
  const [modalDelete, setModalDelete] = useState(false);

  const [editingBucket, setEditingBucket] = useState({} as IBucketListItem);

  const dispatch = useDispatch();

  const onRename = useCallback((name)=>{
    dispatch(renameBucket({
      nameBucket: editingBucket?.Name,
      name: name,
      setOuterError: (message)=>{setModalRenameError(message)},
      afterLoad: ()=>{setModalRename(false); setEditingBucket({} as IBucketListItem)}}))
  },
     // eslint-disable-next-line
    [editingBucket])

  const onDelete = useCallback(()=>{
    dispatch(deleteBucket({
      nameBucket: editingBucket?.Name,
      afterLoad: ()=>{setModalDelete(false); setEditingBucket({} as IBucketListItem)}}))
  },
     // eslint-disable-next-line
    [editingBucket])

  const handleRename = (bucket)=>{
    setEditingBucket(bucket);
    setModalRename(true);
  }

  const handleDelete = (bucket)=>{
    setEditingBucket(bucket);
    setModalDelete(true);
  }

  useEffect(() => {
    dispatch(getBucketsList({pagination: {Page: 1, PerPage: 41}, afterLoad: ()=>{setLoading(false)}}));
    dispatch(getBucketsGuides());
  },
    [dispatch]);

  const onCreateBucket = useCallback(( props)=>{
    const {name, region, storage, setOuterError, onSuccess} = props;

    dispatch(createBucket(
        {
          name,
          owner: account || "",
          region,
          storage,
          access: true,
          setOuterError,
          onSuccess
        }
        ));
  }, [account, dispatch] )

  const bucketsList = useSelector((state: TStore) => state.buckets.bucketsList);
  const regions = useSelector((state: TStore) => state.buckets.regions);
  const storageClasses = useSelector((state: TStore) => state.buckets.storageClasses);

  return (
    <React.Fragment>
      <div className={`${style.headerRow} ${style.headerRowCenter}`}>
        <div className={`${style.pageTitleCommon} ${style.pageTitleBuckets}`}>
          Bucket list
        </div>
        <div className={style.buttonWrap}>
          <Button color={"primary"} size={"big"} onClickHandler={createBucketFunc}>Create bucket</Button>
        </div>
        <div className={style.mobileButtonWrap}>
          <Button color={"primary"} size={"big"} onClickHandler={createBucketFunc}><SvgPlus/></Button>
        </div>
      </div>
      {!isLoading && (
        <React.Fragment>
          {!isFull(bucketsList) ?
            <EmptyList onClick={createBucketFunc} icon={<SvgBigTrashIcon/>} textButton={"Create Bucket"}>
              You do not have any buckets yet
            </EmptyList> :
            <div className={style.content}>
              <TableBuckets data={bucketsList} handleRename={handleRename} handleDelete={handleDelete}/>
             {/* <div className={style.pagination}>
                <Pagination
                  count={count}
                  hasSelect={true}
                  dropdowns={[{id: 10, name: 10}, {id: 25, name: 25}, {id: 50, name: 50}, {id: 100, name: 100}]}
                  onSelect={(option, perPage) => {
                    dispatch(getBucketsList({pagination: {currentPage: option.id, perPage: perPage}, afterLoad: ()=>{}}));
                  }}/>
              </div>*/}
            </div>
          }
          <CreateBucketModal visible={modal} storageClasses={storageClasses} regions={regions}
                             onClose={() => {setModal(false)}}
                             onSubmit={onCreateBucket}
          />
            <EditBucketModal visible={modalRename} onClose={() => {
              setModalRename(false);
              setModalRenameError("");
            }} initName={editingBucket?.Name} onSubmit={onRename} outerError={modalRenameError}/>
            <DeleteBucketModal visible={modalDelete} onClose={()=>{setModalDelete(false)}} name={editingBucket.Name} onSubmit={onDelete}/>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default BucketsPage;
