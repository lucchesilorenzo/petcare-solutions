"use client";

import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Dashboard",
    href: "/app/dashboard",
  },
  {
    name: "Account",
    href: "/app/account",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-white/10 py-2">
      <Logo />

      <nav>
        <ul className="flex gap-3">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={cn(
                  "px-2 py-1 text-xs text-white/80 transition hover:text-white",
                  {
                    "bg-black/20 text-white": link.href === pathname,
                  },
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
