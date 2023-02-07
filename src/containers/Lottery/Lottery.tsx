import React from "react";
import style from "./lottery.module.scss";
import Footer from "containers/LandingPage/Partials/Footer/Footer";
import layout from "../../components/Layout/layout.module.scss";
import HeaderMenuLanding from "../LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";
import MetaTags from "react-meta-tags";
import chevron from "../../images/chevron.svg";

import clsx from "clsx";
import ButtonOval from "../../components/UI/ButtonOval/ButtonOval";
import { useLocation } from "react-router-dom";

const Lottery = () => {
  const { search } = useLocation();
  const PROPS = ["utm_source", "utm_medium", "utm_campaign"];
  const q = new URLSearchParams(search);
  const query: Record<string, any> = q
    .toString()
    .split("&")
    .reduce((obj, item) => {
      const [key, value] = item.split("=");
      return {
        ...obj,
        [key]: value,
      };
    }, {});

  return (
    <div className={clsx(style.wrapper, style.lottoWrapper)}>
      <MetaTags>
        <title>ColdStack: Lottery</title>
        <meta name="description" content="ColdStack: Lottery" />
      </MetaTags>
      <div className={style.header}>
        <div className={layout.container}>
          <HeaderMenuLanding />
          <div className={clsx(layout.headerBanner, style.headerBannerLotto)}>
            <h1>ColdStack Anniversary Lottery</h1>
            <p>
              <span className={style.spanBlack}>HOLD 500</span> <span className={style.spanBlue}>$CLS</span>
              <span className={style.spanBlack}>*</span> and win up to <span className={style.spanBlack}>$30,000!</span>
              <br /> Share in the <span className={style.spanBlack}>$100,000</span> prize pool!
              <br />
              Register with a valid email address and ETH / BSC wallet address.
            </p>
            <p>
              Join our whitelist now to participate in the lottery!
              <br />
              Lottery Draw Date: <span className={clsx(style.spanBlack, style.whiteSpaceNoWrap)}>25 April 2022</span>
            </p>
            <div className={style.buttonWrapper}>
              <ButtonOval
                hidden={query}
                search={PROPS}
                size="big"
                color="green"
                text="Join the Lottery"
                typeFormId="TlWREjei"
              />
            </div>
            <div className={style.headerSubtitle}>
              * Tokens must be held in the entered wallet at the time of the lottery drawing.
            </div>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.prizeWrapper}>
          <div className={style.container}>
            <div className={style.prize}>
              <div className={style.prizeContent}>
                <h2>Prize Pool: $100,000</h2>

                <div className={style.prizeBlock}>
                  <div className={clsx(style.prizeCard, style.first)}>
                    <div className={style.prizeCardDisclaimer}>1st place</div>
                    <div className={style.prizeCardTitle}>$30,000</div>
                    <div className={style.prizeCardSubtitle}>
                      1 winner: <span>Jackpot!</span>
                    </div>
                  </div>
                  <div className={style.prizeCard}>
                    <div className={style.prizeCardDisclaimer}>2nd place</div>
                    <div className={style.prizeCardTitle}>$30,000</div>
                    <div className={style.prizeCardSubtitle}>3 winners x $10,000</div>
                  </div>
                  <div className={style.prizeCard}>
                    <div className={style.prizeCardDisclaimer}>3rd place</div>
                    <div className={style.prizeCardTitle}>$30,000</div>
                    <div className={style.prizeCardSubtitle}>6 winners x $5,000</div>
                  </div>
                  <div className={style.prizeCard}>
                    <div className={style.prizeCardDisclaimer}>4th place</div>
                    <div className={style.prizeCardTitle}>$10,000</div>
                    <div className={style.prizeCardSubtitle}>10 winners x $1,000</div>
                  </div>
                </div>
                <div className={style.prizeSubtitle}>
                  In total, there will be 20 winners who share in the{" "}
                  <span className={style.weight600}>$100,000 prize pool</span>!<br />
                  Rewards will be distributed on <span className={style.blue}>April 25th 3:00 PM GMT</span>
                </div>
              </div>
            </div>
          </div>

          {/*faq */}

          <div className={style.faqWrapper}>
            <div className={style.container}>
              <h2>FAQ</h2>
              <div className={style.faqsBlock}>
                <label htmlFor="faq1" className={style.faqLabel}>
                  <div className={style.faqItem}>
                    <input className={style.faqInput} type="checkbox" name="faq" value="faq" id="faq1" />
                    <div className={style.faqItemTitle}>What is ColdStack?</div>
                    <div className={style.faqItemText}>
                      <a href="https://coldstack.io" target="_blank">
                        ColdStack
                      </a>{" "}
                      is a well-established platform which aggregates many different Web3 data storage clouds, such as
                      Filecoin, Arweave, and Storj. It is leveraged by AI technology, which finds the most efficient and
                      affordable storage solutions for different kinds of data and augment it with data-at-rest and
                      data-in-motion military grade security.
                    </div>
                    <img src={chevron} className={style.faqItemChevron} alt="arrow" />
                  </div>
                </label>
                <label htmlFor="faq2" className={style.faqLabel}>
                  <div className={style.faqItem}>
                    <input className={style.faqInput} type="checkbox" name="faq" value="faq" id="faq2" />
                    <div className={style.faqItemTitle}>What should I do to participate in the lottery?</div>
                    <div className={style.faqItemText}>
                      {" "}
                      Simply hold at least 500 $CLS tokens on April 25th (either on ETH or BSC), and submit your wallet
                      and email addresses to our whitelist here.
                    </div>
                    <img src={chevron} className={style.faqItemChevron} alt="arrow" />
                  </div>
                </label>

                <label htmlFor="faq3" className={style.faqLabel}>
                  <div className={style.faqItem}>
                    <input className={style.faqInput} type="checkbox" name="faq" value="faq" id="faq3" />
                    <div className={style.faqItemTitle}>Where can I buy $CLS tokens?</div>
                    <div className={style.faqItemText}>
                      CLS is available at:
                      <ul>
                        <li>
                          <a
                            target="_blank"
                            href="https://www.dextools.io/app/ether/pair-explorer/0xd75d1b30967d94b105f82f572ae7591cc3c48beb"
                          >
                            Uniswap
                          </a>{" "}
                          (Ethereum Network DEX)
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href="https://www.dextools.io/app/bsc/pair-explorer/0x30041fb7864fa8d45da6675f675773aa29158fce"
                          >
                            Pancakeswap
                          </a>{" "}
                          (Binance Smart Chain DEX)
                        </li>
                        <li>
                          <a target="_blank" href="https://www.mexc.com/exchange/CLS_USDT">
                            MEXC
                          </a>{" "}
                          (ETH Centralized Exchange)
                        </li>
                      </ul>
                      Token Contracts:
                      <br />
                      ETH:{" "}
                      <a target="_blank" href="https://etherscan.io/token/0x675bbc7514013e2073db7a919f6e4cbef576de37">
                        0x675bbc7514013e2073db7a919f6e4cbef576de37
                      </a>
                      <br />
                      BSC:{" "}
                      <a target="_blank" href="https://bscscan.com/token/0x668048E70284107A6aFab1711f28D88dF3E72948">
                        0x668048E70284107A6aFab1711f28D88dF3E72948
                      </a>
                    </div>
                    <img src={chevron} className={style.faqItemChevron} alt="arrow" />
                  </div>
                </label>

                <label htmlFor="faq4" className={style.faqLabel}>
                  <div className={style.faqItem}>
                    <input className={style.faqInput} type="checkbox" name="faq" value="faq" id="faq4" />
                    <div className={style.faqItemTitle}>
                      Do I have a greater chance of winning if I hold more tokens?
                    </div>
                    <div className={style.faqItemText}>
                      {" "}
                      All the wallets with 500 and more $CLS tokens have the same chance to win.
                    </div>
                    <img src={chevron} className={style.faqItemChevron} alt="arrow" />
                  </div>
                </label>

                <label htmlFor="faq5" className={style.faqLabel}>
                  <div className={style.faqItem}>
                    <input className={style.faqInput} type="checkbox" name="faq" value="faq" id="faq5" />
                    <div className={style.faqItemTitle}>Will prizes be issued in $CLS, USDT, or another currency?</div>
                    <div className={style.faqItemText}>
                      {" "}
                      Our prizes will be issued in $CLS on whichever chain (ETH or BSC) a user’s submitted wallet holds
                      $CLS on (i.e. if you win, tokens will come to the same wallet where you hold 500 $CLS).
                    </div>
                    <img src={chevron} className={style.faqItemChevron} alt="arrow" />
                  </div>
                </label>

                <label htmlFor="faq6" className={style.faqLabel}>
                  <div className={style.faqItem}>
                    <input className={style.faqInput} type="checkbox" name="faq" value="faq" id="faq6" />
                    <div className={style.faqItemTitle}>How big is the jackpot?</div>
                    <div className={style.faqItemText}>
                      {" "}
                      The Jackpot prize will be given to 1 winner, and totals $30,000 in $CLS tokens, based on the
                      equivalent of $30,000 in $CLS token on April 25th.
                    </div>
                    <img src={chevron} className={style.faqItemChevron} alt="arrow" />
                  </div>
                </label>

                <label htmlFor="faq7" className={style.faqLabel}>
                  <div className={style.faqItem}>
                    <input className={style.faqInput} type="checkbox" name="faq" value="faq" id="faq7" />
                    <div className={style.faqItemTitle}>How well-established is ColdStack?</div>
                    <div className={style.faqItemText}>
                      ColdStack first rolled out to production in the beginning of 2021, followed by $CLS native
                      ColdStack token issued in early May 2021. Take a look on{" "}
                      <a target="_blank" href="https://www.youtube.com/watch?v=S5EzwpKyJ38">
                        EllioTrades
                      </a>{" "}
                      and{" "}
                      <a href="https://www.youtube.com/watch?v=HS0DOsaIGIQ" target="_blank">
                        Altcoin Daily
                      </a>{" "}
                      project reviews. $CLS token was also{" "}
                      <a
                        target="_blank"
                        href="https://hacken.io/wp-content/uploads/2021/11/ColdStack_20102021SCAudit_Report.pdf"
                      >
                        audited by Hacken
                      </a>{" "}
                      and is a part of the{" "}
                      <a target="_blank" href="https://coinmarketcap.com/currencies/coldstack/">
                        CoinMarketCap Gravity
                      </a>{" "}
                      program.
                    </div>
                    <img src={chevron} className={style.faqItemChevron} alt="arrow" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/*faq           */}

          <div className={style.lastBanner}>
            <div className={style.container}>
              <h2>April 25th - ColdStack Anniversary Lottery</h2>
              <div className={style.buttonWrapper}>
                <ButtonOval
                  hidden={query}
                  search={PROPS}
                  size="big"
                  color="green"
                  text="Join the Lottery"
                  typeFormId="TlWREjei"
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Lottery;
