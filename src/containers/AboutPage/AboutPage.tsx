import clsx from "clsx";
import HeaderMenuLanding from "containers/LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";
import React from "react";
import styles from "./AboutPage.module.scss";
import FlyingGuy from "../../images/flyingGuy.svg";
import WhatDo from "../../images/whatWeDo.svg";
import HowWeDo from "../../images/howWeDo.svg";
import Token from "../../images/coldStackToken.svg";
import Title from "../../components/UI/Title/Title";
import PLanding from "../../components/UI/PLanding/PLanding";
import SvgWalletBullet from "icons/WalletBullet";
import SvgAmazonBullet from "icons/AmazonBullet";
import SvgShieldBullet from "icons/shieldBullet";
import Bullets from "../../containers/LandingPage/Partials/Bullets/Bullets";
import ld from "images/ld.svg";
import Footer from "containers/LandingPage/Partials/Footer/Footer";
import shishow from "images/shishov.png";
import lobazenkov from "images/lobazenkov.png";
import pogosyan from "images/pogosyan.png";
import semjonovs from "images/semjonovs.png";
import silver from "images/silver.png";
import wisher from "images/wisher.png";
import ButtonOval from "components/UI/ButtonOval/ButtonOval";
import MetaTags from "react-meta-tags";

const peoples = [
  {
    image: shishow,
    name: "Alexander Shishow",
    link: "https://www.linkedin.com/in/alexandershishow",
    position: "CEO and Founder",
    description1: (
      <>
        Chief of Product at{" "}
        <a target="_blank" href="https://prometeus.io/">
          Prometeus Labs
        </a>{" "}
        : decentralized network for data monetization. Founded and ran three AI-based companies.
      </>
    ),
    description2: (
      <>
        <b>15+ years of experience</b> as a product leader and business development expert.
      </>
    ),
  },
  {
    image: lobazenkov,
    name: "Max Lobazenkov",
    link: "https://www.linkedin.com/in/max-lobazenkov-8b4310223/",
    position: "Head of Tech",
    description1: (
      <>Lead Backend developer in Prometeus Labs, responsible for system architecture in Stoa and Ignite.</>
    ),
    description2: (
      <>
        <b>7+ years of experience</b> as a software engineer, team lead and blockchain architect.
      </>
    ),
  },
  {
    image: silver,
    name: "Justin Silver",
    link: "https://www.linkedin.com/in/a735a9218/",
    position: "Head of Communications",
    description1: <>Digital marketing and PR strategist for major US and European companies.</>,
    description2: (
      <>
        <b>5+ years of planning and coordination</b> of effective communications strategy including social media,
        publications, media and PR.
      </>
    ),
  },
  {
    image: pogosyan,
    name: "Edgar Pogosyan",
    link: "https://www.linkedin.com/in/edgar-pogosian-5a8441222/",
    position: "Team Lead",
    description1: (
      <>
        Full stack developer in Prometeus Labs, responsible for Web3 cloud storage integrations and system robustness.
      </>
    ),
    description2: (
      <>
        <b> 4+ years of experience</b> as a software engineer, team lead and full stack developer
      </>
    ),
  },
  {
    image: wisher,
    name: "Iva Wisher",
    link: "https://www.linkedin.com/in/iva-wisher-154961159/",
    position: "PR advisor",
    description1: <>Chief Marketing Officer at Prometeus Labs, co-founder of Prosper</>,
    description2: (
      <>
        <b>5+ years of experience</b> in fintech industry, banking and and crypto investing
      </>
    ),
  },
  {
    image: semjonovs,
    name: "Vladislavs Semjonovs",
    link: "https://www.linkedin.com/in/vladislavs-semjonovs-b34900154/",
    position: "IR advisor",
    description1: <>Chief Operating Officer at Prometeus Labs, CEO and founder of Prosper</>,
    description2: (
      <>
        <b>7+ years of experience</b> in business development and crypto investing with Legal and Finance background
      </>
    ),
  },
];

export const AboutPage: React.FC = () => {
  const bullets = [
    {
      icon: <SvgAmazonBullet />,
      title: "Simple",
      subtitle:
        "Our platform is compatible with your existing infrastructure, allowing you to make the switch to Web3 storage quickly and easily",
    },

    {
      icon: <SvgShieldBullet />,
      title: "Reliable",
      subtitle:
        "Put the entire Web3 ecosystem to work for you. Access a system which is immutable secure and immune from interference",
    },
    {
      icon: <SvgWalletBullet />,
      title: "Affordable",
      subtitle:
        "Our AI pipeline is able to determine the best storage solution for your data out of the myriad of destinations available, saving you time and money.",
    },
  ];

  return (
    <div className={styles.about}>
      <MetaTags>
        <title>ColdStack: About the Company</title>
        <meta name="description" content="ColdStack: About the Company" />
      </MetaTags>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.header__control}>
            <HeaderMenuLanding />
          </div>
          <div className={styles.header__content}>
            <div className={styles.header__textBlock}>
              <Title type="largeTitle2">Our Mission</Title>

              <p className={clsx(styles.header__text, styles.text, styles.text_gray)}>
                At ColdStack, our mission is to make Web3 Cloud storage simple for everyone.
              </p>
              <p className={clsx(styles.header__text, styles.text, styles.text_gray)}>
                We’re here to help individuals and organizations alike take back control of their data from centralized
                tech giants, and make decentralized storage a more affordable solution.
              </p>
            </div>

            <img className={styles.header__flyingGuy} src={FlyingGuy} alt="flying guy" />
          </div>
        </div>
      </div>

      <div className={styles.whatDoWrapper}>
        <div className="container">
          <div className={styles.whatDo}>
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <img alt="whatDo" src={WhatDo} className={styles.card__image} />
              </div>
              <div className={styles.card__content}>
                <h3 className={styles.card__title}>What We Do</h3>
                <p className={styles.card__text}>
                  ColdStack is a Decentralized Cloud Aggregator: it is the world’s first service that aggregates
                  Decentralized Data Storages such as Filecoin, Arweave, and Storj.{" "}
                </p>
                <p className={styles.card__text}>
                  It is the fastest, simplest, and easiest way to unleash the power of Decentralized Clouds for projects
                  within the crypto space and beyond.
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <img alt="HowWeDo" src={HowWeDo} className={styles.card__image} />
              </div>
              <div className={styles.card__content}>
                <h3 className={styles.card__title}>How We Do It</h3>
                <p className={styles.card__text}>
                  By optimizing storage solutions with its AI-based pipeline, ColdStack provides users with the most
                  cost-efficient and secure way to store their files. ColdStack's approach is transparent, immutable,
                  and cryptographically verifiable.
                </p>
                <p className={styles.card__text}>
                  The platform provides simple and seamless integration of all the Decentralized Data Storages in one
                  platform
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <img alt="coldStackToken" src={Token} className={styles.card__image} />
              </div>
              <div className={styles.card__content}>
                <h3 className={styles.card__title}>ColdStack Token</h3>
                <p className={styles.card__text}>
                  Our $CLS token powers our platform, enabling decentralized storage transactions as well as governance.
                </p>
                <p className={styles.card__text}>
                  {" "}
                  The $CLS token allows users to interact with our platform without worrying about censorship or
                  interference.
                </p>
                <p className={styles.card__text}>
                  $CLS is available to anyone in the world on both Ethereum and Binance Smart Chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ourBackground}>
        <div className={"container"}>
          <Title textAlign="center" type="h2">
            Our Background
          </Title>
          <div className={styles.wrapperBlocks}>
            <div className={styles.textBlock}>
              <PLanding size="18px">
                ColdStack's platform provides simple and seamless integration of all Decentralized Data Storages in one
                platform. There is also no need for data migration needed to switch between various Web3 clouds.
              </PLanding>
              <PLanding size="18px">
                Prior to the founding of ColdStack, the project’s core team had been working with Prometeus Labs, for
                whom they developed a number of blockchain-based projects. These various projects required the
                utilization of a great deal of decentralized storage, meaning the team is very familiar with the
                evolving Decentralized Cloud Storage ecosystem.
              </PLanding>
            </div>
            <div className={styles.textBlock}>
              <PLanding size="18px">
                Through this process, the team realized that the same problems would always surface whenever it came to
                Decentralized Data Storage Networks. Realizing this problem in the market, the team sought to unite the
                many parts of the decentralized storage ecosystem, in order to provide the full benefits of Web3 clouds
                to all.
              </PLanding>
              <PLanding size="18px">
                Doing so means ColdStack creates a much better alternative to centralized companies such as Amazon, and
                allows users to take greater ownership of their data.
              </PLanding>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bullets}>
        <div className={"container"}>
          <Bullets bullets={bullets} />
        </div>
      </div>

      <div className={styles.peoplesBlock}>
        <div className="container">
          <Title type="h1" textAlign="center">
            ColdStack's People
          </Title>
          <div className={styles.peoplesWrapper}>
            {peoples.map((people) => {
              return (
                <div key={people.name} className={styles.people}>
                  <a target="_blank" href={people.link} className={styles.peopleLD}>
                    <img className={styles.peopleImage} src={people.image} alt={people.name} />
                    <img className={styles.logoLD} src={ld} alt="Linkedin" />
                  </a>
                  <div className={styles.peopleName}>{people.name}</div>
                  <div className={styles.peoplePosition}>{people.position}</div>
                  <div className={styles.decorLine} />

                  <div className={styles.description}>{people.description1}</div>
                  <div className={styles.description}>{people.description2}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.jobsBlock}>
        <div className="container">
          <div className={styles.jobsBlockContent}>
            <Title color="#ffffff" type="h2">
              Join the Mission!
            </Title>
            <PLanding color="#ffffff" textAlign="center">
              Join our team! We’ve built a workplace where we care about each other and our
              <br /> products, and we’re looking to grow
            </PLanding>
            <ButtonOval href="https://jobs.coldstack.io/" size="big" color="green" text="View Open Jobs" />
          </div>
        </div>
      </div>
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
};
