import BaseWallet from "./BaseWallet";

import { WALLETS } from 'helpers/constants';

const { TORUS } = WALLETS;
class Torus extends BaseWallet {
  constructor({ connector, library }) {
    super({ connector, library, name: TORUS });
  }

  checkIsInstalled() {
    return true;
  }

  async checkAuth() {
    return true;
  }
}

export default Torus;
