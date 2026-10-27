"use client";

import { useRouter } from "next/navigation";

export default function ViewTransitionLink({
  href,
  delay = 0,
  onClick,
  className,
  children,
  ...props
}) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();
    setTimeout(() => {
      router.push(href);
    }, delay);
  };


  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
