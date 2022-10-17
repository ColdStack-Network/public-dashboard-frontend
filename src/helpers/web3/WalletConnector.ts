import { InjectedConnector } from '@web3-react/injected-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import Torus from "@toruslabs/torus-embed";
import {
  Metamask as MetamaskWallet,
  Portis as PortisWallet,
  Torus as TorusWallet
} from "./wallets";
import { BaseWallet } from './wallets';
import Portis from '@portis/web3';
import Web3 from 'web3';
import { NETWORKS, WALLETS } from 'helpers/constants';
import { initializeProvider } from '@metamask/providers';

const { METAMASK, PORTIS, TORUS } = WALLETS;
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

  private initMetamaskWallet() : MetamaskWallet {
    return new MetamaskWallet({
      library: new Web3(window.ethereum),
      connector: new InjectedConnector({
        supportedChainIds: NETWORKS_IDS
      })
    });
  }

  private initPortisWallet() : PortisWallet {
    if(!window.portis) {
      const portis = new Portis(this.payload.dAppId, NETWORKS.MAINNET)

      window.portis = new PortisWallet({
        library: new Web3(portis.provider),
        connector: new PortisConnector({
          ...this.payload, networks: [4]
        })
      });
    }

    return window.portis;
  }

  private async initTorusWallet() : Promise<TorusWallet> {
    // const metamaskStream = new LocalMessageDuplexStream({
    //   name: 'inpage',
    //   target: 'contentscript',
    // });

    // initializeProvider({
    //   connectionStream: metamaskStream,
    // });
    const torus = new Torus();
    await torus.init({
      buildEnv: "production", // uses solana-testing.tor.us
      enableLogging: true, // default : false
      showTorusButton: false, // default: true
      // network: {
      //   host: "kovan", // default: mainnet
      //   chainId: 42, // default: 1
      //   networkName: "Kovan Test Network", // default: Main Ethereum Network
      // },
    });
    // await torus.login();
    console.log("initTorusWallet", torus)
    // await torus.ethereum.enable();


    return new TorusWallet({
      library: new Web3(torus.provider as any),
      connector: new TorusConnector({
        ...this.payload
      })
    });
  }

  async buildWallet(): Promise<MetamaskWallet | TorusWallet | PortisWallet> {
    switch(this.walletName) {
      case METAMASK:
        return this.initMetamaskWallet();
      case PORTIS:
        return this.initPortisWallet();
      case TORUS:
        return await this.initTorusWallet();
      default:
        return this.initMetamaskWallet();
    }
  }
}

export default WalletConnector;
