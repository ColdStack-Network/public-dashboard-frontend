import React, {useState} from 'react'
import style from "./dragAndDrop.module.scss"
import SvgUploadFile from "../../../icons/UploadFile";
import Button from "../Button/Button";
import {InputFile} from "../InputFile/InputFile";
import {SvgCloseRound} from "../../../icons/Close";
import {getFilesFromDataTransferItems} from 'datatransfer-files-promise';
import {formatBytes} from "../../../helpers/common";
import {iconsFiles, TBucketFiles} from "../../Table/types";


const DragAndDrop = ({onUploadFiles, disabled, typePage = 'backet'}) => {

  const [drag, setDrag] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDrag = (e) => {
    e.stopPropagation()
    e.preventDefault();
    if (disabled) {
      return
    }
    setDragCounter((prev) => prev + 1);
  }


  const handleDragIn = (e) => {
    //console.log("handleDragIn !!!");
    e.stopPropagation();
    e.preventDefault()

    if (disabled) {
      return
    }

    /* setDragCounter((prev)=> prev + 1)*/
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true)
    }
  }

  const onDrop = (e) => {
    //console.log("handleDrop 1", e);
    e.preventDefault()
    e.stopPropagation()
    if (disabled) {
      return
    }
    setDrag(false)
    //console.log("e.dataTransfer.files", e.dataTransfer.files);
    const items = e.dataTransfer.items
    getFilesFromDataTransferItems(items)
      .then(files => {
        //console.log("FILES:", files, "items", items)
        onUploadFiles(files)
      })

    /*  let length = e.dataTransfer.items.length;
      for (let i = 0; i < length; i++) {
        let entry = e.dataTransfer.items[i].webkitGetAsEntry();
        if (entry.isFile) {
          console.log("its File", entry);
          // do whatever you want
        } else if (entry.isDirectory) {
          console.log("its Directory");
        // do whatever you want
        }
      }*/

    /*if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log("handleDrop 2");
      handleDrop(e.dataTransfer.files)
      e.dataTransfer.clearData()
      /!*setDragCounter(0)*!/
    }*/
  }
  const onInputChangeHandler = (files) => {
    if (disabled) {
      return
    }
    const arr = Array.from(files);
    const filesCopy = arr.map((el: any) => {
      el.filepath = el.name;
      return el;
    });
    onUploadFiles(filesCopy)
  }

  return (
    <>
      {typePage === 'backet' &&
      <div
        className={`${style.container} ${drag ? style.active : ""}`}
        onDragEnter={handleDragIn}
        onDragOver={handleDrag}
        onDrop={onDrop}
        onDragLeave={() => {
          //console.log("onDragLeave!!!!!!!!!!!!!!!!!!!!!!!!!!");
          if (dragCounter - 1 === 0) {
            setDrag(false)
          }
          setDragCounter((prev) => prev - 1);
        }}
      >
        < div className={style.content}>
          <div className={style.icon}>
            <SvgUploadFile/>
          </div>
          <div className={style.text}>
            Drag & Drop your files and folders here
          </div>
          <div className={style.text}>
            or
          </div>
          <div className={`${style.buttonContainer} ${disabled ? style.buttonContainerDisabled : ""}`}>
            <InputFile id={"files"} onInputChangeHandler={onInputChangeHandler}>
              <Button size={"fullwidth"} color={"gray"}>Browse Files</Button>
            </InputFile>
          </div>
        </div>
      </div>
      }
      {typePage === 'support' &&
      <div
        className={`${style.container_support} ${drag ? style.active : ""}`}
        onDragEnter={handleDragIn}
        onDragOver={handleDrag}
        onDrop={onDrop}
        onDragLeave={() => {
          //console.log("onDragLeave!!!!!!!!!!!!!!!!!!!!!!!!!!");
          if (dragCounter - 1 === 0) {
            setDrag(false)
          }
          setDragCounter((prev) => prev - 1);
        }}
      >
        < div className={style.content}>
          <div className={`${style.buttonContainer} ${disabled ? style.buttonContainerDisabled : ""}`}>
            <InputFile id={"files"} onInputChangeHandler={onInputChangeHandler}>
              <Button size={"fullwidth"} color={"lightgray"}>Add an attachment or drop files here</Button>
            </InputFile>
          </div>
        </div>
      </div>
      }

      {/*@ts-ignore*/}
      {/*<input type="file"  multiple="" directory="" webkitdirectory="" mozdirectory=""  />*/}

      {/* <div style={{height: 300, width: 250}}>
          {fileList.map((file, i) =>
            <div key={i}>{file}</div>
          )}
        </div>*/}
    </>
  )

}
export default DragAndDrop

/*export const iconsFiles = {
  [TBucketFiles.folder]: <SvgFileFolder/>,
  [TBucketFiles.image]: <SvgFileImage/>,
  [TBucketFiles.file]: <SvgFileDoc/>,
  [TBucketFiles.video]: <SvgFileVideo/>,
  [TBucketFiles.audio]: <SvgFileAudio/>,
}*/
const formatsFiles = {
  [TBucketFiles.image]: ["jpg", "jpeg", "png", "svg"],
  [TBucketFiles.video]: ["mov", "mp4", "webm", "mpeg", "avi"],
  [TBucketFiles.audio]: ["mp3", "wma"]
}

export const getIconByFile = (name) => {
  try {
    if (name?.length === 0) {
      return iconsFiles[TBucketFiles.file]
    }
    const idx = name.lastIndexOf(".");
    const ext = name.slice(idx + 1).toLowerCase();
    //console.log("exttt", ext);
    if (formatsFiles[TBucketFiles.image].indexOf(ext) >= 0) {
      return iconsFiles[TBucketFiles.image]
    }
    if (formatsFiles[TBucketFiles.video].indexOf(ext) >= 0) {
      return iconsFiles[TBucketFiles.video]
    }
    if (formatsFiles[TBucketFiles.audio].indexOf(ext) >= 0) {
      return iconsFiles[TBucketFiles.audio]
    }
  } catch (err) {
    return iconsFiles[TBucketFiles.file]
  }
  return iconsFiles[TBucketFiles.file]
}

export const File = ({file, onDelete, noProgress}) => {
  //console.log("file file", file);
  const icon = getIconByFile(file?.file?.name);
  return (
    <div className={style.wrap}>
      <div className={style.file}>
        <div className={style.fileRow}>
          <div className={style.fileIcon}>
            {icon}
          </div>

          <div className={style.fileName}>
            {file?.file?.name}
          </div>
        </div>
        <div className={style.fileRow}>
          <div className={style.fileSize}>
            {file?.progress ? <span className={style.filePercent}>{`${file.progress}% / `}</span> : ""}{formatBytes(file?.file?.size)}
          </div>
          <div className={style.removeFile} onClick={onDelete}>
            <SvgCloseRound/>
          </div>
        </div>
      </div>
      {!noProgress &&
      <div className={style.progress}>
          <div className={style.innerProgress} style={{width: `${file.progress}%`}}/>
      </div>
      }
    </div>
  )
}
