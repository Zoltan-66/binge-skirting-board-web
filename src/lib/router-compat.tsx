"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { localeFromPathname, localizeHref } from "@/lib/i18n";

type LinkStyle = CSSProperties | ((state: { isActive: boolean }) => CSSProperties);

type LinkProps = {
  children: ReactNode;
  className?: string;
  "data-tour"?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  style?: LinkStyle;
  to: string;
};

export function Link({ children, className, onClick, style, to, "data-tour": dataTour }: LinkProps) {
  const pathname = usePathname();
  const localizedRoute = /^\/(en|zh|de|es|fr)(?=\/|$)/.test(pathname);
  const href = localizeHref(to, localeFromPathname(pathname), localizedRoute);
  const resolvedStyle = typeof style === "function" ? style({ isActive: pathname === href }) : style;

  return (
    <NextLink className={className} data-tour={dataTour} href={href} onClick={onClick} style={resolvedStyle}>
      {children}
    </NextLink>
  );
}

export function NavLink(props: LinkProps) {
  return <Link {...props} />;
}
