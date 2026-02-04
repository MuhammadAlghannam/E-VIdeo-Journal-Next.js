import FeaturedVideosCard from "@/app/(root)/_components/home/FeaturedVideosCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyVideos } from "@/lib/apis/video/my-videos.api";
import { auth } from "@/lib/auth";

type Props = {
  columns?: number;
};
type MediaItem = VideoMedia;
type VideosByStatus = Record<string, MediaItem[]>;

export default async function MyVideosList({ columns = 2 }: Props) {
  const colClass =
    {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
    }[columns] ?? "md:grid-cols-3";

  // Session
  const session = await auth();
  const userId = session?.user?.id;

  // Fetch my videos
  const myVideos = await getMyVideos(userId);
  const data: VideosByStatus = myVideos?.data ?? {};

  // Helpers
  const prettify = (key: string) =>
    key
      .replace(/[_-]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const sortByCreatedAtDesc = (arr: MediaItem[]) =>
    [...arr].sort((a, b) => {
      const aTime = new Date(a?.created_at ?? 0).getTime() || 0;
      const bTime = new Date(b?.created_at ?? 0).getTime() || 0;
      return bTime - aTime;
    });

  // Get status keys from API (no hardcoding)
  const keys = Object.keys(data);
  const orderedKeys = keys;

  // Default tab: prefer "published" (case-insensitive), else first key
  const publishedKey = keys.find((k) => k.toLowerCase() === "published");
  const defaultTab = publishedKey ?? keys[0] ?? "published";

  // Any videos at all?
  const hasAnyVideos = orderedKeys.some((k) =>
    (Array.isArray(data[k]) ? data[k] : []).flat(2).some((v) => v && typeof v === "object")
  );

  // Handle case when API has no data or only empty arrays
  if (orderedKeys.length === 0 || !hasAnyVideos) {
    return (
      <p className="text-center text-gray-500 w-full py-10">
        No videos found.
      </p>
    );
  }

  return (
    <>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="mb-6">
          {orderedKeys.map((statusKey) => (
            <TabsTrigger key={statusKey} value={statusKey}>
              {prettify(statusKey)}
            </TabsTrigger>
          ))}
        </TabsList>

        {orderedKeys.map((statusKey) => {
          // Collect & sort videos for this tab
          const list: MediaItem[] = (Array.isArray(data[statusKey]) ? data[statusKey] : [])
            .flat(2)
            .filter((v): v is MediaItem => v && typeof v === "object");

          const sortedList = sortByCreatedAtDesc(list);

          return (
            <TabsContent
              key={statusKey}
              value={statusKey}
              className={`w-full grid gap-4 pb-2 md:grid ${colClass} grid-cols-1 md:gap-4`}
            >
              {sortedList.length === 0 ? (
                <p className="text-center text-gray-500 w-full py-10 col-span-full">
                  No videos found.
                </p>
              ) : (
                sortedList.map((video) => (
                  <FeaturedVideosCard key={video.id} video={video} />
                ))
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
