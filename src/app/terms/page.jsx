import React from "react";
import { Link } from "next-view-transitions";
import { createMetadata } from "@/lib/seo";
import { LegalPage, LegalSection } from "@/components/common/LegalPage";

export const metadata = createMetadata({
  title: "Terms of use | Zerror Studios",
  description: "The terms for using zerrorstudios.com.",
  path: "/terms",
});

const TermsPage = () => {
  return (
    <LegalPage title="Terms of use" updated="19 October 2026">
      <LegalSection>
        <p>
          These terms apply to your use of zerrorstudios.com, run by Zerror Studios. By using the site, you agree to them.
        </p>
      </LegalSection>

      <LegalSection title="The website">
        <p>
          The site tells you about our studio and our work. We keep it accurate and up to date, but it is provided as it is, and we do not promise it will always be available or free of errors.
        </p>
      </LegalSection>

      <LegalSection title="Our content">
        <p>
          The text, design, code, animations and images on this site belong to Zerror Studios unless we say otherwise. You are welcome to share links and quote it with credit. Please do not copy or reuse it in your own work without asking.
        </p>
      </LegalSection>

      <LegalSection title="Client work and logos">
        <p>
          The projects, brand names and logos shown here belong to their owners. We show them with our clients&apos; permission as examples of our work. Showing them does not mean a brand endorses anything beyond the work described.
        </p>
      </LegalSection>

      <LegalSection title="Working with us">
        <p>
          Nothing on this site is an offer or a contract. Timelines and features described here are a guide. Every project is agreed in writing in a proposal and an agreement, and those decide the scope, cost, timeline and ownership.
        </p>
      </LegalSection>

      <LegalSection title="Links to other sites">
        <p>
          Project cards and some links open other websites. We do not control them and are not responsible for what they contain.
        </p>
      </LegalSection>

      <LegalSection title="Limits of our responsibility">
        <p>
          To the extent the law allows, we are not responsible for any loss that comes from using this website or relying on what it says.
        </p>
      </LegalSection>

      <LegalSection title="Forms">
        <p>
          When you send us a form, please give accurate details and do not send anything unlawful or harmful. How we treat what you send is explained in our{" "}
          <Link href="/privacy" className="underline underline-offset-4 decoration-1">Privacy policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Law and courts">
        <p>These terms are governed by the laws of India. Any dispute goes to the courts in Mumbai.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>We may update these terms. The date at the top shows the latest version.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          <a href="mailto:admin@zerrorstudios.com" className="underline underline-offset-4 decoration-1">
            admin@zerrorstudios.com
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default TermsPage;
