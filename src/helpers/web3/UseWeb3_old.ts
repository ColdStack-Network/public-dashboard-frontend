import {useWeb3React} from '@web3-react/core'
import Web3 from 'web3';
import {InjectedConnector} from '@web3-react/injected-connector'
import {PortisConnector} from '@web3-react/portis-connector'
import {TorusConnector} from '@web3-react/torus-connector'

import  {useEffect, useMemo} from "react";
/*import {formatEther} from "@ethersproject/units";*/
import {useDispatch, useSelector} from "react-redux";
import {deleteToken, formatAccount, isFull, removeZeros, usePrevious, wsUrl} from "../common";
import {finishAuth, setAuth, setAuthError, setUserData} from "../../modules/user/actions";

import {TStore} from "../../reducers";
import Big from 'big.js';
import {waitReady} from "@polkadot/wasm-crypto";
import {WsProvider} from "@polkadot/rpc-provider/ws";
import {ApiPromise} from "@polkadot/api";


declare global {
  interface Window {
    /*@ts-ignore*/
    ethereum: any;
  }
}

let mas = [] as any;
for (let i=0; i<=300; i++){
  mas[i] = i;
}

export const injectedConnector = new InjectedConnector({
  supportedChainIds: mas
  /*supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],*/
})
/*export const walletconnect = new WalletConnectConnector({
  infuraId: "ea5f6d45e0574436b028d56e0cacf511",
  qrcode: true,
  pollingInterval: 12000
})*/

export const portisConnector = new PortisConnector({
  dAppId: '8c7328bf-e1f5-4162-9fe6-2d3d355f2fc4', networks: [1, 100]
})

export const torusConnector = new TorusConnector({
  chainId: 1
})

let myWeb3;

export function initWeb3() {
  myWeb3 = new Web3(window.ethereum);
  return myWeb3;
}

export function getLibrary(provider: any): any {
  return initWeb3();
}

export function isMetaMaskInstalled() {
  const {ethereum} = window;
  return Boolean(ethereum && ethereum.isMetaMask);
}

export default function UseWeb3({ withLogic = false } = {}) {
  const {connector, chainId, account, activate, active, library, setError, deactivate, error} = useWeb3React<any>()
  // console.log("accoun!!t",account);
  const dispatch = useDispatch();
  //const isAuthorized = useSelector((state: any) => state.user.isAuthorized);
  //const cls_token_address = "0x32376B979E619304d902AEE26B559652767a0cD4";

  const prevAccount = usePrevious(account);

  /*const [balanceCLS, setBalanceCLS] = React.useState("");*/

 /* const getCLS = async () => {
    const token = new myWeb3.eth.Contract(ERC20_ABI, cls_token_address);
    const b = await token.methods.balanceOf(account).call();
    const formatted = formatEther(b);
    let result = formatted;
    const idx = formatted.indexOf(".");
    if (idx > 0) {
      result = formatted.slice(0, idx + 4);
    }
    return result;
  }*/

  const address = useSelector((state: TStore)=>state.user.userData?.me?.publicKey);

  useEffect(()=>{
    let timerId;
    if (withLogic === true && isFull(address) && wsUrl) {
      const balance = async () => {
        try {
          await waitReady();
          const wsProvider = new WsProvider(wsUrl);
          const api = await ApiPromise.create({provider: wsProvider});
          const data = await api.query.coldStack.balances(address);
          const value = data?.toString();
          Big.DP = 10;
          Big.RM = Big.roundHalfUp;
          let x = new Big(0);
          if (Number(value) > 0) {
            x = (Big(value).div(Big(10).pow(18))).toFixed(4);
            x = removeZeros(x?.toString());
          }
          dispatch(setUserData({balanceCLS: x?.toString()}))
          timerId = setInterval(async () => {
            try {
              const data = await api.query.coldStack.balances(address);
              const value = data?.toString();
              if (Number(value) > 0) {
                x = (Big(value).div(Big(10).pow(18))).toFixed(4);
                x = removeZeros(x?.toString());
              }
              dispatch(setUserData({balanceCLS: x?.toString()}))
            }catch(err){}
          }, 6000);
        } catch (err) {
          console.log("catch balance err", err)
        }
      }
      balance();
    }
    return ()=>{
      clearInterval(timerId)
    }
  },[withLogic, dispatch, address])

  const signFunc = useMemo(() => {
    return async (message: string, account: string) => {
      const result = await new Promise((resolve, reject) => {
        library.eth.personal
          .sign(message, account)
          .then((signature: any) => {
            resolve({success: true, signature, error: ""});
          })
          .catch((error: any) => {
            resolve({success: false, signature: "", error});
          })
      });
      return result
    }
  }, [library])



  useEffect(() => {
      if (withLogic === true) {
        if (!isFull(account) && isFull(prevAccount)) {
          //console.log("LOGOUT")
          // LOGOUT
          dispatch(setAuth({checked: true, result: false}));
          deleteToken();
        }
        if (isFull(account) && !isFull(prevAccount)) {
          //console.log("account to FINISH", account);
          dispatch(finishAuth({signFunc, account: account as "string | null | undefined"}));
          /* const { ethereum } = window;*/
          /*ethereum.on('connect',  (connectInfo: any) => {console.log("CONNECTED!!!")} );
          ethereum.on('disconnect',  (error: void) => {console.log("DISCONNECTED!!!")} );
          window.ethereum.on('chainChanged', ()=>{console.log("chainChanged!!!");  /!*window.location.reload();*!/})
          window.ethereum.on('accountsChanged', (a)=>{console.log("accountsChanged!!!", a)})
          window.ethereum.on('close',  ()=>{console.log("close!!!")})
          window.ethereum.on('networkChanged', ()=>{console.log("networkChanged!!!")})*/
        }
      }
    },
    // eslint-disable-next-line
    [account, dispatch, prevAccount, withLogic, library])


  const formattedAccount = useMemo(() => {
    return formatAccount(account)
  }, [account])

  const nameToConnector = {
    metamask: injectedConnector,
    portis: portisConnector,
    torus: torusConnector
  };
  const checkInstalled = (nameWallet) => {
    if (nameWallet === "metamask") {
      const isMetaMask = isMetaMaskInstalled();
      if (!isMetaMask) {
        dispatch(setAuthError({open: true, errorText: "Please install MetaMask"}));
        return false;
      }
      return true;
    }
    return true;
  }

  const activateWallet = async (nameWallet, payload = {}) => {
    const isInstalled = checkInstalled(nameWallet);
    if (isInstalled) {
      activate(nameToConnector[nameWallet], undefined, true).then((a) => {
        //success activate
        // console.log("aaaaaaactivate!!", a, account); // always undefined
      }).catch((err) => {
        //console.log("catch22 err", err)
        // not activated
        dispatch(setAuthError({open: true, errorText: ""}));
      });
    }
  }

  const checkMetamaskAuth = async () => {
    return new Promise((resolve, reject) => {
      if (!isMetaMaskInstalled()) {
        resolve(false)
      }
      injectedConnector.isAuthorized().then((isAuthorized: boolean) => {
        console.log("isAuthorized", isAuthorized, account);
        if (isAuthorized) {
          resolve(true)
          //activate(injectedConnector, undefined, true).then(()=>{resolve(true)}).catch((err) => {console.log("catch activate!!! err", err);  resolve(false)})
        } else {
          resolve(false)
        }
      }).catch((err) => {
        //console.log("catch activate=== err", err);
        resolve(false)
      })
    })
  }

  const invisibleActivateMetamask = async () => {
    return activate(injectedConnector, undefined, true).then(()=>{}).catch((err) => {
      console.log("catch activate!!! err", err);
    })
  }

  const deactivateFunc = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("accessToken", "");
    }
    deactivate();
  }

  return { connector, chainId, account, activate, active, library, setError, deactivate: deactivateFunc,
    error, formattedAccount, activateWallet, finishAuth, checkMetamaskAuth, signFunc, invisibleActivateMetamask }
}
