import React, { useCallback, useEffect, useMemo, useState } from "react";
import style from "./authpage.module.scss";
import AuthWallet, { AuthWalletProps } from "../../components/AuthWallet/AuthWallet";
import SvgMetamask from "../../icons/Metamask";
import SvgPortis from "../../icons/Portis";
import { useWeb3 } from "helpers/web3/useWeb3";
import { useDispatch, useSelector } from "react-redux";
import AuthErrorModal from "../../components/UI/Modal/AuthErrorModal/AuthErrorModal";
import { finishAuth, setAuthError, setRedirectAuth } from "Redux/user/Actions/userActions";
import { deleteToken, usePrevious } from "helpers/common";
import { useMetamask, usePortis } from "./wallet-providers";
import { WALLETS, AUTH_PAGE } from "helpers/constants";
import WhatIsWalletModal from "components/UI/Modal/WhatIsWalletModal";
import { Ledger } from "icons/Ledger";
import useLedger from "./wallet-providers/useLedger";
import { useQuery } from "helpers/useQuery";
import useTrezor from "./wallet-providers/useTrezor";
import { Trezor } from "icons/Trezor";
import { useGetSelectedAddr } from "helpers/hooks/useEthereum";
import { HelperAuthModal } from "./HelperAuthModal/HelperAuthModal";
import { setConnectingWallet } from "Redux/account/Actions/accountActions";
import { observerEtherAddress } from "helpers/EtherAddObserver";
import {WalletConnect} from "../../icons/WalletConnect";
import useWalletConnect from "./wallet-providers/useWalletConnect";

const { METAMASK, PORTIS, LEDGER, TREZOR, WALLETCONNECT } = WALLETS;

const AuthPage: React.FC = () => {
  const { wallet, account } = useWeb3();
  const [WIWModalVisible, setWIWModalVisible] = useState(false);
  const selectedAddress = useGetSelectedAddr();
  const [helperAuthModal, sethelperAuthModal] = useState(false);
  const prevModalState = usePrevious(helperAuthModal);
  const authError = useSelector((state: any) => state.user.authError);
  const prevAccount = usePrevious(account);
  const { get } = useQuery();
  const redirectTo = get("redirect_to");
  const [lightMetamask, setLightMetamask] = useState(false);

  const handleConnectMetamask = useMetamask();
  const dispatch = useDispatch();
  const onCloseModal = useCallback(() => {
    dispatch(setAuthError({ open: false, errorText: "" }));
  }, [dispatch]);
  const onClickMetamask = async () => {
    // unsafe method -> but nothing else least
    const showPopup = await observerEtherAddress.isMetamakUnlocked();
    if (!showPopup) {
      return sethelperAuthModal(true);
    }

    handleConnectMetamask();
  };
  const onClickPortis = usePortis();
  const onClickLedger = useLedger();
  const onClickTrezor = useTrezor();
  const onClickWalletConnect = useWalletConnect();
  const handleCloseHelperPopup = () => {
    dispatch(setConnectingWallet(""));
    sethelperAuthModal(false);
  };

  useEffect(() => {
    console.log({ prevAccount, account, wallet });

    if (prevAccount !== account && account && wallet) {
      dispatch(finishAuth({ signFunc: wallet.sign.bind(wallet), account }));
    }

    if (!wallet) {
      deleteToken();
    }
  }, [account, prevAccount, dispatch, wallet]);

  const wallets = useMemo(() => {
    return [
      {
        title: AUTH_PAGE.WALLETS.METAMASK.TITLE,
        token: METAMASK,
        active: true,
        subtitle: AUTH_PAGE.WALLETS.METAMASK.SUBTITLE,
        icon: <SvgMetamask />,
        badgeText: AUTH_PAGE.DEFAULT,
        onClick: onClickMetamask,
      },
      {
        title: AUTH_PAGE.WALLETS.PORTIS.TITLE,
        token: PORTIS,
        active: true,
        subtitle: AUTH_PAGE.WALLETS.PORTIS.SUBTITLE,
        icon: <SvgPortis />,
        badgeText: null,
        onClick: onClickPortis,
      },
      {
        title: AUTH_PAGE.WALLETS.LEDGER.TITLE,
        token: LEDGER,
        active: true,
        subtitle: AUTH_PAGE.WALLETS.LEDGER.SUBTITLE,
        icon: <Ledger />,
        badgeText: null,
        onClick: onClickLedger,
      },
      {
        title: AUTH_PAGE.WALLETS.TREZOR.TITLE,
        token: TREZOR,
        active: true,
        subtitle: AUTH_PAGE.WALLETS.TREZOR.SUBTITLE,
        icon: <Trezor />,
        badgeText: null,
        onClick: onClickTrezor,
      },
      {
        title: AUTH_PAGE.WALLETS.WALLETCONNECT.TITLE,
        token: WALLETCONNECT,
        active: true,
        subtitle: AUTH_PAGE.WALLETS.WALLETCONNECT.SUBTITLE,
        icon: <WalletConnect />,
        badgeText: null,
        onClick: onClickWalletConnect,
      },
    ] as AuthWalletProps[];
  }, [onClickLedger, onClickMetamask, onClickPortis, onClickTrezor, onClickWalletConnect]);

  useEffect(() => {
    if (redirectTo) {
      dispatch(setRedirectAuth(redirectTo));
    }
  }, [redirectTo, dispatch]);

  useEffect(() => {
    if (selectedAddress) {
      handleCloseHelperPopup();
    }

    return () => {
      setLightMetamask(false);
    };
  }, [selectedAddress]);

  useEffect(() => {
    if (prevModalState && selectedAddress) {
      setLightMetamask(true);
    }
  }, [helperAuthModal, selectedAddress]);

  return (
    <React.Fragment>
      <WhatIsWalletModal visible={WIWModalVisible} onClose={() => setWIWModalVisible(false)} />

      <div className={style.title}>Connect your wallet</div>
      <div className={style.subtitle}>
        Connect with one of the available wallet providers or create a new wallet.{" "}
        <span className={style.link} onClick={() => setWIWModalVisible(true)}>
          {" "}
          What is a wallet?{" "}
        </span>
      </div>

      <div className={style.wallets}>
        {wallets.map((props, key) => {
          const metamskWallet = props.token === METAMASK;
          return <AuthWallet highLight={metamskWallet && lightMetamask} key={key} {...props} />;
        })}
      </div>
      <AuthErrorModal visible={authError?.open} onClose={onCloseModal} errorText={authError?.errorText} />
      <HelperAuthModal opened={helperAuthModal} close={handleCloseHelperPopup} />
    </React.Fragment>
  );
};
export default AuthPage;
