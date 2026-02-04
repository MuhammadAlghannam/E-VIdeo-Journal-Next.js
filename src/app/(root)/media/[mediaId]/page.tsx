import ParserHTMLRenderer from "@/components/shared/ParserHTMLRenderer";
import SecureVideoPlayer from "@/components/shared/SecureVideoPlayer";
import TruncateWords from "@/components/shared/TruncateWords";
import { Badge } from "@/components/ui/badge";
import getUserInfo from "@/lib/apis/profile/user-info.api";
import { singleVideo } from "@/lib/apis/video/single-video.api";
import { getUserVideoForm } from "@/lib/apis/video/user-video-form.api";
import { formatDate, generateSerialNumber, prettifyLabel, resolveProfileImageSrc } from "@/lib/utils/helper";
import { Eye } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddVideoLike from "../_Components/AddVideoLike";
import CommentsInput from "../_Components/CommentsInput";
import CommentsList from "../_Components/CommentsList";
import Document from "../_Components/Document";
import DropLinks from "../_Components/DropLinks";

const statusClassMap: Record<string, string> = {
  declined: "text-[#bb1313] bg-[#fff3f3] border-transparent",
  inreview: "text-[#f1862f] bg-[#ffe7ce] border-transparent",
  revise: "text-[#000000] bg-[#e0b610] border-transparent",
  pending: "text-[#e0b610] bg-[#fbfdd0] border-transparent",
};

export default async function Page({ params }: { params: Promise<{ mediaId: string }> }) {
  // data
  const { mediaId } = await params
  const { data: videoData }: { data: SingleVideoMedia } = await singleVideo(mediaId);
  const initialUser = await getUserInfo();

  // ⬅️ call the API with form_id and log the response
  const formId = videoData?.form_id;

  // define it in the outer scope so it's accessible below
  let userVideoForm: VideoTextForm | null = null;

  // Fetch
  if (formId) {
    userVideoForm = await getUserVideoForm(formId);
  }

  // Variables
  const profileImg = resolveProfileImageSrc(videoData.user.profile_image ?? null);
  const authorName = String(videoData?.user?.name || "User");
  // const mentions = normalizeMentions(videoData.mention);
  const isAdminStatus = ["pending", "declined", "revise", "inreview"].includes(videoData.status?.toLowerCase?.() || "");
  const isOwner = Number(initialUser?.id) === Number(videoData.user_id);

  // Status badge colors
  const statusKey = videoData.status?.toLowerCase?.() || "";
  const badgeClasses = statusClassMap[statusKey] || "";
  const isDeclined = statusKey === "declined";

  // validation
  if (!videoData) return notFound();
  if (isAdminStatus && !isOwner) {
    return notFound();
  }

  // serial number
  const serialNumber = generateSerialNumber(mediaId, videoData.created_at);

  return (
    <section className="container-1440 mt-4">
      {/* Video */}
      <SecureVideoPlayer
        className="w-full aspect-video"
        preload="none"
        poster={videoData?.thumbnail_path}
        src={`${process.env.BASE_URL}/i-hide-the-real-end-point/${videoData.id}/stream`}
      />

      {/* Author & views */}
      <div className="flex justify-between items-center pt-6">

        {/* Author  */}
        <div className="flex items-center gap-3">
          <Image
            src={profileImg}
            alt={authorName}
            width={36}
            height={36}
            quality={75}
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="sm:text-h7-regular text-h8-regular text-black">
            {videoData.user.name}
          </span>

        </div>

        {/* Views */}
        <div className="flex gap-2 text-text-gray-dark sm:text-h7-semibold text-h8-semibold">
          <Eye /> <p>{videoData.views} Views</p>
        </div>

      </div>

      <div className="flex sm:flex-row flex-col sm:gap-0 gap-3 justify-between pt-2">

        {/* Ttile */}
        <h1 className="sm:text-h6-semibold text-h7-semibold md:text-h4-semibold">
          <span className="mr-3">{videoData.title}</span>

          {isAdminStatus && (
            <Badge className={badgeClasses}>
              {prettifyLabel(videoData.status)}
            </Badge>
          )}
        </h1>

        <div className="flex items-center gap-4">
          {/* Like btn */}
          {!isAdminStatus && (
            <AddVideoLike mediaId={videoData.id} likesCount={videoData.likes_count ?? 0} isLiked={videoData.is_liked} />
          )}

          {/* DropLinks */}
          <DropLinks
            formData={userVideoForm}
            mediaId={videoData.id}
            isFavorite={videoData.is_favorite}
            serialNumber={serialNumber}
            isAdminStatus={isAdminStatus}
          />
        </div>

      </div>

      {/* Date */}
      <h3 className="text-h7-regular text-text-gray-dark sm:mt-0 mt-3 mb-3">
        {formatDate(videoData.created_at)}
      </h3>

      {/* Description */}
      {videoData.description &&
        <div className="p-4">
          <TruncateWords
            className="text-h8-regular text-text-gray-dark"
            maxWords={20}
            showReadMore={true}
            readMoreText="Read more"
            readLessText="Read less"
          >
            <ParserHTMLRenderer className="text-h8-semibold text-text-gray" htmlContent={videoData.description} />
          </TruncateWords>
        </div>
      }

      {/* mention */}
      {/* {mentions.length > 0 &&
        <div className="mt-4 mb-4 flex items-center flex-wrap gap-3">
          <h2 className="text-h5-semibold text-black">Mention: </h2>
          {mentions.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="text-h6-regular text-text-gray-dark border border-border rounded-[50px] px-6 py-3"
            >
              {name}
            </span>
          ))}
        </div>
      } */}

      {/* Documents */}
      <Document pdfUrl={videoData.pdf} imageUrl={videoData.image_path} />

      {/* Comments */}

      <div className="mb-20">
        {/* comments count */}
        {!isAdminStatus && (
          <h4 className="text-h7-regular text-primary underline text-right mb-2 mt-4">{videoData.comments_count} Comments</h4>)}

        {/* Comments list */}
        <div className="p-6 border border-border bg-[#FCFCFC] rounded-3xl">
          {/* Comments Input */}
          {!isDeclined && (
            <CommentsInput mediaId={mediaId} initialUser={initialUser} isAdminStatus={isAdminStatus} />
          )}
          {/* Comment List */}
          <CommentsList mediaId={mediaId} isAdminStatus={isAdminStatus} />
        </div>
      </div>

    </section>
  )
}
