import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Expand, File, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type DocumentProps = {
  pdfUrl?: string | null;
  imageUrl?: string | null;
};

export default function Document({ pdfUrl, imageUrl }: DocumentProps) {
  if (!pdfUrl && !imageUrl) return null;

  return (
    <div className="flex flex-wrap gap-3 flex-col py-4 md:flex-row">
      {pdfUrl && (
        <Link href={pdfUrl} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-2xl border-1 border-border px-6 py-4 ">
          <div className="flex items-center">
            <div className="p-4 bg-[#F1F9FA] rounded-lg">
              <File className="text-black " />
            </div>

            <div className="flex flex-1 items-center justify-between ps-3">
              <div>
                <h2 className="text-h8-semibold">Document</h2>
                <p className="text-h8-regular text-text-gray-dark">PDF</p>
              </div>

              <div>
                <SquareArrowOutUpRight className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>
        </Link>
      )}

      {imageUrl && (
        <Dialog>
          <DialogTrigger asChild className="flex-1 rounded-2xl border-1 border-border px-6 py-4 cursor-pointer">
            <div className="flex items-center">
              <div className="p-4 bg-[#F1F9FA] rounded-lg">
                <File className="text-black " />
              </div>

              <div className="flex flex-1 items-center justify-between ps-3">
                <div>
                  <h2 className="text-h8-semibold">Image</h2>
                  <p className="text-h8-regular text-text-gray-dark">Image</p>
                </div>

                <div>
                  <Expand className="w-5 h-5 text-black" />
                </div>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Image Preview</DialogTitle>
              <DialogDescription>Attached image</DialogDescription>
            </DialogHeader>

            <Image
              src={imageUrl}
              alt="Attached image"
              width="500"
              height="500"
              quality={75}
              className="w-full h-auto p-2"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
