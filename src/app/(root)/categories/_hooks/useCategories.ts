import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
  const { isPending, error, data: payload } = useQuery({
    queryKey: ["all-categories"],
    queryFn: async () => {
      const response = await fetch(`/api/categories`);

      const payload: CategoriesResponse = await response.json();

      if ("error" in payload) {
        throw new Error(payload?.message || "Failed to load categories");
      }

      return payload;
    },
  });

  return { payload, error, isPending };
}


