import React, { useMemo } from "react";
import style from "../table.module.scss";
import styleCustom from "./tableBuckets.module.scss";
import SvgViewHide from "../../../icons/ViewHide";
import SvgBucketIcon from "../../../icons/Bucket";
import DropdownVertical, { DropItem } from "../../UI/DropdownVertical/DropdownVertical";
import SvgEdit from "../../../icons/Edit";
import SvgTrash from "../../../icons/Trash";
import { IBucketListItem } from "../types";
import { useHistory } from "react-router-dom";
import { formatAccount, formatDate } from "../../../helpers/common";
import { defaultRegion } from "../../../helpers/yandexS3";
import { useWeb3 } from "../../../helpers/web3/useWeb3";
import clsx from "clsx";
import { Switch } from "components/UI/Switch/Switch";
import { useDispatch } from "react-redux";
import { requestVersioningBucket } from "Redux/buckets/Actions/bucketsActions";
import { AppConfig } from "config";

type IProps = {
  data: IBucketListItem[];
  handleRename: (bucket: IBucketListItem) => void;
  handleDelete: (bucket: IBucketListItem) => void;
};
type TableBucketsRowProps = {
  item: IBucketListItem;
  handleRename: (bucket: IBucketListItem) => void;
  handleDelete: (bucket: IBucketListItem) => void;
};

export const TableBuckets: React.FC<IProps> = ({ data, handleRename, handleDelete }) => {
  return (
    <div className={style.tableWrapper}>
      <div className={clsx(style.scroll, style.tableBuckets)}>
        <div className={style.table}>
          <div className={style.tableHeadRow}>
            <div className={style.tableHeadItem}></div>
            <div className={style.tableHeadItem}>Bucket name</div>
            <div className={style.tableHeadItem}>Owner</div>
            <div className={style.tableHeadItem}>Region</div>
            <div className={clsx(style.tableHeadItem, style.tableTdCenter)}>Files</div>
            <div className={clsx(style.tableHeadItem, style.tableTdCenter)}>Access</div>
            <div className={style.tableHeadItem}>Created on</div>
            <div className={clsx(style.tableHeadItem, style.tableTdCenter)}>Actions</div>
          </div>
          {data.map((item) => (
            <TableBucketsRow item={item} key={item.Name} handleRename={handleRename} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TableBucketsRow: React.FC<TableBucketsRowProps> = ({ item, handleRename, handleDelete }) => {
  const { account } = useWeb3();
  const history = useHistory();
  const dispatch = useDispatch();
  const isDev = !AppConfig.isProd;

  const dropdowns = useMemo(
    () => {
      const VersioningItem: DropItem = {
        text: <Switch checked={item.VersioningStatus === "Enabled"} label="Versioning" />,
        section: 1,
        onClick: () => {
          const { VersioningStatus, Name } = item;
          const disabledStatuses = ["Suspended", "Disabled"];
          const newStatus = disabledStatuses.includes(VersioningStatus) ? "Enabled" : "Suspended";
          dispatch(requestVersioningBucket({ VersioningStatus: newStatus, Name: Name }));
        },
        keepOpenedAfterClick: true,
      };
      const items: DropItem[] = [
        {
          icon: <SvgEdit color="light" />,
          text: "Rename",
          isAccent: false,
          onClick: () => handleRename(item),
          section: 1,
        },
        {
          icon: <SvgTrash color="#CCD2E3" />,
          text: "Delete",
          isAccent: true,
          onClick: () => handleDelete(item),
          section: 1,
        },
      ];
      if (isDev) {
        items.push(VersioningItem);
      }
      return items;
    },
    //eslint-disable-next-line
    [item, handleRename]
  );

  return (
    <div className={style.tableRow}>
      <div className={clsx(style.tableTd, styleCustom.tableTdBucketIcon)} style={{ width: "84px" }}>
        <SvgBucketIcon />
      </div>
      <div className={clsx(style.tableTd, styleCustom.tableTdBucketname)} style={{ width: "17%" }}>
        <div
          className={clsx(style.cursor, style.ellipsis, style.folder)}
          onClick={() => history.push(`/dashboard/buckets/${item.Name}`)}
        >
          {item.Name}
        </div>
      </div>
      <div className={style.tableTd} style={{ width: "17%" }}>
        {formatAccount(account)}
      </div>
      <div className={style.tableTd} style={{ width: "11.5%" }}>
        {defaultRegion}
      </div>
      <div className={clsx(style.tableTd, style.tableTdCenter)} style={{ width: "11%" }}>
        {item.ObjectsWithoutFoldersCount}
      </div>
      <div className={clsx(style.tableTd, style.tableTdCenter)} style={{ width: "13%" }}>
        <SvgViewHide />
      </div>
      <div className={style.tableTd} style={{ width: "16%" }}>
        {formatDate(item.CreationDate)}
      </div>
      <div className={clsx(style.tableTd, style.tableTdCenter)} style={{ width: "7%" }}>
        <DropdownVertical dropdowns={dropdowns} />
      </div>
    </div>
  );
};
