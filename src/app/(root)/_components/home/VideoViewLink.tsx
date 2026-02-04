"use client";

import useAddVideoView from "@/hooks/use-video-view";
import Link from "next/link";

export default function VideoViewLink({
  href,
  mediaId,
  children,
  className,
}: {
  href: string;
  mediaId: number;
  children: React.ReactNode;
  className?: string;
}) {
  // Mutation
  const { addVideoView } = useAddVideoView();

  return (
    <Link
      href={href}
      onClick={() => addVideoView({ mediaId })}
      className={className}
    >
      {children}
    </Link>
  );
}
