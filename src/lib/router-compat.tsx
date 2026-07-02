"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

type LinkStyle = CSSProperties | ((state: { isActive: boolean }) => CSSProperties);

type LinkProps = {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  style?: LinkStyle;
  to: string;
};

export function Link({ children, className, onClick, style, to }: LinkProps) {
  const pathname = usePathname();
  const resolvedStyle = typeof style === "function" ? style({ isActive: pathname === to }) : style;

  return (
    <NextLink className={className} href={to} onClick={onClick} style={resolvedStyle}>
      {children}
    </NextLink>
  );
}

export function NavLink(props: LinkProps) {
  return <Link {...props} />;
}
