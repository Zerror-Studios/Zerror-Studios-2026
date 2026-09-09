import React from 'react'
import Calendar from './processSections/Calendar'
import ColorPalette from './processSections/ColorPalette'
import FigmaWireframe from './processSections/FigmaWireframe'
import FigmaApprovedDesign from './processSections/FigmaApprovedDesign'
import VsCode from './processSections/VsCode'
import GoogleMeet from './processSections/GoogleMeet'

const WebDevProcess = () => {
    return (
        <>
            <div className="w-full border-t mt-8 md:mt-16  padding pt-8! md:pt-16! text_blue ">
                <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                    <div className="">
                        <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'>our <br /> Process </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4">
                        <p className='font-thin'>From wireframes to</p>
                        <p className='font-thin'>high-performance code.</p>
                    </div>
                    <div className=" text-3xl  md:pl-2">
                        <h3 data-para-effect className="secondary-font">
                            <span className='opacity-0  max-sm:hidden pointer-events-none'>...............</span>
                            Our process blends strategic design with robust engineering. We don't just write code — we build scalable, high-performing digital experiences that drive your business forward.
                        </h3>
                    </div>
                </div>
            </div>
            <Calendar />
            <GoogleMeet />
            <ColorPalette />
            <FigmaWireframe/>
            <FigmaApprovedDesign />
            <VsCode />
        </>
    )
}

export default WebDevProcess