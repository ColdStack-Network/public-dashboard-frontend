import { InjectedConnector } from "@web3-react/injected-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import WalletConnectProvider from "@walletconnect/web3-provider";
import _ from "lodash";
import {
  Metamask as MetamaskWallet,
  Portis as PortisWallet,
  Ledger as LedgerWallet,
  Trezor as TrezorWallet,
} from "./wallets";
import Portis from "@portis/web3";
import Web3 from "web3";
import { NETWORKS, WALLETS } from "helpers/constants";
import TrezorConnect from "trezor-connect";
import Eth from "@ledgerhq/hw-app-eth";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import WalletConnect from "./wallets/WalletConnect";
import {LocalStorage} from "../localStorage";

const { METAMASK, PORTIS, LEDGER, TREZOR, WALLETCONNECT } = WALLETS;
const NETWORKS_IDS = [...Array(300)].map((_, i) => i);

interface IProps {
  walletName: string;
  payload: any;
  library: any;
}

class WalletConnector {
  private walletName: string;
  private payload: any;
  private library: any;

  constructor({ walletName, payload, library }: IProps) {
    this.walletName = walletName;
    this.payload = payload;
    this.library = library;
  }

  private async initWalletConnect(): Promise<WalletConnect> {
    const provider = new WalletConnectProvider({
      infuraId: this.payload.dAppId,
      pollingInterval: 10000
    });

    if (!LocalStorage.getItem<string>("accessToken")) {
      await provider.enable();
    }

    return new WalletConnect({
      library: new Web3(provider as any),
      connector: new WalletConnectConnector({
        supportedChainIds: NETWORKS_IDS,
      })
    })
  }

  private initMetamaskWallet(): MetamaskWallet {
    return new MetamaskWallet({
      library: new Web3(window.ethereum),
      connector: new InjectedConnector({
        supportedChainIds: NETWORKS_IDS,
      }),
    });
  }

  private initPortisWallet(): PortisWallet {
    if (!_.get(window.portis, "connector")) {
      const portis = new Portis(
        this.payload.dAppId,
        process.env.REACT_APP_ENV !== "production" ? NETWORKS.RINKEBY : NETWORKS.MAINNET
      );
      window.portis_provider = portis.provider;
      window.portis = new PortisWallet({
        library: new Web3(portis.provider),
        connector: new PortisConnector({
          ...this.payload,
          networks: [4],
        }),
      });
    }

    return window.portis;
  }

  private async initLedgerWallet(): Promise<LedgerWallet> {
    const transport = await TransportWebHID.create();
    const eth = new Eth(transport);
    const address = await eth.getAddress("44'/60'/0'/0/0");

    return new LedgerWallet({
      library: async (message: string) => {
        const result = await eth.signPersonalMessage("44'/60'/0'/0/0", Buffer.from(message).toString("hex"));
        const v = result["v"] - 27;
        let a = v.toString(16);
        if (a.length < 2) {
          a = "0" + a;
        }
        const signature = "0x" + result["r"] + result["s"] + a;

        return {
          success: signature.length > 0,
          signature: signature,
        };
      },
      connector: address.address,
    });
  }

  private async initTrezorWallet(): Promise<TrezorWallet> {
    await TrezorConnect.init({
      connectSrc: "https://connect.trezor.io/8/",
      popup: true,
      lazyLoad: true,
      manifest: {
        email: "developer@xyz.com",
        appUrl: window.location.host,
      },
    });

    const address = await TrezorConnect.ethereumGetAddress({
      path: "m/44'/60'/0'/0/0",
      showOnTrezor: true,
    });

    return new TrezorWallet({
      library: async (message) => {
        const result = await TrezorConnect.ethereumSignMessage({
          path: "m/44'/60'/0'/0/0",
          message: message,
          hex: false,
        });
        return {
          success: result.success,
          signature: result.success ? "0x" + result.payload.signature : "",
        };
      },
      connector: (address.payload as any).address,
    });
  }

  async buildWallet(): Promise<MetamaskWallet | PortisWallet> {
    switch (this.walletName) {
      case METAMASK:
        return this.initMetamaskWallet();
      case PORTIS:
        return this.initPortisWallet();
      case LEDGER:
        return await this.initLedgerWallet();
      case TREZOR:
        return await this.initTrezorWallet();
      case WALLETCONNECT:
        return await this.initWalletConnect();
      default:
        return this.initMetamaskWallet();
    }
  }
}

export default WalletConnector;
