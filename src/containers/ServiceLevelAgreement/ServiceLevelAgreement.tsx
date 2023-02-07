import React from "react";
import style from "./serviceLevelAgreement.module.scss";
import Footer from "containers/LandingPage/Partials/Footer/Footer";
import PLanding from "components/UI/PLanding/PLanding";
import MetaTags from "react-meta-tags";
import HeaderMenuLanding from "../LandingPage/Partials/HeaderMenuLanding/HeaderMenuLanding";
import Title from "../../components/UI/Title/Title";

const ServiceLevelAgreement = () => {
  return (
    <div className={style.wrapper}>
      <MetaTags>
        <title>ColdStack: Service License Agreement</title>
        <meta name="description" content="ColdStack: Service License Agreement" />
      </MetaTags>
      <div className={style.content}>
        <div className="container">
          <HeaderMenuLanding />
        </div>
        <div className={"textBlock"}>
          <Title type="h2">Service Level Agreement</Title>

          <PLanding color={"#9b9ca8"}>Last updated: Feb 14, 2022</PLanding>
          <PLanding>
            This ColdStack Service Level Agreement (“SLA”) sets forth the service levels provided by ColdStack with
            respect to ColdStack's services (the “ColdStack Service”) agreed between the applicable ColdStack entity
            (“ColdStack ”, “we”, “us” or “ours”) and you as a user of our services (“Customer”, “you” or “your”).
          </PLanding>
          <Title type="h3" textAlign="left">
            The following definitions apply to this SLA:
          </Title>

          <PLanding>
            <ul>
              <li>
                <b>“User Account”</b> is an individual user of one or more Covered Services paid for by a Customer. Each
                User Account has a unique email address.
              </li>
              <li>
                <b>“User Downtime”</b> means a User Account is not able to access a Covered Service to log in, upload
                data, select files, or download completed data restores/snapshots unless excluded by the SLA Exclusions
                below.
              </li>
              <li>
                <b>“User Downtime Period”</b> means a period of one or more consecutive minutes of User Downtime.
                Partial or intermittent minutes of User Downtime will not be counted.
              </li>
              <li>
                <b>“Monthly User Downtime”</b> is the total of all User Downtime Periods in a given month.
              </li>
              <li>
                <b>“Monthly User Uptime Percentage”</b> is computed as the total number of minutes in a given month,
                minus the Monthly User Downtime for that month, divided by the total number of minutes in that month.
                <div className={style.table}>
                  <div className={style.row}>
                    <div className={style.column}>
                      <b>Monthly Uptime Percentage</b>
                    </div>
                    <div className={style.column}>
                      <b>Service Credit Percentage</b>
                    </div>
                  </div>
                  <div className={style.row}>
                    <div className={style.column}>Equal to or greater than 99.0% but less than 99.9%</div>
                    <div className={style.column}>10%</div>
                  </div>
                  <div className={style.row}>
                    <div className={style.column}>less than 99.0%</div>
                    <div className={style.column}>25%</div>
                  </div>
                </div>
              </li>

              <li>
                <b>“Service Credit”</b> is the User Credit Percentage times the monthly amount charged for a User
                Account. For license terms greater than 1 month (e.g. yearly and two year licenses), the monthly amount
                is the amount charged for the license divided by the number of months in the license term.
              </li>
            </ul>
          </PLanding>

          <Title type="h3" textAlign="left">
            The ColdStack Service Level Objective
          </Title>

          <PLanding>
            During the term of this SLA, ColdStack agrees to meet or exceed a Service Level Objective (“SLO”) of 99.9%
            for the Monthly User Uptime Percentage. If ColdStack does not meet or exceed the SLO, and if the Customer meets
            its obligations under this SLA detailed below, the Customer will be eligible to receive a Service Credit as
            described above. This SLA states Customer’s sole and exclusive remedy for any failure by ColdStack to meet
            the SLO.
          </PLanding>

          <Title type="h3" textAlign="left">
            Customer Obligations Under SLA
          </Title>

          <PLanding>
            To receive a Service Credit, Customers must submit a claim via a support ticket at ColdStack Support.
          </PLanding>

          <PLanding>
            Claims must include:
            <ul>
              <li>SLO violation term month/year in the title of the support ticket</li>
              <li>The User Account for which the Service Credit is sought</li>
              <li>An estimate of the Monthly User Downtime the Customer is claiming for the User Account</li>
              <li>The dates and times of each User Downtime incident.</li>
            </ul>
          </PLanding>

          <Title type="h3" textAlign="left">
            Credit Request and Payment Procedures
          </Title>

          <PLanding>
            To receive a Service Credit, you must submit a claim to{" "}
            <a href="mailto:support@coldstack.io">support@coldstack.io</a>
          </PLanding>
          <PLanding>
            To be eligible, the credit request must be received by us by the end of the second billing cycle after which
            the incident occurred and must clearly
          </PLanding>
          <PLanding>(a) indicate in the subject line that it is a Service Credit request;</PLanding>
          <PLanding>
            (b) specify the dates and times of each incident of non-zero Error Rates that you are claiming;
          </PLanding>
          <PLanding>
            (c) document the errors and corroborate your claimed outage (any confidential or sensitive information in
            these logs should be removed or replaced with asterisks).
          </PLanding>
          <PLanding>
            If your request is validated by us, then we will issue the Service Credit to you within one billing cycle
            following the month in which your request is confirmed by us. If you do not timely submit a written request
            for a Service Credit, you forfeit all rights to receive a Service Credit for the billing cycle in question.
          </PLanding>
          <PLanding>
            A Service Credit will be applicable and issued only if the credit amount for the applicable monthly billing
            cycle is greater than one dollar ($1 USD). We will apply any Service Credits only against future payments
            otherwise due from you for the Services. We may elect to issue the Service Credit to the credit card you
            used to pay the fees during the billing cycle in which the error occurred. Service Credits may not be
            transferred or applied to any account other than the account in which the error occurred, as set forth
            below.
          </PLanding>

          <Title type="h3" textAlign="left">
            SLA Exclusions
          </Title>

          <PLanding>
            This SLA does not apply to any unavailability, suspension or termination of the ColdStack Service, or any
            other ColdStack Service performance issues:
          </PLanding>
          <PLanding>
            (i) caused by factors outside of our reasonable control, including any force majeure event or Internet
            access or related problems beyond the demarcation point of the ColdStack Service;
          </PLanding>
          <PLanding>(ii) that result from any actions or inactions of you or any third party;</PLanding>
          <PLanding>
            (iii) that result from your equipment, software or other technology and/or third party equipment, software
            or other technology (other than third party equipment within our direct control);
          </PLanding>
          <PLanding>(iv) that result from scheduled or emergency maintenance activities for the Services;</PLanding>
          <PLanding>
            (v) arising from our suspension and termination of your right to use the ColdStack Service in accordance
            with the Customer Agreement;
          </PLanding>
          <PLanding>
            (vi) ColdStack’s scheduled maintenance, which will be notified to you via the ColdStack Service or at{" "}
            <a href="status.coldstack.io">https://status.coldstack.io</a>, as well as any unscheduled emergency
            maintenance.
          </PLanding>
          <PLanding>
            Further, all test, development, beta, sandbox and other non-production environments are expressly excluded
            from this SLA, and no Service Credits shall be available for unavailability of any such environment.
          </PLanding>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ServiceLevelAgreement;
