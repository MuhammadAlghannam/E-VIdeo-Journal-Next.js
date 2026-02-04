import { getBookMarkVideos } from "@/lib/apis/video/bookmark-videos";
import { auth } from "@/lib/auth";
import FeaturedVideosCard from "../../_components/home/FeaturedVideosCard";

export default async function BookMarkList() {
  // Fetch videos
  const session = await auth();
  const userId = session?.user?.id;

  const payload = await getBookMarkVideos(userId);
  const bookmarks: BookmarkItem[] = payload?.data?.bookmarks ?? [];

  if (!bookmarks.length) {
    return <p className="py-10 text-center text-text-gray-dark">No Bookmarked Videos</p>;
  }

  // Sort newest to oldest by bookmark created_at, then flatten to VideoMedia[]
  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    const aTime = new Date(a.created_at).getTime();
    const bTime = new Date(b.created_at).getTime();
    return bTime - aTime;
  });

  const flattenedVideos: VideoMedia[] = sortedBookmarks
    .map((b) => b.media)
    .filter(Boolean) as VideoMedia[];

  // TODO: render cards using flattenedVideos
  return (
    <div className="w-full grid gap-4 pb-2 md:grid-cols-2 grid-cols-1">
      {flattenedVideos.map((video: VideoMedia) => (
        <FeaturedVideosCard key={video.id} video={video} />
      ))}
    </div>
  );
}
