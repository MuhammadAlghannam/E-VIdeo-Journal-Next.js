"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import useAddVideoLike from "@/hooks/use-video-like";
import useRemoveVideolike from "@/hooks/use-video-unlike";
import { cn } from "@/lib/utils";
import { ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function AddVideoLike({ mediaId, likesCount, isLiked }: { mediaId: string | number, likesCount: number, isLiked?: boolean }) {
  // Session
  const { data: session } = useSession();
  const userId = session?.user?.id as string | number | undefined;

  // Mutation
  const { addVideoLike, isPending } = useAddVideoLike();
  const { removeVideoLike, removePending } = useRemoveVideolike();

  // Functionss
  const handleLike = () => {
    if (userId) {
      if (isLiked) {
        removeVideoLike({ mediaId, userId })


      } else {
        addVideoLike({ mediaId, userId });
      }
    } else {
      toast.error("You should login first")
    }

  }

  return (
    <>
      <CustomeBtn
        className={cn(
          "hover:bg-primary",
          isLiked ? "bg-primary" : "bg-[#0000004D]"
        )}
        disabled={isPending || removePending}
        onClick={handleLike}
      >
        <ThumbsUp className="w-5 h-5 text-white" />
        {likesCount}
      </CustomeBtn>
    </>
  )
}
