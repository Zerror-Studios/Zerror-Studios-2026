"use client";
import { RiArrowRightUpLine } from '@remixicon/react'
import gsap from 'gsap'
import { Link } from 'next-view-transitions'
import React, { useRef } from 'react'

const Button = ({
    type = "button",
    link,
    title,
    variant = "outline",
    ...props
}) => {

    const ButtonHover = (e) => {
        const tl = gsap.timeline()
        const target = e.currentTarget;
        const arrowParen = target.querySelector('.arrow_paren');
        const arrowInner = target.querySelector('.arrow_inner');

        tl.to(target, {
            gap: "1rem",
            ease: "expo.out",
            duration: .3
        })
        tl.to(arrowParen, {
            width: "1.5rem",
            ease: "expo.out",
            duration: .3
        }, "<")
        tl.to(arrowInner, {
            y: 0,
            ease: "expo.out",
            duration: .3
        })
        tl.to(target, {
            gap: ".25rem",
            ease: "expo.out",
            duration: .3
        })
    }

    const ButtonLeave = (e) => {
        const tl = gsap.timeline()
        const target = e.currentTarget;
        const arrowParen = target.querySelector('.arrow_paren');
        const arrowInner = target.querySelector('.arrow_inner');

        tl.to(target, {
            gap: "1rem",
            ease: "expo.out",
            duration: .3
        })
        tl.to(arrowInner, {
            y: "100%",
            ease: "expo.out",
            duration: .3
        }, "<")
        tl.to(arrowParen, {
            width: "0rem",
            ease: "expo.out",
            duration: .3
        })
        tl.to(target, {
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
            : "border-[#002bba] border-[2px]"}
  `

    const ButtonContent = (
        <button
            type={type}
            onMouseEnter={ButtonHover}
            onMouseLeave={ButtonLeave}
            className={buttonClasses}
            onClick={props.onClick}
            {...props}
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
        const isExternal = link.startsWith("http")

        if (isExternal) {
            return (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {ButtonContent}
                </a>
            )
        }

        return <Link href={link}>{ButtonContent}</Link>
    }

    return ButtonContent
}

export default Button
