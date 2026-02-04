import Spinner from "@/components/shared/Spinner";
import { Suspense } from "react";
import RecentlyAddedList from "./RecentlyAddedList";

export function RecentlyAdded() {

  return (
    <section className="bg-[#F1F9FA]">
      <div className="container-1440 py-20">
        <h1 className="text-h2-semibold text-center md:text-start pb-4">
          Recently Added
        </h1>

        {/* Data Suspense */}
        <Suspense fallback={<Spinner />}>
          <RecentlyAddedList />
        </Suspense>
      </div>
    </section >
  );
};
