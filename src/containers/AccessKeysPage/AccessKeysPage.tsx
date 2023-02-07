import React, { useCallback, useState } from "react";
import style from "./accessKeysPage.module.scss";
import EmptyList from "../../components/EmptyList/EmptyList";
import { isFull } from "../../helpers/common";
import SvgBigKey from "../../icons/BigKey";
import TableAccessKeys from "../../components/Table/TableAccessKeys/TableAccessKeys";
import CreateAccessKeyModal from "../../components/UI/Modal/CreateAccessKeyModal/CreateAccessKeyModal";
import { DeleteModal } from "../../components/UI/Modal/DeleteModal/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import SvgPlus from "../../icons/Plus";
import Button from "../../components/UI/Button/Button";
import {
  createAccessKey,
  deleteAccessKey,
  setCurrentAccessKey,
  setStatusAccessKey,
} from "../../Redux/user/Actions/userActions";
import { selectAccessKeyCurrent } from "../../Redux/user/Selectors/selectAccessKeyCurrent";
import { selectAccessKey } from "../../Redux/user/Selectors/selectAccessKey";
import { AccessKey } from "models/AccessKey";
import { ChangeStatusPayload } from "actions/actionTypes";
import clsx from "clsx";

const AccessKeysPage: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false); // wtf?
  const [modalCreate, setModalCreate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const currentAccessKey = useSelector(selectAccessKeyCurrent);
  const keys = useSelector(selectAccessKey);

  const createKey = useCallback(() => setModalCreate(true), []);
  const deleteKey = useCallback(
    (key: AccessKey) => {
      dispatch(setCurrentAccessKey(key));
      setModalDelete(true);
    },
    [dispatch]
  );
  const changeStatusKey = (payload: ChangeStatusPayload) => {
    dispatch(setStatusAccessKey(payload));
  };
  const onCreateKey = () => {
    dispatch(
      createAccessKey({
        onSuccess: () => {
          setModalCreate(true);
        },
      })
    );
  };
  const handleDelete = () => {
    dispatch(deleteAccessKey());
    setModalDelete(false);
  };

  if (isLoading) return <div>loading...</div>;
  return (
    <React.Fragment>
      <div className={clsx(style.headerRow, style.headerRowAccess, style.headerRowCenter)}>
        <div className={clsx(style.pageTitleCommon, style.pageTitleKeys)}>Access keys list</div>
        <div className={style.buttonWrap}>
          <Button color="primary" size="big" onClickHandler={onCreateKey}>
            Create access key
          </Button>
        </div>
        <div className={style.mobileButtonWrap}>
          <Button color="primary" size="big" onClickHandler={onCreateKey}>
            <SvgPlus />
          </Button>
        </div>
      </div>
      {!isFull(keys) ? (
        <EmptyList onClick={createKey} icon={<SvgBigKey />} textButton="Create access key">
          You do not have any access keys yet
        </EmptyList>
      ) : (
        <div className={style.content}>
          <TableAccessKeys
            data={keys}
            handleDelete={deleteKey}
            changeStatusKey={changeStatusKey}
            showKey={(item) => {
              dispatch(setCurrentAccessKey(item));
              setModalCreate(true);
            }}
          />
        </div>
      )}
      <DeleteModal
        visible={modalDelete}
        onClose={() => setModalDelete(false)}
        onSubmit={handleDelete}
        title="Delete access key"
        text="Are you sure you want to delete this access key?"
        textBtnDelete="Delete Key"
      />

      <CreateAccessKeyModal
        visible={modalCreate}
        onClose={() => setModalCreate(false)}
        secretKey={currentAccessKey?.secretKey || ""}
        myAccessKey={currentAccessKey?.id || ""}
      />
    </React.Fragment>
  );
};

export default AccessKeysPage;
