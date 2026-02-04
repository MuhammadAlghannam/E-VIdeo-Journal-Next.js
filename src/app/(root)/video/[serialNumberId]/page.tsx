import ParserHTMLRenderer from "@/components/shared/ParserHTMLRenderer";
import SecureVideoPlayer from "@/components/shared/SecureVideoPlayer";
import TruncateWords from "@/components/shared/TruncateWords";
import { SerialNumber } from "@/lib/apis/video/serial-number-id.api";
import { auth } from "@/lib/auth";
import { formatDate, resolveProfileImageSrc } from "@/lib/utils/helper";
import { Eye } from "lucide-react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import Document from "../../media/_Components/Document";

export default async function Page({ params }: { params: Promise<{ serialNumberId: string }> }) {
  // data
  const session = await auth().catch(() => null);
  const { serialNumberId } = await params
  const { data: videoData }: { data: SingleVideoMedia } = await SerialNumber(serialNumberId);

  // Variables
  const profileImg = resolveProfileImageSrc(videoData?.user?.profile_image ?? null);
  const authorName = String(videoData?.user?.name || "User");
  // const mentions = normalizeMentions(videoData?.mention);

  // validation
  if (!videoData) return notFound();

  // If user is logged in, safely redirect using the media id from the response
  if (session) {
    redirect(`/media/${videoData.id}`);
  }

  return (
    <section className="container-1440 mt-4 mb-8">
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


      {/* Ttile */}
      <h1 className="sm:text-h6-semibold text-h7-semibold md:text-h4-semibold pt-2">
        {videoData.title}
      </h1>

      {/* Date */}
      <h3 className="text-h7-regular text-text-gray-dark">
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
        <div className="mt-4 flex items-center flex-wrap gap-3">
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
    </section>
  )
}
