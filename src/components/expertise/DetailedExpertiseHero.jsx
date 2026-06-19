import Button from '@/components/common/Button'
import Image from 'next/image'
import React from 'react'

const DetailedExpertiseHero = ({
    expertiseName,
    expertiseImage,
    expertiseDescription,
    expertiseHeading
}) => {
    return (
        <>
            <div className="w-full h-screen center capitalize text_blue gap-y-5 text-center  flex-col">
                <p>{expertiseName}</p>
                <h1 className='text-8xl primary-font'>{expertiseHeading}</h1>
                <p className='w-[40%]'>{expertiseDescription}</p>
                <Button title="Start Building" link="/contact" />
            </div>
            <div className="w-full center">
                <div className="w-[70%] aspect-video relative">
                    <Image src={expertiseImage} alt="website-dev" fill className='cover' />
                </div>
            </div>
        </>
    )
}

export default DetailedExpertiseHero
