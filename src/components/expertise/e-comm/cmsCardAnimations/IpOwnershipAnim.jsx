"use client";
import React, { useState, useEffect, useRef } from 'react';
import { RiShieldCheckLine } from '@remixicon/react';

const GATEWAYS = [
    {
        name: "Apple Pay",
        src: "/icons/apple_pay.svg",
        status: "Apple Pay • 1-Click Checkout",
        payout: 3420
    },
    {
        name: "American Express",
        src: "/icons/american_express.svg",
        status: "American Express • Direct Settlement",
        payout: 4180
    },
    {
        name: "VISA",
        src: "/icons/visa.svg",
        status: "VISA Direct • Instant Payout",
        payout: 4950
    },
    {
        name: "DISCOVER",
        src: "/icons/discover.svg",
        status: "Discover • Zero Rev Share",
        payout: 5620
    },
    {
        name: "Mastercard",
        src: "/icons/mastercard.svg",
        status: "Mastercard • 100% Owned Gateway",
        payout: 6350
    },
    {
        name: "Klarna",
        src: "/icons/klarna.svg",
        status: "Klarna BNPL • Direct Bank Deposit",
        payout: 7120
    },
    {
        name: "UnionPay",
        src: "/icons/union_pay.svg",
        status: "UnionPay • Global Multi-Currency",
        payout: 7890
    },
    {
        name: "Google Pay",
        src: "/icons/gpay.svg",
        status: "Google Pay • Zero Third-Party Cut",
        payout: 8640
    },
    {
        name: "Stripe",
        src: "/icons/stripe.svg",
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
        <div className="absolute inset-x-0 bottom-0 top-[36%] p-8 md:p-10 flex flex-col justify-end pointer-events-none select-none">
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
            <div className="w-[80%] mx-auto ">


                {/* 3x3 Grid with Smooth Cycling Gateway Highlight */}
                <div className="grid grid-cols-3  gap-2">
                    {GATEWAYS.map((gw, idx) => {
                        const isActive = activeGatewayIndex === idx;

                        return (
                            <div
                                key={gw.name}
                                className={`relative  flex items-center justify-center transition-all duration-500 overflow-hidden ${
                                    isActive
                                        ? 'scale-[1.08] z-20'
                                        : 'scale-95 opacity-50'
                                }`}
                            >
                                <img
                                    src={gw.src}
                                    alt={gw.name}
                                    className="w-full h-full object-contain pointer-events-none select-none"
                                />
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default React.memo(IpOwnershipAnim);
