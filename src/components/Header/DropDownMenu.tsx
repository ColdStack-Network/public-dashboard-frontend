/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { LocalStorage } from "helpers/localStorage";
import SvgAddCard from "icons/AddCard";
import SvgBinanceColorLogo from "icons/BinanceColorLogo";
import SvgColdstackLogoBlueBackgroundLogo from "icons/ColdstackLogoBlueBackgroundLogo";
import SvgEthereumColorLogo from "icons/EthereumColorLogo";
import SvgPlus from "icons/Plus";
import SvgPlusRoundGrey from "icons/PlusRoundGrey";
import SvgQuestionRound from "icons/QuestionRound";
import SvgRoundCloseRed from "icons/RoundCloseRed";
import SvgSettingLine from "icons/Setting_line";
import SvgSignInSquare from "icons/Sign_in_square";
import SvgWalletAlt from "icons/Wallet_alt";
import { StoredWallet } from "models/StoredWallet";
import React from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import style from "./header.module.scss";

type DropDownMenuProps = {
  deactivate: () => void;
  formattedAccount: string;
  balanceCLS?: string;
  balanceCLSWallet: string;
  usd: string | 0;
  usdWallet: string | 0;
  onClose: () => void;
  chainId?: number;
  setModalVisible: (state: boolean) => void;
};

export const DropDownMenu = React.forwardRef<HTMLDivElement, DropDownMenuProps>(
  (
    { deactivate, formattedAccount, balanceCLS, balanceCLSWallet, usd, usdWallet, onClose, chainId, setModalVisible },
    dropRef
  ) => {
    const isEmptyBalanceCLS = (balance?: string): boolean => {
      switch (true) {
        case balance === undefined: {
          return true;
        }
        case typeof balance === "number" && balance === 0: {
          return true;
        }
        case balance === "0": {
          return true;
        }
        default: {
          return false;
        }
      }
    };
    const exit = () => {
      const wallet = LocalStorage.getItem<StoredWallet>("wallet");
      const walletName = wallet && typeof wallet !== "string" ? wallet.name : "";
      deactivate();
      if (walletName === "ledger" || walletName === "trezor") {
        window.location.reload();
      }
    };

    return (
      <div className={style.dropdownPanel} ref={dropRef}>
        <div className={style.dropdownBlock}>
          <div className={style.dropdownItem}>
            <div className={style.smallIcon}>
              <SvgWalletAlt color="light" />
            </div>
            <div className={clsx(style.dropdownItemTextBlock, style.wallet_address)}>
              <span>{formattedAccount}</span>
              <SvgPlus />
            </div>
          </div>
        </div>
        <div className={style.dropdownBlock}>
          <div className={style.dropdownItem}>
            <div className={style.smallIcon}>
              <SvgColdstackLogoBlueBackgroundLogo />
            </div>
            <div className={style.dropdownItemTextBlock}>
              <div className={style.textBalance}>
                Account Balance
                <ReactTooltip className={style.tooltip} type="light" id="AccountBalance" />
                <span
                  data-place="top"
                  data-background-color="#fafafa"
                  data-border={true}
                  data-border-color="#D9E1FF"
                  data-for="AccountBalance"
                  className={style.questionTooltip}
                  data-tip="The total amount of CLS in your account - funds must be transferred from your wallet to your account for system use"
                >
                  <SvgQuestionRound />
                </span>
              </div>
              <div className={style.dropdownCoins}>
                {balanceCLS} CLS <span className={style.textLittle}>(${usd})</span>
              </div>
              {isEmptyBalanceCLS(balanceCLS) && (
                <div className={style.redNotice}>Please transfer CLS from your Wallet {"->"} Account Balance!</div>
              )}
            </div>
          </div>
          <div className={style.dropdownItem}>
            <div className={style.smallIcon}>
              {(chainId === 1 || chainId === 4) && <SvgEthereumColorLogo />}
              {(chainId === 56 || chainId === 97) && <SvgBinanceColorLogo />}
              {chainId !== 1 && chainId !== 4 && chainId !== 56 && chainId !== 97 && <SvgRoundCloseRed />}
            </div>
            <div className={style.dropdownItemTextBlock}>
              <div className={style.textBalance}>
                Wallet Balance
                <ReactTooltip className={style.tooltip} type="light" id="WalletBalance" />
                <span
                  data-background-color="#fafafa"
                  data-border={true}
                  data-border-color="#D9E1FF"
                  data-for="WalletBalance"
                  className={style.questionTooltip}
                  data-tip="The total amount of CLS in your connected wallet - funds must be transferred from your wallet to your account for system use"
                >
                  <SvgQuestionRound />
                </span>
              </div>
              <div className={style.dropdownCoins}>
                {balanceCLSWallet} CLS <span className={style.textLittle}>(${usdWallet})</span>
              </div>
              {chainId !== 1 && chainId !== 4 && chainId !== 56 && chainId !== 97 && (
                <div className={style.redNotice}>Please switch to BSC or ETH Mainnet Network</div>
              )}
            </div>
          </div>
        </div>
        <div className={style.dropdownBlock}>
          <div className={clsx(style.dropdownItem, style.button)}>
            <div className={style.smallIcon}>
              <SvgPlusRoundGrey />
            </div>
            <div className={style.dropdownItemTextBlock}>
              <a
                className={style.text}
                onClick={(e) => {
                  e.preventDefault();
                  setModalVisible(true);
                }}
              >
                Wallet {"->"} Account Balance
              </a>
            </div>
          </div>
          <div className={style.dropdownItem}>
            <div className={style.dropdownItemWrapper}>
              <div className={style.addCard}>
                <SvgAddCard />
              </div>
            </div>
          </div>
        </div>
        <div className={style.dropdownBlock}>
          <div className={clsx(style.dropdownItem, style.button)}>
            <div className={style.smallIcon}>
              <SvgSettingLine />
            </div>
            <div className={style.dropdownItemTextBlock}>
              <Link className={style.text} to="/dashboard/settings" onClick={onClose}>
                Account Settings
              </Link>
            </div>
          </div>
          <div className={clsx(style.dropdownItem, style.button)}>
            <div className={style.smallIcon}>
              <SvgSignInSquare />
            </div>
            <div className={style.dropdownItemTextBlock}>
              <div className={style.text} onClick={exit}>
                Disconnect Wallet
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
