"use client";
import React, { useState } from 'react';
import { WEEKS, CALENDAR_EVENTS } from './Calendar';
import { RiArrowDownSLine } from '@remixicon/react';

const renderContent = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
        if (line.startsWith('- ')) {
            return <li key={i} className="ml-5 list-disc mb-1 text-sm">{line.replace('- ', '')}</li>;
        }
        if (line.startsWith('*') && line.endsWith('*')) {
            return <p key={i} className=" italic text-xs border-t border-[#002bba20] pt-2 mt-2">{line.replace(/\*/g, '')}</p>;
        }
        return null;
    });
};

export default function MobileCalendar() {
    const [openEventId, setOpenEventId] = useState(null);

    const toggleEvent = (id) => {
        setOpenEventId(prev => (prev === id ? null : id));
    };

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 padding py-12">
            {WEEKS.map((week, idx) => {
                const weekNum = idx + 1;
                const weekEvents = CALENDAR_EVENTS.filter(e => e.week === weekNum);

                if (weekEvents.length === 0) return null;

                return (
                    <div key={idx} className="w-full">
                        {/* Week Header */}
                        <div className="border-b text_blue  border-[#002bba50] pb-1 mb-4">
                            <p className="text-sm">{week.label}</p>
                            <h3 data-para-effect className=" text-3xl font-semibold">{week.subtitle}</h3>
                        </div>
                        
                        {/* Events Accordion */}
                        <div className="flex flex-col space-y-2">
                            {weekEvents.map((event, eventIdx) => {
                                const id = `${event.week}-${event.day}-${eventIdx}`;
                                const isOpen = openEventId === id;
                                
                                return (
                                    <div key={id} className="w-full border border-[#002bba20] rounded-xl overflow-hidden bg-white  transition-all duration-300">
                                        {/* Accordion Header */}
                                        <button 
                                            onClick={() => toggleEvent(id)}
                                            className={`w-full flex items-center justify-between p-4 transition-colors duration-300 ${isOpen ? 'bg_blue text-white' : 'bg-transparent text_blue'}`}
                                        >
                                            <div className="flex flex-col items-start text-left">
                                                <span className={`text-xs font-medium mb-1 uppercase ${isOpen ? 'text-white/80' : 'text_blue/70'}`}>
                                                    {event.day} • {event.tag}
                                                </span>
                                                <span className="font-semibold text-lg leading-tight">{event.title}</span>
                                            </div>
                                            <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                                <RiArrowDownSLine className="size-5" />
                                            </div>
                                        </button>
                                        
                                        {/* Accordion Body */}
                                        <div 
                                            className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="p-4 text_blue bg-[#DFE4F6]/20">
                                                    {renderContent(event.content)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
