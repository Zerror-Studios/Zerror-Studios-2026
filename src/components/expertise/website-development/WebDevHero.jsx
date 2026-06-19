import Button from '@/components/common/Button'
import Image from 'next/image'
import React from 'react'

const WebDevHero = () => {
    return (
        <>
            <div className="w-full h-screen center capitalize text_blue gap-y-5 text-center primary-font flex-col">
                <p>Website Development</p>
                <h1 className='text-8xl'>Build Your Website <br /> With Ease</h1>
                <p className=''>Not just websites, we create experiences people remember.</p>
                <Button title="Start Building" link="/contact" />
            </div>
            <div className="w-full center">
                <div className="w-[70%] aspect-video relative">
                    <Image src="/images/expertisePage/website-development/hero_img.png" alt="website-dev" fill className='cover' />
                </div>
            </div>
        </>
    )
}

export default WebDevHero