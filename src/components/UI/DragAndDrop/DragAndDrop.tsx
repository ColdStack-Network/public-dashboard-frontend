import React, { useState } from "react";
import style from "./dragAndDrop.module.scss";
import SvgUploadFile from "../../../icons/UploadFile";
import Button from "../Button/Button";
import { InputFile } from "../InputFile/InputFile";
import { SvgCloseRound } from "../../../icons/Close";
import { getFilesFromDataTransferItems } from "datatransfer-files-promise";
import { formatBytes } from "../../../helpers/common";
import { iconsFiles, TBucketFiles } from "../../Table/types";
import { UploadFileType } from "models/UploadFileType";
import clsx from "clsx";

type DragAndDropProps = {
  onUploadFiles: (files: UploadFileType[]) => void;
  disabled: boolean;
  typePage?: string;
};

export const DragAndDrop: React.FC<DragAndDropProps> = ({ onUploadFiles, disabled, typePage = "backet" }) => {
  const [drag, setDrag] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (disabled) return false;
    setDragCounter((prev) => prev + 1);
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (disabled) return false;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return false;
    setDrag(false);
    const items = e.dataTransfer.items;
    const files = await getFilesFromDataTransferItems(items);
    onUploadFiles(files as UploadFileType[]);
  };
  const onInputChangeHandler = (files: FileList) => {
    if (disabled) return false;
    const arr = Array.from(files);
    const filesCopy: UploadFileType[] = arr.map((el) => {
      return Object.assign(el, { filepath: el.name });
    });
    onUploadFiles(filesCopy);
  };

  return (
    <>
      {typePage === "backet" && (
        <div
          className={clsx(style.container, drag && style.active)}
          onDragEnter={handleDragIn}
          onDragOver={handleDrag}
          onDrop={onDrop}
          onDragLeave={() => {
            if (dragCounter - 1 === 0) {
              setDrag(false);
            }
            setDragCounter((prev) => prev - 1);
          }}
        >
          <div className={style.content}>
            <div className={style.icon}>
              <SvgUploadFile />
            </div>
            <div className={style.text}>Drag & Drop your files and folders here</div>
            <div className={style.text}>or</div>
            <div className={clsx(style.buttonContainer, disabled && style.buttonContainerDisabled)}>
              <InputFile id="files" onInputChangeHandler={onInputChangeHandler}>
                <Button size="fullwidth" color="gray">
                  Browse Files
                </Button>
              </InputFile>
            </div>
          </div>
        </div>
      )}
      {typePage === "support" && (
        <div
          className={clsx(style.container_support, style.active)}
          onDragEnter={handleDragIn}
          onDragOver={handleDrag}
          onDrop={onDrop}
          onDragLeave={() => {
            if (dragCounter - 1 === 0) {
              setDrag(false);
            }
            setDragCounter((prev) => prev - 1);
          }}
        >
          <div className={style.content}>
            <div className={clsx(style.buttonContainer, disabled && style.buttonContainerDisabled)}>
              <InputFile id="files" onInputChangeHandler={onInputChangeHandler}>
                <Button size="fullwidth" color="lightgray">
                  Add an attachment or drop files here
                </Button>
              </InputFile>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const formatsFiles = {
  [TBucketFiles.image]: ["jpg", "jpeg", "png", "svg"],
  [TBucketFiles.video]: ["mov", "mp4", "webm", "mpeg", "avi"],
  [TBucketFiles.audio]: ["mp3", "wma"],
};

export const getIconByFile = (name: string) => {
  try {
    if (name?.length === 0) {
      return iconsFiles[TBucketFiles.file];
    }
    const idx = name.lastIndexOf(".");
    const ext = name.slice(idx + 1).toLowerCase();
    if (formatsFiles[TBucketFiles.image].indexOf(ext) >= 0) {
      return iconsFiles[TBucketFiles.image];
    }
    if (formatsFiles[TBucketFiles.video].indexOf(ext) >= 0) {
      return iconsFiles[TBucketFiles.video];
    }
    if (formatsFiles[TBucketFiles.audio].indexOf(ext) >= 0) {
      return iconsFiles[TBucketFiles.audio];
    }
  } catch (err) {
    return iconsFiles[TBucketFiles.file];
  }
  return iconsFiles[TBucketFiles.file];
};

type FileProps = {
  onDelete?: () => void;
  object: { file: UploadFileType; progress?: number };
  noProgress?: boolean;
};

export const File: React.FC<FileProps> = ({ object, onDelete, noProgress }) => {
  const icon = getIconByFile(object?.file?.name);

  return (
    <div className={style.wrap}>
      <div className={style.file}>
        <div className={clsx(style.fileRow, style.grow)}>
          <div className={style.fileIcon}>{icon}</div>

          <div className={style.fileName}>{object?.file?.name}</div>
        </div>
        <div className={style.fileRow}>
          <div className={style.fileSize}>
            {object?.progress ? <span className={style.filePercent}>{`${object.progress}% / `}</span> : ""}
            {formatBytes(object?.file?.size)}
          </div>
          <div className={style.removeFile} onClick={onDelete}>
            <SvgCloseRound />
          </div>
        </div>
      </div>
      {!noProgress && (
        <div className={style.progress}>
          <div className={style.innerProgress} style={{ width: `${object.progress}%` }} />
        </div>
      )}
    </div>
  );
};
