"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NotificationsLinks() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="rounded-[50px] border border-border sm:w-fit w-full mt-12">
      <CustomeBtn
        href="/notifications"
        className={cn(
          "sm:w-50 w-full transition shadow-none text-h7-semibold rounded-[30px]",
          isActive("/notifications")
            ? "bg-primary text-white"
            : "bg-transparent hover:bg-primary"
        )}
      >
        All
      </CustomeBtn>
      <CustomeBtn
        href="/notifications/unread"
        className={cn(
          "sm:w-50 w-full transition shadow-none text-h7-semibold rounded-[30px]",
          isActive("/notifications/unread")
            ? "bg-primary text-white"
            : "bg-transparent hover:bg-primary"
        )}
      >
        Unread
      </CustomeBtn>
    </div>
  )
}
