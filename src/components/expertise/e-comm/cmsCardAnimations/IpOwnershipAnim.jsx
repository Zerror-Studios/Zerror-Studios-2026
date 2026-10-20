"use client";
import React, { useState, useEffect, useRef } from 'react';
import { RiShieldCheckLine } from '@remixicon/react';

const GATEWAYS = [
    {
        name: "Razorpay",
        color: "#072654",
        status: "Razorpay • Cards, UPI and wallets",
        payout: 34200
    },
    {
        name: "UPI",
        color: "#097939",
        status: "UPI • Instant payments",
        payout: 41800
    },
    {
        name: "VISA",
        src: "/icons/visa.svg",
        status: "VISA • Card payments",
        payout: 49500
    },
    {
        name: "Cashfree",
        color: "#6933D3",
        status: "Cashfree • Fast settlements",
        payout: 56200
    },
    {
        name: "₹ GST ready",
        color: "#002bba",
        status: "GST • Invoices handled",
        payout: 63500
    },
    {
        name: "Mastercard",
        src: "/icons/mastercard.svg",
        status: "Mastercard • Card payments",
        payout: 71200
    },
    {
        name: "PhonePe",
        color: "#5F259F",
        status: "PhonePe • UPI payments",
        payout: 78900
    },
    {
        name: "Google Pay",
        src: "/icons/gpay.svg",
        status: "Google Pay • UPI payments",
        payout: 86400
    },
    {
        name: "Net banking",
        color: "#1e293b",
        status: "Net banking • All major banks",
        payout: 94800
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
        <div className="absolute inset-x-0 bottom-0 top-[36%] p-6 md:p-10 flex flex-col justify-end pointer-events-none select-none">
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
            <div className="md:w-[80%] mx-auto ">


                {/* 3x3 Grid with Smooth Cycling Gateway Highlight */}
                <div className="grid grid-cols-3  gap-2">
                    {GATEWAYS.map((gw, idx) => {
                        const isActive = activeGatewayIndex === idx;

                        return (
                            <div
                                key={gw.name}
                                className={`relative  flex items-center justify-center transition-all duration-500 overflow-hidden ${isActive
                                        ? 'scale-[1.08] z-20'
                                        : 'md:scale-95 opacity-50'
                                    }`}
                            >
                                {gw.src ? (
                                    <img
                                        src={gw.src}
                                        alt={gw.name}
                                        className="w-full h-full object-contain pointer-events-none select-none"
                                    />
                                ) : (
                                    <div
                                        className="w-full aspect-[72/50] bg-white rounded-[5%] border border-[#F3F3F3] flex items-center justify-center font-sans font-bold tracking-tight text-[10px] sm:text-sm leading-none text-center px-1 pointer-events-none select-none"
                                        style={{ color: gw.color }}
                                    >
                                        {gw.name}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default React.memo(IpOwnershipAnim);
