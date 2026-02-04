"use client";

import Spinner from "@/components/shared/Spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import useCategories from "../_hooks/useCategories";

export default function FilterMonth() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { payload, isPending } = useCategories();

  const activeFilter = searchParams.get("sub_category_id");
  const categoryId = searchParams.get("category_id");

  const subcategories = useMemo(() => {
    const categories = payload?.data?.categories || [];
    const selected = categories.find((c) => String(c.id) === String(categoryId));
    return selected?.subcategories || [];
  }, [payload, categoryId]);

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sub_category_id", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // Auto-select the first subcategory on initial visit and when category changes
  useEffect(() => {
    if (isPending) return;
    const categories = payload?.data?.categories || [];
    const selected = categories.find((c) => String(c.id) === String(categoryId));
    const firstSubId = selected?.subcategories?.[0]?.id;

    if (!firstSubId) return;

    // If no sub_category_id selected, set the first one
    if (!activeFilter) {
      const params = new URLSearchParams(searchParams);
      params.set("sub_category_id", String(firstSubId));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      return;
    }

    // If current selected subcategory doesn't belong to the current category, reset to first
    const belongsToCurrentCategory = selected?.subcategories?.some(
      (s) => String(s.id) === String(activeFilter)
    );
    if (!belongsToCurrentCategory) {
      const params = new URLSearchParams(searchParams);
      params.set("sub_category_id", String(firstSubId));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [isPending, payload, categoryId, activeFilter, pathname, router, searchParams]);

  return isPending ? <Spinner /> : (
    <div className="flex items-center gap-4">
      {subcategories.map((subcategory) => (
        <Button
          key={subcategory.id}
          filter={String(subcategory.id)}
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          {subcategory.name}
        </Button>
      ))}
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }: { filter: string; handleFilter: (filter: string) => void; activeFilter: string | null; children: React.ReactNode; }) {
  return (
    <button
      className={`py-2.5 border-b border-transparent hover:border-b hover:border-primary cursor-pointer transition-colors text-text-gray-dark  hover:text-primary ${filter === activeFilter ? "!border-b !border-primary !text-primary" : ""
        }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}