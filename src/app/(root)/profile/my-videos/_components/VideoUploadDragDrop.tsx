"use client"
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type VideoUploadDragDropProps = {
  value?: File | string | "";
  onChange: (file: File | string) => void;
  onBlur?: () => void;
  onFileSelected?: (file: File) => void;
};

export default function VideoUploadDragDrop({ value, onChange, onBlur, onFileSelected }: VideoUploadDragDropProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onChange(file);
        if (onFileSelected) onFileSelected(file);
        if (onBlur) onBlur();
      }
    },
    [onChange, onBlur, onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive, open, fileRejections } = useDropzone({
    onDrop,
    accept: { "video/*": [".mp4"] },
    multiple: false,
    maxSize: 3 * 1024 * 1024 * 1024,
    noKeyboard: true,
    noClick: true,
  });

  return (
    <div
      {...getRootProps({
        className:
          "py-16 px-3 text-center border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer " +
          (isDragActive ? "border-primary/70 bg-primary/5" : "border-primary"),
        onClick: () => open(),
      })}
    >
      <input {...getInputProps()} />
      <Image
        src="/images/global/upload-video-icon.svg"
        alt="Upload Video"
        width={118}
        height={102}
        quality={75}
        className="w-[118px] h-[102px]"
      />

      <h3 className="sm:text-h4-semibold text-h5-semibold text-black mt-8">
        {isDragActive ? (
          <>Drop the video here</>
        ) : (
          <>Drag & drop Video or <span className="text-primary">Browse</span></>
        )}
      </h3>
      <p className="sm:text-h5-regular text-h6-regular  text-text-gray-dark">Supported formats: MP4</p>

      {(value instanceof File || (typeof value === 'string' && value !== '')) && (
        <p className="break-all  sm:text-h6-regular text-h7-regular text-black mt-4">
          Selected: {value instanceof File ? value.name : value.split('/').pop() || 'Current video'}
        </p>
      )}

      {fileRejections && fileRejections.length > 0 && (
        <p className="break-all sm:text-h6-regular text-h7-regular text-red-500 mt-4">File not accepted. Please select a valid video up to 3GB.</p>
      )}
    </div>
  )
}
