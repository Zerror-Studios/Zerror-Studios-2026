"use client";
import React, { useState, useRef } from 'react';

const eventDetails = {
    "Daily": {
        content: `### 🌞 Daily Standup\n- What did you accomplish yesterday?\n- What are your priorities for today?\n- Are there any blockers?\n\n**Notes:**\nKeep it under 15 minutes! Everyone should be prepared before joining.`,
        bg: "bg-[#F5C347]",
        textColor: "text-black"
    },
    "Design review": {
        content: `### 🎨 Design Review\n**Agenda:**\n- Review new dashboard concepts.\n- Accessibility check (contrast, font sizes).\n- Feedback on mobile responsiveness.\n\n*Please bring your Figma comments ready.*`,
        bg: "bg-[#FF7EB9]",
        textColor: "text-white"
    },
    "Sprint plan": {
        content: `### 🏃‍♂️ Sprint Planning\n**Sprint Goal:** Release the new calendar component and fix authentication bugs.\n\n**Metrics:**\n- Velocity: 45 pts\n- Capacity: 50 pts\n\nLet's assign tasks and estimate effort.`,
        bg: "bg-[#FF7EB9]",
        textColor: "text-white"
    },
    "Focus work": {
        content: `### 🎧 Deep Focus Time\nNo meetings, no Slack pings.\nJust pure uninterrupted coding time to get the complex algorithms sorted out.\n\n**Current Task:** Optimizing the database queries for the reporting dashboard.`,
        bg: "bg-[#FF7EB9]",
        textColor: "text-white"
    },
    "Brainstorm": {
        content: `### 🧠 Brainstorming Session\n**Topic:** How can we improve user onboarding?\n\n- Crazy ideas encouraged!\n- We'll use a virtual whiteboard.\n- Goal: Come up with 3 actionable experiments.`,
        bg: "bg-[#008CFF]",
        textColor: "text-white"
    },
    "Workshop": {
        content: `### 🛠️ Technical Workshop\n**Subject:** Advanced React Patterns.\n\nWe will cover:\n- Render props vs Hooks\n- Compound components\n- Context API best practices\n\n*Interactive coding session!*`,
        bg: "bg-[#5CC540]",
        textColor: "text-white"
    },
    "RideNow call": {
        content: `### 🚗 RideNow Client Call\nWeekly sync with the RideNow team.\n\n**Discussion Points:**\n- App store release status.\n- Feedback on the new driver UI.\n- Next month's roadmap.`,
        bg: "bg-[#5CC540]",
        textColor: "text-white"
    },
    "Expert call": {
        content: `### 📞 Industry Expert Consultation\nMeeting with external cloud architecture expert.\n\n**Questions to ask:**\n- Scaling Postgres horizontally.\n- Kubernetes deployment strategies.\n- Cost optimization on AWS.`,
        bg: "bg-[#5CC540]",
        textColor: "text-white"
    },
    "Dev handoff": {
        content: `### 🤝 Dev Handoff\nTransitioning designs to the engineering team.\n\n**Checklist:**\n- Assets exported.\n- Interactions documented.\n- Edge cases defined.\n- Q&A session.`,
        bg: "bg-[#EABF45]",
        textColor: "text-black"
    },
    "Hello call": {
        content: `### 👋 Intro Call\nFirst meeting with a potential new client.\n\n**Goal:** Understand their business needs and see if we are a good fit for their website redesign project.`,
        bg: "bg-[#EABF45]",
        textColor: "text-black"
    },
    "Bateria call": {
        content: `### 🔋 Bateria Startup Sync\nFollow-up call on the MVP development.\n\n**Agenda:**\n- Review current progress.\n- Demo the login flow.\n- Discuss API integration challenges.`,
        bg: "bg-[#EABF45]",
        textColor: "text-black"
    },
    "Demo call": {
        content: `### 🚀 Product Demo\nShowcasing the latest features to stakeholders.\n\n**Flow:**\n1. Introduction (5 mins)\n2. Feature walk-through (20 mins)\n3. Q&A (15 mins)\n\n*Make sure staging environment is stable!*`,
        bg: "bg-[#EABF45]",
        textColor: "text-black"
    },
    "Lunch": {
        content: `### 🍔 Lunch Break\nTime to refuel!\n\nRemember to step away from your desk and stretch your legs. Mental breaks are just as important as coding!`,
        bg: "bg-[#F0F0F0]",
        textColor: "text-gray-800"
    }
};

const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
        if (line.startsWith('### ')) {
            return <h3 key={i} className="text-2xl  font-black mb-4 md:mb-6 tracking-tight">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('**') && line.includes('**', 2)) {
            const parts = line.split('**');
            return <p key={i} className="mb-3 md:mb-4 text-base"><strong className="font-bold">{parts[1]}</strong>{parts[2]}</p>
        }
        if (line.startsWith('- ')) {
            return <li key={i} className="ml-6 list-disc mb-1 md:mb-2 text-base">{line.replace('- ', '')}</li>;
        }
        if (line.startsWith('*') && line.endsWith('*')) {
            return <p key={i} className="mb-3 md:mb-4 italic text-base opacity-80">{line.replace(/\*/g, '')}</p>;
        }
        if (line.trim() === '') {
            return <div key={i} className="h-2"></div>;
        }
        return <p key={i} className="mb-3 md:mb-4 text-base leading-relaxed">{line}</p>;
    });
};

const EventCard = ({ title, time, bgColor, textColor = "text-white", align = "right", vAlign = "center" }) => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 100); // Slight delay before it starts fading out
    };

    const details = eventDetails[title];
    const popupX = align === "left" 
        ? "right-[calc(100%+0.5rem)] md:right-[calc(100%+1rem)]" 
        : "left-[calc(100%+0.5rem)] md:left-[calc(100%+1rem)]";
        
    let popupY = "top-1/2 -translate-y-1/2";
    if (vAlign === "top") popupY = "top-0";
    if (vAlign === "bottom") popupY = "bottom-0";

    return (
        <div 
            className={`${bgColor} ${textColor} rounded-sm p-3 transition-colors duration-300 cursor-pointer h-full w-full flex flex-col justify-start relative group `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <h4 className="font-bold text-sm leading-tight  decoration-black/20 underline-offset-2">{title}</h4>
            <p className="text-xs opacity-80 mt-1 font-medium">{time}</p>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-black/5 rounded-sm transition-colors duration-300 pointer-events-none"></div>

            {/* Popup Details Card */}
            {details && (
                <div 
                    className={`absolute ${popupX} ${popupY} w-[22rem] rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-5 transition-all duration-500 overflow-y-auto scroller_none border border-black/10 ${details.bg} ${details.textColor} ${isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-[0.97] ' + (align === 'left' ? 'translate-x-2' : '-translate-x-2')} ${isHovered ? 'z-50' : '-z-10'}`}
                    style={{ pointerEvents: isHovered ? 'auto' : 'none', visibility: isHovered ? 'visible' : 'hidden' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {renderContent(details.content)}
                </div>
            )}
        </div>
    );
};

const Calendar = () => {
    return (
        <div className="w-full padding py-12 md:py-20 center flex-col overflow-hidden">
            <div className="w-full md:w-[95%] lg:w-[85%] bg-white rounded-md border-black/10 overflow-hidden flex flex-col font-sans relative border">
                
                {/* Header Graphic */}
                <div className="bg_blue w-full py-6 flex justify-center items-center">
                    <p className="text-white text-7xl" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>      
                       CALENDAR
                    </p>
                </div>

                {/* Calendar Grid */}
                <div className="p-4 md:p-8 pb-12 overflow-x-auto scroller_none relative">
                    <div className="min-w-[800px] relative">
                        <div className="relative z-10 grid grid-cols-[50px_repeat(5,1fr)] gap-x-2">
                            
                            {/* HEADER ROW */}
                            <div className="pb-4"></div>
                            <div className="pb-4"><div className="bg-[#F0F0F0] h-10 flex items-center justify-center font-black rounded-sm text-black">MON</div></div>
                            <div className="pb-4"><div className="bg-[#F0F0F0] h-10 flex items-center justify-center font-black rounded-sm text-black">TUE</div></div>
                            <div className="pb-4"><div className="bg-[#F0F0F0] h-10 flex items-center justify-center font-black rounded-sm text-black">WED</div></div>
                            <div className="pb-4"><div className="bg-[#F0F0F0] h-10 flex items-center justify-center font-black rounded-sm text-black">THU</div></div>
                            <div className="pb-4"><div className="bg-[#F0F0F0] h-10 flex items-center justify-center font-black rounded-sm text-black">FRI</div></div>

                            {/* 9AM */}
                            <div className="text-gray-400 text-xs text-right pr-3 pt-3 border-t border-gray-100 h-[90px] font-medium">9AM</div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Daily" time="9M - 10AM" bgColor="bg-[#EABF45]" textColor="text-black" vAlign="top" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Daily" time="9M - 10AM" bgColor="bg-[#EABF45]" textColor="text-black" vAlign="top" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Daily" time="9M - 10AM" bgColor="bg-[#EABF45]" textColor="text-black" vAlign="top" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Daily" time="9M - 10AM" bgColor="bg-[#EABF45]" textColor="text-black" align="left" vAlign="top" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"></div>

                            {/* 10AM */}
                            <div className="text-gray-400 text-xs text-right pr-3 pt-3 border-t border-gray-100 h-[90px] font-medium">10AM</div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Design review" time="10AM - 10:30AM" bgColor="bg-[#FF7EB9]" vAlign="top" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Sprint plan" time="10AM - 11AM" bgColor="bg-[#FF7EB9]" vAlign="top" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Focus work" time="10AM - 10:30AM" bgColor="bg-[#FF7EB9]" align="left" vAlign="top" /></div>

                            {/* 11AM */}
                            <div className="text-gray-400 text-xs text-right pr-3 pt-3 border-t border-gray-100 h-[90px] font-medium">11AM</div>
                            <div className="border-t border-gray-100 pt-3 pb-2"></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Brainstorm" time="11AM - 12AM" bgColor="bg-[#008CFF]" vAlign="center" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Workshop" time="11AM - 11:30AM" bgColor="bg-[#008CFF]" align="left" vAlign="center" /></div>

                            {/* 12PM */}
                            <div className="text-gray-400 text-xs text-right pr-3 pt-3 border-t border-gray-100 h-[90px] font-medium">12PM</div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Workshop" time="12AM - 1PM" bgColor="bg-[#5CC540]" vAlign="center" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="RideNow call" time="9M - 10AM" bgColor="bg-[#5CC540]" vAlign="center" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Expert call" time="12AM - 1PM" bgColor="bg-[#5CC540]" align="left" vAlign="center" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"></div>

                            {/* 1PM */}
                            <div className="text-gray-400 text-xs text-right pr-3 pt-3 border-t border-gray-100 h-[90px] font-medium">1PM</div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Lunch" time="1PM - 2PM" bgColor="bg-[#F0F0F0]" textColor="text-gray-800" vAlign="bottom" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Lunch" time="1PM - 2PM" bgColor="bg-[#F0F0F0]" textColor="text-gray-800" vAlign="bottom" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Lunch" time="1PM - 2PM" bgColor="bg-[#F0F0F0]" textColor="text-gray-800" vAlign="bottom" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Lunch" time="1PM - 2PM" bgColor="bg-[#F0F0F0]" textColor="text-gray-800" align="left" vAlign="bottom" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Lunch" time="1PM - 2PM" bgColor="bg-[#F0F0F0]" textColor="text-gray-800" align="left" vAlign="bottom" /></div>

                            {/* 2PM */}
                            <div className="text-gray-400 text-xs text-right pr-3 pt-3 border-t border-gray-100 h-[90px] font-medium">2PM</div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Dev handoff" time="2PM - 2:30PM" bgColor="bg-[#EABF45]" textColor="text-black" vAlign="bottom" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Hello call" time="9M - 10AM" bgColor="bg-[#EABF45]" textColor="text-black" vAlign="bottom" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Bateria call" time="3PM - 4PM" bgColor="bg-[#EABF45]" textColor="text-black" vAlign="bottom" /></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"></div>
                            <div className="border-t border-gray-100 pt-3 pb-2"><EventCard title="Demo call" time="3PM - 4PM" bgColor="bg-[#EABF45]" textColor="text-black" align="left" vAlign="bottom" /></div>
                            
                            {/* Final Bottom Line */}
                            <div className="border-t border-gray-100 col-span-6"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
