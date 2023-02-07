import React from "react";
import style from "./termsOfService.module.scss";
import Footer from "containers/LandingPage/Partials/Footer/Footer";
import PLanding from "components/UI/PLanding/PLanding";
import Title from "components/UI/Title/Title";
import MetaTags from "react-meta-tags";
import HeaderMenuLanding from "../LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";

const TermsOfService = () => {
  return (
    <div className={style.wrapper}>
      <MetaTags>
        <title>ColdStack: Terms and Conditions of Service</title>
        <meta name="description" content="ColdStack: Terms and Conditions of Service" />
      </MetaTags>
      <div className={style.content}>
        <div className="container">
          <HeaderMenuLanding />
        </div>
        <div className={"textBlock"}>
          <Title type="h2">Terms and Conditions of Service</Title>
          <PLanding size="18px">
            These Terms and Conditions of Service (the “Terms”) and our Privacy Policy govern your access to and use of
            the ColdStack services and the ColdStack website so please read them carefully.
          </PLanding>
          <PLanding color={"#9b9ca8"}>Effective date: Dec 10, 2020</PLanding>
          <PLanding>
            By using ColdStack, you are agreeing to these Terms and the use of your Personal Information as described in
            our Privacy Policy. If you do not agree to these Terms, do not use ColdStack. If you are using ColdStack on
            behalf of an organization such as your employer, you are agreeing to these Terms on behalf of that
            organization, and represent and warrant that you have the authority to agree to these Terms on the
            organization's behalf. In that case, “you” and “your” will refer to that organization.
          </PLanding>
          <PLanding>
            We may periodically revise the Terms. If a revision is material, as determined solely by us, we will notify
            you for example via email. The current version of our Terms will always be posted on our Terms page, so
            please check back regularly. By continuing to use ColdStack after revisions become effective, you are
            agreeing to the revised Terms. If you do not agree to the revised Terms, please stop using ColdStack.
          </PLanding>
          <Title type="h3" textAlign="left">
            1. Your ColdStack Account
          </Title>
          <PLanding>To use ColdStack, you may need to create an account.</PLanding>
          <PLanding>
            You are responsible for safeguarding your ColdStack login credentials. You are responsible for activity on
            your account, whether or not you authorized that activity. You should immediately notify us of any
            unauthorized use of your account.
          </PLanding>
          <Title type="h3" textAlign="left">
            2. Private beta program
          </Title>
          <PLanding>
            By signing up to ColdStack private beta you understand that ColdStack platform is a beta software which
            implies that the system may produce errors and issues which may result in the loss of data.
          </PLanding>

          <PLanding>
            ColdStack has the right to accept or reject participation in private beta programs at its sole discretion.
            The amount and number of rewards will be decided for each selected project separately.
          </PLanding>

          <PLanding>
            ColdStack reserves the right not to accept any submitted project to participate in a private beta program.
          </PLanding>
          <Title type="h3" textAlign="left">
            3. Your Content
          </Title>
          <PLanding>
            By using ColdStack, you provide us with text, images, file attachments, and other information (“your
            content”). You retain full ownership of your content - what belongs to you stays yours.
          </PLanding>

          <PLanding>
            You can remove your content by deleting it. However, in certain instances, some of your content may not be
            completely removed (when your data is shared with someone else, for example). We are not responsible or
            liable for the removal or deletion of any of your content, or the failure to remove or delete such content.
          </PLanding>

          <PLanding>
            You are solely responsible for your content and indicate that you own or have the necessary rights to all of
            your content, and that use of your content does not infringe, misappropriate or violate a third party’s
            intellectual property rights, or rights of publicity or privacy, or result in the violation of any
            applicable law or regulation.
          </PLanding>
          <Title type="h3" textAlign="left">
            4. Your Use of ColdStack
          </Title>
          <PLanding>
            You may only use ColdStack as permitted by law, including all applicable federal, state, local or
            international laws and regulations. Do not, for example:
            <ul>
              <li>
                Use any engine, software, tool, agent, device, mechanism or the like to access, search, or download
                intellectual property from ColdStack, or use ColdStack in any way other than through our publicly
                supported interfaces;
              </li>
              <li>
                Access, tamper with, or use non-public areas of ColdStack, ColdStack’s computer systems, or the
                technical delivery systems of ColdStack's providers;
              </li>
              <li>
                Probe, scan, or test the vulnerability of any ColdStack system or network or breach any security or
                authentication measures;
              </li>
              <li>
                Decipher, decompile, disassemble or reverse engineer any of the software used to provide ColdStack;
              </li>
              <li>Plant malware or use ColdStack to distribute malware;</li>
              <li>Violate the privacy of others;</li>
              <li>Violate any applicable law or regulation;</li>
              <li>
                Impersonate or misrepresent your affiliation with any person or entity; or post or transmit anything
                that is fraudulent or misleading;
              </li>
              <li>
                Send unsolicited communications, promotions, advertisements or spam or otherwise infringe on others'
                rights;
              </li>
              <li>
                Interfere with the access of any user, host or network, including introducing any virus to, overloading,
                flooding, spamming, or mail-bombing ColdStack, or introducing any other material or content which is
                malicious or technologically harmful;
              </li>
              <li>
                Attack ColdStack via a denial-of-service attack or a distributed denial-of-service attack; or otherwise
                attempt to interfere with the proper working of ColdStack;
              </li>
              <li>Attempt any of the above, or encourage or enable any other individual to do any of the above.</li>
            </ul>
            We have the right to investigate violations of these Terms and may also consult and cooperate with law
            enforcement authorities to prosecute users who violate the law.
          </PLanding>

          <Title type="h3" textAlign="left">
            5. Confidentiality
          </Title>

          <Title type="h4" textAlign="left">
            5.1 Confidential Information.
          </Title>

          <PLanding>
            From time to time, either party (the "Disclosing Party") may disclose or make available to the other party
            (the "Receiving Party") non-public, proprietary, and confidential information of the Disclosing Party
            (“Confidential Information”). Confidential Information includes any information that reasonably should be
            understood to be confidential given the nature of the information and the circumstances of disclosure,
            including non-public business, product, technology and marketing information ("Confidential Information").
          </PLanding>
          <PLanding>
            Confidential Information does not include any information that: (a) is or becomes generally available to the
            public other than as a result of the Receiving Party's breach of this confidentiality section; (b) is or
            becomes available to the Receiving Party on a non-confidential basis from a third party source, provided
            that such third party is not and was not prohibited from disclosing such Confidential Information; (c) was
            in the Receiving Party's possession prior to the Disclosing Party's disclosure hereunder; or (d) was or is
            independently developed by the Receiving Party without using any of the Disclosing Party Confidential
            Information.
          </PLanding>

          <Title type="h4" textAlign="left">
            5.2 Protection and Use of Confidential Information.
          </Title>

          <PLanding>
            The Receiving Party shall: (a) protect and safeguard the confidentiality of the Disclosing Party's
            Confidential Information with at least the same degree of care as the Receiving Party would protect its own
            Confidential Information, but in no event with less than a commercially reasonable degree of care; (b) not
            use the Disclosing Party's Confidential Information, or permit it to be accessed or used, for any purpose
            other than to exercise its rights or perform its obligations under these Terms; and (c) not disclose any
            such Confidential Information to any person or entity, except to the Receiving Party's service providers or
            financial/legal advisors who need to know the Confidential Information and are bound to confidentiality
            obligations at least as restrictive as those in these Terms.
          </PLanding>

          <Title type="h4" textAlign="left">
            5.3 Compelled Access or Disclosure.
          </Title>

          <PLanding>
            If the Receiving Party is required by applicable law or legal process to disclose any Confidential
            Information, it shall, prior to making such disclosure, use commercially reasonable efforts to notify the
            Disclosing Party of such requirements to afford the Disclosing Party the opportunity to seek, at the
            Disclosing Party's sole cost and expense, a protective order or other remedy.
          </PLanding>

          <Title type="h3" textAlign="left">
            6. Copyright Infringement
          </Title>

          <PLanding>We respect the intellectual property rights of others, and expect you to do the same.</PLanding>
          <PLanding>
            It is our policy to terminate the ColdStack account of anyone who repeatedly infringes the copyright or
            intellectual property rights of others.
          </PLanding>
          <PLanding>
            If you believe that any materials you or others access via the Services infringe your copyright or other
            intellectual property rights (e.g., trademark infringement or right of publicity), please contact our
            Copyright Agent at the address below and provide the following information:
            <ol>
              <li>Your full legal name and electronic or physical signature;</li>
              <li>A description of the copyrighted work or other interest that you believe has been infringed;</li>
              <li>
                Enough information to properly identify and locate that content (including, at a minimum, the relevant
                URL);
              </li>
              <li>Contact information, including your address, telephone number, and email address;</li>
              <li>
                The following statements in the body of notice:
                <ul>
                  <li>
                    “I hereby state that I have not authorized the challenged use, and I have a good-faith belief that
                    the challenged use is not authorized by law.”
                  </li>
                  <li>
                    “I hereby state under penalty of perjury that all of the information in the notification is accurate
                    and that I am the owner of the IP, or authorized to act on behalf of the owner of the IP.”
                  </li>
                </ul>
              </li>
            </ol>
          </PLanding>
          <PLanding>
            Upon receipt of notice as described above, we will seek to confirm the existence of the IP on ColdStack and
            take whatever action, in its sole discretion, we deem appropriate.
          </PLanding>
          <PLanding>
            {" "}
            Our designated Copyright Agent for notices of copyright infringement and counter-notices is:{" "}
            <a href="mailto:info@coldstack.io"> info@coldstack.io</a>
          </PLanding>

          <Title type="h3" textAlign="left">
            7. Termination
          </Title>

          <PLanding>
            We may terminate or modify your access to and use of ColdStack, at our sole discretion, at any time and
            without notice to you, for example, if you are not complying with these Terms, or if you use ColdStack in
            any way that would cause us legal liability or disrupt others’ use of ColdStack.
          </PLanding>
          <PLanding>
            Likewise, you may cancel your account at any time, although we will be sorry to see you go.
          </PLanding>
          <PLanding>
            If we suspend or terminate your use of ColdStack, we will try to let you know in advance and help you
            retrieve data, though there may be cases (for example, flagrantly violating these Terms) where we may
            suspend immediately.
          </PLanding>

          <Title type="h3" textAlign="left">
            8. Publicity
          </Title>

          <PLanding>
            Unless otherwise specified, ColdStack may use Customer’s name, logo and marks (including marks on Customer
            Properties) to identify Customer as a ColdStack customer on ColdStack's website and other marketing
            materials.
          </PLanding>

          <Title type="h3" textAlign="left">
            9. Warranty Disclaimers
          </Title>

          <PLanding>
            COLDSTACK IS PROVIDED “AS IS,” AT YOUR OWN RISK, WITHOUT EXPRESS OR IMPLIED WARRANTY OR CONDITION OF ANY
            KIND. WE ALSO DISCLAIM ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR
            NON-INFRINGEMENT. ColdStack will have no responsibility for any harm to your computer system, loss or
            corruption of data, or other harm that results from your access to or use of ColdStack. Some states do not
            allow the types of disclaimers in this paragraph, so they may not apply to you.
          </PLanding>

          <Title type="h3" textAlign="left">
            10. Indemnity
          </Title>

          <PLanding>
            You will hold harmless and indemnify ColdStack and its affiliates, officers, directors, employees,
            contractors, agents, licensors, and suppliers from and against any claim, suit or action arising from or
            related to the use of ColdStack or violation of these Terms, including any liability or expense arising from
            claims, losses, damages, suits, judgments, litigation costs and attorneys’ fees.
          </PLanding>

          <Title type="h3" textAlign="left">
            11. Limitation of Liability
          </Title>

          <PLanding>
            (A) TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL COLDSTACK, ITS AFFILIATES, OFFICERS, EMPLOYEES,
            AGENTS, SUPPLIERS OR LICENSORS BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, EXEMPLARY OR
            CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF USE, PROFIT, DATA, GOOD WILL, SERVICE INTERRUPTIONS, COMPUTER
            DAMAGE OR SYSTEM FAILURE), REGARDLESS OF LEGAL THEORY, WHETHER OR NOT COLDSTACK D.O.O. HAS BEEN WARNED OF
            THE POSSIBILITY OF SUCH DAMAGES, AND EVEN IF A REMEDY FAILS OF ITS ESSENTIAL PURPOSE; (B) AGGREGATE
            LIABILITY FOR ALL CLAIMS RELATING TO COLDSTACK SHALL BE NO MORE THAN THE GREATER OF $20 OR THE AMOUNTS PAID
            BY YOU TO COLDSTACK FOR THE PAST THREE MONTHS OF THE SERVICES IN QUESTION. Some states do not allow the
            types of limitations in this paragraph. If you are in one of these jurisdictions, these limitations may not
            apply to you.
          </PLanding>

          <Title type="h3" textAlign="left">
            12. Terms of Paid Subscriptions
          </Title>

          <PLanding>
            If you purchase a subscription to the Services via the ColdStack website (“Online Subscription”) or pursuant
            to any ordering document (“Order Form Subscription”), the following terms of subscription will apply to you:
          </PLanding>

          <Title type="h4" textAlign="left">
            12.1 Subscription Term
          </Title>
          <PLanding>
            The Services are provided on a subscription basis for a term defined in the Online Subscription, or on the
            Order Form Subscription, as applicable (each, a “Subscription Term”).
          </PLanding>

          <Title type="h4" textAlign="left">
            12.2 Cancellation
          </Title>
          <PLanding>
            You may cancel your subscription at any time; however, you are responsible for advance payment of the entire
            Subscription Term. Fees are non-refundable based on the Subscription Term purchased and not actual usage.
            Payment obligations for the Subscription Term to which you subscribe are noncancelable.
          </PLanding>
          <Title type="h4" textAlign="left">
            12.3 Renewals
          </Title>
          <PLanding>
            For Online Subscriptions, each Subscription Term will automatically renew for an additional Subscription
            Term equal in length to the original Subscription Term. Online Subscriptions can be canceled directly at{" "}
            <a href="https://www.coldstack.io">www.coldstack.io</a>
          </PLanding>
          <PLanding>
            For Order Form Subscriptions, each Subscription Term will automatically renew for an additional Subscription
            Term equal in length to the original Subscription Term, unless cancellation is requested in writing
            (including by email to <a href="mailto:support@coldstack.io">support@coldstack.io</a>) at least thirty (30)
            days prior to the expiration of the then-current Subscription Term.
          </PLanding>

          <Title type="h4" textAlign="left">
            12.4 Billing and Payment
          </Title>
          <PLanding>
            If you purchase a subscription to the Services via credit card, debit card or other payment card
            (collectively, “Credit Card”), you hereby authorize ColdStack (or its designee) to automatically charge your
            credit card in accordance with the applicable Online Subscription or Order Form Subscription. You
            acknowledge that certain credit cards may charge you foreign transaction fees or other charges. If your
            payment is not successfully settled for any reason, you remain responsible for any amounts not remitted to
            ColdStack. Each net new user beyond the scope of the initial Online Subscription or Order Form Subscription,
            as applicable, will incur an additional charge, and will be included in a true-up invoice or charged
            automatically via credit card, as applicable.
          </PLanding>

          <Title type="h4" textAlign="left">
            12.5 Late Payments
          </Title>
          <PLanding>
            Any late payments shall be subject to a service charge equal to 1.5% per month of the amount due or the
            maximum amount allowed by law, whichever is less (plus the costs of collection). ColdStack may terminate
            your subscription if you fail to promptly pay any outstanding fees.
          </PLanding>

          <Title type="h4" textAlign="left">
            12.6 Taxes and Fees
          </Title>
          <PLanding>
            You are responsible for all sales, use, value added or other taxes of any kind, other than taxes based on
            ColdStack’s net income. You are also responsible for any payment-related fees such as wire transfer or
            Credit Card processing fees.
          </PLanding>

          <Title type="h4" textAlign="left">
            12.7 Expenses
          </Title>
          <PLanding>
            You are responsible for all fees or expenses related to accessing or using the Services that are extrinsic
            to the Services. This includes, without limitation, your own internet service provider fees.
          </PLanding>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TermsOfService;
