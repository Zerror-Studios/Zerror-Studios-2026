// Process copy for the other service pages. Rendered with WebDevProcess.
// Websites lives in websiteProcess.jsx because it carries the animated mockups.
// Each step is one calendar column. Each event sits on its weekday row (MON to SAT).

export const ECOMMERCE_PROCESS = {
    label: "How it usually runs",
    lines: ["From first call", "to first order."],
    paragraph: "Most stores go live in four to six weeks.",
    footnote: "A guide, not a contract.",
    steps: [
        {
            when: "Week 1",
            title: "Call and audit",
            line: "What you sell and how. Then a proposal.",
            events: [
                { day: "MON", title: "First call", line: "What you sell, who buys it, and how." },
                { day: "WED", title: "Proposal sent", line: "Scope, timeline and price, in writing." },
                { day: "FRI", title: "Store audit", line: "For live stores: what is losing sales." },
            ],
        },
        {
            when: "Week 2",
            title: "Directions",
            line: "Ways the store could feel. You pick one.",
            events: [
                { day: "TUE", title: "Directions shared", line: "Two to four ways the store could feel." },
                { day: "THU", title: "You pick one", line: "One direction, agreed before design starts." },
                { day: "SAT", title: "Homepage design", line: "The first page, in the chosen direction." },
            ],
        },
        {
            when: "Week 3",
            title: "Design",
            line: "Every template, by the same team.",
            events: [
                { day: "MON", title: "Product and collection pages", line: "Designed with the motion planned in." },
                { day: "WED", title: "Cart and checkout", line: "Short, clear, built to convert." },
                { day: "FRI", title: "Design approved", line: "Every template signed off." },
            ],
        },
        {
            when: "Week 4",
            title: "Build",
            line: "Every template, by the same team.",
            events: [
                { day: "MON", title: "Build starts", line: "The team that designed it builds it." },
                { day: "THU", title: "Payments connected", line: "Gateway, tax and shipping set up." },
                { day: "SAT", title: "Share preview link", line: "Follow the store as it comes together." },
            ],
        },
        {
            when: "Week 5",
            title: "Products and payments",
            line: "Uploaded, connected, test orders placed.",
            events: [
                { day: "TUE", title: "Products uploaded", line: "Photos, prices, variants and stock." },
                { day: "WED", title: "Feedback changes", line: "Your notes, worked in." },
                { day: "FRI", title: "Test orders placed", line: "Every payment and delivery path checked." },
            ],
        },
        {
            when: "Week 6",
            title: "Go-live",
            line: "Launched, with 30 days of free fixes.",
            events: [
                { day: "TUE", title: "Speed and SEO checks", line: "Lighthouse, schema and redirects." },
                { day: "THU", title: "Store goes live", line: "Domain pointed, store open." },
                { day: "SAT", title: "30 days of free fixes", line: "Anything that comes up, fixed free." },
            ],
        },
    ],
};

export const SOFTWARE_PROCESS = {
    label: "How it usually runs",
    lines: ["From first call", "to your team using it."],
    footnote: "A guide, not a contract. Bigger builds take longer.",
    steps: [
        {
            when: "Week 1",
            title: "First call",
            line: "How your team works today, and where it gets stuck.",
            events: [
                { day: "MON", title: "First call", line: "How your team works today." },
                { day: "WED", title: "Sit with your team", line: "Where the work gets stuck." },
                { day: "FRI", title: "Proposal sent", line: "Scope, stages and price, in writing." },
            ],
        },
        {
            when: "Week 2",
            title: "Map it",
            line: "Every screen, role and step, agreed up front.",
            events: [
                { day: "TUE", title: "Screens and roles", line: "Who sees what, and who can do what." },
                { day: "THU", title: "Steps and rules", line: "Every step of the work, written down." },
                { day: "SAT", title: "Map signed off", line: "Agreed up front, before design starts." },
            ],
        },
        {
            when: "Week 3 to 4",
            title: "Design",
            line: "Screens your team clicks through before we build.",
            events: [
                { day: "MON", title: "Key screens designed", line: "The screens your team uses most." },
                { day: "WED", title: "Clickable prototype", line: "Click through it before a line of code." },
                { day: "FRI", title: "Your team tries it", line: "Feedback from the people who will use it." },
            ],
        },
        {
            when: "Week 5 to 10",
            title: "Build in stages",
            line: "Parts you can try as we go.",
            events: [
                { day: "MON", title: "First part ready", line: "A working part to try, early." },
                { day: "WED", title: "Weekly demo", line: "See what was built that week." },
                { day: "FRI", title: "Next part ready", line: "Each stage builds on the last." },
            ],
        },
        {
            when: "Week 11",
            title: "Move and train",
            line: "Your data moved across, your team shown around.",
            events: [
                { day: "TUE", title: "Data moved across", line: "Your existing data, checked and imported." },
                { day: "THU", title: "Team training", line: "Your team shown around, role by role." },
            ],
        },
        {
            when: "Week 12",
            title: "Go-live and care",
            line: "30 days of free fixes, then monthly care.",
            events: [
                { day: "MON", title: "Goes live", line: "Your team starts using it for real." },
                { day: "WED", title: "30 days of free fixes", line: "Anything that comes up, fixed free." },
                { day: "SAT", title: "Monthly care", line: "Updates, backups and support." },
            ],
        },
    ],
};

export const BRANDING_PROCESS = {
    label: "How it usually runs",
    lines: ["From first call", "to your first month live."],
    paragraph: "An identity usually takes four to six weeks. Social and SEO then run monthly.",
    footnote: "A guide, not a contract.",
    steps: [
        {
            when: "Week 1",
            title: "First call",
            line: "What the brand stands for. Then a proposal.",
            events: [
                { day: "MON", title: "First call", line: "What the brand stands for." },
                { day: "WED", title: "Proposal sent", line: "Scope, timeline and price, in writing." },
                { day: "FRI", title: "Brand workshop", line: "Audience, rivals and what makes you different." },
            ],
        },
        {
            when: "Week 2",
            title: "Directions",
            line: "Ways it could look and sound. You pick one.",
            events: [
                { day: "TUE", title: "Directions shared", line: "Ways it could look and sound." },
                { day: "FRI", title: "You pick one", line: "One direction, agreed before design starts." },
            ],
        },
        {
            when: "Week 3",
            title: "Identity",
            line: "Logo, colour, type and voice, in one guide.",
            events: [
                { day: "MON", title: "Logo design", line: "The mark, in every size it needs." },
                { day: "THU", title: "Colour and type", line: "The palette and fonts the brand uses." },
                { day: "SAT", title: "Voice and tone", line: "How the brand writes and talks." },
            ],
        },
        {
            when: "Week 4",
            title: "Brand guide",
            line: "Logo, colour, type and voice, in one guide.",
            events: [
                { day: "TUE", title: "Feedback changes", line: "Your notes, worked in." },
                { day: "FRI", title: "Brand guide delivered", line: "Everything in one guide, with all files." },
            ],
        },
        {
            when: "Week 5 to 6",
            title: "First month",
            line: "The calendar, the first posts, the first campaign.",
            events: [
                { day: "MON", title: "Content calendar", line: "A month of posts, planned." },
                { day: "WED", title: "First posts", line: "Designed, written and scheduled." },
                { day: "FRI", title: "First campaign", line: "Ads set up, tracked to results." },
            ],
        },
        {
            when: "Monthly",
            title: "Run and report",
            line: "Post, advertise, optimise, report.",
            events: [
                { day: "MON", title: "Post", line: "On the calendar, every week." },
                { day: "TUE", title: "Advertise", line: "Campaigns run and adjusted." },
                { day: "THU", title: "Optimise SEO", line: "Monthly search work on your site." },
                { day: "SAT", title: "Monthly report", line: "What worked, what is next." },
            ],
        },
    ],
};
