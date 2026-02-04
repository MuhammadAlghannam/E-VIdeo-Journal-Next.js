"use client";

import TruncateWords from "@/components/shared/TruncateWords";
import { Bell, Dot } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useMarkAsSeen from "../_hooks/use-mark-as-seen";

type Props = { notification: NotificationItem };

export default function NotificationsCard({ notification }: Props) {
  // Hooks
  const router = useRouter();

  // Mutation
  const { markSeen, isPending } = useMarkAsSeen();

  // Function
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (notification.seen) return;
    e.preventDefault();
    markSeen(
      { id: notification.id },
      {
        onSuccess: () => {
          router.push(`/media/${notification.media_id}`);
        },
        onError: () => {
          toast.error("Something went wrong")
        },
      }
    );
  };

  return (
    <Link
      href={`/media/${notification.media_id}`}
      onClick={handleClick}
      className="p-6 flex items-start gap-4 last:border-b-0 border-b border-border"
      aria-disabled={isPending}
    >
      <div className="p-4 rounded-full bg-[#F1F9FA]">
        <Bell className="w-4 h-4 text-primary" />
      </div>

      <div className="flex-1">
        <h2 className="text-h6-semibold">
          {notification.sender?.name || "User"}: {notification?.title}
        </h2>

        <TruncateWords
          className="text-h7-regular text-text-black"
          maxWords={20}
          showReadMore
          readMoreText="Read more"
          readLessText="Read less"
        >
          {notification?.body}
        </TruncateWords>

        <span className="text-h8-regular text-text-gray-dark block mt-1">
          {new Date(notification.created_at).toLocaleString()}
        </span>
      </div>

      {!notification.seen ? (
        <Dot className="w-5 h-5 text-destructive shrink-0" />
      ) : (
        ""
      )}
    </Link>
  );
}
