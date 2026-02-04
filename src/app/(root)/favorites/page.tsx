import Spinner from "@/components/shared/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";
import BookMarkList from "./_components/BookMarkList";

export const metadata: Metadata = {
  title: "Favorite Videos",
  description: "Our Favorite Videos",
};

export default function Page() {
  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      {/* Head */}
      <div className="mb-12">
        <h1 className="md:text-h1-semibold text-h2-semibold text-center">
          Your Favorite Videos
        </h1>
        <p className="text-h5-regular text-center md:w-3/5 w-full mx-auto">
          Explore your favorite videos.
        </p>
      </div>

      <Suspense fallback={<Spinner />}>
        <BookMarkList />
      </Suspense>
    </section>
  )
}
