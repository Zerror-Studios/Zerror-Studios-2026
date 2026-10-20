"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Calendar, { buildCalendar } from './processSections/Calendar';
import MobileCalendar from './processSections/MobileCalendar';

/**
 * Process section shared by the four service pages.
 *
 * @param {string|React.ReactNode} label     Big heading (left column)
 * @param {string[]}               lines     Small subheading lines (middle column)
 * @param {string}                 paragraph Large line (right column), optional
 * @param {Array}                  steps     [{ when?, title, line, events? }]
 *                                           when is optional (no weeks shows "Step 1..n").
 *                                           events (optional) splits a step into cards on the
 *                                           desktop calendar: [{ title, row?, stage?, component? }].
 *                                           An event with stage + component gets the scroll-led
 *                                           enlarge animation.
 * @param {string}                 footnote  Small line under the calendar, optional
 */
const WebDevProcess = ({
    label = "How it usually runs",
    lines = [],
    paragraph = null,
    steps = [],
    footnote = null,
}) => {
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1020);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { columns, events, rowCount, days } = useMemo(() => buildCalendar(steps), [steps]);

    return (
        <div data-hide-header className="w-full relative">

            {/* Section Header */}
            <div className="w-full padding pt-8! md:pt-16! text_blue">
                <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                    <div>
                        <h2 data-para-effect className="primary-font text-5xl leading-none">
                        How it usually <br /> runs
                        </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4">
                        {lines.map((line, i) => (
                            <p key={i} className="font-thin">{line}</p>
                        ))}
                    </div>
                    <div className="text-3xl md:pl-2">
                        {paragraph && (
                            <h3 data-para-effect className="secondary-font">
                                <span className="opacity-0 max-sm:hidden pointer-events-none">...............</span>
                                {paragraph}
                            </h3>
                        )}
                    </div>
                </div>
            </div>

            {/* Process Calendar */}
            {isMobile === true && <MobileCalendar columns={columns} events={events} />}
            {isMobile === false && <Calendar columns={columns} events={events} rowCount={rowCount} days={days} />}

            {footnote && (
                <div className="w-full padding pb-8 md:pb-12 text_blue">
                    <p className="">{footnote}</p>
                </div>
            )}
        </div>
    );
};

export default WebDevProcess;
