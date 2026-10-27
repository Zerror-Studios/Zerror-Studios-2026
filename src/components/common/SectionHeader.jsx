// Three-column section header used across the site:
// [ heading ] [ small label lines ] [ intro paragraph ]
// Stacks on mobile; the label column is hidden below md.

const SPACER = "...............";

const cx = (...classes) => classes.filter(Boolean).join(" ") || undefined;

/**
 * @param {React.ReactNode} title        Section heading.
 * @param {string}   as             Heading tag, "h2" by default.
 * @param {string}   titleClassName Extra classes for the heading (e.g. "capitalize").
 * @param {React.ReactNode[]} lines  Small label lines for the middle column.
 * @param {React.ReactNode} children    Intro paragraph for the right column.
 * @param {React.ReactNode} aside       Custom right column (replaces the intro, e.g. slider buttons).
 * @param {boolean}  wideTitle      Heading spans the first two columns and the label column is dropped.
 * @param {boolean}  reveal         Use the global line reveal (data-para-effect). On by default.
 * @param {string}   splitClass     Class for a section's own GSAP split animation; turns off the global reveal.
 * @param {string}   className      Extra classes for the grid wrapper (padding, colour, borders).
 */
const SectionHeader = ({
  title,
  as: Title = "h2",
  titleClassName = "capitalize",
  lines = [],
  children,
  aside,
  wideTitle = false,
  reveal = true,
  splitClass = "",
  className = "",
}) => {
  const anim = !splitClass && reveal ? { "data-para-effect": true } : {};

  return (
    <div className={cx("w-full space-y-block-half md:space-y-0 md:grid grid-cols-[28%_30%_42%]", className)}>
      <div className={wideTitle ? "col-span-2 md:pr-12" : undefined}>
        <Title {...anim} className={cx(splitClass, titleClassName)}>
          {title}
        </Title>
      </div>

      {!wideTitle && (
        <div className="label max-sm:hidden pt-4">
          {lines.map((line, i) => (
            <p key={i} {...anim} className={cx(splitClass, "font-thin")}>
              {line}
            </p>
          ))}
        </div>
      )}

      {aside ?? (
        <div className="para-lead md:pl-2">
          {children && (
            <p {...anim} className={cx(splitClass)}>
              <span className="opacity-0 max-sm:hidden pointer-events-none" aria-hidden="true">
                {SPACER}
              </span>
              {children}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
