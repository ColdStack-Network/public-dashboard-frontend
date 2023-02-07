import React, { useCallback, useEffect, useState } from "react";
import style from "./bucketsPage.module.scss";
import Button from "../../components/UI/Button/Button";
import EmptyList from "../../components/EmptyList/EmptyList";
import SvgBigTrashIcon from "../../icons/BigTarsh";
import { TableBuckets } from "../../components/Table/TableBuckets/TableBuckets";
import CreateBucketModal from "../../components/UI/Modal/CreateBucketModal/CreateBucketModal";
import SvgPlus from "../../icons/Plus";
import { useDispatch, useSelector } from "react-redux";
import {
  createBucket,
  deleteBucket,
  getBucketsGuides,
  getBucketsList,
  renameBucket,
} from "../../Redux/buckets/Actions/bucketsActions";
import { isFull } from "../../helpers/common";
import { EditBucketModal } from "../../components/UI/Modal/EditBucketModal/EditBucketModal";
import { IBucketListItem } from "../../components/Table/types";
import { DeleteBucketModal } from "../../components/UI/Modal/DeleteBucketModal/DeleteBucketModal";
import { useWeb3 } from "../../helpers/web3/useWeb3";
import { ISelectCustom } from "../../components/UI/SelectCustom/types";
import { selectBucketsList } from "../../Redux/buckets/Selectors/selectBucketsList";
import { selectRegions } from "../../Redux/buckets/Selectors/selectRegions";
import { selectStorageClasses } from "../../Redux/buckets/Selectors/selectStorageClasses";
import clsx from "clsx";

export interface INewBucket {
  name: string;
  owner: string;
  region: ISelectCustom | null;
  storage: ISelectCustom | null;
  access: boolean;
  setOuterError?: (err: string) => void;
  onSuccess?: () => void;
}

export interface INewBucketCreate {
  name: string;
  region: ISelectCustom | null;
  storage: ISelectCustom | null;
  setOuterError?: (err: string) => void;
  onSuccess?: () => void;
}

const defaultBucketItem = {} as IBucketListItem;

const BucketsPage: React.FC = () => {
  const { account } = useWeb3();
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalRename, setModalRename] = useState(false);
  const [modalRenameError, setModalRenameError] = useState("");
  const [modalDelete, setModalDelete] = useState(false);
  const [editingBucket, setEditingBucket] = useState<IBucketListItem>(defaultBucketItem);
  const bucketsList = useSelector(selectBucketsList);
  const regions = useSelector(selectRegions);
  const storageClasses = useSelector(selectStorageClasses);

  const dispatch = useDispatch();
  const createBucketFunc = useCallback(() => setModal(true), []);
  const onRename = useCallback(
    (name) => {
      dispatch(
        renameBucket({
          nameBucket: editingBucket?.Name,
          name: name,
          setOuterError: (message) => {
            setModalRenameError(message);
          },
          afterLoad: () => {
            setModalRename(false);
            setEditingBucket(defaultBucketItem);
          },
        })
      );
    },
    [editingBucket, dispatch]
  );
  const onDelete = useCallback(() => {
    dispatch(
      deleteBucket({
        nameBucket: editingBucket?.Name,
        afterLoad: () => {
          setModalDelete(false);
          setEditingBucket(defaultBucketItem);
        },
      })
    );
  }, [editingBucket, dispatch]);
  const handleRename = (bucket: IBucketListItem) => {
    setEditingBucket(bucket);
    setModalRename(true);
  };
  const handleDelete = (bucket: IBucketListItem) => {
    setEditingBucket(bucket);
    setModalDelete(true);
  };
  const onCreateBucket = useCallback(
    ({ name, region, storage, setOuterError, onSuccess }: INewBucketCreate) => {
      dispatch(
        createBucket({
          name,
          owner: account || "",
          region,
          storage,
          access: true,
          setOuterError,
          onSuccess,
        })
      );
    },
    [account, dispatch]
  );

  useEffect(() => {
    dispatch(
      getBucketsList({
        pagination: { Page: 1, PerPage: 41 },
        afterLoad: () => setLoading(false),
      })
    );
    dispatch(getBucketsGuides());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className={clsx(style.headerRow, style.headerRowCenter)}>
        <div className={clsx(style.pageTitleCommon, style.pageTitleBuckets)}>Bucket list</div>
        <div className={style.buttonWrap}>
          <Button color="primary" size="big" onClickHandler={createBucketFunc}>
            Create bucket
          </Button>
        </div>
        <div className={style.mobileButtonWrap}>
          <Button color="primary" size="big" onClickHandler={createBucketFunc}>
            <SvgPlus />
          </Button>
        </div>
      </div>
      {!isLoading && (
        <React.Fragment>
          {!isFull(bucketsList) ? (
            <EmptyList onClick={createBucketFunc} icon={<SvgBigTrashIcon />} textButton="Create Bucket">
              You do not have any buckets yet
            </EmptyList>
          ) : (
            <div className={style.content}>
              <TableBuckets data={bucketsList} handleRename={handleRename} handleDelete={handleDelete} />
            </div>
          )}
          <CreateBucketModal
            visible={modal}
            storageClasses={storageClasses}
            regions={regions}
            onClose={() => setModal(false)}
            onSubmit={onCreateBucket}
          />
          <EditBucketModal
            visible={modalRename}
            onClose={() => {
              setModalRename(false);
              setModalRenameError("");
            }}
            initName={editingBucket?.Name}
            onSubmit={onRename}
            outerError={modalRenameError}
          />
          <DeleteBucketModal
            visible={modalDelete}
            onClose={() => setModalDelete(false)}
            name={editingBucket.Name}
            onSubmit={onDelete}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BucketsPage;
