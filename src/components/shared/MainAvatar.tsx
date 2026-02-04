import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Spinner from "./Spinner";

interface Props {
  src?: string,
  className?: string
}

export default function MainAvatar({ src, className }: Props) {
  const hasUserImage = Boolean(src && src.trim() !== "");
  const resolvedSrc = hasUserImage ? src : "/images/global/avatar.svg";

  return (
    <Avatar className={`inline-flex select-none  items-center justify-center overflow-hidden rounded-full align-middle ${className}`}>
      <AvatarImage className="size-full rounded-[inherit] object-cover" src={resolvedSrc} alt="avatar" />
      {hasUserImage && (
        <AvatarFallback className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"><Spinner /></AvatarFallback>
      )}
    </Avatar>
  )
}