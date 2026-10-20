import React from 'react';

// TODO: swap in the real platform screenshots once delivered (see handoff 13-assets-needed.md).
// RPSG Lifestyle Media currently reuses the THR India cover (one of the titles on that platform).
const proofItems = [
    {
        name: "RPSG Lifestyle Media.",
        line: "One platform behind The Hollywood Reporter India, Esquire India and Robb Report India.",
        stat: "500+ editors · 3M+ readers a month",
        img: "/images/projects/THR India/thr_cover.webp",
        alt: "The Hollywood Reporter India, running on the RPSG Lifestyle Media platform",
    },
    {
        name: "Manifest.",
        line: "Five years of content moved off WordPress, with zero downtime.",
        stat: "200% more traffic after launch",
        img: "/images/projects/Manifest/manifest_cover.webp",
        alt: "Manifest website on a tablet",
    },
];

const CustomProof = () => {
    return (
        <div className="w-full border-t border-[#002bba]">
            <div className="padding py-8! md:py-16! text_blue">
                {/* Cards share row tracks (subgrid) so title, line and stat line up across columns */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
                    {proofItems.map((item, index) => (
                        <div key={index} className="grid grid-rows-subgrid row-span-4 max-md:mb-12">
                            <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-[#002bba10]">
                                <img
                                    src={item.img}
                                    alt={item.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <h3 data-para-effect className="pt-6 md:pt-8 text-3xl font-bold leading-tight">
                                {item.name}
                            </h3>
                            <p data-para-effect className="pt-3 text-xl font-medium leading-tight opacity-90 md:max-w-[85%]">
                                {item.line}
                            </p>
                            <div className="self-end">
                                <div className="w-full h-px bg-current opacity-20 my-6"></div>
                                <p data-para-effect className="primary-font text-3xl md:text-4xl leading-none">
                                    {item.stat}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomProof;
