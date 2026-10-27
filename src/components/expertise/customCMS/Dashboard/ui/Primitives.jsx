"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TrendUpArrow, TrendDownArrow } from "./SvgAnimatedIcons";

// Card shell used by every tab
export const Card = ({ t, className = "", children }) => (
    <div className={`tab-card rounded-xl border transition-colors duration-300 ${t.card} ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ t, title, sub, action }) => (
    <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
            <div className={`text-[13px] font-semibold ${t.strong}`}>{title}</div>
            {sub && <p className={`text-[11px] mt-0.5 ${t.muted}`}>{sub}</p>}
        </div>
        {action}
    </div>
);

export const Badge = ({ t, tone = "neutral", children }) => (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-medium ring-1 ring-inset whitespace-nowrap ${t.badge[tone]}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
        {children}
    </span>
);

// KPI tile: label, value, delta and an optional sparkline
export const StatCard = ({ t, label, value, delta, up = true, note, children }) => (
    <Card t={t} className="p-4 md:p-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
            <span className={`text-[11.5px] font-medium block mb-1.5 ${t.muted}`}>{label}</span>
            <div className={`text-xl md:text-[22px] font-semibold tracking-tight leading-none ${t.strong}`}>{value}</div>
            {(delta || note) && (
                <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                    {delta && (
                        <span className={`inline-flex items-center gap-0.5 font-semibold ${up ? "text-emerald-600" : "text-rose-500"}`}>
                            {up ? <TrendUpArrow /> : <TrendDownArrow />}
                            {delta}
                        </span>
                    )}
                    {note && <span className={t.subtle}>{note}</span>}
                </div>
            )}
        </div>
        {children && <div className="shrink-0 max-sm:hidden">{children}</div>}
    </Card>
);

// Real table from sm up; stacked label/value cards on phones
export const DataTable = ({ t, columns, rows, rowKey = "id", empty = "Nothing matches your search." }) => {
    if (!rows.length) {
        return <p className={`text-xs py-8 text-center ${t.muted}`}>{empty}</p>;
    }
    const align = (c) => (c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left");

    return (
        <>
            <div className="hidden sm:block overflow-x-auto -mx-4 md:-mx-5" data-lenis-prevent="true">
                <table className="w-full text-xs">
                    <thead>
                        <tr className={`border-y ${t.border} ${t.soft}`}>
                            {columns.map((c) => (
                                <th key={c.key} className={`px-4 md:px-5 py-2.5 font-medium text-[11px] whitespace-nowrap ${t.muted} ${align(c)}`}>
                                    {c.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${t.divide}`}>
                        {rows.map((r) => (
                            <tr key={r[rowKey]} className={`transition-colors ${t.hover}`}>
                                {columns.map((c) => (
                                    <td key={c.key} className={`px-4 md:px-5 py-3 whitespace-nowrap ${t.body} ${align(c)}`}>
                                        {c.render ? c.render(r) : r[c.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="sm:hidden space-y-2.5">
                {rows.map((r) => (
                    <div key={r[rowKey]} className={`rounded-lg border p-3 ${t.border}`}>
                        {/* First column acts as the card title */}
                        <div className="mb-2">{columns[0].render ? columns[0].render(r) : r[columns[0].key]}</div>
                        <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
                            {columns.slice(1).map((c) => (
                                <div key={c.key} className="min-w-0">
                                    <dt className={`text-[10px] uppercase tracking-wide ${t.subtle}`}>{c.label}</dt>
                                    <dd className={`text-xs mt-0.5 truncate ${t.body}`}>{c.render ? c.render(r) : r[c.key]}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                ))}
            </div>
        </>
    );
};

// Avatar initial used for products and customers
export const Avatar = ({ t, label, round = false }) => (
    <div className={`w-8 h-8 ${round ? "rounded-full" : "rounded-lg"} flex items-center justify-center text-[11px] font-semibold shrink-0 ${t.badge.brand} ring-1 ring-inset`}>
        {label}
    </div>
);

// Shared entrance animation for each tab's cards
export const useTabEntrance = (scopeRef) => {
    useGSAP(() => {
        gsap.fromTo(
            ".tab-card",
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" }
        );
    }, { scope: scopeRef });
};
