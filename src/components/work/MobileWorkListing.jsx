"use client";
import { caseStudies } from '@/data/ProjectsData'
import Image from 'next/image'
import React from 'react'
import { Link } from 'next-view-transitions';

const MobileWorkListing = () => {
    return (
        <div className='padding pt-24! flex flex-col gap-y-10'>
            {caseStudies.map((item, i) => (
                <Link
                    href={`/work/${item.slug}`}
                    key={i}
                    className="w-full relative group space-y-2"
                >
                    <div
                        className="w-full relative aspect-3/4 md:aspect-square bg_blue overflow-hidden"
                    >
                        <div className="cover group-hover:brightness-[.3] transition-all duration-300 brightness-100  ease-[cubic-bezier(0.4, 0, 0.2, 1]  ">
                            <Image src={item.cover_img} alt="Item cover img Graphic" className="cover" fill />
                        </div>
                    </div>

                    <div className="w-full text_blue">
                        <div className="flex  justify-between">
                            <h4 className="text-xl  leading-none primary-font  uppercase">{item.title}</h4>
                            <h4 className="text-xl  leading-none primary-font  uppercase">{item.year}</h4>
                        </div>
                        <p className="leading-none">{item.category}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default MobileWorkListing