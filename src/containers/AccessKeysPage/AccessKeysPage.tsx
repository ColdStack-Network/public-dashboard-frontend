import React, {useCallback, useState} from 'react';
import style from './accessKeysPage.module.scss'
import EmptyList from "../../components/EmptyList/EmptyList";
import {isFull} from "../../helpers/common";
import SvgBigKey from "../../icons/BigKey";
import TableAccessKeys from "../../components/Table/TableAccessKeys/TableAccessKeys";
import CreateAccessKeyModal from "../../components/UI/Modal/CreateAccessKeyModal/CreateAccessKeyModal";
import DeleteModal from "../../components/UI/Modal/DeleteModal/DeleteModal";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "../../reducers";
import SvgPlus from "../../icons/Plus";
import Button from "../../components/UI/Button/Button";
import {createAccessKey, deleteAccessKey, setCurrentAccessKey, setStatusAccessKey} from "../../modules/user/actions";

const AccessKeysPage: React.FC<any> = (props:any) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  console.log(setLoading);
  const createKey = useCallback(() => {
    setModalCreate(true)
  }, []);
  const deleteKey = useCallback((key) => {
    dispatch(setCurrentAccessKey(key))
    setModalDelete(true)
  }, [dispatch]);

  const changeStatusKey=({key, status})=>{
    dispatch(setStatusAccessKey({key, status} as any))
  }


  const [modalCreate, setModalCreate] = useState(false);
  /*const [stepCreate, setStepCreate] = useState(1);*/

  const [modalDelete, setModalDelete] = useState(false);


  const currentAccessKey = useSelector((state: TStore)=>state.user.accessKeyCurrent);

  const onCreateKey=()=>{
      dispatch(createAccessKey({onSuccess: ()=>{
        setModalCreate(true)
      }}));
  }
/*  useEffect(()=>{
    if (!modalCreate){
      setEditingKey({});
    }
  },[modalCreate])*/

  const handleDelete = ()=>{
    dispatch(deleteAccessKey());
    setModalDelete(false);
  }

  const keys = useSelector((state: TStore)=>state.user.accessKeys);

  return (
    <React.Fragment>
      {!isLoading && (
        <React.Fragment>
          <div className={`${style.headerRow} ${style.headerRowAccess} ${style.headerRowCenter}`}>
            <div className={`${style.pageTitleCommon} ${style.pageTitleKeys}`}>
              Access keys list
            </div>
            <div className={style.buttonWrap}>
              <Button color={"primary"} size={"big"} onClickHandler={onCreateKey}>Create access key</Button>
            </div>
            <div className={style.mobileButtonWrap}>
              <Button color={"primary"} size={"big"} onClickHandler={onCreateKey}><SvgPlus/></Button>
            </div>
          </div>
          {!isFull(keys) ?
            <EmptyList onClick={createKey} icon={<SvgBigKey/>} textButton={"Create access key"}>
              You do not have any access keys yet
            </EmptyList> :
            <div className={style.content}>
              <TableAccessKeys data={keys} handleDelete={deleteKey}
                                changeStatusKey={changeStatusKey}
                               showKey={(item)=>{
                dispatch(setCurrentAccessKey(item as any))
                setModalCreate(true)}}/>
            </div>
          }
          <DeleteModal visible={modalDelete} onClose={()=>{setModalDelete(false)}} onSubmit={handleDelete} title={"Delete access key"}
                       text={"Are you sure you want to delete this access key?"} textBtnDelete={"Delete Key"}/>

          <CreateAccessKeyModal visible={modalCreate} onClose={()=>{setModalCreate(false)}}
                                secretKey={currentAccessKey?.secretKey || ""}
                                myAccessKey={currentAccessKey?.id || ""}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default AccessKeysPage;

