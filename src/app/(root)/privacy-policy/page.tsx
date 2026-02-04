import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy",
};

export default function Page() {
  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      {/* Head */}
      <div className="mb-12">
        <h1 className="md:text-h1-semibold text-h2-semibold text-center">
          Privacy Policy
        </h1>
      </div>

      {/* Policy */}
      <div className="flex flex-col gap-6 border border-border rounded-3xl sm:p-6 p-4 md:p-8 lg:p-10">
        <h3 className="sm:text-h3-semibold text-h4-semibold text-black text-center">
          Thank you for using Hypospadias E-Journals.
        </h3>

        {/* Section A */}
        <div className="flex flex-col gap-3">
          <h3 className="sm:text-h4-semibold text-h5-semibold text-black">
            A. Copyright and Publication Rights
          </h3>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            This work is subject to copyright. All rights are solely and exclusively licensed by the Journal, whether the whole or part of the material is concerned, specifically the rights of translation, reprinting, reuse of illustrations, recitation, broadcasting, reproduction on microfilms or in any other physical way, and transmission or information storage and retrieval, electronic adaptation, computer software, or by similar or dissimilar methodology now known or hereafter developed.
          </p>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            The use of general descriptive names, registered names, trademarks, service marks, etc. in this Journal does not imply, even in the absence of a specific statement, that such names are exempt from the relevant protective laws and regulations and therefore free for general use.
          </p>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            The authors and the editors are safe to assume that the advice and information in this publication are believed to be true and accurate at the date of publication. Neither the Journal nor the authors or the editors give a warranty, expressed or implied, with respect to the material contained herein or for any errors or omissions that may have been made.
          </p>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            The Journal remains neutral with regard to jurisdictional claims in published materials and institutional affiliations.
          </p>
        </div>

        {/* Section B */}
        <div className="flex flex-col gap-3">
          <h3 className="sm:text-h4-semibold text-h5-semibold text-black">
            B. Information We Collect
          </h3>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            We collect and process only the information necessary to provide and manage your account and deliver the Service. This may include:
          </p>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            <strong>Personal Information:</strong> your name, email address, and phone number, which are used for registration, login, and communication purposes.
          </p>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            <strong>Account Information:</strong> username, password hash, and profile settings.
          </p>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            <strong>Device and Usage Data:</strong> basic technical details such as device model, operating system version, app version, language, IP address, and timestamps, used solely for app performance and security.
          </p>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            <strong>Optional Information:</strong> any information you choose to provide through forms, feedback, or support messages.
          </p>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            We do not collect precise location, financial information, or sensitive biometric data.
          </p>
        </div>

        {/* Section C */}
        <div className="flex flex-col gap-3">
          <h3 className="sm:text-h4-semibold text-h5-semibold text-black">
            C. How We Use the Information
          </h3>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            We use collected data only for:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li className="text-black sm:text-h7-regular text-h8-regular">Account creation and authentication</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">Communication with users (e.g., verification, support, updates)</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">Maintaining and improving the Service</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">Preventing fraud, abuse, or unauthorized access</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">Legal and regulatory compliance</li>
          </ul>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            We do not sell or rent your personal information to any third party.
          </p>
        </div>

        {/* Section D */}
        <div className="flex flex-col gap-3">
          <h3 className="sm:text-h4-semibold text-h5-semibold text-black">
            D. Data Storage and Security
          </h3>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li className="text-black sm:text-h7-regular text-h8-regular">All data are stored on secure, access-controlled servers.</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">Passwords are stored using one-way hashing and encryption methods.</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">Network communications are protected by SSL / TLS.</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">Access to user data is restricted to authorized staff who require it to operate the Service.</li>
          </ul>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            Despite our efforts, no system can be guaranteed 100% secure; you share information at your own risk.
          </p>
        </div>

        {/* Section E */}
        <div className="flex flex-col gap-3">
          <h3 className="sm:text-h4-semibold text-h5-semibold text-black">
            E. Data Retention and Deletion
          </h3>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            We retain your data only as long as your account remains active or as required by law. You may request account deletion at any time by contacting us at <Link href="/profile" className="text-blue-600 hover:underline">https://hypospadias-journals.com/profile</Link>
          </p>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            Upon deletion, all personally identifiable data will be permanently erased within 30 days.
          </p>
        </div>

        {/* Section F */}
        <div className="flex flex-col gap-3">
          <h3 className="sm:text-h4-semibold text-h5-semibold text-black">
            F. Sharing and Disclosure
          </h3>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            We may share limited data only in the following cases:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li className="text-black sm:text-h7-regular text-h8-regular">With trusted service providers who host or process data on our behalf (subject to confidentiality agreements).</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">When required by law, regulation, or valid legal process.</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">To protect the rights, property, or safety of users and the Service.</li>
          </ul>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            We do not permit third-party analytics or advertising SDKs to access personal data for marketing purposes.
          </p>
        </div>

        {/* Section G */}
        <div className="flex flex-col gap-3">
          <h3 className="sm:text-h4-semibold text-h5-semibold text-black">
            G. Children&apos;s Privacy
          </h3>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            Our Service is not directed to children under 13 years of age. We do not knowingly collect information from children. If you believe that a child has provided us personal data, please contact us and we will promptly delete it.
          </p>
        </div>

        {/* Section H */}
        <div className="flex flex-col gap-3">
          <h3 className="sm:text-h4-semibold text-h5-semibold text-black">
            H. Your Rights
          </h3>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li className="text-black sm:text-h7-regular text-h8-regular">Access, correct, or delete your personal information.</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">Withdraw consent to data processing.</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">Request a copy of your data in a portable format.</li>
            <li className="text-black sm:text-h7-regular text-h8-regular">Lodge a complaint with a data-protection authority.</li>
          </ul>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            Requests can be sent to <a href="mailto:assistant@hypospadias-society.com" className="text-blue-600 hover:underline">assistant@hypospadias-society.com</a>
          </p>
        </div>

        {/* Section I */}
        <div className="flex flex-col gap-3">
          <h3 className="sm:text-h4-semibold text-h5-semibold text-black">
            I. Changes to This Policy
          </h3>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            We may update this Privacy Policy from time to time. The latest version will always be available within the app and on our website, and the &quot;Last Updated&quot; date will reflect the revision date.
          </p>
        </div>

        {/* Section J */}
        <div className="flex flex-col gap-3">
          <h3 className="sm:text-h4-semibold text-h5-semibold text-black">
            J. Contact Us
          </h3>
          <p className="text-black sm:text-h7-regular text-h8-regular">
            If you have any questions or concerns about this Privacy Policy or our data-handling practices, please contact:
          </p>
          <div className="text-black sm:text-h7-regular text-h8-regular">
            <p className="font-semibold">Hypospadias E-Journals</p>
            <p>Email: <a href="mailto:assistant@hypospadias-society.com" className="text-blue-600 hover:underline">assistant@hypospadias-society.com</a></p>
            <p>Phone: 0049 174 205 6913</p>
            <p className="mt-2">Address: Max-Planck Str.2,<br />Seligenstadt, D-63500, Germany</p>
          </div>
        </div>
      </div>
    </section>
  )
}
