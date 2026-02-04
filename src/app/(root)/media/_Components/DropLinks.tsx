"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useVideoBookmark from "@/hooks/use-video-bookmark";
import useRemoveVideoBookmark from "@/hooks/use-video-remove-bookmark";
import { Bookmark, Ellipsis, FormInputIcon, Share } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import UploadVideoTextModal from "../../profile/my-videos/_components/UploadVideoTextModal";

interface DropLinksProps {
  mediaId: string | number;
  isFavorite?: boolean;
  serialNumber: string | number;
  formData?: VideoTextForm | null; // ⬅️ new prop
  isAdminStatus: boolean;
}

export default function DropLinks({ mediaId, isFavorite, serialNumber, formData, isAdminStatus }: DropLinksProps) {
  // Session
  const { data: session } = useSession();
  const userId = session?.user?.id as string | number | undefined;

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

  const handleShare = async () => {
    try {
      const webUrl = process.env.NEXT_PUBLIC_WEB_URL || window.location.origin;
      const shareUrl = `${webUrl}/video/${serialNumber}`;

      await navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied to your clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2.5 cursor-pointer rounded-full bg-[#0000004D] hover:bg-[#0000004D] ">
        <Ellipsis className="w-5 h-5 text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1.5 rounded-lg translate-x-[-40px] translate-y-[10px]">
        {/* share */}

        {!isAdminStatus && (
          <DropdownMenuItem className="flex items-center gap-3 hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer" onClick={handleShare}>
            <Share className="w-5 h-5 text-primary" />
            <span className="text-h8-regular">Share</span>
          </DropdownMenuItem>
        )}

        {/* Book */}
        {!isAdminStatus && (
          <DropdownMenuItem className="flex items-center gap-3 hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer" disabled={isPending || removePending} onClick={handleBookmark}>
            <Bookmark className="w-5 h-5 text-primary" fill={isFavorite ? "#35758c" : "none"} />
            <span className="text-h8-regular">Book</span>
          </DropdownMenuItem>
        )}

        {/* Form Data */}
        {isAdminStatus && (
          <DropdownMenuItem asChild>
            <UploadVideoTextModal formData={formData}>
              <div className="flex items-center gap-3 hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer">
                <FormInputIcon className="w-5 h-5 text-primary" strokeWidth={1.3} />
                <span className="text-h8-regular">User Form Data</span>
              </div>
            </UploadVideoTextModal>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
