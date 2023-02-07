import { useWeb3React } from "@web3-react/core";
import { LocalStorage } from "helpers/localStorage";
import { StoredWallet } from "models/StoredWallet";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { finishAuth, setAuthError, setUserData } from "Redux/user/Actions/userActions";
import Web3 from "web3";
import type { AbiItem } from "web3-utils";
import { AppConfig } from "config";
import { formatAccount, usePrevious } from "../common";
import WalletConnector from "./WalletConnector";
import { BaseWallet } from "./wallets";

export const { ethTokenAddress, bscTokenAddress } = AppConfig;

declare global {
  interface Window {
    /*@ts-ignore*/
    ethereum: any;
    torus: any;
    portis: any;
    portis_provider: any;
    wallet: BaseWallet | undefined;
  }
}

export const myWeb3 = new Web3(window.ethereum);

export const getCLS = async (chainId: number, publicKey: string) => {
  const isEth = chainId === 1 || chainId === 4;
  const isBsc = chainId === 56 || chainId === 97;
  const chainAddress = isEth ? ethTokenAddress : isBsc ? bscTokenAddress : undefined;

  try {
    if (window.portis) {
      const lib = new Web3(window.portis_provider);
      const tkn = new lib.eth.Contract(ERC20_ABI, chainAddress);
      return await tkn.methods.balanceOf(publicKey).call();
    }
    const token = new myWeb3.eth.Contract(ERC20_ABI, chainAddress);
    return await token.methods.balanceOf(publicKey).call();
  } catch (e) {
    console.error("Error balance Wallet", e);
    return 0;
  }
};

export function useWeb3({ withLogic = false } = {}) {
  const { connector, chainId, account, activate, active, library, setError, deactivate, error } = useWeb3React<any>();

  const dispatch = useDispatch();

  const prevAccount = usePrevious(account);

  const setBalance = useCallback(() => {
    window?.wallet?.getBalance((balanceCLS) => {
      console.hint.info("BALANCE:", balanceCLS);
      dispatch(setUserData({ balanceCLS }));
    });
  }, [dispatch]);

  const initWeb3 = useCallback(async () => {
    const persistedWallet = LocalStorage.getItem<StoredWallet>("wallet");

    if (persistedWallet && typeof persistedWallet !== "string") {
      const { name: walletName, payload } = persistedWallet;

      const connector = new WalletConnector({ walletName, library, payload });
      window.wallet = await connector.buildWallet();

      if (window.wallet && account) {
        window.wallet.library = library;
        window.wallet.address = account;
        setBalance();
      }
    }
  }, [account, library, prevAccount]);

  // useEffect(() => {
  //   async function init() {
  //     const persistedWallet = LocalStorage.getItem<StoredWallet>("wallet");

  //     if (persistedWallet && typeof persistedWallet !== "string") {
  //       const { name: walletName, payload } = persistedWallet;

  //       const connector = new WalletConnector({ walletName, library, payload });
  //       window.wallet = await connector.buildWallet();

  //       if (window.wallet && account) {
  //         window.wallet.library = library;
  //         window.wallet.address = account;
  //         setBalance();
  //       }
  //     }

  //     if (withLogic) {
  //       if (!isFull(account) && isFull(prevAccount)) {
  //         dispatch(setAuth({ checked: true, result: false }));
  //         deleteToken();
  //       }
  //       if (isFull(account) && !isFull(prevAccount) && window.wallet) {
  //         dispatch(
  //           finishAuth({
  //             signFunc: window.wallet.sign.bind(window.wallet),
  //             account: account as "string | null | undefined",
  //           })
  //         );
  //       }
  //     }
  //   }
  // init();
  // }, [account, dispatch, prevAccount, withLogic, library, setBalance]);

  const activateWallet = (walletName: string, payload = {}): Promise<unknown> => {
    return new Promise(async (resolve, reject) => {
      deactivateWallet();

      const connector = new WalletConnector({ walletName, library, payload });

      const wallet = await connector.buildWallet();
      window.wallet = wallet;

      const isInstalled = wallet.checkIsInstalled();
      console.log("isInstalled", isInstalled, wallet);
      if (isInstalled && wallet.name === "trezor") {
        dispatch(
          finishAuth({
            signFunc: window.wallet._library as any,
            account: wallet.connector,
            walletName: "trezor",
          })
        );

        resolve(true);

        return;
      }
      if (isInstalled && wallet.name === "ledger") {
        try {
          console.hint.success(`SUCCESSFULLY ACTIVATED WALLET «${walletName}»`);
          LocalStorage.setItem<StoredWallet>("wallet", { name: walletName, payload });
          dispatch(
            finishAuth({
              signFunc: window.wallet._library as any,
              account: wallet.connector,
              walletName: "ledger",
            })
          );
          resolve(true);
        } catch (e) {
          console.hint.error(`ERROR WHILE ACTIVATING WALLET «${walletName}»`);
          dispatch(setAuthError({ open: true, errorText: e.message }));
          reject();
        }

        return;
      }
      if (isInstalled) {
        activate(wallet.connector, undefined, true)
          .then(() => {
            console.hint.success(`SUCCESSFULLY ACTIVATED WALLET «${walletName}»`);
            LocalStorage.setItem("wallet", { name: walletName, payload });

            resolve(true);
          })
          .catch((err) => {
            console.hint.error(`ERROR WHILE ACTIVATING WALLET «${walletName}»`);

            dispatch(setAuthError({ open: true, errorText: err.message }));

            reject();
          });
      }
    });
  };

  const invisibleActivate = useCallback(async () => {
    if (window.wallet) {
      return activate(window.wallet.connector, undefined, true).catch((err) => {
        console.error("invisibleActivate error", err);
      });
    }
  }, [activate]);

  const deactivateWallet = () => {
    LocalStorage.deleteItem("wallet");
    window.wallet = undefined;

    deactivate();
  };

  const formattedAccount = useMemo(() => {
    return formatAccount(account);
  }, [account]);

  const checkWalletAuth = useCallback(async () => window?.wallet?.checkAuth(), []);

  const initWalletIfPossible = useCallback(async (_walletName?: string) => {
    let walletName,
      walletPayload = {};

    if (!_walletName) {
      const persistedWallet = LocalStorage.getItem<StoredWallet>("wallet");

      if (!persistedWallet || typeof persistedWallet === "string") return;

      const { name, payload } = persistedWallet;

      walletName = name;
      walletPayload = payload;
    } else {
      walletName = _walletName;
    }

    const connector = new WalletConnector({
      walletName: walletName,
      library: new Web3(window.ethereum),
      payload: walletPayload,
    });

    window.wallet = await connector.buildWallet();
  }, []);

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
    setBalance,
    initWeb3,
  };
}

export const ERC20_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initial_supply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as AbiItem[];
