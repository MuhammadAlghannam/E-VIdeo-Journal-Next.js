import Spinner from "@/components/shared/Spinner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import FeaturedVideosList from "./FeaturedVideosList";

export default async function FeaturedVideos() {
  return (
    <main className="container-1440 py-20">
      {/* Title */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="md:text-h2-semibold text-h5-semibold text-black">Featured Videos</h2>
        <Link href="/featured-videos" className="inline-flex items-center justify-center text-primary gap-2">
          <span className="inline-block text-primary underline decoration-primary decoration-1">
            View All
          </span>
          <ArrowRight width={32} height={20} className="inline-block align-middle text-primary" />
        </Link>
      </div>

      {/* List wrapper */}
      <div className="w-full">
        <Suspense fallback={<Spinner />}>
          <FeaturedVideosList />
        </Suspense>
      </div>
    </main>
  );
}
