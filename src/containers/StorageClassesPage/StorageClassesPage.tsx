import React, { useEffect } from "react";
import style from "./storageClassesPage.module.scss";
import TableStorageClasses from "../../components/Table/TableStorageClasses/TableStorageClasses";
import { useSelector } from "react-redux";
import { TStore } from "reducers";
import { getStorageClassesInfo } from "../../Redux/buckets/Actions/bucketsActions";
import { useDispatch } from "react-redux";

const StorageClassesPage: React.FC<any> = () => {
  const isLoading = false;
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(getStorageClassesInfo());
    },
    //eslint-disable-next-line
    []
  );

  const storageClasses = useSelector((state: TStore) => state.buckets.storageClassesInfo);

  return (
    <React.Fragment>
      {!isLoading && (
        <React.Fragment>
          <div className={`${style.headerRow} ${style.headerRowCenter}`}>
            <div className={`${style.pageTitleCommon} ${style.pageTitleStorage}`}>Storage Classes</div>
          </div>
          <div className={style.content}>
            <TableStorageClasses data={storageClasses} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default StorageClassesPage;
