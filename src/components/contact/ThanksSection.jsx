import React from 'react'
import Link from 'next/link'
import { FORM_MESSAGES } from '@/lib/formMessages'

const ThanksSection = () => {
  return (
   <div className="w-full h-full flex flex-col ">
      <div className="w-full h-fit  text-white gap-8 flex flex-col items-start">
        <h2 className="para-lead">
          {FORM_MESSAGES.sentTitle}
        </h2>

        <p className='para-lg'>{FORM_MESSAGES.sentText}</p>

        <Link
          href="/work"
          className="bg-white text_blue px-8 py-3 rounded-lg font-medium hover:bg-[#002bba] hover:text-white! hover:border-white border transition-colors "
        >
          <p className="translate-y-0.5 uppercase">{FORM_MESSAGES.sentButton}</p>
        </Link>
      </div>
    </div>
  )
}

export default ThanksSection
