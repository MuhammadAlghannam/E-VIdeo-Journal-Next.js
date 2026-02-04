"use client"
import CustomeBtn from "@/components/shared/CustomeBtn";
import { MoveRight } from "lucide-react";
import { useRef } from "react";

type ImageAndFileUploadProps = {
  type: "image" | "file";
  value?: File | string | "";
  onChange: (file: File | string) => void;
  onBlur?: () => void;
  placeholder?: string;
  buttonLabel?: string;
};

export default function ImageAndFileUpload({
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  buttonLabel,
}: ImageAndFileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isImage = type === "image";
  const accept = isImage ? "image/jpeg,image/png,image/jpg" : "application/pdf";

  const resolvedPlaceholder = placeholder ?? (isImage ? "Select thumbnail image (JPG, PNG)" : "Select PDF file");
  const resolvedButtonLabel = buttonLabel ?? (isImage ? "Choose Image" : "Choose PDF");

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      onChange(file);
      if (onBlur) onBlur();
    }
  };

  return (
    <div className="flex sm:flex-row flex-col sm:items-center items-start gap-4 w-full">
      <div className="flex-1 w-full">
        <div className="w-full py-3 border rounded-lg px-6 text-h8-regular flex items-center text-text-gray-dark bg-white">
          <span className="truncate">
            {value instanceof File
              ? value.name
              : (typeof value === 'string' && value !== '')
                ? value.split('/').pop() || 'Current file'
                : resolvedPlaceholder
            }
          </span>
        </div>
        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
      </div>
      <CustomeBtn type="button" onClick={handleClick} className="bg-primary py-6 text-h8-regular text-white text-center">
        {resolvedButtonLabel}
        <MoveRight className="w-5 h-5 text-white" />
      </CustomeBtn>
    </div>
  );
}
