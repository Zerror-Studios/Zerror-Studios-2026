import React from "react";

// Plain text page used by /privacy and /terms, in the site's type.
export const LegalPage = ({ title, updated, children }) => (
  <div className="w-full padding pt-hero! pb-section! text_blue">
    <div className="w-full space-y-block md:space-y-0 md:grid grid-cols-[28%_72%]">
      <div className="md:pr-8">
        <h1 data-para-effect>
          {title}
        </h1>
        <p className="label font-thin pt-4">Last updated: {updated}</p>
      </div>
      <div className="para max-w-3xl space-y-block md:pl-2">
        {children}
      </div>
    </div>
  </div>
);

export const LegalSection = ({ title, children }) => (
  <section className="space-y-4">
    {title && <h2 className="h5">{title}</h2>}
    {children}
  </section>
);

export const LegalList = ({ children }) => (
  <ul className="list-disc pl-5 space-y-2">{children}</ul>
);

export default LegalPage;
