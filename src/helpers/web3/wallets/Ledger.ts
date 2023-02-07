import BaseWallet from "./BaseWallet";

import { WALLETS } from "helpers/constants";

const { LEDGER } = WALLETS;
class Ledger extends BaseWallet {
  constructor({ connector, library }) {
    super({ connector, library, name: LEDGER });
  }

  checkIsInstalled() {
    return true;
  }

  async checkAuth() {
    return true;
  }
}

export default Ledger;
