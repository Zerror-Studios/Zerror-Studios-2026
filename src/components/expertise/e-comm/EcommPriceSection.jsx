import { RiCheckLine, RiCloseLine } from '@remixicon/react';
import React from 'react'

const features = [
    { name: "Fully custom design freedom", zcommerce: true, shopify: true },
    { name: "No third-party plugin costs", zcommerce: true, shopify: false },
    { name: "Built-in loyalty & referral system", zcommerce: true, shopify: true },
    { name: "Lookbook & Look Creation Tool", zcommerce: true, shopify: false },
    { name: "Integrated WhatsApp campaigns", zcommerce: true, shopify: true },
    { name: "IP ownership on full payment", zcommerce: true, shopify: false },
    { name: "Competitive long-term running costs", zcommerce: true, shopify: false },
];

const CheckIcon = () => (
    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#002bba] text-white flex items-center justify-center">
       <RiCheckLine/>
    </div>
);

const CrossIcon = () => (
    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full text-white bg-gray-200 flex items-center justify-center">
      <RiCloseLine/>
    </div>
);

const EcommPriceSection = () => {
    return (
        <div className="w-full padding py-10! md:py-32! text_blue">

            {/* ── Heading — matches InfoSection.jsx ──────────── */}
            <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                <div className="">
                    <h2 className='capitalize primary-font text-5xl leading-none'>Why Businesses <br /> Choose Zcom</h2>
                </div>
                <div className="text-xs max-sm:hidden pt-4">
                    <p className='font-thin'>Why</p>
                    <p className='font-thin'>Choose Us</p>
                </div>
                <div className="capitalize text-3xl md:pl-2">
                    <h3 className="">
                        <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                        Understand The Difference Between Ready-Made Platforms And Fully Custom-Built Solutions.
                    </h3>
                </div>
            </div>

            {/* ── Comparison Table ────────────────────────────── */}
            <div className="w-full mt-12 md:mt-20 border border-[#002bba]/20 rounded-xl overflow-hidden">

                {/* Table header */}
                <div className="w-full grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] bg_blue text-white">
                    <div className="px-4 md:px-10 py-4 md:py-6 flex items-center">
                        <p className="text-base md:text-xl  primary-font">Features</p>
                    </div>
                    <div className="px-4 md:px-10 py-4 md:py-6 flex items-center justify-center">
                        <p className="text-xs md:text-base font-semibold uppercase tracking-wider">ZCommerce</p>
                    </div>
                    <div className="px-4 md:px-10 py-4 md:py-6 flex items-center justify-center gap-2">
                        <img src="/icons/shopify.svg" className='w-24' alt="" />
                    </div>
                </div>

                {/* Feature rows */}
                {features.map((feature, i) => (
                    <div
                        key={i}
                        className={`w-full grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] border-t border-[#002bba]/10 ${i % 2 === 1 ? 'bg-[#f8f9ff]' : 'bg-white'
                            } transition-colors duration-200 hover:bg-[#eef1ff]`}
                    >
                        <div className="px-4 md:px-10 py-5 md:py-7 flex items-center">
                            <p className="text-sm md:text-xl text-[#002bba]">{feature.name}</p>
                        </div>
                        <div className="px-4 md:px-10 py-5 md:py-7 flex items-center justify-center">
                            {feature.zcommerce ? <CheckIcon /> : <CrossIcon />}
                        </div>
                        <div className="px-4 md:px-10 py-5 md:py-7 flex items-center justify-center">
                            {feature.shopify ? <CheckIcon /> : <CrossIcon />}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default EcommPriceSection