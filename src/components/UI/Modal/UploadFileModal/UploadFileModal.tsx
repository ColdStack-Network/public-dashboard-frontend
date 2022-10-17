import React, {useState, useMemo} from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import style from './uploadFileModal.module.scss'
import DragAndDrop, {File} from "../../DragAndDrop/DragAndDrop";
import Checkbox from "../../Checkbox/Checkbox";
import Pagination from "../../Pagination/Pagination";
/*
import SvgWarning from "../../../../icons/Warning";
import SelectCustom from "../../SelectCustom/SelectCustom";*/

interface  UploadFileModalProps {
  visible: boolean
  onClose: () => void
  onUploadFilesToStorage: ()=>void
  onUploadFiles: (params: any)=>void
  size: string,
  disabled: boolean,
  onDeleteUploadFile: (file: any)=>void,
  uploadInfo: any,
  onCancel: ()=>void
}

const UploadFileModal = ({
                            visible = false,
                            onClose,
                            onUploadFilesToStorage,
                            onUploadFiles,
                            size,
                            disabled,
                            onDeleteUploadFile,
                            uploadInfo,
                            onCancel
                          }: UploadFileModalProps) => {


 /* const footer = useMemo(()=>{ return <div className={style.footer}>
    <div className={style.wrapBtn1}>
      <Button onClickHandler={onClose} color={"additional"} size={"small"}>Cancel</Button>
    </div>
    <Button onClickHandler={onClose} color={"additional"} size={"small"}>Cancel</Button>
  </div>}, [])*/

  console.log("UploadFileModal")
  const perPage=5;
  const [page, setPage] = useState(1);
    const fromto = useMemo(()=>{
      return{
        from: perPage*(page - 1),
        to:  perPage*(page - 1) + perPage
      }
    }, [page]);

    const currentFiles = useMemo(()=>{
      return uploadInfo.slice(fromto?.from, fromto?.to)
      //return files.slice(fromto?.from, fromto?.to)
    }, [fromto, uploadInfo])

  // console.log("fromto",fromto);
  return  (
    <Modal
      uploadFiles={currentFiles.length}
      disabled={disabled}
      closeOutClick={false} title={"Upload file"} onClose={()=>{ setPage(1); onClose();}} visible={visible}
    >
      {
        ()=>{return <div>
                      <div className={style.container}>
                        <DragAndDrop onUploadFiles={onUploadFiles} disabled={disabled} typePage={'backet'}/>
                        <div className={style.checkrow}>
                          <Checkbox checked={true} name={"alStorage"} id={"al"} label={"AI storage selection"} isGray={true} disabled={true}/>
                          <div>
                            <div className={style.textSize}> Total upload size:</div> <div className={style.size}>{size}</div>
                          </div>
                        </div>
                        <div className={style.buttonsRow}>
                          <div className={style.wrapBtn1}>
                            <Button onClickHandler={onCancel} color={"additional"}>Cancel</Button>
                          </div>
                          <div className={style.wrapBtn2}>
                            {disabled || uploadInfo?.length < 1 ?
                              <Button onClickHandler={()=>{}} color={"additional"} isDisabled={true}>Upload files</Button> :
                              <Button onClickHandler={onUploadFilesToStorage} color={"primary"}>Upload files</Button>
                            }

                          </div>
                        </div>
                        {/*<div className={style.warningWrap}>
                          <div className={style.warningRow}>
                            <div>
                              <SvgWarning/>
                            </div>
                            <div className={style.warningLabel}>
                              Warning
                            </div>
                          </div>
                          <div className={style.warningText}>
                            Overriding AI selection in ColdStack may lead to financial
                            loses lorem ipsum lorem ipsum lorem ipsum
                          </div>
                          <SelectCustom size={"small"} items={[{name: "FileCoin", id: 1}, {name: "FileCoin2", id: 2}, ]} onSelect={()=>{}}/>
                        </div>*/}
                        {currentFiles?.length > 0 &&
                        <div className={style.filesList}>
                          {currentFiles?.map((file) => {
                            return <File file={file} noProgress={false} onDelete={() => {
                              onDeleteUploadFile(file)
                            }}/>
                          })}
                        </div>
                        }
                        {Math.ceil(uploadInfo?.length / perPage) > 1 &&
                        <Pagination hasSelect={false} activePage={page} count={Math.ceil(uploadInfo?.length / perPage)}
                                    onSelect={() => {
                                    }} onClickPage={(num) => {
                          setPage(num)
                        }}/>
                        }
                      </div>
                   </div>}
      }
    </Modal>
  )
};





export default UploadFileModal;
