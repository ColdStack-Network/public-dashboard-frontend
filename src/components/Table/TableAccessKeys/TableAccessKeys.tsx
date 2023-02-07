import React, { useMemo } from "react";
import style from "../table.module.scss";
import DropdownVertical, { DropItem } from "../../UI/DropdownVertical/DropdownVertical";
import SvgTrash from "../../../icons/Trash";
import { SvgLock, SvgUnLock } from "../../../icons/LockUnlock";
import SvgKey from "../../../icons/Key";
import { formatAccount, formatDate } from "../../../helpers/common";
import { AccessKey } from "models/AccessKey";
import clsx from "clsx";
import { ChangeStatusPayload } from "actions/actionTypes";

interface IProps {
  data: AccessKey[];
  handleDelete: (key: AccessKey) => void;
  showKey: (item: AccessKey) => void;
  changeStatusKey: (payload: ChangeStatusPayload) => void;
}

const TableAccessKeys: React.FC<IProps> = ({ data, handleDelete, showKey, changeStatusKey }: IProps) => {
  return (
    <div className={style.tableWrapper}>
      <div className={clsx(style.scroll, style.tableBuckets)}>
        <div className={style.table}>
          <div className={style.tableHeadRow}>
            <div className={style.tableHeadItem} />
            <div className={style.tableHeadItem}>User</div>
            <div className={style.tableHeadItem}>Key</div>
            <div className={style.tableHeadItem}>Status</div>
            <div className={style.tableHeadItem}>Created on</div>
            <div className={clsx(style.tableHeadItem, style.tableTdCenter)}>Actions</div>
          </div>
          {data.map((item, index) => {
            return (
              <TableAccessKeyRow
                item={item}
                key={index}
                handleDelete={handleDelete}
                showKey={() => showKey(item)}
                changeStatusKey={changeStatusKey}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableAccessKeys;

type TableAccessKeyRowProps = {
  item: AccessKey;
  handleDelete: (key: AccessKey) => void;
  showKey: () => void;
  changeStatusKey: (payload: ChangeStatusPayload) => void;
};
const TableAccessKeyRow: React.FC<TableAccessKeyRowProps> = ({ item, handleDelete, showKey, changeStatusKey }) => {
  const dropdowns = useMemo(
    () => {
      const items: DropItem[] = [
        {
          icon: <SvgTrash color="#CCD2E3" />,
          text: "Delete",
          isAccent: true,
          onClick: () => handleDelete(item),
          section: 1,
        },
        {
          icon: <SvgLock />,
          text: "Activated",
          isAccent: false,
          onClick: () => changeStatusKey({ key: item, status: true }),
          section: 2,
        },
        {
          icon: <SvgUnLock />,
          text: "Deactivated",
          isAccent: false,
          onClick: () => changeStatusKey({ key: item, status: false }),
          section: 2,
        },
      ];
      return items;
    },
    //eslint-disable-next-line
    [item]
  );

  return (
    <div className={style.tableRow}>
      <div className={style.tableTd} style={{ width: "84px" }}>
        <SvgKey />
      </div>
      <div className={style.tableTd} style={{ width: "17%" }}>
        <div className={style.cursor}>0x{formatAccount(item.userId)}</div>
      </div>
      <div
        className={clsx(style.tableTd, style.accessKey_key, style.cursor)}
        style={{ width: "35.5%" }}
        onClick={showKey}
      >
        {item.id}
      </div>
      <div
        className={clsx(style.tableTd, item.active ? style.accessKey_status_active : style.accessKey_status_inactive)}
        style={{ width: "17%" }}
      >
        {item.active === true ? "Active" : "Inactive"}
      </div>
      <div className={style.tableTd} style={{ width: "25%" }}>
        {formatDate(item.createdAt)}
      </div>
      <div className={clsx(style.tableTd, style.tableTdCenter)}>
        <DropdownVertical dropdowns={dropdowns} />
      </div>
    </div>
  );
};
