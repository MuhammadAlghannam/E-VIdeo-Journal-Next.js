import { getCategoryVideos } from "@/lib/apis/categories/category-videos.api";
import { auth } from "@/lib/auth";
import FeaturedVideosCard from "../../_components/home/FeaturedVideosCard";

export default async function FilterdVideosList({ subCategoryId }: { subCategoryId: string }) {
  const session = await auth();
  const userId = (session?.user as ApiUser | undefined)?.id ?? "";

  if (!subCategoryId) {
    return (
      <div className="py-10 text-center text-text-gray-dark">Select a month to view videos.</div>
    );
  }

  const payload = await getCategoryVideos(userId, subCategoryId);
  const videos = payload?.data ?? [];

  if (!videos.length) {
    return (
      <div className="py-10 text-center text-text-gray-dark">No videos found for the selected month.</div>
    );
  }

  return (
    <div className="w-full grid gap-4 pb-2 md:grid md:grid-cols-3 grid-cols-1 md:gap-4">
      {videos.map((video: VideoMedia) => (
        <FeaturedVideosCard key={video.id} video={video} />
      ))}
    </div>
  );
}
