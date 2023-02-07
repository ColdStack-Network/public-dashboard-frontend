import React from "react";
import style from "./privacyPolicy.module.scss";
import Footer from "containers/LandingPage/Partials/Footer/Footer";
import PLanding from "components/UI/PLanding/PLanding";
import MetaTags from "react-meta-tags";
import HeaderMenuLanding from "../LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";
import Title from "../../components/UI/Title/Title";

const PrivacyPolicy = () => {
  return (
    <div className={style.wrapper}>
      <MetaTags>
        <title>ColdStack: Privacy Policy</title>
        <meta name="description" content="ColdStack: Privacy Policy" />
      </MetaTags>
      <div className={style.content}>
        <div className="container">
          <HeaderMenuLanding />
        </div>
        <div className={"textBlock"}>
          <Title type="h2">ColdStack Privacy Policy</Title>
          <PLanding color={"#9b9ca8"}>Effective date: Dec 10, 2020</PLanding>
          <PLanding>
            This privacy statement sets out the privacy policy of ColdStack (hereinafter «ColdStack.io», «we») which is
            located at site https://coldstack.io (hereinafter «the Website»).
          </PLanding>
          <PLanding>
            We are committed to protect and respect your privacy. This privacy policy (together with the Terms of Use)
            sets out the basis on which any personal data we collect from you, or that you provide to us, will be
            processed by us. The Personal Data Protection Act passed 15.02.2007 (Estonia) and the General Data
            Protection Regulation ((EU) 2016/679) provides rules for how we can collect, use, and disclose this
            information. By visiting the Website, you are agreeing to be legally bound by this privacy policy, so please
            read the following carefully to understand our views and practices regarding your data and how we will treat
            it. If any term in this Privacy Policy is unacceptable to you, please do not visit, access, or use
            ColdStack.io.
          </PLanding>
          <Title type="h3" textAlign="left">
            1. What information do we collect
          </Title>
          <Title type="h4" textAlign="left">
            1.1 Information You Provide
          </Title>
          <Title type="h5" textAlign="left">
            Contact Information.
          </Title>
          <PLanding>
            We may collect personal and/or business contact information including your first name, last name, mailing
            address, telephone number, fax number, e-mail address or any other personal data you provide to us for the
            purposes of doing business with us.
          </PLanding>
          <Title type="h5" textAlign="left">
            Service Account Information.
          </Title>
          <PLanding>
            We collect information such as your username, authentication tokens and other necessary security information
            required for authentication and access to our services.
          </PLanding>
          <Title type="h5" textAlign="left">
            Marketing and Communications.
          </Title>
          <PLanding>
            We may also collect your preferences in receiving updates on our products or marketing material.
          </PLanding>
          <Title type="h4" textAlign="left">
            1.2 Information Collected Automatically
          </Title>
          <PLanding>
            Whenever you visit or interact with our online Services, following information may be collected:
          </PLanding>
          <Title type="h5" textAlign="left">
            Device & Technical Data
          </Title>
          <PLanding>
            We collect technical information when you visit our websites or use our mobile applications or services.
            This includes information such as your Internet Protocol (IP) address, your login data, type of mobile
            device you use, your device operating system and browser type, time zone setting and location, language, a
            unique device identifier, the address of a referring website, the path you take through our websites, and
            information about your session.
          </PLanding>
          <Title type="h5" textAlign="left">
            Cookies
          </Title>
          <PLanding>
            We and our third party service providers use technologies such as cookies to collect information about the
            use of our website and services.
          </PLanding>
          <Title type="h5" textAlign="left">
            Usage Data
          </Title>
          <PLanding>
            During regular usage of our services, we collect information about the date and time of your logins and
            details of your activities on our platform.
          </PLanding>
          <Title type="h3" textAlign="left">
            2. How we use your personal information
          </Title>
          <PLanding>
            We use the information we collect in any of the following ways:
            <ul>
              <li>Carry out your requests, fulfill orders, and process payments for our products and services</li>
              <li>
                Communicate with you about your orders, purchases or accounts with us, including handling any requests,
                questions or comments you may have
              </li>
              <li>Provide online services to you, which includes our websites and/or mobile applications;</li>
              <li>Provide customer support, including processing any concerns about our services</li>
              <li>
                Tell you about our products and services, competitions, offers, promotions or special events that we
                believe may interest you
              </li>
              <li>Personalize your experience in our online services</li>
              <li>Communicate with you about your activities with respect to our Services</li>
              <li>Combine with information we receive from others to help understand needs of our customers</li>
              <li>Analyze statistical information regarding our current or potential clients</li>
              <li>
                Verify your identity and ensure the security of our networks and systems, including to help diagnose
                technical and service issues, troubleshoot issues, bugs or defects related to your account or activities
              </li>
            </ul>
          </PLanding>

          <PLanding>
            We are also obliged with applicable laws to:
            <ul>
              <li>protect against fraud and other crime, claims and liabilities</li>
              <li>comply with legal obligations</li>
              <li>establish or defend a legal claim</li>
              <li>monitor and report compliance issues.</li>
            </ul>
          </PLanding>
          <Title type="h3" textAlign="left">
            3. Sharing data with 3rd parties
          </Title>

          <PLanding>
            We use data processors who are third parties who provide elements of services for us. We have contracts in
            place with our data processors. This means that they cannot do anything with your personal information
            without our specific instructions. They will not share your personal information with any organization apart
            from us.
          </PLanding>
          <PLanding>
            We share data with Google L.t.d: ColdStack uses a Google product called “Google Analytics”.
          </PLanding>
          <Title type="h4" textAlign="left">
            3.1 What is the data used for?
          </Title>
          <PLanding>
            We use tools Google Analytics to help us track, segment and analyze usage of the ColdStack Services, and to
            help us serve more targeted advertising
          </PLanding>
          <Title type="h4" textAlign="left">
            3.2 What data is shared with Google L.t.d.:
          </Title>
          <PLanding>
            <ul>
              <li>First-party cookies, data related to the device/browser, IP address and on-site/app activities</li>
              <li>
                IP address with anonymisation option enabled so that Google Analytics uses only a portion of an IP
                address collected, rather than the entire address.
              </li>
              <li>Time of visit, pages visited, and time spent on each page of the webpages</li>
              <li>Referring site details (such as the URI a user came through to arrive at this site)</li>
              <li>Type of web browser and operating system (OS)</li>
              <li>JavaScript support, screen size and resolution, and screen color processing ability</li>
              <li>Network location and IP address.</li>
              <li>
                Flash version, character set, time-zone, scripts data, URL data, browser language, browser plugins and
                performance data
              </li>
            </ul>
          </PLanding>
          <PLanding>
            Google will not share your data with any third parties unless Google (i) has Your consent for any Customer
            Data or any Third Party's consent for the Third Party's Customer Data; (ii) concludes that it is required by
            law or has a good faith belief that access, preservation or disclosure of Customer Data is reasonably
            necessary to protect the rights, property or safety of Google, its users or the public; or (iii) provides
            Customer Data in certain limited circumstances to third parties to carry out tasks on Google's behalf (e.g.,
            billing or data storage) with strict restrictions that prevent the data from being used or shared except as
            directed by Google
          </PLanding>

          <PLanding>
            More information about how Google uses data can be found here{" "}
            <a target="_blank" href="https://www.google.com/policies/privacy/partners/">
              www.google.com/policies/privacy/partners/
            </a>
          </PLanding>
          <Title type="h4" textAlign="left">
            3.3 Legal Disclosures
          </Title>
          <PLanding>
            In some circumstances we are legally obliged to share information. For example, under a court order or where
            we cooperate with supervisory authorities in handling complaints or investigations. We might also share
            information with other regulatory bodies in order to further their, or our, objectives. In any scenario,
            we’ll satisfy ourselves that we have a lawful basis on which to share the information and document our
            decision making and satisfy ourselves we have a legal basis on which to share the information.
          </PLanding>
          <Title type="h3" textAlign="left">
            4. Opting out
          </Title>
          <Title type="h4" textAlign="left">
            4.1 Cookies
          </Title>
          <PLanding>
            You may disable browser cookies in your browser or set your browser to warn you when a cookie is being sent.
            You may lose some features or functionality when you disable cookies. Remember, also, that disabling cookies
            is browser-specific.
          </PLanding>
          <Title type="h4" textAlign="left">
            4.2 Marketing Communications
          </Title>
          <PLanding>
            If you have agreed to receive marketing communications from us, you can later opt out by following the
            opt-out instructions in the marketing communications we send you or you can also contact us by using the
            contact details provided under the “How to Contact Us” section above. Depending on the ColdStack Services
            you use, you may also have the ability to change your communication preferences in the profile section of
            the online services that you use or in your device settings. If you do opt out of receiving marketing
            communications from us, we may still send communications to you about your transactions, any accounts you
            have with us, and any contests, competitions, prize draws or sweepstakes you have entered. Opting out of one
            form of communication does not mean you’ve opted out of other forms as well.
          </PLanding>
          <Title type="h3" textAlign="left">
            5. Your legal rights
          </Title>
          <PLanding>You have the right to:</PLanding>
          <Title type="h4" textAlign="left">
            5.1 Access Your Personal Information.
          </Title>
          <PLanding>
            You will receive a copy of the personal information we hold about you. Please note that we may request
            specific information from you to enable us to confirm your identity and right to access. If we cannot
            provide you with access to your personal information, we will inform you of the reasons why, subject to any
            legal or regulatory restrictions. If you would like to make such a request, please contact us at:{" "}
            <a href="mailto:info@coldstack.io">info@coldstack.io</a> and include “Access Personal Information” in the
            subject line.
          </PLanding>
          <Title type="h4" textAlign="left">
            5.2 Update Your Personal Information.
          </Title>
          <PLanding>
            We aim to ensure that personal information in our possession is accurate, current and complete. If you
            believe that the personal information about you is incorrect, incomplete or outdated, you may request the
            revision or correction of that information. We will use reasonable efforts to revise it and, if necessary,
            to use reasonable efforts to inform agents, service providers or other third parties, which were provided
            with inaccurate information, so records in their possession may also be corrected or updated. If you would
            like to make such a request, please contact us at: <a href="mailto:info@coldstack.io">info@coldstack.io</a>{" "}
            and include “Update Personal Information” in the subject line.
          </PLanding>
          <Title type="h4" textAlign="left">
            5.3 Object to Processing
          </Title>
          <PLanding>
            You may have the right to object to us processing your information in certain circumstances. This right
            applies when we are processing your personal information based on a legitimate interest (or those of a third
            party), which you may challenge if you feel it impacts your fundamental rights and freedoms. You also have
            the right to object where we are processing your personal information for direct marketing purposes.
            However, in some cases, we may demonstrate that we have compelling legitimate grounds to process your
            information or legal obligations which override your rights and freedoms. If you would like to make such a
            request, please contact us at: <a href="mailto:info@coldstack.io">info@coldstack.io</a> with “Object to
            Processing” in the subject line.
          </PLanding>
          <Title type="h4" textAlign="left">
            5.4 Erasure of Your Personal Information
          </Title>
          <PLanding>
            You may ask us to delete or remove personal information where there is no legal reason for us to continue
            using it. You also have the right to ask us to delete or remove your personal information where you
            successfully exercised your right to object to processing (see below), where we may have processed your
            information unlawfully or where we are required to erase your personal information to comply with law.
            Please note that we may not always be able to comply with your request of erasure for specific legal reasons
            which we will notify you, if applicable, at the time of your request. If you would like to make such a
            request, please contact us at: <a href="mailto:info@coldstack.io">info@coldstack.io</a> with “Erasure of
            Personal Information” in the subject line.
          </PLanding>
          <Title type="h4" textAlign="left">
            5.5 Data Portability
          </Title>
          <PLanding>
            You may request the transfer of your personal information to you or a third party. We will provide to you,
            or a third party you have chosen, your information in a structured, commonly used, machine-readable format.
            If you would like to make such a request, please contact us at:{" "}
            <a href="mailto:info@coldstack.io">info@coldstack.io</a> with “Data Portability” in the subject line. If you
            wish to exercise any of the rights set above, please send a request to{" "}
            <a href="mailto:info@coldstack.io">info@coldstack.io</a>. We will need you to provide specific information
            to help us confirm your identity. This is a security measure to help ensure that your personal information
            is not disclosed to someone that does not have the right to receive it.
          </PLanding>

          <Title type="h3" textAlign="left">
            6. Data retention
          </Title>
          <PLanding>
            We keep your personal information for as long as it is needed for the purposes for which we obtained it and
            in accordance with this Privacy Statement or we have another lawful basis for retaining that information
            beyond the period for which it is necessary to serve the original purpose for obtaining the personal
            information. If the lawful basis for processing that data is based solely on consent we will delete the
            personal information if that consent is revoked.
          </PLanding>
          <Title type="h3" textAlign="left">
            7. Children’s privacy
          </Title>
          <PLanding>
            Our services are not intended for use by children under the age of 13 or equivalent minimum age depending on
            the jurisdiction. If you are a parent or legal guardian and believe we may have collected information about
            your child, please contact us as described in the “<b>How to Contact Us</b>” section above. If we learn that
            we have inadvertently collected the personal information of a child under 13, or equivalent minimum age
            depending on the jurisdiction, we will take steps to delete the information as soon as possible.
          </PLanding>
          <Title type="h3" textAlign="left">
            8. Data security
          </Title>
          <PLanding>
            We protect your information using a layered security approach with multiple security measures, including
            physical, procedural and technical safeguards to reduce the risk of loss, misuse, unauthorized access,
            disclosure or modification of your information.
          </PLanding>
          <Title type="h3" textAlign="left">
            9. Policy Updates
          </Title>
          <PLanding>
            Any policy updates will be published on www.coldstack.io and change notifications sent to clients via email.
          </PLanding>
        </div>
        <Footer />
      </div>
      <Title type="h3" textAlign="left" />
      <Title type="h4" textAlign="left" />
      <PLanding />
    </div>
  );
};

export default PrivacyPolicy;
