"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Calendar, { buildCalendar } from './processSections/Calendar';
import MobileCalendar from './processSections/MobileCalendar';
import SectionHeader from '@/components/common/SectionHeader';
import Br from "@/components/common/Br";

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
            <div className="w-full padding pt-section! text_blue">
                <SectionHeader title={<>How it usually <Br /> runs</>} lines={lines}>
                    {paragraph}
                </SectionHeader>
            </div>

            {/* Process Calendar */}
            {isMobile === true && <div className="ui-mock contents"><MobileCalendar columns={columns} events={events} days={days} /></div>}
            {isMobile === false && <div className="ui-mock contents"><Calendar columns={columns} events={events} rowCount={rowCount} days={days} /></div>}

            {footnote && (
                <div className="w-full padding pb-section text_blue">
                    <p>{footnote}</p>
                </div>
            )}
        </div>
    );
};

export default WebDevProcess;
