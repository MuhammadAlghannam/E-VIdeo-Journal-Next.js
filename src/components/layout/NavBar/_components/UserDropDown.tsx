"use client"

import MainAvatar from "@/components/shared/MainAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/lib/actions/auth-logout.action";
import { resolveProfileImageSrc } from "@/lib/utils/helper";
import { Bookmark, ChevronDown, LayoutGrid, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const menuItems = [
  { href: "/profile", label: "Profile", icon: <UserRound className="w-5 h-5 text-primary" /> },
  { href: "/favorites", label: "Favorites", icon: <Bookmark className="w-5 h-5 text-primary" /> },
  { href: "https://his.mc-apps.org/", label: "Dashboard", icon: <LayoutGrid className="w-5 h-5 text-primary" /> },
];

export default function UserDropDown({ initialUser }: { initialUser?: ApiUser }) {
  const profileImg = resolveProfileImageSrc(initialUser?.profile_image ?? null);

  const isAdmin = initialUser?.role === "admin" || initialUser?.role === "reviewer";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2">
        <MainAvatar src={profileImg} className="size-[50px]" />
        <ChevronDown className="w-5 h-5 text-primary" strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1.5 rounded-lg translate-x-[-45px] translate-y-[10px] w-[180px]">
        {menuItems.map((item) => {
          if (item.label === "Dashboard" && !isAdmin) return null;
          return (
            <React.Fragment key={item.label}>
              <Link href={item.href} >
                <DropdownMenuItem key={item.label} className={`hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer${item.label === "Favorites" ? " lg:hidden" : ""}`}>
                  {item.icon}
                  <span className="text-h8-regular">{item.label}</span>
                </DropdownMenuItem>
              </Link>
            </React.Fragment>
          );
        })}
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm pb-2.5 cursor-pointer gap-3" onClick={() => signOutAction()}>
          <LogOut className="w-5 h-5 text-primary" />
          <span className="text-h8-regular">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
