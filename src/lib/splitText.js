// SplitText's "lines" mode breaks at every <br>, even one hidden with CSS (like <Br /> on mobile).
// Call this right before a lines split to swap hidden <br>s for a space.
export const dropHiddenBreaks = (targets) => {
  const elements = typeof targets === "string" ? document.querySelectorAll(targets) : [targets];

  elements.forEach((el) => {
    el?.querySelectorAll("br").forEach((br) => {
      if (getComputedStyle(br).display === "none") br.replaceWith(" ");
    });
  });
};
