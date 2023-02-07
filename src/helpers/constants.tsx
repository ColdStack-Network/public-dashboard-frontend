import { BinanceBig } from "icons/Binance";
import { EthereumBig } from "icons/Ethereum";

export const METAMASK_GET_BALANCE_ERROR = "Error while fetching Metamask balance";

export const EXCEPTIONS = {
  METHOD_NOT_IMPLEMENTED: "Method not implemented",
};

export const NETWORKS = {
  TESTNET: "testnet",
  MAINNET: "mainnet",
  RINKEBY: "rinkeby",
};

export const NETWORKS_NAMES = {
  ETHEREUM_MAINNET: "ETHEREUM_MAINNET",
  ETHEREUM_TESTNET: "ETHEREUM_TESTNET",
  ROPSTEN_TESTNET: "ROPSTEN_TESTNET",
  RINKEBY_TESTNET: "RINKEBY_TESTNET",
  KOVAN_TESTNET: "KOVAN_TESTNET",
  BINANCE_SMART_CHAIN_TESTNET: "BINANCE_SMART_CHAIN_TESTNET",
  BINANCE_SMART_CHAIN_MAINNET: "BINANCE_SMART_CHAIN_MAINNET",
};

export const NETWORKS_LIST = {
  ETHEREUM_MAINNET: {
    id: 1,
    name: "Ethereum Mainnet",
    shortName: "eth",
    title: "Ethereum Network",
    link: "https://etherscan.io/token",
    icon: <EthereumBig />,
  },
  ETHEREUM_TESTNET: { name: "Morden Testnet", id: 2, icon: <EthereumBig /> },
  ROPSTEN_TESTNET: { name: "Ropsten Testnet", id: 3, icon: <EthereumBig /> },
  RINKEBY_TESTNET: {
    id: 4,
    name: "Rinkeby Testnet",
    shortName: "eth",
    title: "Rinkeby Network",
    icon: <EthereumBig />,
    link: "https://rinkeby.etherscan.io/token",
  },
  KOVAN_TESTNET: { id: 42, name: "Kovan Testnet", icon: <EthereumBig /> },
  BINANCE_SMART_CHAIN_MAINNET: {
    id: 56,
    name: "Binance Smart Chain Mainnet",
    title: "Binance Smart Chain Network",
    icon: <BinanceBig />,
    shortName: "bsc",
    link: "https://bscscan.com/token",
  },
  BINANCE_SMART_CHAIN_TESTNET: {
    id: 97,
    name: "Binance Smart Chain Testnet",
    shortName: "bsc",
    title: "Binance Smart Chain Testnet",
    icon: <BinanceBig />,
    link: "https://testnet.bscscan.com/token",
  },
};

export const WALLETS = {
  METAMASK: "metamask",
  PORTIS: "portis",
  TORUS: "torus",
  LEDGER: "ledger",
  TREZOR: "trezor",
  WALLETCONNECT: "walletconnect",
};

export const AUTH_PAGE = {
  DEFAULT: "Default",
  COMIING_SOON: "Comming soon",
  WALLETS: {
    METAMASK: {
      TITLE: "MetaMask",
      SUBTITLE: "A crypto wallet & gateway to blockchain apps",
    },
    PORTIS: {
      TITLE: "Portis",
      SUBTITLE: "Connect with your Google, Facebook, Twitter or Discord",
    },
    TORUS: {
      TITLE: "Torus",
      SUBTITLE: "Connect with your email and password",
    },
    LEDGER: {
      TITLE: "Ledger",
      SUBTITLE: "Connect with usb and Ledger Live",
    },
    TREZOR: {
      TITLE: "Trezor",
      SUBTITLE: "Connect with usb",
    },
    WALLETCONNECT: {
      TITLE: "WalletConnect",
      SUBTITLE: "A crypto wallet",
    },
  },
};

export const STORAGE_CLASSES_MAP = {
  Standard: "STANDARD",
  "Standard-IA": "STANDARD_IA",
  "Intelligent-Tiering": "INTELLIGENT_TIERING",
  "Glacier Flexible Retrieval": "GLACIER",
  "Glacier Deep Archive": "DEEP_ARCHIVE",
  "Glacier Instant Retrieval": "GLACIER_IR",
};
