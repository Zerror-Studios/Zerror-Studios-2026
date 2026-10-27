import Br from "@/components/common/Br";
import React from 'react'

const BrandingHero = () => {
    return (
        <>
            <div className="w-full h-screen center">
                <div className="relative text-center text_blue ">
                    <p>Expertise</p>
                    <h1 className='capitalize'>Branding , <Br /> marketing <Br /> and SEO</h1>
                </div>
                <div className="magnet_circle absolute w-[30%] center text-center text-white rounded-full overflow-hidden">
                    <div className="absolute w-screen">
                        <p>Expertise</p>
                        <h1 className='capitalize'>Branding , <Br /> marketing <Br /> and SEO</h1>
                    </div>
                    <img src="/images/expertisePage/branding/hero_circle.png" className='w-full' alt="Hero circle Graphic" />
                </div>
            </div>
        </>
    )
}

export default BrandingHero