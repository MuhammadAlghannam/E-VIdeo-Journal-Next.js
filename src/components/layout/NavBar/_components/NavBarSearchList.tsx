"use client";

import Spinner from "@/components/shared/Spinner";
import TruncateWords from "@/components/shared/TruncateWords";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import useVideoSearch from "@/hooks/use-video-search";
import useAddVideoView from "@/hooks/use-video-view";
import { formatDate, resolveImageSrc } from "@/lib/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NavBarSearchListProps = {
  debouncedTerm: string;
  trigger: React.ReactNode;
  onItemSelect?: () => void;
};

// The API sometimes returns: { type: "media", data: [ [ VideoSearchItem, ... ] ] }
type VideoSearchResponseNested = {
  type: string;
  data: VideoSearchItem[][];
};

// Small wrapper to post a view count before navigating (mirrors your VideoViewLink behavior)
function CountedLink({
  href,
  mediaId,
  className,
  children,
  onClick,
}: {
  href: string;
  mediaId: number;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { addVideoView } = useAddVideoView();

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        addVideoView({ mediaId });
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}

export default function NavBarSearchList({ debouncedTerm, trigger, onItemSelect }: NavBarSearchListProps) {
  // State
  const [manuallyClosed, setManuallyClosed] = useState(false);

  // Mutation
  const { payload, isPending, error } = useVideoSearch(debouncedTerm);

  // Flatten results: API returns { type, data: [ [ items... ] ] }
  const results = useMemo<VideoSearchItem[]>(() => {
    const raw = (payload as Partial<VideoSearchResponse> | Partial<VideoSearchResponseNested> | undefined)?.data;

    if (!raw) return [];

    // If first element is an array, flatten once; else assume already flat
    if (Array.isArray(raw) && Array.isArray((raw as unknown[])[0])) {
      return (raw as VideoSearchItem[][]).flat();
    }

    return raw as VideoSearchItem[];
  }, [payload]);

  // Variables
  const hasResults = results.length > 0;
  const shouldOpen =
    (debouncedTerm?.length ?? 0) > 0 &&
    (isPending || hasResults || !!error || (!isPending && !hasResults));
  const effectiveOpen = !manuallyClosed && shouldOpen;

  // Effect
  useEffect(() => {
    setManuallyClosed(false);
  }, [debouncedTerm]);

  return (
    <Popover
      open={effectiveOpen}
      onOpenChange={(next) => {
        if (!next) setManuallyClosed(true);
      }}
    >
      <PopoverTrigger asChild>
        {/* Input element provided from NavSearch */}
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={6}
        className="px-1 md:w-65 w-[var(--radix-popover-trigger-width)] translate-x-[-5px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {isPending ? (
          <div className="p-4 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : hasResults ? (
          <ScrollArea className="max-h-80  overflow-y-auto">
            <div className="py-2">
              {results.map((video) => (
                <CountedLink
                  key={video.id}
                  href={`/media/${video.id}`}
                  mediaId={Number(video.id)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50"
                  onClick={() => {
                    setManuallyClosed(true);   // close popover after click
                    onItemSelect?.();
                  }}
                >
                  <Image
                    src={resolveImageSrc(video.thumbnail_path)}
                    alt={String(video.title || "Video")}
                    width={80}
                    height={80}
                    quality={70}
                    className="w-[40px] h-[40px] object-cover shrink-0 rounded"
                  />
                  <div className="min-w-0">
                    <TruncateWords className=" text-h7-semibold text-black" maxWords={3}>{video.title}</TruncateWords>
                    <p className="text-h8-regular text-text-gray-dark truncate">
                      {video.status} | {formatDate(video.created_at)}
                    </p>
                  </div>
                </CountedLink>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="p-4 text-center text-h7-regular text-text-gray-dark w-full">No results</div>
        )}
      </PopoverContent>
    </Popover>
  );
}
