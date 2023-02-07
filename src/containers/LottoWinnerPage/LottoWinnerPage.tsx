import React from "react";
import MetaTags from "react-meta-tags";
import clsx from "clsx";
import styles from "./lottoWinnerPage.module.scss";
import layout from "../../components/Layout/layout.module.scss";
import HeaderMenuLanding from "../LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";
import Footer from "../LandingPage/Partials/Footer/Footer";

const LottoWinnerPage: React.FC = () => {
  return (
    <div className={layout.wrapper}>
      <MetaTags>
        <title>ColdStack Anniversary Lottery Results</title>
        <meta name="description" content="ColdStack: Solutions" />
      </MetaTags>
      <div className={layout.header}>
        <div className={layout.container}>
          <HeaderMenuLanding />
          <div className={layout.headerBanner}>
            <h1>ColdStack Anniversary Lottery Results</h1>
            <p>
                ColdStack Anniversary Lottery completed <br/>
                Lottery draw time is at 5:00pm GMT <br/>
                <p className={styles.subheader}>Congratulations to the winners!</p>
            </p>
          </div>
        </div>
      </div>
      <div className={clsx(layout.backgroundColorWhite)}>
        <div className={layout.container}>
            <div className={styles.lotteryWinnerContainer}>
                <h2>Lottery Winners</h2>
                <div className={clsx(styles.mb60, styles.jackpotBlock)}>
                    <h3>Jackpot! Pool $30,000</h3>
                    <p><a target="_blank" href="https://www.bscscan.com/tx/0x5747b327f4a6b3df62dfb4030e1086043cb4b3c919fea3e99ffaf95ab10b72ad">0xdfF0013e94C5EDd39E9710ab17002Ef9FeFaa90A</a></p>
                </div>
                <div className={clsx(styles.mb60, styles.winners)}>
                    <div className={clsx(styles.p24, styles.winnersSide)}>
                        <h4 className={styles.place}>2nd place</h4>
                        <p className={styles.pool}>Pool $30,000</p>
                    </div>
                    <div className={clsx(styles.p24, styles.winnersSide)}>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$10,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0x3bdb96b2318577441a77ce8f505c2eb7e99b38ff62e2c71b73c50cb6fb0e8124">
                                0xe810eB3ad5cE26b4Ac69F8C9d523c48380124a57
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$10,000</span>
                            <a
                                target="_blank"
                                href="https://www.bscscan.com/tx/0x6c78e305c29f69fa95abc0f04ae94bdcdbbaea8c99de2582052ae763c31399b4"
                            >
                                0x05ab6C66389e394CaAEbB56CcEDB6645ecC56A87
                            </a>
                        </p>
                        <p className={styles.wallets}>
                            <span>$10,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0x18ec3f5768fbbb8441b1281fa2dbc9e9c9ddbbcca34ee179e8404542a345b244">
                                0x2104519230B2B1748AAC89791b00207A93F2aba6
                            </a>
                        </p>
                    </div>
                </div>
                <div className={clsx(styles.mb60, styles.winners)}>
                    <div className={clsx(styles.p24, styles.winnersSide)}>
                        <h4 className={styles.place}>3rd place</h4>
                        <p className={styles.pool}>Pool $30,000</p>
                    </div>
                    <div className={clsx(styles.p24, styles.winnersSide)}>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$5,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0x7752d718a01fe63321c43b0698df74b15bf6109435b30d1a187a9bf2a2ea7e40">
                                0x0b91404945aF441B701A3Fc35F8D87F459dDD1b9
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$5,000</span>
                            <a
                                target="_blank"
                                href="https://www.bscscan.com/tx/0xf1ac08e710ec31d18d949ab03519b3197cb136cf1bc539a2119a93b1c45bb0ef"
                            >
                                0xd1F1e58ef6bD52189F7debeA33AE482F4dbc51AD
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$5,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0x06b0c2f2bcdf86844800d18194e1c743cd01dea4352d27d892c0379bac6db003">
                                0x91D73102c728e3c9C271d8621e4b8c990D02bFF7
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$5,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0x3266edb7217586e6bcfcb1e1301cb428914f7719ecd9bba0627bdc617d524ded">
                                0x2e7e0B7317c38D879b1f981547E6bC8935a38bE2
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$5,000</span>
                            <a
                                target="_blank"
                                href="https://www.bscscan.com/tx/0x3542196171b96c5ce3e6366572c1892816f277d490a960d06cc79f641adfa92f"
                            >
                                0x80EAe9cf8d1B161e943A3403472e9c746D41cB1f
                            </a>
                        </p>
                        <p className={clsx(styles.wallets)}>
                            <span>$5,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0x5220cef291fbab53dbc21df9173dd58f0d08540969426d58832bdadfc43ceee2"
                            >
                                0xbcd69Ce8027b930c7712290F4f0c1e8864382123
                            </a>
                        </p>
                    </div>
                </div>

                <div className={clsx(styles.mb60, styles.winners)}>
                    <div className={clsx(styles.p24, styles.winnersSide)}>
                        <h4 className={styles.place}>4rd place</h4>
                        <p className={styles.pool}>Pool $10,000</p>
                    </div>
                    <div className={clsx(styles.p24, styles.winnersSide)}>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$1,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0xdbd4e78e3ecee3e53412339e8bc0a72cb9f463986aefea7297e4e68bf93326b1">
                                0x8Bdd167Bfddf7Fdc381C20F4Af80b4769049cE21
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$1,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0x020528ae1d49cf3e5d4b3f01ba1f06736d96df56bf51414cab814b00e24732f3">
                                0x1e994a6657DdD30D62688d856E0Cc69FD54e8b04
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$1,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0xa4fb89a1d8cb45c383c4f6a57c80b0f9b37aceb27b3a796cff59a0fd301ffeea">
                                0xB38900a3C44b6db41f22629248FF4F013d5d7AAF
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$1,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0x091e7800d6021540fa2cd9579d4eb86212e1075a4b90925cbdc896d77c47a5da">
                                0xC90171AA0AfdD258F1e372c9C395B98F9494aD0C
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$1,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0x9e3fe24909b3c79721342df5ba92b57f1f90fdbc94b48dc8b2eefb89990e4351">
                                0xaFD3B52c17727936AcEA529Ff5e1A88687c93500
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$1,000</span>
                            <a
                                target="_blank"
                                href="https://www.bscscan.com/tx/0x110fe384a02f7919147cfad6e3c36c0eb3801a1ed52aaa7f15bb4e604886e2d3">
                                0x15618aF8EBcEb15C929D31D88051189C29b7E71A
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$1,000</span>
                            <a
                                target="_blank"
                                href="https://etherscan.io/tx/0x9e3fe24909b3c79721342df5ba92b57f1f90fdbc94b48dc8b2eefb89990e4351">
                                0x8b3455CE845F73108e3635A648597DaAD39eAcFa
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$1,000</span>
                            <a
                                target="_blank"
                                href="https://bscscan.com/tx/0xaa7643a7fb83cf99502a7a425c7e4963e95f2e6a7e3896fd19498ca24cd814cf">
                                0x8A874f99a06f349c2ab527fBF774FF36aed3e7F2
                            </a>
                        </p>
                        <p className={clsx(styles.mb20, styles.wallets)}>
                            <span>$1,000</span>
                            <a
                                target="_blank"
                                href="https://www.bscscan.com/tx/0x6c49054a854f21f541284d188093987283d9b3cfa4ca774f3e3b602f7d6afcb4">
                                0x5998F3786c5229e3E8967210F928e30d4436A255
                            </a>
                        </p>
                        <p className={clsx(styles.wallets)}>
                            <span>$1,000</span>
                            <a
                                target="_blank"
                                href="https://www.bscscan.com/tx/0xdc791c819c5a2290712be6830f68aa512e491a822f0d0c4524922db9851ed316">
                                0xA50a513CEdf8ff2B6c3f14FDe950fB8A9d932BFf
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className={clsx(layout.containerFluid, layout.backgroundColorWhite)}>
        <Footer />
      </div>
    </div>
  );
};
export default LottoWinnerPage;
