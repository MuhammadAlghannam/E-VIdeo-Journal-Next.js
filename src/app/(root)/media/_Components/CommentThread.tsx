"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import DeleteModal from "@/components/shared/DeleteModal";
import MainAvatar from "@/components/shared/MainAvatar";
import TruncateWords from "@/components/shared/TruncateWords";
import { resolveProfileImageSrc, timeAgo } from "@/lib/utils/helper";
import { ChevronDown, ChevronUp, ThumbsUp, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useCommentLike from "../_hooks/useCommentLike";
import useDeleteComment from "../_hooks/useDeleteComment";
import useRemoveLike from "../_hooks/useRemoveLike";
import CommentsInput from "./CommentsInput";

type CommentNode = CommentItem | (CommentReply & { replies?: CommentReply[] });

interface CommentThreadProps {
  node: CommentNode;
  depth: number; // 0 = comment, 1 = reply, 2 = nested reply
  isAdminStatus?: boolean;
}

export default function CommentThread({ node, depth, isAdminStatus }: CommentThreadProps) {
  const { data: session } = useSession();

  const { commentLike, isPending } = useCommentLike();
  const { commentLike: removeLike, isPending: isRemoving } = useRemoveLike();
  const { commentLike: deleteComment, isPending: isDeleting } = useDeleteComment();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const canReply = !isAdminStatus && depth < 2; // disable reply on admin cards and at the final level

  // Top-level CommentItem has required replies; CommentReply may have optional replies
  const childReplies: CommentReply[] = Array.isArray((node as CommentItem).replies)
    ? (node as CommentItem).replies
    : Array.isArray((node as CommentReply).replies)
      ? (node as CommentReply).replies!
      : [];

  const profileImg = resolveProfileImageSrc(node?.user?.profile_image || "");
  const isOwner = String(node.user_id) === String(session?.user?.id);

  const CountToggle = () => {
    if (childReplies.length === 0) return null;
    const countLabel = `${childReplies.length} ${childReplies.length === 1 ? "reply" : "replies"}`;
    return (
      <button
        type="button"
        className="flex items-center gap-2 text-primary text-h8-semibold cursor-pointer"
        onClick={() => setIsExpanded((v) => !v)}
      >
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {isExpanded ? `Hide ${countLabel}` : countLabel}
      </button>
    );
  };

  return (
    <div className={`flex flex-col gap-2 mt-4 ${depth === 0 ? "" : "pl-6 border-l border-border"}`}>
      <div className="flex items-start gap-3">
        <MainAvatar src={profileImg} className={depth === 0 ? "size-[32px]" : depth === 1 ? "size-[28px]" : "size-[24px]"} />
        <div className="flex-1">
          {depth === 0 && (
            <h3 className="text-h7-semibold text-black">
              {node.user.name} <span className="text-h8-regular text-text-gray-dark sm:inline block">{timeAgo(node.created_at)}</span>
            </h3>
          )}
          {depth === 1 && (
            <h4 className="text-h8-semibold text-black">
              {node.user.name}
              <span className="ml-2 text-h8-regular text-text-gray-dark">{timeAgo(node.created_at)}</span>
            </h4>
          )}
          {depth >= 2 && (
            <h5 className="text-h8-semibold text-black">
              {node.user.name}
              <span className="ml-2 text-h8-regular text-text-gray-dark">{timeAgo(node.created_at)}</span>
            </h5>
          )}

          <TruncateWords
            className="text-h8-regular text-text-gray-dark"
            maxWords={20}
            showReadMore={true}
            readMoreText="Read more"
            readLessText="Read less"
          >
            {node.content}
          </TruncateWords>

          <div className="flex items-center gap-4 mt-1.5">
            {canReply && (
              <CustomeBtn
                className="flex-center !p-0 !bg-transparent shadow-none"
                disabled={isPending || isRemoving}
                onClick={() => {
                  if (!session?.user?.id) return;
                  if (node.is_liked) {
                    removeLike({ commentId: node.id, userId: String(session.user.id) });
                  } else {
                    commentLike({ commentId: node.id, userId: String(session.user.id) });
                  }
                }}
              >
                <ThumbsUp className="w-5 h-5 text-black gap-2" fill={node.is_liked ? "#000000" : "none"} />
                <span className="text-h8-semibold text-text-gray-dark">{node.likes_count} Likes</span>
              </CustomeBtn>
            )}

            {canReply && (
              <CustomeBtn
                className="flex-center !p-0 !bg-transparent shadow-none text-h8-semibold !text-black"
                onClick={() => setIsReplying((v) => !v)}
              >
                Reply
              </CustomeBtn>
            )}
          </div>

          {isReplying && canReply && (
            <div className="mt-3">
              <CommentsInput
                parentId={node.id}
                mediaId={node.media_id}
                onReplySubmit={() => setIsReplying(false)}
              />
            </div>
          )}

          {/* Replies toggle */}
          {depth < 2 && childReplies.length > 0 && (
            <div className="mt-2">
              <CountToggle />
            </div>
          )}

          {/* Nested children */}
          {depth < 2 && isExpanded && childReplies.length > 0 && (
            <div className="mt-3">
              {childReplies.map((child) => (
                <CommentThread key={child.id} node={child} depth={depth + 1} isAdminStatus={isAdminStatus} />
              ))}
            </div>
          )}
        </div>

        {isOwner && !isAdminStatus && (
          <DeleteModal
            onConfirm={() => {
              if (!session?.user?.id) return;
              setDeletingId(node.id);
              deleteComment({ commentId: node.id, userId: String(session.user.id) });
            }}
            title="Delete Comment"
            description="Are you sure you want to delete this comment? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            className="cursor-pointer"
            isDisabled={isDeleting}
            isPending={isDeleting && deletingId === node.id}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </DeleteModal>
        )}
      </div>
    </div>
  );
}


