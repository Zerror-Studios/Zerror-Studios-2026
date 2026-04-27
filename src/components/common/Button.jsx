import { RiArrowRightUpLine } from '@remixicon/react'
import gsap from 'gsap'
import { Link } from 'next-view-transitions'
import React, { useRef } from 'react'

const Button = ({
    type = "button",
    link,
    title,
    variant = "outline",
}) => {

    const ButtonHover = () => {
        const tl = gsap.timeline()

        tl.to(".button_paren", {
            gap: "1rem",
            ease: "expo.out",
            duration: .3
        })
        tl.to(".arrow_paren", {
            width: "1.5rem",
            ease: "expo.out",
            duration: .3
        }, "<")
        tl.to(".arrow_inner", {
            y: 0,
            ease: "expo.out",
            duration: .3
        })
        tl.to(".button_paren", {
            gap: ".25rem",
            ease: "expo.out",
            duration: .3
        })
    }

    const ButtonLeave = () => {
        const tl = gsap.timeline()

        tl.to(".button_paren", {
            gap: "1rem",
            ease: "expo.out",
            duration: .3
        })
        tl.to(".arrow_inner", {
            y: "100%",
            ease: "expo.out",
            duration: .3
        }, "<")
        tl.to(".arrow_paren", {
            width: "0rem",
            ease: "expo.out",
            duration: .3
        })
        tl.to(".button_paren", {
            gap: "0",
            ease: "expo.out",
            duration: .3
        }, "<")
    }

    const buttonClasses = `
    button_paren px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm flex items-center 
     uppercase rounded-md text_blue
    ${variant === "fill"
            ? "bg-white"
            : "border-[#0000FF] border-[2px]"}
  `

    const ButtonContent = (
        <button
            type={type}
            onMouseEnter={ButtonHover}
            onMouseLeave={ButtonLeave}
            className={buttonClasses}
        >
            <p className="  translate-y-[.05rem]">{title}</p>
            <div className="arrow_paren w-0 overflow-hidden">
                <div className="arrow_inner translate-y-full">
                    <RiArrowRightUpLine size={20} />
                </div>
            </div>
        </button>
    )

    if (link) {
        return <Link href={link}>{ButtonContent}</Link>
    }

    return ButtonContent
}

export default Button
