import React from 'react';
import SectionHeader from "@/components/common/SectionHeader";
import Br from "@/components/common/Br";

// Looping line icons for each "what's included" box, animated with SVG like the website-development icons
const Svg = ({ children }) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        {children}
    </svg>
);

const LogoIcon = () => (
    <Svg>
        {/* Pen nib drawing a mark */}
        <g>
            <path d="M24 6 L34 22 L28 34 H20 L14 22 Z" />
            <path d="M24 6 V20" />
            <circle cx="24" cy="23" r="2.5" />
            <path d="M20 34 V38 H28 V34" />
            <animateTransform attributeName="transform" type="translate" values="-6 0;6 0;-6 0" dur="3s" repeatCount="indefinite" />
        </g>
        <path d="M8 43 Q16 39 24 43 T40 43" strokeDasharray="36" strokeDashoffset="36">
            <animate attributeName="stroke-dashoffset" values="36;0;0;36" keyTimes="0;0.5;0.9;1" dur="3s" repeatCount="indefinite" />
        </path>
    </Svg>
);

const VisualSystemIcon = () => (
    <Svg>
        {/* Grid of swatches filling in turn */}
        {[[6, 6], [26, 6], [6, 26], [26, 26]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="16" height="16" rx="2" fill="currentColor" fillOpacity="0">
                <animate attributeName="fill-opacity" values="0;1;0" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </rect>
        ))}
    </Svg>
);

const VoiceIcon = () => (
    <Svg>
        {/* Speech bubble with typing dots */}
        <path d="M6 9 H42 V33 H22 L13 41 V33 H6 Z" />
        {[16, 24, 32].map((cx, i) => (
            <circle key={i} cx={cx} cy="21" r="2" fill="currentColor" stroke="none">
                <animate attributeName="cy" values="21;17;21" dur="1.2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </circle>
        ))}
    </Svg>
);

const CalendarIcon = () => (
    <Svg>
        {/* Calendar with the posting day moving through the week */}
        <rect x="6" y="9" width="36" height="33" rx="2" />
        <path d="M6 17 H42 M15 5 V12 M33 5 V12" />
        {[0, 1, 2].map((c) => [0, 1].map((r) => (
            <rect key={`${c}${r}`} x={12 + c * 9} y={22 + r * 9} width="6" height="5" rx="1" opacity="0.35" />
        )))}
        <rect x="12" y="22" width="6" height="5" rx="1" fill="currentColor">
            <animate attributeName="x" values="12;21;30;12;21;30" calcMode="discrete" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="y" values="22;22;22;31;31;31" calcMode="discrete" dur="3.6s" repeatCount="indefinite" />
        </rect>
    </Svg>
);

const ReelsIcon = () => (
    <Svg>
        {/* Carousel of frames sliding past a play button */}
        <rect x="14" y="6" width="20" height="36" rx="2" />
        <path d="M21 18 L29 24 L21 30 Z" fill="currentColor" />
        <g opacity="0.4">
            <rect x="3" y="11" width="8" height="26" rx="2" />
            <rect x="37" y="11" width="8" height="26" rx="2" />
            <animateTransform attributeName="transform" type="translate" values="0 0;-3 0;0 0" dur="1.8s" repeatCount="indefinite" />
        </g>
    </Svg>
);

const LinkedInIcon = () => (
    <Svg>
        {/* "in" badge with its outline being traced */}
        <rect x="6" y="6" width="36" height="36" rx="5" opacity="0.35" />
        <rect x="6" y="6" width="36" height="36" rx="5" strokeDasharray="137" strokeDashoffset="137">
            <animate attributeName="stroke-dashoffset" values="137;0;0;137" keyTimes="0;0.5;0.9;1" dur="3s" repeatCount="indefinite" />
        </rect>
        <circle cx="16" cy="15" r="2" fill="currentColor" stroke="none" />
        <path d="M16 21 V34 M23 34 V21 M23 26 Q23 21 28 21 Q33 21 33 26 V34" strokeWidth="2.5" />
    </Svg>
);

const PaidSocialIcon = () => (
    <Svg>
        {/* Megaphone with sound waves */}
        <path d="M6 18 V30 H13 L28 39 V9 L13 18 Z" />
        <path d="M10 30 L12 39 H17 L15 31" />
        {[0, 1].map((i) => (
            <path key={i} d={i ? "M38 12 Q45 24 38 36" : "M33 17 Q37 24 33 31"}>
                <animate attributeName="opacity" values="0;1;0" dur="1.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </path>
        ))}
    </Svg>
);

const LandingPageIcon = () => (
    <Svg>
        {/* Browser window with a pulsing call-to-action */}
        <rect x="5" y="7" width="38" height="34" rx="2" />
        <path d="M5 14 H43" />
        <circle cx="9" cy="10.5" r="0.8" fill="currentColor" />
        <circle cx="12" cy="10.5" r="0.8" fill="currentColor" />
        <path d="M11 21 H35 M15 26 H31" />
        <rect x="17" y="31" width="14" height="5" rx="2.5" fill="currentColor" stroke="none">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
        </rect>
    </Svg>
);

const EmailIcon = () => (
    <Svg>
        {/* Letter sliding out of an envelope */}
        <g>
            <rect x="12" y="10" width="24" height="24" rx="1" />
            <path d="M16 15 H32 M16 20 H28" />
            <animateTransform attributeName="transform" type="translate" values="0 10;0 0;0 0;0 10" keyTimes="0;0.4;0.7;1" dur="3s" repeatCount="indefinite" />
        </g>
        <path d="M6 22 H42 V42 H6 Z" fill="#fff" />
        <path d="M6 22 L24 34 L42 22" />
    </Svg>
);

const SeoIcon = () => (
    <Svg>
        {/* Ranking chart climbing month by month */}
        <path d="M6 6 V42 H42" />
        {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={11 + i * 8} y={34 - i * 6} width="4" height={8 + i * 6} rx="1" opacity="0.35" />
        ))}
        <path d="M11 30 L19 24 L27 26 L39 12 M33 12 H39 V18" strokeDasharray="44" strokeDashoffset="44">
            <animate attributeName="stroke-dashoffset" values="44;0;0;44" keyTimes="0;0.5;0.9;1" dur="3s" repeatCount="indefinite" />
        </path>
    </Svg>
);

const ArticlesIcon = () => (
    <Svg>
        {/* Document with lines being written */}
        <path d="M10 5 H30 L38 13 V43 H10 Z M30 5 V13 H38" />
        {[19, 25, 31, 37].map((y, i) => (
            <path key={i} d={`M16 ${y} H${i === 3 ? 26 : 32}`} strokeDasharray="16" strokeDashoffset="16">
                <animate attributeName="stroke-dashoffset" values="16;0;0;16" keyTimes="0;0.4;0.85;1" dur="3s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
            </path>
        ))}
    </Svg>
);

const AiIcon = () => (
    <Svg>
        {/* Eye looking around, with an AI sparkle as its pupil */}
        <path d="M4 24 Q24 6 44 24 Q24 42 4 24 Z" />
        <g>
            <circle cx="24" cy="24" r="7" />
            <path d="M24 19 Q24.6 23.4 29 24 Q24.6 24.6 24 29 Q23.4 24.6 19 24 Q23.4 23.4 24 19 Z" fill="currentColor" stroke="none" />
            <animateTransform attributeName="transform" type="translate" values="0 0;-6 0;0 0;6 0;0 0" dur="3.2s" repeatCount="indefinite" />
        </g>
    </Svg>
);

const CroIcon = () => (
    <Svg>
        {/* Funnel with visitors dropping through */}
        <path d="M5 10 H43 L28 26 V40 L20 36 V26 Z" />
        {[0, 1].map((i) => (
            <circle key={i} cx={i ? 30 : 18} r="2" fill="currentColor" stroke="none">
                <animate attributeName="cy" values="2;8" dur="1.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
        ))}
        <circle cx="24" r="2" fill="currentColor" stroke="none">
            <animate attributeName="cy" values="18;34" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;1;0" dur="1.8s" repeatCount="indefinite" />
        </circle>
    </Svg>
);

const AbTestIcon = () => (
    <Svg>
        {/* Variant A and B, the winning one gets the tick */}
        <rect x="5" y="6" width="17" height="24" rx="2" />
        <rect x="26" y="6" width="17" height="24" rx="2" />
        <text x="13.5" y="22.5" textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor" stroke="none">A</text>
        <text x="34.5" y="22.5" textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor" stroke="none">B</text>
        <path d="M9 38 L12.5 41.5 L18 35" strokeWidth="2">
            <animate attributeName="opacity" values="1;0" calcMode="discrete" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M30 38 L33.5 41.5 L39 35" strokeWidth="2">
            <animate attributeName="opacity" values="0;1" calcMode="discrete" dur="3s" repeatCount="indefinite" />
        </path>
    </Svg>
);

const EmailFlowIcon = () => (
    <Svg>
        {/* Email, wait, email: an automated sequence */}
        <path d="M17 13 H28 M34 19 V30" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" values="12;0" dur="1s" repeatCount="indefinite" />
        </path>
        <rect x="4" y="7" width="13" height="11" rx="1" />
        <path d="M4 8 L10.5 13 L17 8" />
        <circle cx="34" cy="13" r="6" />
        <path d="M34 13 V10">
            <animateTransform attributeName="transform" type="rotate" values="0 34 13;360 34 13" dur="2s" repeatCount="indefinite" />
        </path>
        <rect x="27.5" y="30" width="13" height="11" rx="1" />
        <path d="M27.5 31 L34 36 L40.5 31" />
    </Svg>
);

const disciplines = [
    {
        num: "01",
        title: "Identity",
        subtitle: "[ How you look and sound ]",
        list: ["Logo and identity", "Visual system", "Brand voice"],
        icons: [LogoIcon, VisualSystemIcon, VoiceIcon],
        desc: "A look and a voice people recognise, written down so everyone uses them the same way.",
    },
    {
        num: "02",
        title: "Social and content",
        subtitle: "[ What people see every week ]",
        list: ["Content calendar", "Reels and carousels", "LinkedIn"],
        icons: [CalendarIcon, ReelsIcon, LinkedInIcon],
        desc: "A month of posts, planned ahead, designed in-house, in your voice.",
    },
    {
        num: "03",
        title: "Campaigns",
        subtitle: "[ What brings the click ]",
        list: ["Paid social", "Landing pages", "Email"],
        icons: [PaidSocialIcon, LandingPageIcon, EmailIcon],
        desc: "Launches, sales and always-on ads, with pages made to match.",
    },
    {
        num: "04",
        title: "SEO and AI search",
        subtitle: "[ Where people find you ]",
        list: ["Monthly SEO", "Articles", "AI visibility"],
        icons: [SeoIcon, ArticlesIcon, AiIcon],
        desc: "Show up on Google, and when someone asks an AI about your category.",
    },
    {
        num: "05",
        title: "Growth",
        subtitle: "[ What turns visits into sales ]",
        list: ["CRO audits", "A/B tests", "Email flows"],
        icons: [CroIcon, AbTestIcon, EmailFlowIcon],
        desc: "Launch is not the finish line. We test, fix and keep what works.",
    },
];

// Height of each card's title strip; cards stick this far apart so earlier titles stay visible
const STACK_STEP = 6; // rem

const BrandingDisciplines = () => {
    return (
        <div data-hide-header className="w-full bg_blue py-section text-white">
            <div className="padding sticky w-full space-y-block">

                {/* ── Heading (matches about/InfoSection layout) ── */}
                <SectionHeader
                    title={<>What <Br /> we do</>}
                    lines={["Five disciplines,", "one team."]}
                >
                    Identity, content, campaigns, search and growth, run by the same people.
                </SectionHeader>

                {/* ── Stacking discipline cards (sticky on desktop) ── */}
                <div className="w-full relative">
                    {disciplines.map((item, index) => (
                        <div
                            key={index}
                            className="w-full bg_blue border-t border-white/20 md:sticky md:min-h-[22rem]"
                            style={{ top: `${index * STACK_STEP}rem`, zIndex: index + 1 }}
                        >
                            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                                {/* Left: number + title */}
                                <div className="flex items-start gap-x-5">
                                    <p data-para-effect className="h3 font-bold shrink-0">
                                        {item.num}
                                    </p>
                                    <h3 data-para-effect className="font-bold uppercase">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Right: what's included + description */}
                                <div className="flex flex-col gap-6 md:gap-8 md:pt-24">
                                    <p className="para-lead">
                                        {item.desc}
                                    </p>
                                    {/* Desktop: 3-column grid. Mobile: full-bleed snap scroller of 85vw cards,
                                        each snapping to the page's left edge (1rem, same as the text above). */}
                                    <ul className="max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:-mx-4 max-md:px-4 max-md:scroll-px-4 scroller_none [scrollbar-width:none] md:grid md:grid-cols-3 gap-3">
                                        {item.list.map((listItem, i) => {
                                            const Icon = item.icons[i];
                                            return (
                                                <li
                                                    key={i}
                                                    className="bg-white text_blue rounded-lg p-5 flex flex-col justify-between gap-6 md:gap-10 md:min-h-40 max-md:w-[85vw] max-sm:space-y-12 max-md:shrink-0 max-md:snap-start max-md:snap-always"
                                                >
                                                    <span className="w-16 h-16 md:w-12 md:h-12 block">
                                                        <Icon />
                                                    </span>
                                                    <span className="para-lg font-semibold">{listItem}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandingDisciplines;