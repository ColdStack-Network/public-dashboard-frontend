import React, { useEffect, useMemo, useRef, useState } from 'react';
import style from './header.module.scss';
import { Link } from 'react-router-dom'
import SvgSwipeMenuIcon from "../../icons/Swipe_menu_icon";
import SearchInput, { MobileSearch } from "../UI/SearchInput/SearchInput";
import SvgBell from "../../icons/Bell";
import SvgBellPin from "../../icons/Bell_pin";
import SvgExpandDown from "../../icons/Expand_down";
import SvgWalletAlt from "../../icons/Wallet_alt";
import SvgDollar from "../../icons/Dollar";
import SvgVector from "../../icons/Vector";
import SvgAddCard from "../../icons/AddCard";
import SvgSettingLine from "../../icons/Setting_line";
import SvgSignInSquare from "../../icons/Sign_in_square";
import UseWeb3 from "../../helpers/web3/UseWeb3";
import { NotificationsPanel } from "../NotificationsPanel/NotificationsPanel";
import SearchBoxPanel from '../../components/SearchBoxPanel/SearchBoxPanel';
import SvgSearch from "../../icons/Search";
import SvgUser from "../../icons/User";
import { useSelector, useDispatch } from "react-redux";
import { TStore } from "../../reducers";
import { deleteToken, formatNumber, initSocket, isFull } from "../../helpers/common";
import { getNotifications, addNewNotice } from "../../modules/user/actions";
import { getSearchedFilesList } from "../../modules/buckets/actions";

const Header: React.FC<any> = (props: any) => {
  const [val, setVal] = useState("");
  const [open, setOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const dropRef = useRef(null as any);
  const dropRefNotes = useRef(null as any);
  const dropRefNotesPanel = useRef(null as any);
  const dropRefSearchBox = useRef(null as any);
  const dropRefSearchBoxPanel = useRef(null as any);
  const dropPanelRef = useRef(null as any);
  const searchRef = useRef(null as any);
  const dispatch = useDispatch();
  const { formattedAccount, deactivate } = UseWeb3();
  const balanceCLS = useSelector((state: TStore) => state.user.userData?.balanceCLS);

  const onLogout = () => {
    deactivate();
    deleteToken();
  }

  const state = useSelector((state: TStore) => {
    return state
  });
  const usdCourse = useSelector((state: TStore) => {
    return state.user.usd
  });
  const notifications = useSelector((state: TStore) => {
    return state.user.notifications
  });
  const paginationStore = useSelector((state: TStore) => {
    return state.user.notificationsPagination
  });
  const searchedFiles = useSelector((state: TStore) => {
    return state.buckets.searchedFiles
  });

  const usd = useMemo(() => {
    if (balanceCLS && isFull(balanceCLS) && isFull(usdCourse) && +usdCourse > 0) {
      return formatNumber(4, (+balanceCLS * +usdCourse));
    }
    return 0
  }, [usdCourse, balanceCLS]);

  const [openSearch, setOpenSearch] = useState(false);
  const [searchBoxValue, setSearchBoxValue] = useState('');
  const [searchPage, setSearchPage] = useState(1);

  const handleClick = (e) => {
    if (dropRef && dropRef?.current) {
      if (!dropPanelRef?.current?.contains(e.target) && !dropRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    if (dropRefNotes && dropRefNotes?.current) {
      if (!dropRefNotesPanel?.current?.contains(e.target) && !dropRefNotes?.current?.contains(e.target)) {
        setOpenNotifications(false);
      }
    }

    if (dropRefSearchBox && dropRefSearchBox?.current) {
      if (!dropRefSearchBoxPanel?.current?.contains(e.target) && !dropRefSearchBox?.current?.contains(e.target)) {
        setOpenSearchBox(false);
      }
    }

    if (searchRef && searchRef?.current && !searchRef?.current?.contains(e.target)) {
      setOpenSearch(false);
    }

  }
  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  useEffect(() => {
    dispatch(getNotifications({
      pagination: { page: paginationStore?.page, perPage: paginationStore?.perPage },
    }));
  }, [dispatch, paginationStore?.page, paginationStore?.perPage])

  useEffect(() => {
    let socket;
    try{
      socket = initSocket();
      socket.on("ping_event", (msg: any) => {
      });

      socket.on("new_notification", (msg) => {
        dispatch(addNewNotice(msg))
        dispatch(getNotifications({
          pagination: { page: paginationStore?.page, perPage: paginationStore?.perPage },
        }));
      });
    }catch (err){
      console.error(err);
    }

    return () => {

      if (socket) {
        socket?.disconnect();
      }
    };
  }, [dispatch, paginationStore?.page, paginationStore?.perPage]);

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim()) {
      if (searchValue !== searchBoxValue) {
        setSearchPage(1);
      }

      setSearchBoxValue(searchValue);
      dispatch(getSearchedFilesList({ filename: searchValue, pagination: { Page: searchPage, PerPage: 10 } }));
      setOpenSearchBox(true);
    } else {
      setOpenSearchBox(false);
    }
  }

  return (
    <div className={`${style.wrapHeader} ${props.isCollapsed ? style.wrapHeaderCollapsed : ""}`} id={"header"}>
      <div className={style.headerContent}>
        <div className={style.header}>
          <div onClick={props.onClickMenu}
            className={`${style.menuIcon} ${openSearch ? style.menuIconSearchOpen : ""}`}>
            <SvgSwipeMenuIcon />
          </div>
          <div className={style.search} ref={dropRefSearchBoxPanel}>
            <SearchInput onSearch={(v) => { }} onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleSearch((e.target as HTMLInputElement).value)} onChange={(e) => { setVal(e.target.value) }} value={val} onClear={() => { setVal(""); setOpenSearchBox(false); }} />
          </div>
          <div className={`${style.mobileSearch} ${openSearch ? style.mobileSearchOpen : ""}`} onClick={() => { setOpenSearch(true) }} ref={searchRef}>
            <MobileSearch onSearch={(v) => { }} onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleSearch((e.target as HTMLInputElement).value)} onChange={(e) => { setVal(e.target.value) }} value={val} isOpen={openSearch} />
            <div className={style.icon}>
              <SvgSearch />
            </div>
          </div>
          <div className={`${style.wrapBell} ${style.wrapIcon} ${openSearch ? style.hidden : ""}`}
            ref={dropRefNotesPanel}
            onClick={() => {
              setOpenNotifications((prev) => !prev)
            }}>
            {state.user.notifications.unreadCount > 0 ? <SvgBellPin /> : <SvgBell />}
          </div>

          <div className={`${style.wrapPanel} ${openSearch ? style.hidden : ""}`} ref={dropPanelRef} onClick={() => {
            setOpen((prev) => !prev)
          }}>
            <div className={style.panel}>
              <div className={style.clsIcon}>
                <SvgWalletAlt color={"dark"} />
              </div>
              <div className={style.balance}>
                {balanceCLS} CLS {/* 104,082.36 CLS*/}
              </div>
              <div className={style.avatar}>
                <SvgUser />
              </div >
            </div >
            <div className={style.arrow}>
              <SvgExpandDown color={open ? "#1FCF90" : "#5A5D65"} rotate={open} />
            </div>
          </div >

          {open && <Panel balanceCLS={balanceCLS} usd={usd} deactivate={onLogout} dropRef={dropRef}
            formattedAccount={formattedAccount} onClose={() => {
              setOpen(false)
            }} />}
          {
            openNotifications &&
            <NotificationsPanel dropRef={dropRefNotes} items={notifications?.items?.slice(0, 3)} close={() => {
              setOpenNotifications(false)
            }} />
          }
          {
            openSearchBox && searchedFiles &&
            <SearchBoxPanel
              dropRef={dropRefSearchBox}
              items={searchedFiles}
              searchValue={searchBoxValue}
              searchPage={searchPage}
              close={() => { setOpenSearchBox(false); setVal(''); }}
              onScroll={(page) => setSearchPage(page)}
            />
          }
        </div >
      </div >
    </div >
  )
}
export default Header;


export const Panel = ({ deactivate, formattedAccount, balanceCLS, usd, dropRef, onClose }) => {
  return (
    <div className={style.dropdownPanel} ref={dropRef}>
      <div className={style.dropdownBlock}>
        <div className={style.dropdownItem}>
          <div className={style.smallIcon}><SvgWalletAlt color={"light"} /></div>
          <div>
            {formattedAccount}
          </div>
        </div >
        <div className={style.dropdownItem}>
          <div className={style.dropdownBalanceIcon}>
            <SvgVector />
          </div>
          <div>
            <div className={style.textBalance}>Balance</div>
            <div className={style.dropdownCoins}>{balanceCLS} CLS</div>
          </div>
        </div>
        <div className={style.dropdownItem}>
          <div className={style.dropdownBalanceIcon}>
            <SvgDollar />
          </div>
          <div>
            <div className={style.textBalance}>Balance</div>
            <div className={style.dropdownCoins}>{usd} USD</div>
          </div>
        </div>
        <div className={style.dropdownItem}>
          <div className={style.addCard}>
            <SvgAddCard />
          </div>
        </div>
      </div >
      <div className={style.dropdownBlock}>
        <div className={`${style.dropdownItem} ${style.button}`}>
          <div className={style.smallIcon}><SvgSettingLine /></div>
          <Link className={style.text} to={"/settings"} onClick={onClose}> Account Settings</Link>
        </div >
        <div className={`${style.dropdownItem} ${style.button}`}>
          <div className={style.smallIcon}><SvgSignInSquare /></div>
          <div className={style.text} onClick={deactivate}> Disconnect Wallet</div>
        </div>
      </div >
    </div >
  )
}

