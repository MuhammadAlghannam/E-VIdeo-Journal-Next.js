import { useQuery } from "@tanstack/react-query";

export default function useVideoSearch(search: string) {
  const trimmed = (search ?? "").trim();

  const {
    isPending,
    error,
    data: payload,
  } = useQuery({
    queryKey: ["video-search", trimmed],
    enabled: trimmed.length > 0,
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await fetch(`/api/search?search=${encodeURIComponent(trimmed)}`);

      const payload: VideoSearchResponse = await res.json();

      const hasErrorKey = (value: unknown): value is { error: string; message?: string } => {
        return typeof value === "object" && value !== null && "error" in value;
      };

      if (!res.ok || hasErrorKey(payload as unknown)) {
        const maybe = payload as unknown as { message?: string };
        throw new Error(maybe.message || `Failed to search videos (${res.status})`);
      }

      return payload;
    },
  });

  return { payload, error, isPending };
}
