import { Metadata } from "next";

import Spinner from "@/components/shared/Spinner";
import { Suspense } from "react";
import FeaturedVideosList from "../_components/home/FeaturedVideosList";

export const metadata: Metadata = {
  title: "Featured Videos",
  description: "Our Featured Videos",
};

export default function Page() {
  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      {/* Head */}
      <div className="mb-12">
        <h1 className="md:text-h1-semibold text-h2-semibold text-center">
          Our Featured Videos
        </h1>
        <p className="text-h5-regular text-center md:w-3/5 w-full mx-auto">
          Explore our curated collection of scientific videos organized by date.
        </p>
      </div>

      {/* All Featured Videos */}
      <Suspense fallback={<Spinner />}>
        <FeaturedVideosList limit={"all"} columns={2} />
      </Suspense>
    </section>
  )
}
