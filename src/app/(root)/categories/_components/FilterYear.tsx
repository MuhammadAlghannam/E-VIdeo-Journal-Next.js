"use client";

import Spinner from "@/components/shared/Spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useCategories from "../_hooks/useCategories";

export default function FilterYear() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { payload, isPending } = useCategories();

  const activeFilter = searchParams.get("category_id");

  // Set default to the first category when none is selected
  useEffect(() => {
    if (isPending) return;
    const firstCategoryId = payload?.data?.categories?.[0]?.id;
    if (!activeFilter && firstCategoryId) {
      const params = new URLSearchParams(searchParams);
      params.set("category_id", String(firstCategoryId));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [isPending, payload, activeFilter, pathname, router, searchParams]);

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category_id", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return isPending ? <Spinner /> : (
    <div className="flex items-center gap-4">
      {payload?.data?.categories?.map((category) => (
        <Button
          key={category.id}
          filter={String(category.id)}
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }: { filter: string; handleFilter: (filter: string) => void; activeFilter: string | null; children: React.ReactNode; }) {
  return (
    <button
      className={`px-6 py-2.5 bg-border cursor-pointer transition-colors rounded-[50px] text-text-gray-dark hover:bg-primary hover:text-white ${filter === activeFilter ? "bg-primary text-white" : ""
        }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}