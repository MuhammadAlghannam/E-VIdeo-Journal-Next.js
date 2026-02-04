"use client";

import useMarkAsSeen from "@/app/(root)/notifications/_hooks/use-mark-as-seen";
import CustomeBtn from "@/components/shared/CustomeBtn";
import TruncateWords from "@/components/shared/TruncateWords";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { Bell, Dot, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = { items: NotificationItem[] };

export default function NavNotificationsClient({ items }: Props) {

  // Hooks
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Mutation
  const { markSeen, isPending } = useMarkAsSeen();

  // Function
  const handleClick =
    (n: NotificationItem) =>
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (n.seen) return;
        e.preventDefault();

        // Close menu immediately
        setOpen(false);

        // Mark as seen, then refresh unread and navigate
        markSeen(
          { id: n.id },
          {
            onSuccess: () => {
              router.refresh();
              router.push(`/media/${n.media_id}`);
            },
          }
        );
      };

  return (
    <div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <Link href="/notifications">
          <div className="relative border border-primary p-3 cursor-pointer rounded-full w-fit">
            <Bell className="w-5 h-5 text-primary" strokeWidth={1.5} />

            {/* show red dot only if there are unread notifications */}
            {items.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 right-1   h-3 min-w-3 rounded-full px-1 font-mono tabular-nums"
              />
            )}
          </div>
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className="flex items-center">
            {/* wrap bell + badge so badge can be absolutely positioned */}
            <div className="relative">
              {/* bell button */}
              <div className="border border-primary p-3 cursor-pointer rounded-full w-fit">
                <Bell className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>

              {/* red badge in the top-right */}
              {items.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 right-1 h-3 min-w-3 rounded-full px-1 font-mono tabular-nums"
                >
                  {/* keep empty for just a red dot */}
                </Badge>
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[425px] translate-x-[-85px] translate-y-[20px] p-6">
            <DropdownMenuLabel className="flex items-center gap-4">
              <div className="w-3 h-8 rounded-[4px] bg-primary" />
              <span className="text-h4-semibold">Notification</span>
            </DropdownMenuLabel>

            {items.length === 0 ? (
              <div className="text-h8-regular text-text-gray-dark mt-3">
                No unread notifications
              </div>
            ) : (
              // Safety: slice here too, in case server ever passes >3
              items.slice(0, 3).map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  className="!bg-transparent border-b border-b-border py-4 px-0 mt-3
                            data-[highlighted]:bg-transparent data-[highlighted]:text-inherit focus:bg-transparent focus:text-inherit"
                >
                  <Link
                    href={`/media/${n.media_id}`}
                    onClick={handleClick(n)}
                    className="flex justify-between items-center gap-4 w-full"
                    aria-disabled={isPending}
                  >
                    {/* left side: icon + content */}
                    <div className="flex items-start gap-4">
                      <div className="bg-[#F1F9FA] p-3 rounded-full w-fit">
                        <Bell className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <TruncateWords className="text-h7-semibold !text-black" maxWords={6}>
                          {`${n.sender?.name || "User"}: ${n?.title}`}
                        </TruncateWords>

                        <TruncateWords maxWords={10} className="text-h8-regular text-black">
                          {n?.body}
                        </TruncateWords>
                        <div className="text-h8-regular text-text-gray-dark mt-1">
                          {new Date(n.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {!n.seen && <Dot className="w-7 h-7 text-destructive flex-shrink-0" />}
                  </Link>
                </DropdownMenuItem>
              ))
            )}

            <div className="mt-8">
              <CustomeBtn
                href="/notifications"
                className="bg-primary py-6 text-h8-regular text-white text-center w-full"
              >
                View all Notification <MoveRight className="w-5 h-5 text-white" />
              </CustomeBtn>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div >
  );
}
