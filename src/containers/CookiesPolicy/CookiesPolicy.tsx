import React from "react";
import style from "./cookiesPolicy.module.scss";
import Footer from "containers/LandingPage/Partials/Footer/Footer";
import PLanding from "components/UI/PLanding/PLanding";
import Title from "components/UI/Title/Title";
import MetaTags from "react-meta-tags";
import HeaderMenuLanding from "../LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";

const CookiesPolicy = () => {
  return (
    <div className={style.wrapper}>
      <MetaTags>
        <title>ColdStack: Cookie Policy</title>
        <meta name="description" content="ColdStack: Cookie Policy" />
      </MetaTags>
      <div className={style.content}>
        <div className="container">
          <HeaderMenuLanding />
        </div>
        <div className={"textBlock"}>
          <Title type="h2" textAlign="left">
            ColdStack Cookie Policy
          </Title>
          <PLanding color={"#9b9ca8"}>Date of this Policy: Jan 18, 2021</PLanding>
          <Title type="h2" textAlign="left">
            What Are ‘Cookies’?
          </Title>
          <PLanding>
            Cookies are small files placed on your computer or device by a website or mobile application. The cookie
            does contain a unique ID assigned to your device, but does not contain personal information such as your
            name or email address. The cookie helps to navigate from page to page on a website, to provide secure
            connections and to recall your preferences from a previous visit, when you return.
          </PLanding>
          <PLanding>
            You have the right to block and remove cookies but doing so may interfere with your browsing experience or
            mean that some features and services cannot be provided to you.
          </PLanding>
          <Title type="h2" textAlign="left">
            What do we use Cookies for?
          </Title>
          <PLanding>
            We use cookies to analyze the flow of information; customize the services, content and advertising we offer;
            measure promotional effectiveness; and promote trust and safety. Some of our services can only be provided
            using cookies.
          </PLanding>
          <PLanding>
            We use both first party cookies (ColdStack cookies) and third party cookies, which are cookies provided by
            other people’s websites. For example, a third party content provider might provide a cookie when you access
            content hosted on their site. We do not have access to those third party cookies and their providers will
            have their own cookie and privacy policies, which we encourage you to read.
          </PLanding>
          <Title type="h2" textAlign="left">
            Different Types of Cookies
          </Title>
          <PLanding>Cookies can be grouped into the following types:</PLanding>
          <Title type="h3" textAlign="left">
            1. Strictly Necessary Cookies
          </Title>
          <PLanding>
            Some cookies are essential for the operation of the Site. For example, cookies that allow us to identify
            registered users and ensure they can access the website. If you opt to disable these cookies, you may not be
            able to access all of the content of the website.
          </PLanding>
          <Title type="h3" textAlign="left">
            2. Performance Cookies
          </Title>
          <PLanding>
            Performance cookies are used to analyze how people use the Site and to monitor Site performance. Analyzing
            use allows us to improve the Site by identifying popular content and monitoring helps us to spot and fix
            problems quickly.
          </PLanding>
          <Title type="h3" textAlign="left">
            3. Functionality Cookies
          </Title>
          <PLanding>
            Functionality cookies are used to allow us to remember your preferences for helpful features, such as
            providing the Site in a different language.
          </PLanding>
          <Title type="h3" textAlign="left">
            4. Marketing Cookies
          </Title>
          <PLanding>
            Targeting cookies are used to help in providing users with adverts that are relevant to them by collecting
            information about their browsing habits and Site usage. They can also be used to allow third parties to
            display relevant and personalized ads to users through their networks, to measure the effectiveness of
            advertising campaigns and to limit the number of times you see the same advert.
          </PLanding>
          <Title type="h3" textAlign="left">
            5. Social Media Cookies
          </Title>
          <PLanding>
            Social media cookies allow users to interact more easily with social media, such as Facebook and Instagram.
            We do not control social media cookies and they do not allow us to gain access to your social media
            accounts. Please refer to the relevant social media platform’s privacy policies for information about their
            cookies.
          </PLanding>
          <Title type="h2" textAlign="left">
            Google Analytics
          </Title>
          <PLanding>
            Google Analytics is a popular cookie-based web analysis service provided by Google Inc, which we use to
            monitor how visitors use our Site, to compile usage reports and to help us improve the Site.
          </PLanding>
          <PLanding>
            Please see Google’s privacy policy here for further information on the data Google collects and how it is
            processed.
          </PLanding>
          <PLanding>
            If you prefer to not have data reported by Google Analytics, you can install the Google Analytics Opt-Out
            Browser Add-On, by following the instructions here.
          </PLanding>
          <PLanding>
            You may also opt out of Google's use of tracking technologies by visiting the Google advertising opt-out
            page here.
          </PLanding>
          <Title type="h2" textAlign="left">
            Getting More information
          </Title>
          <PLanding>
            You can find out more about cookies at:{" "}
            <a target="_blank" href="https://www.allaboutcookies.org">
              www.allaboutcookies.org
            </a>
          </PLanding>
          <PLanding>
            For more information on opting out of third parties’ use of cookies, please visit: Your Online Choices.
          </PLanding>
          <Title type="h2" textAlign="left">
            CHANGES TO THIS NOTICE
          </Title>
          <PLanding>
            We may change this Notice at our discretion and in the event we do so we will make the revised Notice
            available via our websites.
          </PLanding>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CookiesPolicy;
