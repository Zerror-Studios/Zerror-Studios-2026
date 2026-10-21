"use client";
import { RiArrowRightUpLine } from '@remixicon/react'
import gsap from 'gsap'
import { Link } from 'next-view-transitions'
import React, { useState } from 'react'
import PixelGridCanvas from './PixelGridCanvas'

const Button = ({
    type = "button",
    link,
    title,
    variant = "outline",
    ...props
}) => {

    const [isHovered, setIsHovered] = useState(false)

    // "white": white fill at rest, pixels clear on hover to reveal a white outline
    const isWhite = variant === "white"
    // "black": black outline and text, black pixel fill on hover
    const isBlack = variant === "black"
    const restColor = isBlack ? "#000000" : "#002bba"

    const ButtonHover = (e) => {
        setIsHovered(true)
        const tl = gsap.timeline()
        const target = e.currentTarget;
        const arrowParen = target.querySelector('.arrow_paren');
        const arrowInner = target.querySelector('.arrow_inner');
        const textEl = target.querySelector('.btn_text');
        const iconEl = target.querySelector('.arrow_inner');

        tl.to(target, { gap: "1rem", ease: "expo.out", duration: .3 })
        tl.to(arrowParen, { width: "1.5rem", ease: "expo.out", duration: .3 }, "<")
        tl.to(arrowInner, { y: 0, ease: "expo.out", duration: .3 })
        tl.to(target, { gap: ".25rem", ease: "expo.out", duration: .3 })

        gsap.to(textEl, { color: "#ffffff", duration: 0.3 })
        gsap.to(iconEl, { color: "#ffffff", duration: 0.3 })
    }

    const ButtonLeave = (e) => {
        setIsHovered(false)
        const tl = gsap.timeline()
        const target = e.currentTarget;
        const arrowParen = target.querySelector('.arrow_paren');
        const arrowInner = target.querySelector('.arrow_inner');
        const textEl = target.querySelector('.btn_text');
        const iconEl = target.querySelector('.arrow_inner');

        tl.to(target, { gap: "1rem", ease: "expo.out", duration: .3 })
        tl.to(arrowInner, { y: "100%", ease: "expo.out", duration: .3 }, "<")
        tl.to(arrowParen, { width: "0rem", ease: "expo.out", duration: .3 })
        tl.to(target, { gap: "0", ease: "expo.out", duration: .3 }, "<")

        gsap.to(textEl, { color: restColor, duration: 0.3 })
        gsap.to(iconEl, { color: restColor, duration: 0.3 })
    }

    const buttonClasses = `
    button_paren px-3 secondary-font  md:px-4 py-1.5 md:py-2 text-xs md:text-sm flex items-center 
     uppercase rounded-md ${isBlack ? "text-black" : "text_blue"} relative overflow-hidden
    ${variant === "fill"
            ? "bg-white"
            : isWhite
                ? "border-white border-[2px]"
                : isBlack
                    ? "border-black border-[2px]"
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
            <PixelGridCanvas
                isActive={isWhite ? !isHovered : isHovered}
                boxSize={12}
                color={isWhite ? "#ffffff" : restColor}
                duration={0.6}
                className="absolute inset-0 w-full h-full pointer-events-none z-0 "
            />
            <p className="btn_text translate-y-[.05rem] relative z-10">{title}</p>
            <div className="arrow_paren w-0 overflow-hidden relative z-10">
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
