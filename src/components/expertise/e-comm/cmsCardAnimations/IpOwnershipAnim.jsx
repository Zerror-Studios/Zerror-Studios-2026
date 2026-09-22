"use client";
import React, { useState, useEffect, useRef } from 'react';
import { RiShieldCheckLine } from '@remixicon/react';

const GATEWAYS = [
    {
        name: "Apple Pay",
        bg: "bg-white text-black font-semibold",
        icon: " Pay",
        status: "Apple Pay • 1-Click Checkout",
        payout: 3420
    },
    {
        name: "American Express",
        bg: "bg-[#006fcf] text-white font-extrabold text-[10px]",
        icon: "AMEX",
        status: "American Express • Direct Settlement",
        payout: 4180
    },
    {
        name: "VISA",
        bg: "bg-white text-[#1a1f71] font-black italic",
        icon: "VISA",
        status: "VISA Direct • Instant Payout",
        payout: 4950
    },
    {
        name: "DISCOVER",
        bg: "bg-white text-black font-bold",
        icon: "DISCOVER",
        status: "Discover • Zero Rev Share",
        payout: 5620
    },
    {
        name: "Mastercard",
        bg: "bg-white text-black",
        isMastercard: true,
        status: "Mastercard • 100% Owned Gateway",
        payout: 6350
    },
    {
        name: "Klarna",
        bg: "bg-[#ffb3c7] text-black font-extrabold",
        icon: "Klarna.",
        status: "Klarna BNPL • Direct Bank Deposit",
        payout: 7120
    },
    {
        name: "UnionPay",
        bg: "bg-white text-black",
        isUnionPay: true,
        status: "UnionPay • Global Multi-Currency",
        payout: 7890
    },
    {
        name: "Google Pay",
        bg: "bg-white text-slate-800 font-bold",
        icon: "G Pay",
        status: "Google Pay • Zero Third-Party Cut",
        payout: 8640
    },
    {
        name: "Stripe",
        bg: "bg-white text-[#635bff] font-extrabold",
        icon: "stripe",
        status: "Stripe Connect • Complete IP Control",
        payout: 9480
    }
];

// Highlight sequence cycling through key gateways in loop
const ACTIVE_SEQUENCE = [0, 2, 4, 8, 7, 5, 1];

function useAnimatedNumber(targetValue, duration = 700) {
    const [displayValue, setDisplayValue] = useState(targetValue);
    const startValueRef = useRef(targetValue);
    const targetRef = useRef(targetValue);
    const startTimeRef = useRef(null);

    useEffect(() => {
        startValueRef.current = displayValue;
        targetRef.current = targetValue;
        startTimeRef.current = performance.now();

        let animId;
        const update = (now) => {
            const elapsed = now - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startValueRef.current + (targetRef.current - startValueRef.current) * ease);
            setDisplayValue(current);

            if (progress < 1) {
                animId = requestAnimationFrame(update);
            }
        };

        animId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animId);
    }, [targetValue, duration]);

    return displayValue;
}

function IpOwnershipAnim() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % ACTIVE_SEQUENCE.length);
        }, 2200);

        return () => clearInterval(interval);
    }, []);

    const activeGatewayIndex = ACTIVE_SEQUENCE[step];
    const currentGateway = GATEWAYS[activeGatewayIndex];
    const animatedPayout = useAnimatedNumber(currentGateway.payout, 700);

    return (
        <div className="absolute inset-x-0 bottom-0 top-[36%] px-5 pb-5 flex flex-col justify-end pointer-events-none select-none">
            {/* Embedded Keyframes */}
            <style>{`
                @keyframes payoutTextFade {
                    0% { opacity: 0; transform: translateY(3px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .anim-payout-fade {
                    animation: payoutTextFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* 3x3 Payment Gateway Matrix Container */}
            <div className="w-full bg-black/50 border border-white/20 rounded-2xl p-3 sm:p-3.5 shadow-xl relative overflow-hidden flex flex-col gap-2">
                {/* Top Status Bar with Live Gateway Detection */}
                <div className="flex items-center justify-between text-white/80 text-[10px] pb-1.5 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                        <RiShieldCheckLine size={13} className="text-emerald-400" />
                        <span className="font-semibold text-white/90">Direct Merchant Gateway</span>
                    </div>
                    <span
                        key={`status-${step}`}
                        className="text-emerald-300 font-mono text-[9px] font-bold anim-payout-fade"
                    >
                        {currentGateway.status}
                    </span>
                </div>

                {/* 3x3 Grid with Smooth Cycling Gateway Highlight */}
                <div className="grid grid-cols-3 gap-2">
                    {GATEWAYS.map((gw, idx) => {
                        const isActive = activeGatewayIndex === idx;

                        return (
                            <div
                                key={gw.name}
                                className={`relative h-10 sm:h-11 rounded-xl center shadow-sm border transition-all duration-500 ${gw.bg} ${
                                    isActive
                                        ? 'scale-[1.07] z-20 ring-2 ring-white/90 shadow-[0_0_18px_rgba(255,255,255,0.4)] border-white'
                                        : 'border-white/30 opacity-90'
                                }`}
                            >
                                {/* Active Live Settlement Beacon */}
                                {isActive && (
                                    <span className="absolute top-1 right-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                )}

                                {gw.isMastercard ? (
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 rounded-full bg-[#eb001b] -mr-1.5" />
                                        <span className="w-4 h-4 rounded-full bg-[#f79e1b] opacity-80" />
                                    </div>
                                ) : gw.isUnionPay ? (
                                    <div className="flex items-center rounded overflow-hidden">
                                        <span className="bg-[#d52b1e] text-white text-[8px] font-bold px-1 py-0.5">Union</span>
                                        <span className="bg-[#007078] text-white text-[8px] font-bold px-1 py-0.5">Pay</span>
                                    </div>
                                ) : (
                                    <span className="text-xs sm:text-sm font-sans tracking-tight select-none">
                                        {gw.icon}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Live Settlement & Zero Lock-in Assurance */}
                <div className="pt-1 flex items-center justify-between text-[9px] font-mono text-white/80 border-t border-white/5">
                    <span className="tabular-nums">
                        Direct Deposit: <span className="text-emerald-300 font-bold font-mono">${animatedPayout.toLocaleString()}</span>
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Zero Platform Fee
                    </span>
                </div>
            </div>
        </div>
    );
}

export default React.memo(IpOwnershipAnim);
