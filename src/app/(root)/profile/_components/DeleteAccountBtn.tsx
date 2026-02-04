"use client";

import DeleteModal from "@/components/shared/DeleteModal";
import useDeleteAccount from "@/hooks/use-delete-account";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface DeleteAccountBtnProps {
  className?: string;
  children?: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
}

export default function DeleteAccountBtn({ className, children, onConfirm, }: DeleteAccountBtnProps) {

  // Session
  const { data: session } = useSession();
  const { deleteAccount, isPending } = useDeleteAccount();

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    const deleteData = {
      "email": session?.user?.email,
      "user_id": session?.user.id
    }
    if (!deleteData.email || !deleteData.user_id) return;

    deleteAccount(deleteData);

  };

  return (
    <DeleteModal
      onConfirm={handleConfirm}
      title="Delete Account"
      description="Are you sure you want to delete your account? This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      className={cn(className)}
      isPending={isPending}
      isDisabled={isPending}
    >
      <button type="button" className={cn(className)}>
        {children}
      </button>
    </DeleteModal>
  );
}
