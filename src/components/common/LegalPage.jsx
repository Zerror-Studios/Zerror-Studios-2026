import React from "react";

// Plain text page used by /privacy and /terms, in the site's type.
export const LegalPage = ({ title, updated, children }) => (
  <div className="w-full padding pt-32! md:pt-44! pb-16! md:pb-28! text_blue">
    <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_72%]">
      <div className="md:pr-8">
        <h1 data-para-effect className="primary-font text-5xl md:text-6xl leading-none">
          {title}
        </h1>
        <p className="text-xs font-thin pt-4">Last updated: {updated}</p>
      </div>
      <div className="secondary-font text-base md:text-lg leading-snug max-w-3xl space-y-10 md:pl-2">
        {children}
      </div>
    </div>
  </div>
);

export const LegalSection = ({ title, children }) => (
  <section className="space-y-4">
    {title && <h2 className="primary-font text-2xl md:text-3xl leading-none">{title}</h2>}
    {children}
  </section>
);

export const LegalList = ({ children }) => (
  <ul className="list-disc pl-5 space-y-2">{children}</ul>
);

export default LegalPage;
