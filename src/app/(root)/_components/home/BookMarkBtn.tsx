"use client";
import CustomeBtn from "@/components/shared/CustomeBtn";
import useVideoBookmark from "@/hooks/use-video-bookmark";
import useRemoveVideoBookmark from "@/hooks/use-video-remove-bookmark";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

export default function BookMarkBtn({ mediaId, isFavorite, userId }: { mediaId: string | number, isFavorite?: boolean, userId?: number }) {

  // Mutation
  const { addVideoBookmark, isPending } = useVideoBookmark();
  const { removeVideoBookmark, removePending } = useRemoveVideoBookmark();

  // Functions
  const handleBookmark = () => {
    if (userId) {
      if (isFavorite) {
        removeVideoBookmark({ mediaId, userId })

      } else {
        addVideoBookmark({ mediaId, userId });
      }
    } else {
      toast.error("You should login first")
    }

  }

  return (
    <>
      <CustomeBtn
        className="flex-center !p-0 !bg-transparent shadow-none"
        disabled={isPending || removePending}
        onClick={handleBookmark}
      >
        <Bookmark
          className="text-primary size-9 cursor-pointer"
          strokeWidth={1.5}
          fill={isFavorite ? "#35758c" : "none"}
        />
      </CustomeBtn>
    </>
  )
}
