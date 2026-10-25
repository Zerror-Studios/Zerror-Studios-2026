import React from "react";
import { createMetadata } from "@/lib/seo";
import { LegalPage, LegalSection, LegalList } from "@/components/common/LegalPage";

export const metadata = createMetadata({
  title: "Privacy policy | Zerror Studios",
  description: "How Zerror Studios collects, uses and protects personal information on zerrorstudios.com.",
  path: "/privacy",
});

const mail = (
  <a href="mailto:admin@zerrorstudios.com" className="underline underline-offset-4 decoration-1">
    admin@zerrorstudios.com
  </a>
);

const PrivacyPage = () => {
  return (
    <LegalPage title="Privacy policy" updated="19 October 2026">
      <LegalSection>
        <p>
          This policy explains what personal information Zerror Studios collects through zerrorstudios.com, why, and what you can ask us to do with it. Zerror Studios is a partnership firm in India. It is written with India&apos;s Digital Personal Data Protection Act, 2023 in mind.
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <LegalList>
          <li>
            <strong className="font-semibold">What you tell us.</strong> When you use the Start a project form, the contact form or the careers form, we collect your name, brand or company, email, phone number if you give it, what you need, your rough budget if you share it, and anything you write or attach, such as a resume or portfolio.
          </li>
          <li>
            <strong className="font-semibold">How you use the site.</strong> We use Google Analytics 4 to understand how the site is used: pages visited, time on the site, device and browser type, and the general area you are browsing from. It uses cookies, explained below.
          </li>
        </LegalList>
        <p>We do not collect payment details on this website.</p>
      </LegalSection>

      <LegalSection title="Why we use it">
        <LegalList>
          <li>To reply to you and talk about your project.</li>
          <li>To consider you for a role, if you applied through the careers form.</li>
          <li>To understand which pages are useful and improve the site.</li>
        </LegalList>
        <p>We do not sell your information, and we do not use it for anything unrelated to the reason you gave it.</p>
      </LegalSection>

      <LegalSection title="Who we share it with">
        <p>
          Only the services that help us run the site and reply to you: our hosting provider (Amazon Web Services), our email provider (Google Workspace) and our analytics provider (Google Analytics). They handle your information on our behalf. We may also share it if the law requires us to.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          Project enquiries are kept while we are in conversation and for up to two years after, in case you come back to us. Careers applications are kept for one year. After that we delete them. If you become a client, your details move to our client records and the terms of your agreement apply.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          We use cookies the site needs to work, and analytics cookies that tell us how the site is used. You can block or delete cookies in your browser settings, and the site will still work.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>You can ask us to:</p>
        <LegalList>
          <li>tell you what personal information we hold about you,</li>
          <li>correct it or bring it up to date,</li>
          <li>delete it, or</li>
          <li>stop using it, where you gave consent and want to withdraw it.</li>
        </LegalList>
        <p>
          Write to {mail} with &quot;Privacy&quot; in the subject line. We will reply within 30 days.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>This website is meant for businesses. We do not knowingly collect information from anyone under 18.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>If we change this policy, we will update the date at the top of this page.</p>
      </LegalSection>

      <LegalSection title="Contact and grievances">
        <p>For any question or complaint about your personal information, contact our grievance officer:</p>
        <p>
          Rohit Tiwari, Founder
          <br />
          Email: {mail}
          <br />
          Phone: <a href="tel:+917738802437" className="underline underline-offset-4 decoration-1">+91 77388 02437</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default PrivacyPage;
