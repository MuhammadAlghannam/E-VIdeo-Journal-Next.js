"use client"
import CustomeBtn from "@/components/shared/CustomeBtn";
import MainAvatar from "@/components/shared/MainAvatar";
import Spinner from "@/components/shared/Spinner";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CommentFields, CommentSchema } from "@/lib/schema/comment.shema";
import { resolveProfileImageSrc } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useAddAdminCommnet from "../_hooks/useAddAdminCommnet";
import useComment from "../_hooks/useComment";
import useReply from "../_hooks/useReply";

interface CommentsInputProps {
  onReplySubmit?: () => void;
  mediaId?: string | number;
  parentId?: string | number;
  initialUser?: ApiUser
  isAdminStatus?: boolean;
}

export default function CommentsInput({ onReplySubmit, mediaId, parentId, initialUser, isAdminStatus }: CommentsInputProps) {
  const { data: session } = useSession();

  const profileImg = resolveProfileImageSrc(initialUser?.profile_image ?? null);

  // Mutation
  const { mutate: adminComment, isPending: pendingAdminComment } = useAddAdminCommnet();
  const { mutate: comment, isPending: pendingComment } = useComment();
  const { mutate: replay, isPending: pendingReply } = useReply();

  const form = useForm<CommentFields>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<CommentFields> = async (values) => {
    if (!session?.user) {
      return;
    }

    if (!mediaId) {
      toast.error("Missing media id");
      return;
    }

    // Build payload
    const payload = {
      user_id: session?.user?.id,
      media_id: String(mediaId),
      parent_id: parentId ? String(parentId) : "",
      content: values.content,
    };

    // Admin comment flow for specific statuses (no replies, ignore parentId)
    if (isAdminStatus) {
      adminComment(payload, {
        onSuccess: (res) => {
          if (!res?.error) {
            form.reset();
          } else {
            toast.error("failed-add-occasion");
          }
        },
        onError: (err) => {
          const message = err instanceof Error ? err.message : (err as { message?: string })?.message || "failed-add-occasion";
          toast.error(message);
        },
      });
      return;
    }

    // Regular comment vs reply based on parentId
    if (parentId) {
      replay(payload, {
        onSuccess: (res) => {
          if (!res?.error) {
            form.reset();
            onReplySubmit?.();
          } else {
            toast.error("failed-add-occasion");
          }
        },
        onError: (err) => {
          const message = err instanceof Error ? err.message : (err as { message?: string })?.message || "failed-add-occasion";
          toast.error(message);
        },
      });
    } else {
      comment(payload, {
        onSuccess: (res) => {
          if (!res?.error) {
            form.reset();
          } else {
            toast.error("failed-add-occasion");
          }
        },
        onError: (err) => {
          const message = err instanceof Error ? err.message : (err as { message?: string })?.message || "failed-add-occasion";
          toast.error(message);
        },
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow Enter for new lines, but prevent form submission
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Add new line to the textarea
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const newValue = value.substring(0, start) + "\n" + value.substring(end);

      // Update the form value
      form.setValue("content", newValue);

      // Set cursor position after the new line
      setTimeout(() => {
        // Adjust height to expand with the new content
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  if (!session?.user) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-600 text-sm">
          Please sign in to leave a comment.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start space-x-3">
        <MainAvatar src={profileImg} className="size-[32px]" />

        <div className="flex-1">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={isAdminStatus ? "Add a comment to the admin" : (parentId ? "Add a reply..." : "Add a comment...")}
                    className="min-h-[40px] max-h-[120px] resize-none border-0 border-b border-border rounded-none focus:border-0 focus:outline-0 focus:ring-0 shadow-none"
                    rows={1}
                    onKeyDown={handleKeyDown}
                    {...field}
                    style={{
                      height: "auto",
                      minHeight: "40px",
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = Math.min(target.scrollHeight, 120) + "px";
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <CustomeBtn
          type="submit"
          disabled={((isAdminStatus ? pendingAdminComment : (parentId ? pendingReply : pendingComment)) || !form.watch("content")?.trim())}
          className="p-2 rounded-full text-white"
        >
          {(isAdminStatus ? pendingAdminComment : (parentId ? pendingReply : pendingComment)) ? <Spinner /> : <Send className="w-4 h-4 text-white" />}
        </CustomeBtn>
      </form>
    </Form>
  );
}
