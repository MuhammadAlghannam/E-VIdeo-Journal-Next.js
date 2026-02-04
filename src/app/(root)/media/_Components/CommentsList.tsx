"use client";

import Spinner from "@/components/shared/Spinner";
import { useSession } from "next-auth/react";
import useGetAdminCommnet from "../_hooks/useGetAdminCommnet";
import useGetComments from "../_hooks/useGetComments";
import CommentThread from "./CommentThread";

interface CommnetsProps {
  mediaId: string;
  isAdminStatus: boolean;
}

export default function CommentsList({ mediaId, isAdminStatus }: CommnetsProps) {
  // data
  const { data: session } = useSession();

  const { payload, isPending } = useGetComments(mediaId, session?.user?.id);
  const { payload: adminPayload } = useGetAdminCommnet(mediaId);

  const mainPayload = isAdminStatus ? adminPayload?.data.AdminComments : payload?.data;

  // Sort newest to oldest by created_at
  const sortedComments = [...(mainPayload ?? [])].sort((a, b) => {
    const aTime = new Date(a.created_at).getTime();
    const bTime = new Date(b.created_at).getTime();
    return bTime - aTime;
  });

  // Don't show anything if no session
  if (!session) return null;

  return isPending ? <Spinner /> : (
    <>
      {sortedComments.length === 0 && (
        <div className="text-sm text-muted-foreground mt-4">No comments yet.</div>
      )}
      {sortedComments.length > 0 && sortedComments.map(comment => (
        <CommentThread key={comment.id} node={comment} depth={0} isAdminStatus={isAdminStatus} />
      ))}
    </>
  )
}
