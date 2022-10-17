import React, { useCallback, useEffect, useMemo, useState } from 'react';
import style from './authpage.module.scss';
import AuthWallet, { AuthWalletProps } from "../../components/AuthWallet/AuthWallet";
import SvgMetamask from "../../icons/Metamask";
import SvgTorus from "../../icons/Torus";
import SvgPortis from "../../icons/Portis";
import UseWeb3 from "../../helpers/web3/UseWeb3";
import { useDispatch, useSelector } from "react-redux";
import AuthErrorModal from "../../components/UI/Modal/AuthErrorModal/AuthErrorModal";
import { finishAuth, setAuthError } from "../../modules/user/actions";
import { deleteToken, usePrevious } from "../../helpers/common";
import { useMetamask, useTorus, usePortis } from './wallet-providers';
import TorusAuthModal from "../../components/UI/Modal/TorusAuthModal";

import { WALLETS, AUTH_PAGE } from 'helpers/constants';
import WhatIsWalletModal from 'components/UI/Modal/WhatIsWalletModal';

const { METAMASK, PORTIS, TORUS } = WALLETS;

const AuthPage: React.FC<any> = (props: any) => {
  const { wallet, account } = UseWeb3();
  const [torusModalVisible, setTorusModalVisible] = useState(false);
  const [WIWModalVisible, setWIWModalVisible] = useState(false);
  const dispatch = useDispatch();
  const authError = useSelector((state: any) => state.user.authError);
  const onCloseModal = useCallback(() => {
    dispatch(setAuthError({ open: false, errorText: "" }));
  }, [dispatch])

  const onClickMetamask = useMetamask();

  const onClickTorus = useTorus(() => {
    setTorusModalVisible(true);
  });

  const onClickPortis = usePortis();

  const prevAccount = usePrevious(account);

  useEffect(() => {
    console.log({ prevAccount, account, wallet });

    if (prevAccount !== account && account && wallet) {
      dispatch(finishAuth({ signFunc: wallet.sign.bind(wallet), account }))
    }

    if (!wallet) {
      deleteToken();
    }
  }, [account, prevAccount, dispatch, wallet])

  const wallets = useMemo(() => {
    return [
      {
        title: AUTH_PAGE.WALLETS.METAMASK.TITLE,
        token: METAMASK,
        active: true,
        subtitle: AUTH_PAGE.WALLETS.METAMASK.SUBTITLE,
        icon: <SvgMetamask />,
        badgeText: AUTH_PAGE.DEFAULT,
        onClick: onClickMetamask
      },
      {
        title: AUTH_PAGE.WALLETS.TORUS.TITLE,
        token: TORUS,
        active: process.env.REACT_APP_ENV !== 'production',
        subtitle: AUTH_PAGE.WALLETS.TORUS.SUBTITLE,
        icon: <SvgTorus />,
        badgeText: process.env.REACT_APP_ENV === "production" ? AUTH_PAGE.COMIING_SOON : null,
        onClick: onClickTorus
      },
      {
        title: AUTH_PAGE.WALLETS.PORTIS.TITLE,
        token: PORTIS,
        active: process.env.REACT_APP_ENV !== 'production',
        subtitle: AUTH_PAGE.WALLETS.PORTIS.SUBTITLE,
        icon: <SvgPortis />,
        badgeText: process.env.REACT_APP_ENV === "production" ? AUTH_PAGE.COMIING_SOON : null,
        onClick: onClickPortis
      }

    ] as AuthWalletProps[];
  },
    [onClickMetamask, onClickPortis, onClickTorus]);

  return (
    <React.Fragment>
      <TorusAuthModal visible={torusModalVisible} onClose={() => setTorusModalVisible(false)} />
      <WhatIsWalletModal visible={WIWModalVisible} onClose={() => setWIWModalVisible(false)} />

      <div className={style.title}>
        Connect your wallet
      </div>
      <div className={style.subtitle}>
        Connect with one of available wallet providers or create a new wallet. <span className={style.link} onClick={() => setWIWModalVisible(true)}> What is a wallet? </span>
      </div>

      <div className={style.wallets}>
        {wallets.map((props, key) => {
          return <AuthWallet key={key} {...props} />
        })}
      </div>
      <AuthErrorModal visible={authError?.open} onClose={onCloseModal} errorText={authError?.errorText} />
    </React.Fragment>
  )
}
export default AuthPage;
