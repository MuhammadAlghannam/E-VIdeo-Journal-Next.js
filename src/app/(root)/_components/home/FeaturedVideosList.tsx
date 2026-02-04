import { getFeaturedVideos } from "@/lib/apis/video/featured-videos.api";
import { auth } from "@/lib/auth";
import FeaturedVideosCard from "./FeaturedVideosCard";

type Props = {
  limit?: number | "all";
  columns?: number;
};

export default async function FeaturedVideosList({ limit = 3, columns = 3 }: Props) {

  // Variables
  const colClass = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[columns] ?? "md:grid-cols-3";

  // Fetch videos
  const session = await auth();
  const userId = session?.user?.id;
  const featuredVideos = await getFeaturedVideos(userId);

  // Flatten to VideoMedia[]
  const flattedVideos: VideoMedia[] = featuredVideos.data.flatMap(
    (category: VideoCategory) => category.media
  );

  if (flattedVideos.length === 0) {
    return <p className="py-10 text-center text-text-gray-dark">No Recently Featured Videos</p>;
  }

  // Handle limit
  const count = limit === "all" ? flattedVideos.length : limit;
  const firstThreeVideos: VideoMedia[] = flattedVideos.slice(0, count);

  return (
    <div className={`w-full grid gap-4 pb-2 md:grid ${colClass} grid-cols-1 md:gap-4`}>
      {firstThreeVideos.map((video: VideoMedia) => (
        <FeaturedVideosCard key={video.id} video={video} />
      ))}
    </div>
  );
}
