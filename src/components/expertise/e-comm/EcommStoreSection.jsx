import React from 'react'

const EcommStoreSection = () => {
    return (
        <>
            <div className="w-full  padding pr-0! mt-section py-section!  bg_blue relative text-white flex">
                <div className="w-[30%] flex flex-col   justify-between">
                    <div className="space-y-2">
                        <p>Store</p>
                        <h2 className='capitalize'>Manage your store effortlessly </h2>
                    </div>
                    <div>
                        <p className='para-lead capitalize'>Keep your storefront updated, organized, and aligned with your brand.</p>
                    </div>
                </div>
                <img src="/images/expertisePage/e-comm/cmsCards/card_3.png" className=' h-full object-cover absolute right-0  top-0 w-[68%]' alt="Card 3 Graphic" />
                <div className="w-[70%] relative flex items-end  justify-center flex-col">

                    <img src="/images/expertisePage/e-comm/store_img.png" className='  w-[85%] relative z-10' alt="Store img Graphic" />

                </div>
            </div>
        </>
    )
}

export default EcommStoreSection