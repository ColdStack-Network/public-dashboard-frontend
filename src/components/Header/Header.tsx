import React, { useEffect, useRef, useState } from "react";
import style from "./header.module.scss";
import SvgSwipeMenuIcon from "../../icons/Swipe_menu_icon";
import SearchInput, { MobileSearch } from "../UI/SearchInput/SearchInput";
import SvgBell from "../../icons/Bell";
import SvgBellPin from "../../icons/Bell_pin";
import SvgWalletAlt from "../../icons/Wallet_alt";
import { NotificationsPanel } from "../NotificationsPanel/NotificationsPanel";
import SearchBoxPanel from "../../components/SearchBoxPanel/SearchBoxPanel";
import SvgSearch from "../../icons/Search";
import { useSelector, useDispatch } from "react-redux";
import { initSocket } from "../../helpers/common";
import { getNotifications, addNewNotice } from "../../Redux/user/Actions/userActions";
import { getSearchedFilesList } from "../../Redux/buckets/Actions/bucketsActions";
import { selectNotifications } from "../../Redux/user/Selectors/selectNotfication";
import { selectNotificationsPagination } from "../../Redux/user/Selectors/selectNotficationPagination";
import { selectSearchedFiles } from "../../Redux/buckets/Selectors/selectSearchedFiles";
import { selectNotificationsUnreadCount } from "../../Redux/user/Selectors/selectNotificationsUnreadCount";
import clsx from "clsx";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import SvgMetamask from "icons/Metamask";
import SvgPortis from "icons/Portis";
import { StoredWallet } from "models/StoredWallet";
import { WalletMenu } from "components/WalletMenu/WalletMenu";

type HeaderProps = {
  isCollapsed: boolean;
  onClickMenu: () => void;
};

const METAMASK = "metamask";
const PORTIS = "portis";

export const WalletIcon = ({ name }: { name: string }) => {
  switch (true) {
    case name === METAMASK: {
      return <SvgMetamask width={24} height={24} />;
    }
    case name === PORTIS: {
      return <SvgPortis width={24} height={24} />;
    }
    default:
      return <SvgWalletAlt color="dark" />;
  }
};

export const getWalletName = (wallet: StoredWallet | string | null): string => {
  if (!wallet) return "";
  if (typeof wallet === "string") return wallet;
  return wallet.name;
};

export const Header: React.FC<HeaderProps> = ({ isCollapsed, onClickMenu }) => {
  const [val, setVal] = useState("");
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const notifications = useSelector(selectNotifications);
  const paginationStore = useSelector(selectNotificationsPagination);
  const searchedFiles = useSelector(selectSearchedFiles);
  const unreadCount = useSelector(selectNotificationsUnreadCount);

  const dropRefNotes = useRef<HTMLDivElement>(null);
  const dropRefNotesPanel = useRef<HTMLDivElement>(null);
  const dropRefSearchBox = useRef<HTMLDivElement>(null);
  const dropRefSearchBoxPanel = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim()) {
      if (searchValue !== searchBoxValue) {
        setSearchPage(1);
      }

      setSearchBoxValue(searchValue);
      dispatch(
        getSearchedFilesList({
          filename: searchValue,
          pagination: { Page: searchPage, PerPage: 10 },
        })
      );
      return setOpenSearchBox(true);
    }
    setOpenSearchBox(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (dropRefNotes && dropRefNotes?.current) {
        if (!dropRefNotesPanel?.current?.contains(target) && !dropRefNotes?.current?.contains(target)) {
          setOpenNotifications(false);
        }
      }

      if (dropRefSearchBox && dropRefSearchBox?.current) {
        if (!dropRefSearchBoxPanel?.current?.contains(target) && !dropRefSearchBox?.current?.contains(target)) {
          setOpenSearchBox(false);
        }
      }

      if (searchRef && searchRef?.current && !searchRef?.current?.contains(target)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    dispatch(
      getNotifications({
        pagination: { page: paginationStore?.page, perPage: paginationStore?.perPage },
      })
    );
  }, [dispatch, paginationStore?.page, paginationStore?.perPage]);

  useEffect(() => {
    let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    try {
      socket = initSocket();

      socket.on("new_notification", (msg) => {
        dispatch(addNewNotice(msg as Notification));
        dispatch(
          getNotifications({
            pagination: { page: paginationStore?.page, perPage: paginationStore?.perPage },
          })
        );
      });
    } catch (err) {
      console.error(err);
    }

    return () => {
      if (socket) {
        socket?.disconnect();
      }
    };
  }, [dispatch, paginationStore?.page, paginationStore?.perPage]);

  return (
    <div className={clsx(style.wrapHeader, isCollapsed && style.wrapHeaderCollapsed)} id="header">
      <div className={style.headerContent}>
        <div className={style.header}>
          <div onClick={onClickMenu} className={clsx(style.menuIcon, openSearch && style.menuIconSearchOpen)}>
            <SvgSwipeMenuIcon />
          </div>
          <div className={style.search} ref={dropRefSearchBoxPanel}>
            <SearchInput
              onSearch={(v) => {}}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleSearch((e.target as HTMLInputElement).value)}
              onChange={(e) => setVal(e.target.value)}
              value={val}
              onClear={() => {
                setVal("");
                setOpenSearchBox(false);
              }}
            />
          </div>
          <div
            className={clsx(style.mobileSearch, openSearch && style.mobileSearchOpen)}
            onClick={() => setOpenSearch(true)}
            ref={searchRef}
          >
            <MobileSearch
              onSearch={(v) => {}}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleSearch((e.target as HTMLInputElement).value)}
              onChange={(e) => setVal(e.target.value)}
              value={val}
              isOpen={openSearch}
            />
            <div className={style.icon}>
              <SvgSearch />
            </div>
          </div>
          <div
            className={clsx(style.wrapBell, style.wrapIcon, openSearch && style.hidden)}
            ref={dropRefNotesPanel}
            onClick={() => setOpenNotifications((prev) => !prev)}
          >
            {unreadCount > 0 ? <SvgBellPin /> : <SvgBell />}
          </div>

          <WalletMenu openSearch={openSearch} />
          {openNotifications && (
            <NotificationsPanel
              dropRef={dropRefNotes}
              items={notifications?.items?.slice(0, 3)}
              close={() => setOpenNotifications(false)}
            />
          )}
          {openSearchBox && searchedFiles && (
            <SearchBoxPanel
              dropRef={dropRefSearchBox}
              items={searchedFiles}
              searchValue={searchBoxValue}
              searchPage={searchPage}
              close={() => {
                setOpenSearchBox(false);
                setVal("");
              }}
              onScroll={(page) => setSearchPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
