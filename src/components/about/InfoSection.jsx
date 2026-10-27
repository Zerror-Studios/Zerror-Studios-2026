import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import Br from "@/components/common/Br";

const InfoSection = () => {
  return (

    <div className="w-full   padding py-section! text_blue ">
      <SectionHeader
          title={<>The <Br /> team</>}
          lines={["The people behind", "the brands."]}
      >
          Designers, developers and strategists, under one name.
      </SectionHeader>
    </div>

  );
};

export default InfoSection;
