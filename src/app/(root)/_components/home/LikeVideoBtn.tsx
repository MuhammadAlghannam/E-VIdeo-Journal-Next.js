"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import useAddVideoLike from "@/hooks/use-video-like";
import useRemoveVideolike from "@/hooks/use-video-unlike";
import { Heart } from "lucide-react";
import { toast } from "sonner";

type Props = {
  mediaId: string | number;
  likesCount: number;
  isLiked?: boolean;
  userId?: number;
};

export default function LikeVideoBtn({ mediaId, likesCount, isLiked, userId }: Props) {

  // Mutation
  const { addVideoLike, isPending } = useAddVideoLike();
  const { removeVideoLike, removePending } = useRemoveVideolike();

  // Functions
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
    <div className="flex flex-row items-center gap-1 text-left">
      <CustomeBtn
        className="flex-center !p-0 !bg-transparent shadow-none"
        disabled={isPending || removePending}
        onClick={handleLike}
      >
        <Heart
          className="w-5 h-5 text-text-gray-dark gap-2"
          fill={isLiked ? "#000000" : "none"}
        />
        <span className="text-h8-regular text-text-gray-dark">{likesCount} Likes</span>
      </CustomeBtn>
    </div>
  )
}