import MainLayout from "@/Layouts/MainLayout";
import Head from "next/head";
import React from "react";

export default function index() {
  return (
    <MainLayout>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_TITLE}Terms and Conditions`}</title>
      </Head>
      <div className="privacy mt-[40px] grid grid-cols-1 gap-[40px]">
        <div className="">
          <h3>1.Account Registration: </h3>
          <p>
            A user account can be created on the Website. Account credentials
            must be kept confidential, and you are responsible for all
            activities under your account. The information you provide during
            the registration process must be accurate and complete.
          </p>
        </div>

        <div className="">
          <h4>2.Privacy and Confidentiality: </h4>
          <ol type="a">
            <li>
              {" "}
              Protection of Student Information: EMPWR360 respects students'
              right to privacy and confidentiality. In compliance with the
              relevant laws and regulations, we have put in place procedures to
              safeguard the security and privacy of student data.
            </li>
            <li>
              {" "}
              Use of Student Information: As stated in our Privacy Policy, any
              data gathered from students on the Website will only be utilized
              for administrative and educational activities. We don't give out
              student data to outside companies for marketing purposes.
            </li>
          </ol>
        </div>

        <div className="">
          <h4>3.User Conduct: </h4>
          <ol type="a">
            <li>
              {" "}
              <strong>Prohibited Activities:</strong> : It is against the law
              for website users to do any of the following: - Breaking any rules
              or laws that may be in force. - Posing as another person or
              organization or making a false claim of affiliation with EMPWR360.
              - Trying to gain access to or interfere with the functionality,
              security, or systems of the Website.
            </li>
          </ol>
        </div>

        <div className="mb-[40px]">
          <h4>4. Intellectual Property:</h4>
          <p>
            a. Ownership: EMPWR360 is the only owner of every right to
            intellectual property as well as all other rights, titles, and
            interests in and to the Website. b. Content Use: You are only
            permitted to use the website's content for private, non-commercial
            reasons. Without EMPWR360's prior written authorization, you are not
            permitted to copy, distribute, modify, or use the content in any
            other way.
          </p>
        </div>
        <div className="mb-[40px]">
          <h4> 5.Termination:</h4>
          <p>
            EMPWR360 reserves the right to terminate or suspend your access to
            the Website at its sole discretion, without notice, for any
            violation of these Terms or for any other reason.
          </p>
          </div>
          <div className="mb-[40px]">

          <h4>6.Changes to Terms:</h4>
          <p>EMPWR360 may update these Terms at any time, and any changes will be
          effective immediately upon posting on the Website. Your continued use
          of the Website after any such changes constitutes your acceptance of
          the updated terms.</p>
          </div>
          <div className="mb-[40px]">

          <h4>7.Contact Information:</h4>
          <p>
            If you have any questions or concerns regarding these Terms or the
            Website, please contact us at info@empwr360.com
          </p>
          <p>
            By using the EMPWR360 Website, you acknowledge that you have read,
            understood, and agree to these Terms and Conditions.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
