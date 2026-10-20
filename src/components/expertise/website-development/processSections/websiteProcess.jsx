import GoogleMeet from './GoogleMeet';
import ColorPalette from './ColorPalette';
import FigmaWireframe from './FigmaWireframe';
import FigmaApprovedDesign from './FigmaApprovedDesign';
import VsCode from './VsCode';
import SeoLighthouse from './SeoLighthouse';
import AwsDeploy from './AwsDeploy';
import FinalView from './FinalView';

// Process for /expertise/websites.
// Six steps, one calendar column each, events on weekday rows. The animated mockups sit on the steps they belong to.
export const WEBSITE_PROCESS = {
    label: "How it usually runs",
    lines: ["From first call", "to go-live."],
    paragraph: "Most sites go live in four to six weeks.",
    footnote: "A guide, not a contract.",
    steps: [
        {
            when: "Week 1",
            title: "First call",
            line: "We learn the brand. You get a proposal.",
            events: [
                { day: "MON", title: "We learn the brand", stage: "kickoff", component: <GoogleMeet /> },
                { day: "WED", title: "You get a proposal" },
            ],
        },
        {
            when: "Week 1 to 2",
            title: "Directions",
            line: "Two to four ways it could feel. You pick one.",
            events: [
                { day: "TUE", title: "Two to four directions", stage: "directions", component: <ColorPalette /> },
                { day: "FRI", title: "You pick one" },
            ],
        },
        {
            when: "Week 2 to 3",
            title: "Design",
            line: "Every page, with the motion planned in.",
            events: [
                { day: "MON", title: "Every page", stage: "wireframe", component: <FigmaWireframe /> },
                { day: "THU", title: "Motion planned in", stage: "design", component: <FigmaApprovedDesign /> },
            ],
        },
        {
            when: "Week 3 to 5",
            title: "Build",
            line: "Same team. Follow along on a live link.",
            events: [
                { day: "TUE", title: "Same team builds it", stage: "build", component: <VsCode /> },
                { day: "FRI", title: "Follow along on a live link" },
            ],
        },
        {
            when: "Week 5 to 6",
            title: "Go-live",
            line: "Tested, set up for search, launched.",
            events: [
                { day: "WED", title: "Tested, set up for search", stage: "seo", component: <SeoLighthouse /> },
                { day: "THU", title: "Launched", stage: "deploy", component: <AwsDeploy /> },
            ],
        },
        {
            when: "After",
            title: "Care",
            line: "30 days of free fixes, then monthly care.",
            events: [
                { day: "MON", title: "30 days of free fixes", stage: "care", component: <FinalView /> },
                { day: "SAT", title: "Monthly care" },
            ],
        },
    ],
};
