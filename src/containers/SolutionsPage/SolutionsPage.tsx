import React from "react";
import MetaTags from "react-meta-tags";
import clsx from "clsx";
import styles from "./solutionsPage.module.scss";
import layout from "../../components/Layout/layout.module.scss";
import HeaderMenuLanding from "../LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";
import sol1 from "../../images/sol1.png";
import sol2 from "../../images/sol2.png";
import sol3 from "../../images/sol3.png";
import sol4 from "../../images/sol4.png";
import nolooting from "../../images/nolooting.svg";
import defeatdowntime from "../../images/defeatdowntime.svg";
import ownyourgame from "../../images/ownyourgame.svg";
import madeforthemetaverse from "../../images/madeforthemetaverse.svg";
import createhistory from "../../images/createhistory.svg";
import savetheworld from "../../images/savetheworld.svg";
import bottomline from "../../images/bottomline.svg";
import timeismoney from "../../images/timeismoney.svg";
import designedfordeFi from "../../images/designedfordeFi.svg";
import NFTnative from "../../images/NFTnative.svg";
import beautyinsimplicity from "../../images/beautyinsimplicity.svg";
import protectionandpreservation from "../../images/protectionandpreservation.svg";
import Footer from "../LandingPage/Partials/Footer/Footer";
import Container from "../../components/Container/Container";

const SolutionsPage: React.FC = () => {
  return (
    <div className={layout.wrapper}>
      <MetaTags>
        <title>ColdStack: Solutions</title>
        <meta name="description" content="ColdStack: Solutions" />
      </MetaTags>
      <div className={layout.header}>
        <Container>
          <HeaderMenuLanding />
          <div className={layout.headerBanner}>
            <h1>ColdStack: Solutions</h1>
            <p>
              ColdStack can help you take ownership of your data, reduce costs, and improve security by making it easy
              for anyone to access the Web3 cloud ecosystem regardless of your technological prowess.
            </p>
          </div>
        </Container>
      </div>
      <div className={clsx(layout.backgroundColorWhite)}>
        <Container>
          <div className={clsx(styles.solutionBlock, styles.pt160)}>
            <div className={clsx(styles.rowReverse, styles.solutionBlockRow)}>
              <div className={clsx(styles.solution, styles.pr44)}>
                <h2>GameFi</h2>
                <p>
                  From the storage of in-game NFTs to hosting full game servers, Web3 cloud storage facilitates the next
                  level of gaming experiences and true decentralization. With backend code, skins, landscapes and user
                  interfaces, petabytes of data can go into building aspects of games which need to be stored
                  perpetually and affordably. Decentralized game hosting eliminates the burden of managing your global
                  server infrastructure, meaning you can focus on creating games faster without compromising on
                  performance, customer experience, or cost.{" "}
                </p>
              </div>
              <div className={clsx(styles.solution, styles.pl44)}>
                <img className={styles.solutionImg} src={sol1} alt="solution" />
              </div>
            </div>
            <div className={clsx(styles.solutionBlockRow, styles.justifySpaceB)}>
              <div className={styles.solutionMini}>
                <img src={ownyourgame} alt="Own Your Game" />
                <h4>Own Your Game</h4>
                <p>
                  Be in control of all your gaming data. Don’t rely on the centralized cloud storages to store your
                  info, as they are not censorship resistant and vulnerable to hacks.
                </p>
              </div>
              <div className={styles.solutionMini}>
                <img src={nolooting} alt="No Looting" />
                <h4>No Looting</h4>
                <p>
                  More secure and more affordable storage. Keep every in-game item accounted for eternity without
                  breaking the bank, and prevent hacks and theft by eliminating centralized vulnerabilities.
                </p>
              </div>
              <div className={styles.solutionMini}>
                <img src={defeatdowntime} alt="Defeat Downtime" />
                <h4>Defeat Downtime</h4>
                <p>
                  No one likes loading screens. Decentralized hosting means a more reliable player experience with a
                  fully scalable and reliable infrastructure.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.solutionBlock}>
            <div className={clsx(styles.rowReverse, styles.solutionBlockRow)}>
              <div className={clsx(styles.solution, styles.pr44)}>
                <h2>Metaverse</h2>
                <p>
                  As metaverse worlds expand, so will the costs to record and keep them. Old worlds don’t have to be
                  lost in the expanses of storing your cold data, they can be saved in the world of decentralized cloud
                  storage. With our NFT native integration, we make it easy to store all types of data, and our AI
                  allows us to find the best maintenance costs for every file. Immutable, global infrastructure makes
                  your metaverse more immersive with better retrieval speeds, and means the denizens of your metaverse
                  never have to worry about their world ending.
                </p>
              </div>
              <div className={clsx(styles.solution, styles.pl44)}>
                <img className={styles.solutionImg} src={sol2} alt="solution" />
              </div>
            </div>
            <div className={clsx(styles.solutionBlockRow, styles.justifySpaceB)}>
              <div className={styles.solutionMini}>
                <img src={madeforthemetaverse} alt="Made for the Metaverse" />
                <h4>Made for the Metaverse</h4>
                <p>
                  Decentralized cloud infrastructure lets you take back control of your data from Web2 gatekeepers, and
                  have complete control over your world’s data.
                </p>
              </div>
              <div className={styles.solutionMini}>
                <img src={createhistory} alt="Create History" />
                <h4>Create History</h4>
                <p>
                  Make sure user experience, metaverse items, world changes, and every detail that matters to you and
                  co-inhabitants can be stored as long as you like
                </p>
              </div>
              <div className={styles.solutionMini}>
                <img src={savetheworld} alt="Save the World" />
                <h4>Save the World</h4>
                <p>
                  Centralized servers are prone to service outages and data leaks. Make your metaverse more secure with
                  decentralized Web3 storage.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.solutionBlock}>
            <div className={clsx(styles.rowReverse, styles.solutionBlockRow)}>
              <div className={clsx(styles.solution, styles.pr44)}>
                <h2>Defi</h2>
                <p>
                  As DeFi protocols become compliant with government standards, it will require an immense amount of
                  secure data storage. Price records, transaction histories, and relevant customer information are often
                  required to be held for incredible periods of time, or even forever. At the same time, it will be
                  important to have storage that is both globally accessible and censorship resistant to unexpected
                  changes in federal policies. ColdStack accomplishes both regulatory compliance and sovereignty, making
                  us the premier solution for the DeFi industry.
                </p>
              </div>
              <div className={clsx(styles.solution, styles.pl44)}>
                <img className={styles.solutionImg} src={sol3} alt="solution" />
              </div>
            </div>
            <div className={clsx(styles.solutionBlockRow, styles.justifySpaceB)}>
              <div className={styles.solutionMini}>
                <img src={bottomline} alt="Bottom Line" />
                <h4>Bottom Line</h4>
                <p>
                  Your revenue should go towards strong APY’s, not unnecessary storage costs. Let our AI take the
                  guesswork out of storage solutions, so you can focus on platform profits
                </p>
              </div>
              <div className={styles.solutionMini}>
                <img src={timeismoney} alt="Time Is Money" />
                <h4>Time Is Money</h4>
                <p>
                  Down time is costly in DeFi, not just financially but from a customer confidence perspective also. No
                  single point of failure with Web3 clouds guarantees secure sustainability for your platform.
                </p>
              </div>
              <div className={styles.solutionMini}>
                <img src={designedfordeFi} alt="Designed for DeFi" />
                <h4>Designed for DeFi</h4>
                <p>
                  Make your platform truly decentralized with immutable infrastructure. Trusting centralized companies
                  to store and host DeFi data is a recipe for disaster.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.solutionBlock}>
            <div className={clsx(styles.rowReverse, styles.solutionBlockRow)}>
              <div className={clsx(styles.solution, styles.pr44)}>
                <h2>Media & Art</h2>
                <p>
                  Media companies, individual content creators, and NFT projects alike need to store a huge amount of
                  data, often consisting of a wide variety of different files. ColdStack enables you to access the
                  entire Web3 ecosystem through our aggregator, and focus on creating awesome art instead of storage
                  costs. Our retrieval speeds are even better than our centralized competition too, meaning your fans
                  can access your work more easily wherever they are, and however you host it. Web3 storage is also
                  censorship resistant, so you can be truly free to express yourself.
                </p>
              </div>
              <div className={clsx(styles.solution, styles.pl44)}>
                <img className={styles.solutionImg} src={sol4} alt="solution" />
              </div>
            </div>
            <div className={clsx(styles.solutionBlockRow, styles.justifySpaceB)}>
              <div className={styles.solutionMini}>
                <img src={NFTnative} alt="NFT Native" />
                <h4>NFT Native</h4>
                <p>
                  Don’t host NFTs with centralized companies. They can be altered or vanish at any time, decreasing the
                  value NFT infrastructure can provide artists.
                </p>
              </div>
              <div className={styles.solutionMini}>
                <img src={beautyinsimplicity} alt="Beauty in Simplicity" />
                <h4>Beauty in Simplicity</h4>
                <p>
                  Focus on creating, not on storing. We take the guesswork out of data storage, and can even help you
                  make the jump from traditional art to NFT creation.
                </p>
              </div>
              <div className={styles.solutionMini}>
                <img src={protectionandpreservation} alt="Protection and Preservation" />
                <h4>Protection and Preservation</h4>
                <p>
                  Guarantee your work is never lost by storing it with multiple nodes across a global network. Protect
                  your art from censorship and attacks with decentralized P2P infrastructure.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={clsx(layout.containerFluid, layout.backgroundColorWhite)}>
        <Footer />
      </div>
    </div>
  );
};
export default SolutionsPage;
