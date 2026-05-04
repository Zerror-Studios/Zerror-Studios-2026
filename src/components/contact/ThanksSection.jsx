import React from 'react'

const ThanksSection = () => {
  return (
   <div className="w-full h-full flex flex-col ">
      <div className="w-full h-fit  text-white gap-8 flex flex-col">
        <h3 className=" secondary-font text-3xl">
          Thank you
        </h3>

        <p className=' text-lg md:text-xl'>Your message is with us.  <br />We’ll get back to you soon.</p>
      </div>
    </div>
  )
}

export default ThanksSection