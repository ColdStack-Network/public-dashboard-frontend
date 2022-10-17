import { useWeb3React } from '@web3-react/core'
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from "../../reducers";
import Web3 from 'web3';
import { useEffect, useMemo } from 'react';
import WalletConnector from './WalletConnector';
import { finishAuth, setAuth, setAuthError, setUserData } from "../../modules/user/actions";
import { deleteToken, formatAccount, isFull, removeZeros, usePrevious, wsUrl } from "../common";
import { BaseWallet } from './wallets';

declare global {
  interface Window {
    /*@ts-ignore*/
    ethereum: any;
    torus: any;
    portis: any;
    wallet: BaseWallet | undefined;
  }
}

export const getLibrary = () =>
  new Web3(window.ethereum);

export default function UseWeb3({ withLogic = false } = {}) {
  const {
    connector,
    chainId,
    account,
    activate,
    active,
    library,
    setError,
    deactivate,
    error,
  } = useWeb3React<any>();

  const dispatch = useDispatch();

  const prevAccount = usePrevious(account);

  const address = useSelector((state: TStore) => state.user.userData?.me?.publicKey);

  useEffect(() => {
    if(window.wallet && !window.wallet.isInitilized()) {
      window.wallet.library = library;
      window.wallet.address = address;

      window.wallet.getBalance((balanceCLS) => {
        console.hint.info('BALANCE:', balanceCLS)
        dispatch(setUserData({ balanceCLS }))
      })
    }
  });

  useEffect(() => {
    async function init() {
      const persistedWallet = window.localStorage.getItem("wallet");

      if(persistedWallet) {
        const { name: walletName, payload } = JSON.parse(persistedWallet);

        const connector = new WalletConnector({ walletName, library, payload });

        window.wallet = await connector.buildWallet();
      }

      if (withLogic === true) {
        if (!isFull(account) && isFull(prevAccount)) {
          dispatch(setAuth({checked: true, result: false}));
          deleteToken();
        }
        if (isFull(account) && !isFull(prevAccount) && window.wallet) {
          dispatch(finishAuth({ signFunc: window.wallet.sign.bind(window.wallet), account: account as "string | null | undefined"}));
        }
      }
    }

    init();
  }, [account, dispatch, prevAccount, withLogic, library]);

  const activateWallet = (walletName: string, payload = {}): Promise<unknown> => {
    return new Promise(async (resolve, reject) => {
      deactivateWallet();

      const connector = new WalletConnector({ walletName, library, payload });

      const wallet = await connector.buildWallet();
      window.wallet = wallet;

      const isInstalled = wallet.checkIsInstalled();

      if (isInstalled) {
        activate(wallet.connector, undefined, true)
          .then(() => {
            console.hint.success(`SUCCESSFULLY ACTIVATED WALLET «${walletName}»`);

            window.localStorage.setItem("wallet", JSON.stringify({ name: walletName, payload }));

            resolve(true);
          })
          .catch((err) => {
            console.hint.error(`ERROR WHILE ACTIVATING WALLET «${walletName}»`);

            dispatch(setAuthError({ open: true, errorText: err.message }));

            reject();
          });
      }
    })
  }

  const invisibleActivate = async () => {
    if(window.wallet) {
      return activate(window.wallet.connector, undefined, true)
        .catch((err) => {
          console.error("invisibleActivate error", err);
        });
    }
  }

  const deactivateWallet = () => {
    if (typeof window !== "undefined") {
      // window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("wallet");
      window.wallet = undefined;
    }

    deactivate();
  }

  const formattedAccount = useMemo(() => {
    return formatAccount(account)
  }, [account])

  const checkWalletAuth = async () =>
    window?.wallet?.checkAuth();

  const initWalletIfPossible = async (_walletName?: string) => {
    let walletName, walletPayload = {};

    if(!_walletName) {
      const persistedWallet = window.localStorage.getItem("wallet");

      if(!persistedWallet) return;

      const { name, payload } = JSON.parse(persistedWallet);

      walletName = name;
      walletPayload = payload;
    } else {
      walletName = _walletName;
    }

    const connector = new WalletConnector({
      walletName: walletName,
      library: new Web3(window.ethereum),
      payload: walletPayload
    });

    window.wallet = await connector.buildWallet();
  }

  return {
    wallet: window.wallet,
    connector,
    chainId,
    account,
    activate,
    active,
    library,
    setError,
    error,
    activateWallet,
    deactivate: deactivateWallet,
    invisibleActivate,
    formattedAccount,
    checkWalletAuth,
    initWalletIfPossible,
  }
};
