import React, { useCallback, useEffect, useMemo, useState } from "react";
import style from "./notificationsPage.module.scss";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import SvgExpandDown from "../../icons/Expand_down";
import { LabelNotification } from "../../components/NotificationsPanel/NotificationsPanel";
import SvgView from "../../icons/View";
import { useDispatch, useSelector } from "react-redux";
import { formatDateTransactions, isFull, usePrevious } from "../../helpers/common";
import { useHistory } from "react-router-dom";
import {
  getNotifications,
  setNotificationsPagination,
  setMakeAllReadNotifications,
} from "../../Redux/user/Actions/userActions";
import Pagination from "../../components/UI/Pagination/Pagination";
import { SelectItemPagination } from "../../components/UI/Pagination/SelectPagination/types";
import { selectNotifications } from "../../Redux/user/Selectors/selectNotfication";
import { selectNotificationsPagination } from "../../Redux/user/Selectors/selectNotficationPagination";

const NotificationsPage: React.FC<any> = () => {
  const { search } = useLocation();
  const query = queryString.parse(search);
  const history = useHistory();
  const dispatch = useDispatch();

  const notifications = useSelector(selectNotifications);
  const paginationStore = useSelector(selectNotificationsPagination);

  const notificationPageMas = useMemo(() => {
    let notificationPage = [] as any;
    notifications?.items?.forEach((item) => {
      notificationPage.push(item.id);
    });
    return notificationPage;
  }, [notifications.items]);

  const pagination = useMemo(() => {
    let res = {} as any;
    if (query?.page) {
      res.page = +query.page;
    }
    if (query.perPage) {
      res.perPage = +query.perPage;
    }
    return res;
  }, [query]);

  const prevPaginationStore = usePrevious(paginationStore) as any;
  const prevQueryId = usePrevious(query?.id);

  useEffect(() => {
    if (isFull(query?.id) && query.id && prevQueryId !== query.id) {
      const note = document.getElementById(query.id as string);
      if (note) {
        const header = document.getElementById("header");
        const offset = header ? header.offsetHeight : 20;
        const top = note.getBoundingClientRect().top - offset - 10;
        window.scrollBy({ top: top });
        const notification = notifications?.items?.find((item) => {
          if (query.id) {
            return +item?.id === +query?.id;
          }
          return false;
        });
        const isNew = notification?.readAt === null;
        if (isNew) {
          dispatch(
            setMakeAllReadNotifications({
              ids: [+query.id],
              pagination: {
                page: paginationStore?.page,
                perPage: paginationStore?.perPage,
              },
            })
          );
        }
      }
    }
  }, [query?.id, prevQueryId, dispatch, paginationStore?.page, paginationStore?.perPage, notifications]);

  useEffect(() => {
    const pathname = history?.location?.pathname;
    const diffPagination =
      (paginationStore?.page?.toString() !== pagination?.page?.toString() ||
        paginationStore?.perPage?.toString() !== pagination?.perPage?.toString()) &&
      isFull(paginationStore); //pagination from store != url

    const isInitialUrlPagination = isFull(pagination?.page) && isFull(pagination?.perPage);

    if (query?.id) {
      if (typeof prevPaginationStore === "undefined") {
        //first mount
        history.replace(`${pathname}?&perPage=${paginationStore?.perPage}&id=${query.id}`);
        dispatch(
          getNotifications({
            pagination: { perPage: paginationStore?.perPage, id: query.id },
          })
        );
      }
    }

    if (!query.id) {
      if (typeof prevPaginationStore === "undefined") {
        //first mount
        if (isInitialUrlPagination && diffPagination) {
          //pagination is in url && pagination !== paginationStore
          dispatch(setNotificationsPagination(pagination));
        } else {
          history.replace(`${pathname}?page=${paginationStore?.page}&perPage=${paginationStore?.perPage}`);
          dispatch(
            getNotifications({
              pagination: { page: paginationStore?.page, perPage: paginationStore?.perPage },
            })
          );
        }
      } else {
        //not first mount
        if (
          isFull(prevPaginationStore) &&
          (prevPaginationStore?.page !== paginationStore.page ||
            prevPaginationStore?.perPage !== paginationStore.perPage)
        ) {
          //pagination in store has changed
          history.replace(`${pathname}?page=${paginationStore?.page}&perPage=${paginationStore?.perPage}`);
          dispatch(
            getNotifications({
              pagination: { page: paginationStore?.page, perPage: paginationStore?.perPage },
            })
          );
        }
      }
    }

    /*if ((paginationStore?.page?.toString() !== pagination?.page?.toString() || paginationStore?.perPage?.toString() !== pagination?.perPage?.toString())
      && (isFull(paginationStore))) { //pagination from store != url
      const pathname = history?.location?.pathname;
      if (query?.id){
       // history.replace(`${pathname}?page=${paginationStore?.page}&perPage=${paginationStore?.perPage}`);

      }else{
        history.replace(`${pathname}?page=${paginationStore?.page}&perPage=${paginationStore?.perPage}`);
        alert(1);
        dispatch(getNotifications({
          pagination: {Page: pagination?.page, PerPage: pagination?.perPage},
        }));
      }

      if (isFull(prevPaginationStore) && (prevPaginationStore?.page !== paginationStore.page ||
        prevPaginationStore?.perPage !== paginationStore.perPage)) {  //pagination in store has changed
        dispatch(getNotifications({
          pagination: {Page: pagination?.page, PerPage: pagination?.perPage},
        }));
      }
    }*/
  }, [pagination, paginationStore, prevPaginationStore, history, query, dispatch]);

  const onClickPage = (page) => {
    dispatch(
      setNotificationsPagination({
        page: page,
        perPage: paginationStore?.perPage,
        pagesCount: paginationStore?.pagesCount,
      })
    );
    if (query?.id) {
      const pathname = history?.location?.pathname;
      history.replace(`${pathname}?page=${page}&perPage=${paginationStore?.perPage}`);
    }
  };
  const onSelect = (elem: SelectItemPagination) => {
    dispatch(
      setNotificationsPagination({
        page: paginationStore.page,
        perPage: elem?.id,
        pagesCount: paginationStore?.pagesCount,
      })
    );
  };

  const makeAllRead = () => {
    dispatch(
      setMakeAllReadNotifications({
        ids: notificationPageMas,
        pagination: {
          page: paginationStore?.page,
          perPage: paginationStore?.perPage,
        },
      })
    );
  };
  const onOpenNotification = useCallback(
    (notification) => {
      const isNew = notification?.readAt === null;
      if (isNew) {
        dispatch(
          setMakeAllReadNotifications({
            ids: [+notification?.id],
            pagination: {
              page: paginationStore?.page,
              perPage: paginationStore?.perPage,
            },
          })
        );
      }
    },
    [dispatch, paginationStore?.page, paginationStore?.perPage]
  );

  return (
    <div className={style.containerPage}>
      <div className={`${style.headerRow} ${style.headerRowCenter}`}>
        <div className={`${style.titleRow} ${style.titleRowNotifications}`}>
          <div className={`${style.pageTitleCommon} ${style.pageTitle}`}>Notifications list</div>
        </div>
        <div className={style.buttonsRow}>
          <div className={style.buttonWrap}>
            <Button
              color={"primary"}
              size={"big"}
              onClickHandler={() => {
                makeAllRead();
              }}
            >
              Mark all as read
            </Button>
          </div>
          <div className={style.mobileButtonWrap}>
            <Button
              color={"primary"}
              size={"big"}
              onClickHandler={() => {
                makeAllRead();
              }}
            >
              <SvgView color={"white"} />
            </Button>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.grid}>
          <div className={style.col1}>
            <div className={style.block}>
              {notifications?.items &&
                notifications.items.map((item) => {
                  return (
                    <NotificationsItemElem
                      key={item.id}
                      item={item}
                      isOpen={query?.id && +query?.id === +item.id}
                      onOpenNotification={() => {
                        onOpenNotification(item);
                      }}
                    />
                  );
                })}
            </div>
            <div className={style.pagination}>
              <Pagination
                hasSelect={true}
                valueDropdown={{
                  id: Number(paginationStore?.perPage),
                  name: Number(paginationStore?.perPage),
                }}
                count={Number(paginationStore?.pagesCount)}
                onClickPage={onClickPage}
                activePage={paginationStore?.page}
                onSelect={onSelect}
                dropdowns={[
                  { id: 5, name: 5 },
                  { id: 10, name: 10 },
                  { id: 15, name: 15 },
                ]}
              />
            </div>
          </div>
          <div className={style.col2}>
            <div className={`${style.block} ${style.blockCustom}`}>
              <div className={style.blockTitle}>Message Statistics</div>
              <div className={style.blockRow}>
                <div className={style.blockRowLeft}>Total Messages:</div>
                <div className={style.blockRowRight}>{notifications?.totalCount || 0}</div>
              </div>
              <div className={style.blockRow}>
                <div className={style.blockRowLeft}>Read messages:</div>
                <div className={style.blockRowRight}>{notifications?.readCount || 0}</div>
              </div>
              <div className={style.blockRow}>
                <div className={style.blockRowLeft}>Unread messages:</div>
                <div className={style.blockRowRight}>{notifications?.unreadCount || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationsPage;

export const NotificationsItemElem = (props) => {
  const { createdAt, readAt, id, description, title } = props.item;
  const { onOpenNotification, isOpen } = props;
  const [onOpen, setOnOpen] = useState(isOpen);
  const prevIsOpen = usePrevious(isOpen);
  useEffect(() => {
    if (prevIsOpen !== isOpen) {
      setOnOpen(isOpen);
    }
  }, [isOpen, prevIsOpen]);
  return (
    <div className={`${style.elem} ${!readAt ? style.elemNew : ""}`} id={id}>
      {/*@ts-ignore*/} {/*eslint-disable-next-line*/}
      <div className={style.elemTopRow}>
        <div className={style.elemLeft}>
          <div className={style.elemDate}>{formatDateTransactions(createdAt)}</div>
          {!readAt && (
            <div className={style.elemIsNew}>
              <LabelNotification text={"new"} />
            </div>
          )}
        </div>
        <div
          className={style.elemRight}
          onClick={() => {
            if (!onOpen) {
              onOpenNotification(id);
            }
            setOnOpen(!onOpen);
          }}
        >
          <SvgExpandDown rotate={onOpen} color={onOpen ? "#1FCF90" : "#333333"} />
        </div>
      </div>
      <div className={style.elemTitle}>{title}</div>
      <div className={style.elemText}>{onOpen ? description : description.slice(0, 150)}</div>
    </div>
  );
};
