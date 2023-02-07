import BaseWallet from "./BaseWallet";

import { WALLETS } from "helpers/constants";

const { TREZOR } = WALLETS;
class Trezor extends BaseWallet {
  constructor({ connector, library }) {
    super({ connector, library, name: TREZOR });
  }

  checkIsInstalled() {
    return true;
  }

  async checkAuth() {
    return true;
  }
}

export default Trezor;
