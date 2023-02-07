import React from "react";
import style from "./acceptableUsePolicy.module.scss";
import Footer from "containers/LandingPage/Partials/Footer/Footer";
import PLanding from "components/UI/PLanding/PLanding";
import MetaTags from "react-meta-tags";
import HeaderMenuLanding from "../LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";
import Title from "../../components/UI/Title/Title";

const AcceptableUsePolicy = () => {
  return (
    <div className={style.wrapper}>
      <MetaTags>
        <title>ColdStack: Acceptable Use Policy</title>
        <meta name="description" content="ColdStack: Acceptable Use Policy" />
      </MetaTags>
      <div className={style.content}>
        <div className="container">
          <HeaderMenuLanding />
        </div>
        <div className={"textBlock"}>
          <Title type="h2">Acceptable Use Policy</Title>
          <PLanding>
            This Acceptable Use Policy (this "<b>Policy</b>") describes prohibited uses of the storage and related
            services offered by <b>ColdStack, Inc.</b> and its affiliates (the "Services") and the website located at{" "}
            <b>ColdStack.io</b> (the "<b>ColdStack Site</b>"). The examples described in this Policy are not exhaustive.
            We may modify this Policy at any time by posting a revised version on the ColdStack Site. By using the
            Services or accessing the ColdStack Site, you agree to the latest version of this Policy. If you violate the
            Policy or authorize or help others to do so, we may suspend or terminate your use of the Services.
          </PLanding>
          <PLanding>
            Inquiries regarding this Policy should be directed to{" "}
            <a href="mailto:info@ColdStack.com">info@ColdStack.com</a>
          </PLanding>
          <Title type="h3" textAlign="left">
            No Illegal, Harmful, or Offensive Use or Content
          </Title>
          <PLanding>
            You may not use, or encourage, promote, facilitate or instruct others to use, the Services or ColdStack Site
            for any illegal, harmful, fraudulent, infringing or offensive use, or to transmit, store, display,
            distribute or otherwise make available content that is illegal, harmful, fraudulent, infringing or
            offensive. Prohibited activities or content include:
            <ul>
              <li>
                Illegal, Harmful or Fraudulent Activities. Any activities that are illegal, that violate the rights of
                others, or that may be harmful to others, our operations or reputation, including disseminating,
                promoting or facilitating child pornography, offering or disseminating fraudulent goods, services,
                schemes, or promotions, make-money-fast schemes, ponzi and pyramid schemes, phishing, pharming, or any
                other conduct that inhibits anyone else’s use or enjoyment of our services;
              </li>
              <li>
                Infringing Content. Content that infringes or misappropriates the intellectual property or proprietary
                rights of others;
              </li>
              <li>
                Offensive Content. Content that is defamatory, obscene, abusive, invasive of privacy, or otherwise
                objectionable, including content that constitutes child pornography, relates to bestiality, or depicts
                non-consensual sex acts;
              </li>
              <li>
                Harmful Content. Content or other computer technology that may damage, interfere with, surreptitiously
                intercept, or expropriate any system, program, or data, including viruses, Trojan horses, worms, time
                bombs, or cancelbots.
              </li>
            </ul>
          </PLanding>

          <Title type="h3" textAlign="left">
            No Security Violations
          </Title>

          <PLanding>
            You may not use the Services to violate the security or integrity of any network, computer or communications
            system, software application, or network or computing device (each, a “System”). Prohibited activities
            include:
            <ul>
              <li>
                Unauthorized Access. Accessing or using any System without permission, including attempting to probe,
                scan, or test the vulnerability of a System or to breach any security or authentication measures used by
                a System;
              </li>
              <li>Monitoring of data or traffic on a System without permission;</li>
              <li>
                Falsification of Origin. Forging TCP-IP packet headers, e-mail headers, or any part of a message
                describing its origin or route. The legitimate use of aliases and anonymous remailers is not prohibited
                by this provision.
              </li>
            </ul>
          </PLanding>

          <Title type="h3" textAlign="left">
            No Network Abuse
          </Title>
          <PLanding>
            You may not make network connections to any users, hosts, or networks unless you have permission to
            communicate with them. Prohibited activities include:
            <ul>
              <li>
                Monitoring or Crawling. Monitoring or crawling of a System that impairs or disrupts the System being
                monitored or crawled;
              </li>
              <li>
                Denial of Service (DoS). Inundating a target with communications requests so the target either cannot
                respond to legitimate traffic or responds so slowly that it becomes ineffective;
              </li>
              <li>
                Intentional Interference. Interfering with the proper functioning of any System, including any
                deliberate attempt to overload a system by mail bombing, news bombing, broadcast attacks, or flooding
                techniques;
              </li>
              <li>
                Operation of Certain Network Services. Operating network services like open proxies, open mail relays,
                or open recursive domain name servers;
              </li>
              <li>
                Avoiding System Restrictions. Using manual or electronic means to avoid any use limitations placed on a
                System, such as access and storage restrictions;
              </li>
              <li>
                Excessive Utilization of Network. Abusing free egress and free API request policies to conduct an
                excessive amount of requests that may inhibit other users from utilizing or enjoying the service;
              </li>
              <li>Utilizing free ColdStack trial accounts for offering commercial paid services;</li>
              <li>
                Signing up for multiple concurrent or sequential free ColdStack trial accounts for the purpose of
                avoiding charges associated with paid subscriptions.
              </li>
            </ul>
          </PLanding>

          <Title type="h3" textAlign="left">
            No E-Mail or Other Message Abuse
          </Title>

          <PLanding>
            You will not distribute, publish, send, or facilitate the sending of unsolicited mass e-mail or other
            messages, promotions, advertising, or solicitations (like “spam”), including commercial advertising and
            informational announcements. You will not alter or obscure mail headers or assume a sender’s identity
            without the sender’s explicit permission. You will not collect replies to messages sent from another
            internet service provider if those messages violate this Policy or the acceptable use policy of that
            provider.
          </PLanding>

          <Title type="h3" textAlign="left">
            Intellectual Property and Other Proprietary Rights
          </Title>

          <PLanding>
            You may not use the Service in a manner that infringes on or misappropriates the rights of a third party in
            any work protected by copyright, trade or service mark, invention, or other intellectual property or
            proprietary information. For example:
            <ul>
              <li>
                You may not use the Service to download, publish, distribute, use, or otherwise copy in any manner any
                text, music, software, art, image, or other work protected by copyright law unless you have permission
                from the owner of the work to use or copy the work in that manner, or you are otherwise permitted by
                established intellectual property law to copy or use the work or rights in that manner;
              </li>
              <li>
                You may not use the Service to publish content intended to assist others in defeating technical
                copyright protections; and
              </li>
              <li>You may not display another person's trademark without permission.</li>
            </ul>
            In addition, you may not use the Service to publish another person's trade secrets, or to publish
            information in violation of a duty of confidentiality. It is ColdStack’s policy to terminate the services of
            customers who are repeat infringers in appropriate circumstances.
          </PLanding>

          <Title type="h3" textAlign="left">
            Our Monitoring and Enforcement
          </Title>

          <PLanding>
            We reserve the right, but do not assume the obligation, to investigate any violation of this Policy or
            misuse of the Services or ColdStack Site. We may:
            <ul>
              <li>
                investigate violations of this Policy or misuse of the Services or ColdStack Site or remove, disable
                access to, or modify any content or resource that violates this Policy or any other agreement we have
                with you for use of the Services or the ColdStack Site.
              </li>
            </ul>
            We may report any activity that we suspect violates any law or regulation to appropriate law enforcement
            officials, regulators, or other appropriate third parties. Our reporting may include disclosing appropriate
            customer information. We also may cooperate with appropriate law enforcement agencies, regulators, or other
            appropriate third parties to help with the investigation and prosecution of illegal conduct by providing
            network and systems information related to alleged violations of this Policy.
          </PLanding>

          <Title type="h3" textAlign="left">
            Reporting of Violations of this Policy
          </Title>

          <PLanding>
            If you become aware of any violation of this Policy, you will immediately notify us and provide us with
            assistance, as requested, to stop or remedy the violation. To report any violation of this Policy, please
            contact <a href="mailto:info@ColdStack.com">info@ColdStack.com</a>
          </PLanding>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AcceptableUsePolicy;
