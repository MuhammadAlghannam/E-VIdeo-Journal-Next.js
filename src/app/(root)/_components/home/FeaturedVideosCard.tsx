import CustomeBtn from "@/components/shared/CustomeBtn";
import TruncateWords from "@/components/shared/TruncateWords";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { formatDuration, htmlToPlainText, resolveImageSrc } from "@/lib/utils/helper";
import { Edit, MessageSquareText, Play } from "lucide-react";
import Image from "next/image";
import BookMarkBtn from "./BookMarkBtn";
import LikeVideoBtn from "./LikeVideoBtn";
import VideoViewLink from "./VideoViewLink";

// Badge colors
const statusClassMap: Record<string, string> = {
  declined: "text-[#bb1313] bg-[#fff3f3] border-transparent",
  inreview: "text-[#f1862f] bg-[#ffe7ce] border-transparent",
  revise: "text-[#000000] bg-[#e0b610] border-transparent",
  pending: "text-[#e0b610] bg-[#fbfdd0] border-transparent",
};

export default async function FeaturedVideosCard({ video }: { video: VideoMedia }) {
  const imageSrc = resolveImageSrc(video.thumbnail_path);
  const descriptionText = htmlToPlainText(video.description);

  const rawStatus = (video.status ?? "").toString();
  const statusKey = rawStatus.toLowerCase();
  const isPublished = statusKey === "published";
  const isAdminStatus = ["pending", "declined", "revise", "inreview"].includes(statusKey);

  // Session                  
  const session = await auth();

  const prettifyStatus = (key?: string | null) => {
    const s = String(key ?? "").trim();
    if (!s) return "Uncategorized";
    const spaced = s
      .replace(/[_-]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .toLowerCase();
    return spaced.replace(/\b\w/g, (c) => c.toUpperCase());
  };


  return (
    <div className="w-full min-h-[22rem] rounded-4xl overflow-hidden bg-white border border-border flex flex-col justify-between">
      {/* Image section */}
      <div className="relative w-full h-64 flex items-center justify-center">
        <VideoViewLink href={`/media/${video.id}`} mediaId={Number(video.id)}>
          <Image
            src={imageSrc}
            alt={video.title}
            quality={75}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </VideoViewLink>
        <span className="absolute inset-0 bg-black opacity-30 rounded-lg pointer-events-none"></span>

        {/* Play button */}
        <VideoViewLink href={`/media/${video.id}`} mediaId={Number(video.id)}>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <span className="relative flex items-center justify-center w-24 h-24">
              <div className="absolute inset-0 rounded-full animate-pulse bg-white opacity-10 border border-white"></div>
              <span className="absolute inset-0 rounded-full bg-white opacity-50 border border-white"></span>
              <Play size={48} className="relative text-white" fill="white" />
            </span>
          </span>
        </VideoViewLink>

        {/* Duration */}
        <span className="absolute bottom-4 left-4 flex items-center">
          <span className="relative w-20 h-8 flex items-center justify-center">
            <span className="absolute inset-0 rounded-lg bg-black opacity-10"></span>
            <span className="relative text-white text-xs font-normal">
              {formatDuration(video.duration)}
            </span>
          </span>
        </span>
      </div>

      {/* Content */}
      <div className="bg-white w-full p-6 flex flex-col gap-2">
        <div className="border-b border-border pb-3">
          <div className="flex flex-row items-center justify-between">
            <TruncateWords className=" text-h4-semibold text-black text-left md:w-80" maxWords={4}>
              {video.title}
            </TruncateWords>

            {/* Published → bookmark | Others → Badge */}
            {isPublished ? (
              <BookMarkBtn
                mediaId={video.id}
                isFavorite={video.is_favorite}
                userId={session?.user?.id}
              />
            ) : (
              <Badge
                className={statusClassMap[statusKey] ?? "bg-gray-100 text-gray-600 border-transparent"}
              >
                {prettifyStatus(rawStatus)}
              </Badge>
            )}
          </div>

          <TruncateWords className="text-h7-regular text-text-gray-dark" maxWords={5}>
            {descriptionText}
          </TruncateWords>
        </div>

        {!isAdminStatus ? (
          <div className="flex flex-row items-center w-full h-5 mt-2 md:gap-6 gap-6">
            <LikeVideoBtn
              mediaId={video.id}
              likesCount={video.likes_count ?? 0}
              isLiked={video.is_liked}
              userId={session?.user?.id}
            />

            <div className="flex flex-row items-center gap-1 text-left">
              <MessageSquareText size={18} color="#7B7B7B" />
              <span className="w-full h-5 text-text-gray-dark text-h8-regular flex items-center text-left md:w-20">
                <span className="whitespace-nowrap">
                  {video.comments_count} Comments
                </span>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-1 text-left">
            {statusKey !== "declined" && (
              <CustomeBtn href={`/profile/my-videos/edit-video/${video.id}`} className="!p-0 !bg-transparent shadow-none">
                <Edit className="w-5 h-5 text-text-gray-dark" />
              </CustomeBtn>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
