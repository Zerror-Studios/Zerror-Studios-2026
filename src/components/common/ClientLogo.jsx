"use client"
import React, { useState, useEffect } from 'react'

// Logo SVGs are filled white — swap to currentColor so the text color drives them
const svgCache = new Map();
const loadSvg = (src) => {
    if (!svgCache.has(src)) {
        svgCache.set(
            src,
            fetch(src)
                .then((res) => res.text())
                .then((svg) =>
                    svg
                        .replace(/fill="white"/g, 'fill="currentColor"')
                        .replace(/<svg([^>]*?)\swidth="[^"]*"\s+height="[^"]*"/, '<svg$1 style="display:block;width:100%;height:auto"')
                )
        );
    }
    return svgCache.get(src);
};

const ClientLogo = ({ src, title, className = "" }) => {
    const [svg, setSvg] = useState("");

    useEffect(() => {
        let active = true;
        loadSvg(src).then((markup) => active && setSvg(markup));
        return () => { active = false; };
    }, [src]);

    return (
        <div
            role="img"
            aria-label={title}
            className={`aspect-square ${className}`}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

export default ClientLogo
