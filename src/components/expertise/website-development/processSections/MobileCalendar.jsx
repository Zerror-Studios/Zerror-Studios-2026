"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { RiAddLine, RiArrowLeftSLine, RiArrowRightSLine, RiCloseLine } from '@remixicon/react';
import { DAYS } from './Calendar';

// Centered popup with the event's details. Steps through every event in calendar order.
const EventModal = ({ events, index, columns, onClose, onChange }) => {
    const [visible, setVisible] = useState(false);
    const event = index !== null ? events[index] : null;
    const isOpen = index !== null;

    // Latest handlers, so the open/close effect only runs when the popup opens or closes
    const handlersRef = useRef({ onClose, onChange });
    handlersRef.current = { onClose, onChange };

    useEffect(() => {
        if (!isOpen) {
            setVisible(false);
            return;
        }
        const frame = requestAnimationFrame(() => setVisible(true));

        const onKey = (e) => {
            if (e.key === 'Escape') handlersRef.current.onClose();
            if (e.key === 'ArrowRight') handlersRef.current.onChange(1);
            if (e.key === 'ArrowLeft') handlersRef.current.onChange(-1);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        };
    }, [isOpen]);

    if (!event) return null;

    const column = columns[event.col];

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] center p-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
            role="dialog"
            aria-modal="true"
            aria-label={event.title}
        >
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="absolute inset-0 bg-[#002bba]/20 backdrop-blur-sm"
            />

            <div
                className={`relative w-full max-w-sm bg-white text_blue rounded-xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,43,186,0.35)] transition-transform duration-300 ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-3'}`}
            >
                {/* Step bar */}
                <div className="bg_blue text-white px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="text-sm font-bold">{column.short}</span>
                        <div className="min-w-0">
                            <p className="text-[10px] uppercase text-white/70 leading-tight">{column.label}</p>
                            <p className="text-sm uppercase leading-tight truncate">{column.subtitle}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="size-8 shrink-0 center rounded-md bg-white/15 active:bg-white/30 transition-colors"
                    >
                        <RiCloseLine className="size-5" />
                    </button>
                </div>

                {/* Event */}
                <div className="p-5 space-y-4">
                    <span className="inline-block text-[10px] uppercase tracking-wide bg-[#DFE4F6] rounded-sm px-2 py-1">
                        {event.when}
                    </span>
                    <p className="text-2xl leading-tight">{event.title}</p>
                    {event.line && (
                        <p className="text-sm leading-relaxed opacity-80 border-t border-[#002bba20] pt-4">
                            {event.line}
                        </p>
                    )}
                </div>

                {/* Navigation */}
                <div className="px-5 pb-5 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => onChange(-1)}
                        disabled={index === 0}
                        aria-label="Previous event"
                        className="size-9 center rounded-md bg-[#DFE4F6] active:bg_blue active:text-white transition-colors disabled:opacity-30"
                    >
                        <RiArrowLeftSLine className="size-5" />
                    </button>
                    <span className="text-xs tabular-nums opacity-60">
                        {index + 1} / {events.length}
                    </span>
                    <button
                        type="button"
                        onClick={() => onChange(1)}
                        disabled={index === events.length - 1}
                        aria-label="Next event"
                        className="size-9 center rounded-md bg-[#DFE4F6] active:bg_blue active:text-white transition-colors disabled:opacity-30"
                    >
                        <RiArrowRightSLine className="size-5" />
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default function MobileCalendar({ columns = [], events = [], days = null }) {
    const [activeCol, setActiveCol] = useState(0);
    const [openIndex, setOpenIndex] = useState(null);
    const tabsRef = useRef([]);
    const tabsStripRef = useRef(null);

    // Every real event in calendar order, so the popup can step through them
    const ordered = useMemo(
        () => events.filter(e => !e.auto).sort((a, b) => a.col - b.col || a.row - b.row),
        [events]
    );

    const rows = days || DAYS;
    const column = columns[activeCol];
    const columnEvents = ordered.filter(e => e.col === activeCol);

    // Keep the active week tab in view (scrolls the tab strip only, never the page)
    useEffect(() => {
        const strip = tabsStripRef.current;
        const tab = tabsRef.current[activeCol];
        if (!strip || !tab) return;
        strip.scrollTo({ left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' });
    }, [activeCol]);

    const closeModal = () => setOpenIndex(null);
    const stepModal = (dir) => {
        if (openIndex === null) return;
        const next = Math.min(Math.max(openIndex + dir, 0), ordered.length - 1);
        setOpenIndex(next);
        setActiveCol(ordered[next].col);
    };

    if (!column) return null;

    return (
        <div className="w-full padding py-12 primary-font text_blue">

            {/* Week tabs, styled like the desktop header row */}
            <div ref={tabsStripRef} className="relative overflow-x-auto scroller_none">
                <div className="flex gap-1.5 w-max">
                    {columns.map((col, idx) => {
                        const isActive = idx === activeCol;
                        return (
                            <button
                                key={idx}
                                ref={(el) => (tabsRef.current[idx] = el)}
                                type="button"
                                onClick={() => setActiveCol(idx)}
                                className={`w-28 md:w-50 shrink-0 rounded-md px-2 py-2.5 flex flex-col items-center text-center transition-colors duration-300 ${isActive ? 'bg_blue text-white' : 'bg-[#DFE4F6] text_blue opacity-60'}`}
                            >
                                <span className="text-[10px] uppercase leading-tight">{col.label}</span>
                                <span className="text-xs uppercase leading-tight mt-0.5 line-clamp-1">{col.subtitle}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Active step */}
            <div className="flex items-end justify-between gap-4 border-b border-[#002bba30] pb-3 mt-8 mb-4">
                <div className="min-w-0">
                    <p className="text-xs uppercase opacity-70">{column.short} · {column.label}</p>
                    <p className="text-3xl leading-tight mt-1">{column.subtitle}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                    <button
                        type="button"
                        onClick={() => setActiveCol(c => Math.max(c - 1, 0))}
                        disabled={activeCol === 0}
                        aria-label="Previous step"
                        className="size-9 center rounded-md bg-[#DFE4F6] disabled:opacity-30 transition-opacity"
                    >
                        <RiArrowLeftSLine className="size-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveCol(c => Math.min(c + 1, columns.length - 1))}
                        disabled={activeCol === columns.length - 1}
                        aria-label="Next step"
                        className="size-9 center rounded-md bg-[#DFE4F6] disabled:opacity-30 transition-opacity"
                    >
                        <RiArrowRightSLine className="size-5" />
                    </button>
                </div>
            </div>

            {columnEvents.length === 0 ? (
                <div className="rounded-md bg-[#DFE4F6] p-4">
                    <p className="text-lg leading-tight">{column.line}</p>
                </div>
            ) : (
                /* Day rows: day label on the left, event card or empty slot on the right */
                <div className="grid grid-cols-[3.25rem_1fr] gap-1.5">
                    {rows.map((day, row) => {
                        const event = columnEvents.find(e => e.row === row);
                        return (
                            <React.Fragment key={day}>
                                <div className={`rounded-md center text-xs font-semibold transition-colors ${event ? 'bg_blue text-white' : 'bg-[#DFE4F6] opacity-50'}`}>
                                    {day}
                                </div>
                                {event ? (
                                    <button
                                        type="button"
                                        onClick={() => setOpenIndex(ordered.indexOf(event))}
                                        className="min-h-16 rounded-md bg-[#DFE4F6] p-3 flex items-center justify-between gap-3 text-left active:bg_blue active:text-white transition-colors"
                                    >
                                        <span className="text-base leading-tight">{event.title}</span>
                                        <span className="size-6 shrink-0 center rounded-sm bg-white text_blue">
                                            <RiAddLine className="size-4" />
                                        </span>
                                    </button>
                                ) : (
                                    <div className="min-h-10 rounded-md border border-dashed border-[#002bba50] opacity-60" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            )}

            <EventModal
                events={ordered}
                index={openIndex}
                columns={columns}
                onClose={closeModal}
                onChange={stepModal}
            />
        </div>
    );
}
