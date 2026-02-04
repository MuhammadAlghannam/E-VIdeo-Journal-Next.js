import CustomeBtn from "@/components/shared/CustomeBtn";
import Spinner from "@/components/shared/Spinner";
import { MoveRight } from "lucide-react";
import { Suspense } from "react";
import MyVideosList from "./_components/MyVideosList";

export default function Page() {
  return (
    <section className="flex flex-col gap-8">
      {/* Title & Btn */}
      <div className="flex-between sm:flex-row flex-col sm:items-center items-start gap-3">
        <h1 className="relative text-40-semibold ps-6">
          My Videos
          <span className="before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-10 before:rounded before:bg-primary"></span>
        </h1>

        <CustomeBtn href="/profile/my-videos/upload-video" className="py-6">
          Upload New Video
          <MoveRight className="w-5 h-5 text-white" />
        </CustomeBtn>
      </div>

      {/* My Videos */}
      <Suspense fallback={<Spinner />}>
        <MyVideosList columns={2} />
      </Suspense>
    </section>
  )
}
