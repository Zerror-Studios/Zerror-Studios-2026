// Heading line break for desktop only; on mobile the heading runs on as one line.
// It always renders the same <br> so React never touches it after mount (SplitText
// rewrites these headings). Line splits drop it on mobile with dropHiddenBreaks().
const Br = () => <br className="max-md:hidden" />;

export default Br;
