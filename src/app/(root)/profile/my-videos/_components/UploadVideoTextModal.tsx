"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import UploadVideoTextForm from "./UploadVideoTextForm";


export default function UploadVideoTextModal({
  children,
  formData
}: Readonly<{
  children: React.ReactNode;
  formData?: VideoTextForm | null;
}>) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>

        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-left">Upload Video Text Form</DialogTitle>
          <DialogDescription className="text-left">You need to submit this form first to can containu uploading the video</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[80dvh] p-3">
          <UploadVideoTextForm setOpen={setOpen} formData={formData} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
