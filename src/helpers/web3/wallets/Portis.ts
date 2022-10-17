import BaseWallet from "./BaseWallet";

import { WALLETS } from 'helpers/constants';

const { PORTIS } = WALLETS;

class Portis extends BaseWallet{
  constructor({ connector, library }) {
    super({ connector, library, name: PORTIS });
  }

  checkIsInstalled() {
    return true;
  }

  async checkAuth() {
    return true;
  }
}

export default Portis;
