import {useSelector} from "react-redux";
import {TStore} from "../../reducers";
import style from "./uploadMini.module.scss";
import ExpandDown from "../../icons/Expand_down";
import {formatBytes} from "../../helpers/common";
import {SvgFileDoc} from "../../icons/FileTypes";
import React from "react";

export const UploadMini = (props)=>{
  const uploadInfoTotal = useSelector((state: TStore) => state.buckets.uploadInfoTotal);
  const percent = uploadInfoTotal?.totalPercent ? uploadInfoTotal?.totalPercent.toString().split(".")?.[0] : 0;
  return(
    <div className={style.containerUpload}>
        <div className={style.topPart}>
          <div className={style.topLeft}>
            <div className={style.topText}>
              {`Uploading ${uploadInfoTotal?.filesNumber || 0} ${uploadInfoTotal?.filesNumber?.toString() === "1" ? "file" : "files"}`}
            </div>
          </div>
          <div className={style.topRight}>
            <div className={style.percentageBlock}>{percent}% </div>
            <div className={style.iconBlock} onClick={props?.onClick}>
              <ExpandDown color={"#CCD2E3"} rotate={true}/>
            </div>
          </div>
        </div>
      <div className={style.bottomPart}>
        <div className={style.bottomRow}>
          <div className={style.bottomLeft}>
            <div className={style.iconFile}><SvgFileDoc/></div>
            <div className={style.filesLeft}>
              {`${uploadInfoTotal?.loadedFilesNumber || 0}/${uploadInfoTotal?.filesNumber || 0} files`}
            </div>
          </div>
          <div className={style.bottomRight}>{uploadInfoTotal?.filesTotalSize ? formatBytes(uploadInfoTotal?.filesTotalSize) : "0 Gb" }</div>
        </div>
        <div className={style.progress}>
          <div className={style.innerProgress} style={{width: `${uploadInfoTotal?.totalPercent || 0}%`}}/>
        </div>
      </div>
    </div>
  )
}