"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  items: {
    label: string;
    href: string;
  };
}

export default function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();
  const isActive = pathname === items.href;

  return (
    <li>
      <Link
        key={items.href}
        href={items.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "text-h7-regular",
          "pb-1",
          isActive
            ? "text-primary border-b-2 border-primary "
            : "text-black text-h7-regular hover:text-primary hover:border-b-2 hover:border-primary"
        )}
      >
        {items.label}
      </Link>
    </li>
  )
}
