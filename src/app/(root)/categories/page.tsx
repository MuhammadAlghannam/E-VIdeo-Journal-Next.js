import Spinner from "@/components/shared/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";
import FilterdVideosList from "./_components/FilterdVideosList";
import FilterMonth from "./_components/FilterMonth";
import FilterYear from "./_components/FilterYear";

export const metadata: Metadata = {
  title: "categories",
  description: "View videos from our categories",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const resolvedSearchParams = await searchParams;
  const categoryIdParam = resolvedSearchParams?.category_id;
  const subCategoryIdParam = resolvedSearchParams?.sub_category_id;
  const categoryId = Array.isArray(categoryIdParam) ? categoryIdParam[0] : categoryIdParam ?? "";
  const subCategoryId = Array.isArray(subCategoryIdParam) ? subCategoryIdParam[0] : subCategoryIdParam ?? "";

  return (
    <section className="bg-[#F7F7F7]">
      <div className="container-1440">

        {/* Text */}
        <div className="py-12 text-center">
          <h2 className="md:text-h1-semibold sm:text-h2-semibold text-h3-semibold text-black">Content Archive</h2>
          <p className=" md:text-h5-regular sm:text-h6-regular text-h7-regular text-black">Explore our curated collection of scientific videos organized by date.</p>
        </div>

        {/* Taps Filter Years & Month */}
        <div className="border border-border p-6 rounded-lg">
          <h3 className="text-h5-semibold text-black mb-2">Select Year</h3>
          <FilterYear />

          <h3 className="text-h5-semibold text-black mb-2 mt-4">Select Month</h3>
          <FilterMonth />
        </div>

        {/* Taps Filtered Videos */}
        <div className="py-18">
          {/* <h2 className="text-h2-semibold text-black mb-4">January 2025`s Videos</h2> */}

          <Suspense fallback={<Spinner />} key={`${categoryId}-${subCategoryId}`}>
            <FilterdVideosList subCategoryId={subCategoryId} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
