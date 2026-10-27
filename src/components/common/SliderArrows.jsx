import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react'

const arrowClass = (disabled) =>
    `shrink-0 px-8 py-3 border-[#002bba] text-[#002bba] center rounded-full border transition-all duration-300 ${disabled
        ? "opacity-40 cursor-not-allowed!"
        : "group hover:bg-[#002bba] hover:text-white! hover:border-[#002bba]"
    }`

// Prev / next pill buttons for a Swiper carousel; sits in a SectionHeader's right column via `aside`
const SliderArrows = ({ onPrev, onNext, isBeginning, isEnd, className = "" }) => (
    <div className={`flex items-end md:justify-end gap-x-1 md:gap-x-4 ${className}`}>
        <button
            type="button"
            aria-label="Previous slide"
            disabled={isBeginning}
            onClick={onPrev}
            className={`prev_button ${arrowClass(isBeginning)}`}
        >
            <RiArrowLeftLine size={20} />
        </button>
        <button
            type="button"
            aria-label="Next slide"
            disabled={isEnd}
            onClick={onNext}
            className={`next_button ${arrowClass(isEnd)}`}
        >
            <RiArrowRightLine size={20} />
        </button>
    </div>
)

export default SliderArrows
