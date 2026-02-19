import React from "react";
import { Const } from "../utils/Constants";

const OrganizationSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: Const.Brand,
    logo: {
      "@type": "ImageObject",
      url: `${Const?.ClientLink || ""}/logo.svg`,
      width: "160px",
      height: "90px",
    },
    url: Const?.ClientLink || "",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    ></script>
  );
};

export default OrganizationSchema;
