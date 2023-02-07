import BaseWallet from "./BaseWallet";

import { WALLETS } from "helpers/constants";

const { METAMASK } = WALLETS;

class Metamask extends BaseWallet {
  constructor({ connector, library }) {
    super({ connector, library, name: METAMASK });
  }

  checkIsInstalled() {
    const { ethereum } = window;

    return Boolean(ethereum && ethereum.isMetaMask);
  }

  async checkAuth() {
    if (!this.checkIsInstalled()) {
      return false;
    }

    return this.connector
      .isAuthorized()
      .then((isAuthorized: boolean) => isAuthorized)
      .catch((err) => false);
  }
}

export default Metamask;
