import { getRecentlyAddedVideos } from "@/lib/apis/video/recently-added-videos.api";
import React from "react";
import { RecentlyAddedCards } from "./RecentlyAddedCards";

export default async function RecentlyAddedList() {
  const recentlyAddedVideos = await getRecentlyAddedVideos()


  if (recentlyAddedVideos.data.length === 0) return <p className="text-primary text-h7-regular">No Recently Added Videos</p>

  const allMedia: VideoMedia[] = recentlyAddedVideos.data.flatMap((category: VideoCategory) => category.media);
  const sorted: VideoMedia[] = allMedia.sort(
    (a: VideoMedia, b: VideoMedia) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const firstThreeVideos: VideoMedia[] = sorted.slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      {firstThreeVideos.map((media) => (
        <React.Fragment key={media.id}>
          <RecentlyAddedCards media={media} />
        </React.Fragment>
      ))}
    </div>
  )
}
