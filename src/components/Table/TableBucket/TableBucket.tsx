import React from "react";
import style from "../table.module.scss";
import SvgView from "../../../icons/View";
import SvgViewHide from "../../../icons/ViewHide";
import DropdownVertical, { DropItem } from "../../UI/DropdownVertical/DropdownVertical";
import { iconsFiles } from "../types";
import Checkbox from "../../UI/Checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import { formatDate, uriEncode } from "../../../helpers/common";
import { IFoldersList } from "helpers/yandexS3";
import clsx from "clsx";

export type BucketFolder = Omit<IFoldersList, "Prefix" | "Size"> & {
  FileType: string;
  StorageClass: string;
  linkFolder: string;
  StorageClassReadable?: string;
};

type IProps = {
  data?: BucketFolder[];
  generateDropdowns: ({ file, type }: { file: BucketFolder; type: string }) => DropItem[];
  selectedItems: any[];
  onSelect: (name: string, type: string) => (event: React.ChangeEvent) => void;
  onSelectAll: (event: React.ChangeEvent) => void;
  allSelected: boolean;
  beforeLink: () => void;
};

const TableBucket: React.FC<IProps> = ({
  data,
  generateDropdowns,
  selectedItems,
  onSelect,
  onSelectAll,
  allSelected,
  beforeLink,
}: IProps) => {
  return (
    <div className={style.tableWrapper}>
      <div className={clsx(style.scroll, style.tableBuckets)}>
        <div className={style.table}>
          <div className={style.tableHeadRow}>
            <div className={style.tableHeadItem}>
              <div style={{ width: "24px" }}>
                <Checkbox checked={allSelected} onChange={onSelectAll} name="checkAllFiles" id="checkAllFiles" />
              </div>
            </div>
            <div className={style.tableHeadItem}>File name</div>
            <div className={style.tableHeadItem}>Type</div>
            <div className={style.tableHeadItem}>Storage Classes</div>
            <div className={clsx(style.tableHeadItem, style.tableTdCenter)}>Access</div>
            <div className={style.tableHeadItem}>Size</div>
            <div className={style.tableHeadItem}>Last Modified</div>
            <div className={clsx(style.tableHeadItem, style.tableTdCenter)}>Actions</div>
          </div>
          {data &&
            data.map((item, key) => {
              return (
                <TableBucketRow
                  key={key}
                  item={item}
                  beforeLink={beforeLink}
                  checked={selectedItems.findIndex((elem) => elem.name === item?.Key) > -1}
                  onCheck={onSelect}
                  dropdowns={generateDropdowns({
                    file: item,
                    type: item.FileType === "folder" ? "folder" : "file",
                  })}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TableBucket;

type TableBucketRowProps = {
  item: BucketFolder;
  checked: boolean;
  onCheck: (name: string, type: string) => (event: React.ChangeEvent) => void;
  dropdowns: DropItem[];
  beforeLink: () => void;
};
const TableBucketRow: React.FC<TableBucketRowProps> = ({ item, checked, onCheck, dropdowns, beforeLink }) => {
  const history = useHistory();

  return (
    <div className={style.tableRow}>
      <div className={style.tableTd} style={{ width: "84px" }}>
        <Checkbox
          checked={checked}
          onChange={onCheck(item.Key, item?.FileType === "folder" ? "folder" : "file")}
          name={item.Key}
          id={item.Key}
        />
      </div>
      <div className={style.tableTd} style={{ width: "17%" }}>
        <div
          className={clsx(style.cursor, style.ellipsis, item.FileType === "folder" && style.folder)}
          onClick={() => {
            beforeLink();
            if (item.FileType === "folder") {
              const lincFolder = uriEncode(item.linkFolder, false) + "/" + uriEncode(item.Key, false);
              const lincFolderReplace = lincFolder.replace("//", "/");
              history.push(`${lincFolderReplace}`);
            } else {
              history.push(`${uriEncode(item.linkFolder, false)}?file=${uriEncode(item.Key)}`);
            }
          }}
        >
          {item.Key}
        </div>
      </div>
      <div className={style.tableTd} style={{ width: "9%" }}>
        {iconsFiles[item.FileType]}
      </div>
      <div className={style.tableTd} style={{ width: "14%" }}>
        {item.StorageClassReadable || <div style={{ paddingLeft: "50px" }}>-</div>}
      </div>
      <div className={clsx(style.tableTd, style.tableTdCenter)} style={{ width: "14.5%" }}>
        {item.ACL === "private" ? <SvgViewHide /> : item.ACL === "public-read" ? <SvgView color="common" /> : "-"}
      </div>
      <div className={style.tableTd} style={{ width: "10%" }}>
        {item.SizeReadable}
      </div>
      <div className={style.tableTd} style={{ width: "20%" }}>
        {item.LastModified ? formatDate(item.LastModified) : ""}
      </div>
      <div className={clsx(style.tableTd, style.tableTdCenter)}>
        <DropdownVertical dropdowns={dropdowns} />
      </div>
    </div>
  );
};
