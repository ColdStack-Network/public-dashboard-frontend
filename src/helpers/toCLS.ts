import Big from "big.js";
import { removeZeros } from "./common";

export const toCLS = (value: string) => {
  Big.DP = 10;
  Big.RM = Big.roundHalfUp;

  let num = new Big(0);

  if (Number(value) > 0) {
    num = Big(value).div(Big(10).pow(18)).toFixed(4);
    num = removeZeros(num?.toString());
  }

  return num?.toString();
};
