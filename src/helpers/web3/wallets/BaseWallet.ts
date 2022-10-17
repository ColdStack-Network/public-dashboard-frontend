import { isFull, removeZeros, rpcUrl } from "../../common";
import { waitReady } from "@polkadot/wasm-crypto";
import { HttpProvider } from "@polkadot/rpc-provider";
import { ApiPromise } from "@polkadot/api";
import { time } from "../../common";
import Big from 'big.js';

import { EXCEPTIONS, METAMASK_GET_BALANCE_ERROR } from '../../../helpers/constants';
import Web3 from "web3";

class BaseWallet {
  name: string = '';
  address: string = '';
  connector: any;
  _library: any;

  constructor({ connector, library, name }) {
    this.connector = connector;
    this._library = library;
    this.name = name;
  }

  isInitilized() {
    return this._library && this.address;
  }

  set library(value: Web3) {
    if(!this._library) {
      this._library = value;
    }
  }

  async sign(message: string, account: string): Promise<unknown> {

    console.log("sign", message, account);
    return new Promise((resolve, reject) => {
      this._library.eth.personal
        .sign(message, account, "test password!")
        .then((signature: any) => {
          resolve({ success: true, signature, error: "" });
        })
        .catch((error: any) => {
          resolve({ success: false, signature: "", error });
        })
    });
  }

  async getBalance(cb) {
    let timerId;

    if (isFull(this.address) && rpcUrl) {
      try {
        await waitReady();
        const provider = new HttpProvider(rpcUrl);
        const api = await ApiPromise.create({ provider });
        const data = await api.query.coldStack.balances(this.address);
        const value = data?.toString();

        let balanceCLS = this.getBalanceCLS(value);

        cb(balanceCLS);

        timerId = setInterval(async () => {
          try {
            const data = await api.query.coldStack.balances(this.address);
            const value = data?.toString();

            balanceCLS = this.getBalanceCLS(value);

            clearInterval(timerId);
            cb(balanceCLS);
          } catch(err) {
            console.error(err);
          }
        }, time.seconds(6));
      } catch (err) {
        console.error(METAMASK_GET_BALANCE_ERROR, err);
      }
    }

    return () => clearInterval(timerId);
  }

  private getBalanceCLS(value: string) {
    Big.DP = 10;
    Big.RM = Big.roundHalfUp;

    let num = new Big(0);

    if (Number(value) > 0) {
      num = (Big(value).div(Big(10).pow(18))).toFixed(4);
      num = removeZeros(num?.toString());
    }

    return num?.toString();
  }

  checkIsInstalled (): boolean {
    throw new Error(EXCEPTIONS.METHOD_NOT_IMPLEMENTED);
  }

  checkAuth (): Promise<unknown> {
    throw new Error(EXCEPTIONS.METHOD_NOT_IMPLEMENTED);
  }
}

export default BaseWallet;
