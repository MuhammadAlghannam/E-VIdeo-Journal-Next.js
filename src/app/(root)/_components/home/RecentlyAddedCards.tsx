"use client"

import TruncateWords from "@/components/shared/TruncateWords";
import { Badge } from "@/components/ui/badge";
import useAddVideoView from "@/hooks/use-video-view";
import { formatDate, htmlToPlainText, prettifyLabel, resolveImageSrc } from "@/lib/utils/helper";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type RecentlyAddedCardProps = {
  media: VideoMedia;
};

export const RecentlyAddedCards = ({ media }: RecentlyAddedCardProps) => {
  const imageSrc = resolveImageSrc(media.thumbnail_path);
  const descriptionText = htmlToPlainText(media.description);

  // Mutation
  const { addVideoView } = useAddVideoView();

  return (
    <Link onClick={() => addVideoView({ mediaId: Number(media.id) })} href={`/media/${media.id}`} key={media.id} className="bg-white p-6 rounded-3xl flex flex-col md:flex-row gap-6">

      {/* card image */}
      <Image
        src={imageSrc}
        alt={media.title}
        width={165}
        height={165}
        quality={75}
        className="rounded-xl md:w-[165px] w-full md:h-[165px] h-full object-cover"
      />

      <div className="w-full md:w-4/5">

        {/* card content */}
        <div>
          <Badge>
            <h4 className="text-primary text-h7-regular py-1">
              {prettifyLabel(media.status)}
            </h4>
          </Badge>

          <h3 className="text-h5-semibold py-2">
            {media.title}
          </h3>

          <div>
            <TruncateWords className="text-h7-regular text-text-gray-dark" maxWords={12}>
              {descriptionText}
            </TruncateWords>
          </div>
        </div>

        {/* Views & date */}
        <div className="flex gap-8 py-2">

          <p className="text-h7-semibold text-text-gray-dark">
            {formatDate(media.created_at)}
          </p>

          <div className="flex gap-2 text-text-gray-dark text-h7-semibold">
            <Eye /> <p>{media.views} Views</p>
          </div>
        </div>

      </div>
    </Link>
  );
};
