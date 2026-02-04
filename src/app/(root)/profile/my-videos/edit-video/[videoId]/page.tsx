import getUserInfo from "@/lib/apis/profile/user-info.api";
import { singleVideo } from "@/lib/apis/video/single-video.api";
import { notFound } from "next/navigation";
import UploadVideoForm from "../../_components/UploadVideoForm";

export default async function Page({ params }: { params: Promise<{ videoId: string }> }) {
  // data
  const { videoId } = await params
  const { data: videoData }: { data: SingleVideoMedia } = await singleVideo(videoId);
  const initialUser = await getUserInfo();

  const videoSrc = `${process.env.BASE_URL}/content/videosi-hide-the-real-end-point/${videoData.id}/stream`;

  const isOwner = Number(initialUser?.id) === Number(videoData.user_id);

  // validation
  if (!videoData) return notFound();
  if (!isOwner) {
    return notFound();
  }

  return (
    <section className="flex flex-col gap-8">
      {/* Title & Btn */}
      <h1 className="relative text-h4-semibold md:text-40-semibold ps-6">
        Edit Video
        <span className="before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-10 before:rounded before:bg-primary"></span>
      </h1>

      {/* Form */}
      <UploadVideoForm initialData={videoData} videoSrc={videoSrc} />
    </section>
  )
}
