import clsx from "clsx";
import { DropDownMenu } from "components/Header/DropDownMenu";
import { getWalletName, WalletIcon } from "components/Header/Header";
import { DepositingModal } from "components/UI/Modal/DepositingModal/DepositingModal";
import { deleteToken, formatBalance, formatNumber, isFull } from "helpers/common";
import { useOnClickOutside } from "helpers/hooks/useOnClickOutside";
import { LocalStorage } from "helpers/localStorage";
import { getCLS, useWeb3 } from "helpers/web3/useWeb3";
import SvgExpandDown from "icons/Expand_down";
import SvgUser from "icons/User";
import { StoredWallet } from "models/StoredWallet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsMob } from "Redux/ui/selectors";
import { resetUserStateAction } from "Redux/user/Actions/userActions";
import { selectUsd } from "Redux/user/Selectors/selectUsd";
import { selectUserDataBalanceCLS } from "Redux/user/Selectors/selectUserDataBalanceCLS";
import style from "./WalletMenu.module.scss";

type WalletMenuProps = {
  openSearch?: boolean;
};

export const WalletMenu: React.FC<WalletMenuProps> = ({ openSearch }) => {
  const [open, setOpen] = useState(false);
  const [modalDepositing, setModalDepositing] = useState(false);
  const [balanceCLSWallet, setBalanceCLSWallet] = useState("0");
  const balanceCLS = useSelector(selectUserDataBalanceCLS);
  const usdCourse = useSelector(selectUsd);
  const isMob = useSelector(selectIsMob);
  const currentWallet = LocalStorage.getItem<StoredWallet>("wallet");
  const { formattedAccount, deactivate, account, chainId } = useWeb3();
  const dropPanelRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const usdWallet = useMemo(() => {
    if (balanceCLSWallet && isFull(balanceCLSWallet) && isFull(usdCourse) && +usdCourse > 0) {
      return formatNumber(2, +balanceCLSWallet * +usdCourse) as string;
    }
    return 0;
  }, [usdCourse, balanceCLSWallet]);
  const usd = useMemo(() => {
    if (balanceCLS && isFull(balanceCLS) && isFull(usdCourse) && +usdCourse > 0) {
      return formatNumber(2, +balanceCLS * +usdCourse) as string;
    }
    return 0;
  }, [usdCourse, balanceCLS]);

  const balanceCLSPublicKey = (balance: string) => {
    const formatBalanceWallet = formatBalance(balance);
    setBalanceCLSWallet(formatBalanceWallet);
  };
  const onLogout = () => {
    deactivate();
    deleteToken();
    dispatch(resetUserStateAction());
  };

  useEffect(() => {
    if (account && chainId) {
      getCLS(chainId, account).then(balanceCLSPublicKey);
    }
  }, [chainId, account]);
  useOnClickOutside(rootRef, () => setOpen(false));

  return (
    <div ref={rootRef} className={style.relative}>
      <div
        className={clsx(style.wrapPanel, openSearch && style.hidden)}
        ref={dropPanelRef}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={style.panel}>
          <div className={style.walletIcon}>
            <WalletIcon name={getWalletName(currentWallet)} />
          </div>
          <div className={style.balance}>
            {balanceCLS || 0} CLS {/* 104,082.36 CLS*/}
          </div>
          <div className={style.avatar}>{isMob ? <WalletIcon name={getWalletName(currentWallet)} /> : <SvgUser />}</div>
        </div>
        <div className={style.arrow}>
          <SvgExpandDown color={open ? "#1FCF90" : "#5A5D65"} rotate={open} />
        </div>
      </div>

      {open && (
        <DropDownMenu
          setModalVisible={setModalDepositing}
          balanceCLS={balanceCLS}
          balanceCLSWallet={balanceCLSWallet}
          usd={usd}
          usdWallet={usdWallet}
          chainId={chainId}
          deactivate={onLogout}
          ref={dropRef}
          formattedAccount={formattedAccount}
          onClose={() => setOpen(false)}
        />
      )}
      <DepositingModal visible={modalDepositing} onClose={() => setModalDepositing(false)} />
    </div>
  );
};
