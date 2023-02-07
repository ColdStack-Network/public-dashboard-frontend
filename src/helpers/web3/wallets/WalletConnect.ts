import BaseWallet from "./BaseWallet";

import { WALLETS } from "helpers/constants";

const { WALLETCONNECT } = WALLETS;
class WalletConnect extends BaseWallet {
    constructor({ connector, library }) {
        super({ connector, library, name: WALLETCONNECT });
    }

    checkIsInstalled() {
        return true;
    }

    async checkAuth() {
        return true;
    }
}

export default WalletConnect;
