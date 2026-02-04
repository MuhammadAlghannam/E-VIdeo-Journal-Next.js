"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/lib/actions/auth-logout.action";
import { navbarLinks } from "@/lib/constants/navbarLinks";
import { LogOut, Menu } from "lucide-react";
import type { Session } from "next-auth"; // ← add type
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function HamburgerNav({ session }: { session: Session | null }) { // ← use prop
  const isAdmin = session?.user?.role === "admin" || session?.user?.role === "reviewer";
  const router = useRouter();

  return (
    <DropdownMenu onOpenChange={(open) => {
      if (open) router.refresh(); // 🔁 get a fresh server session snapshot on open
    }}>
      <DropdownMenuTrigger className="cursor-pointer">
        <Menu className="w-7 h-7 text-primary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1.5 rounded-lg translate-x-[-20px] translate-y-[25px] w-[200px]">
        {navbarLinks
          .filter((item) => ["Home", "About HIS", "Editorial Board", "Category", "Featured Videos", "Contact Us",].includes(item.label) || (item.label === "Favorites" && !!session?.user) || (item.label === "Guideline Publications" && !!session?.user))
          .map((item) => (
            <React.Fragment key={item.label}>
              <Link href={item.href} >
                <DropdownMenuItem
                  key={item.label}
                  className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-h8-regular">{item.label}</span>
                </DropdownMenuItem>
              </Link>
            </React.Fragment>
          ))}
        <DropdownMenuSeparator className="my-2" />
        {session?.user ? (
          <>
            {navbarLinks
              .filter((item) => item.label === "Profile" || (item.label === "Dashboard" && isAdmin))
              .map((item) => (
                <React.Fragment key={item.label}>
                  <Link href={item.href}>
                    <DropdownMenuItem
                      className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-h8-regular">{item.label}</span>
                    </DropdownMenuItem>
                  </Link>
                </React.Fragment>
              ))}
            <DropdownMenuItem
              className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm pb-2.5 cursor-pointer gap-3"
              onClick={async () => {
                await signOutAction();      // server-side sign out
                try { localStorage.removeItem("prevUrl"); } catch { }
                router.refresh();           // revalidate client state
              }}
            >
              <LogOut className="w-5 h-5 text-primary" />
              <span className="text-h8-regular">Logout</span>
            </DropdownMenuItem>
          </>
        ) : (
          navbarLinks
            .filter((item) => ["Login", "Sign up"].includes(item.label))
            .map((item) => (
              <DropdownMenuItem
                asChild
                key={item.label}
                className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer"
              >
                {item.label === "Login" ? (
                  // store current URL before navigating to /login
                  <Link
                    href={item.href}
                    className="flex items-center gap-3"
                    onClick={() => {
                      try {
                        localStorage.setItem("prevUrl", window.location.href);
                      } catch { }
                    }}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-h8-regular">{item.label}</span>
                  </Link>
                ) : (
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-h8-regular">{item.label}</span>
                  </Link>
                )}
              </DropdownMenuItem>
            ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
