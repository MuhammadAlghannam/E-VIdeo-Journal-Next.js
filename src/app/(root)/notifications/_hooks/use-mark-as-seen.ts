import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MarkAsSeenAction } from "../_actions/mark-as-read";

export default function useMarkAsSeen() {
  const router = useRouter();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await MarkAsSeenAction(id);
    },

    onSuccess() {
      router.refresh();
    },
    onError(error) {
      toast.error(error.message || "Something Went Wrong");
    },
  });

  return { markSeen: mutateAsync, isPending, error };
}
