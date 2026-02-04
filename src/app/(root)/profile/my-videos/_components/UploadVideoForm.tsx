"use client"
import CustomeBtn from "@/components/shared/CustomeBtn";
import { RichTextFormField } from "@/components/shared/rich-text-form-field";
import SecureVideoPlayer from "@/components/shared/SecureVideoPlayer";
import Spinner from "@/components/shared/Spinner";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useResumableUpload } from "@/hooks/useResumableUpload";
import { uploadMonths, uploadYears } from "@/lib/constants/uploadVideo";
import { UploadVideoFields, UploadVideoSchema } from "@/lib/schema/upload-video.shema";
import { toFormData, toUpdateFormData } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useUpdateVideo from "../_hooks/useUpdateVideo";
import useUploadVideo from "../_hooks/useUploadVideo";
import ImageAndFileUpload from "./ImageAndFileUpload";
import UploadVideoTextModal from "./UploadVideoTextModal";
import VideoUploadDragDrop from "./VideoUploadDragDrop";


export default function UploadVideoForm({ initialData, videoSrc }: { initialData?: SingleVideoMedia, videoSrc?: string }) {
  const { id: editId } = initialData || {};

  const isEditVideo = Boolean(editId);

  // LocalStorage Form Id
  const formId = typeof window !== 'undefined' ? Number(localStorage.getItem("videoTextFormId")) : null;

  // Mutation
  const { uploadVideo, isPending } = useUploadVideo();
  const { updateVideo, isPending: isUpdateing } = useUpdateVideo();

  // Resumable.js hook (client-side chunk uploader proxied to Laravel)
  const {
    addFile,
    start,
    retry,
    progressPercent,
    // new: byte counters for display
    uploadedBytes,
    totalBytes,
    isUploading: isChunkUploading,
    isFinished: isChunkFinished,
    serverPath,
    error: chunkError,
  } = useResumableUpload({
    target: "/api/video/upload-chunk",
    fileType: ["mp4"],
    chunkSize: 1 * 1024 * 1024,
    simultaneousUploads: 3,
    throttleProgressCallbacks: 0.5,
    maxChunkRetries: 8,
    chunkRetryIntervalMs: 2500,
  });

  const form = useForm<UploadVideoFields>({
    resolver: zodResolver(UploadVideoSchema),
    defaultValues: {
      file: initialData?.file_path || "",
      thumbnail_path: initialData?.thumbnail_path || "",
      image_path: initialData?.image_path || "",
      pdf: initialData?.pdf || "",
      year: initialData?.category?.name || "",
      month: initialData?.sub_category?.name || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      // mention: normalizeMentions(initialData?.mention).map((label) => ({ value: label, label })) || [],
      // is_featured: initialData?.is_featured || 0,
    },
    mode: "onBlur",
  });

  // Watch mention field and transform it outside of submit
  // const mentionValue = useWatch({
  //   control: form.control,
  //   name: "mention"
  // });

  // Transform mention array from objects to simple strings
  // const mentionStrings = mentionValue?.map(item => item.label) || [];

  // Track pending submit intent for auto-submit after chunking
  const pendingValuesRef = useRef<UploadVideoFields | null>(null);
  const [submitIntent, setSubmitIntent] = useState<"create" | "update" | null>(null);

  const onSubmit: SubmitHandler<UploadVideoFields> = async (values) => {
    if (!isEditVideo && (!formId || formId === 0)) return;

    // If a new file is selected and chunk upload hasn't finished, start it and wait
    const isNewFileSelected = values.file instanceof File;
    if (isNewFileSelected && !isChunkFinished && !serverPath) {
      // remember values and intent, then start chunking; we'll auto-submit on completion
      pendingValuesRef.current = values;
      setSubmitIntent(isEditVideo ? "update" : "create");
      start();
      return;
    }

    if (isEditVideo && editId) {
      // Use toUpdateFormData for updates - only sends changed files and all other fields
      const formDataVideo = toUpdateFormData({
        file: values.file,
        thumbnail_path: values.thumbnail_path,
        image_path: values.image_path,
        pdf: values.pdf,
        year: values.year,
        month: values.month,
        title: values.title,
        description: values.description,
        // mention: mentionStrings,
        // is_featured: values.is_featured,
        form_id: initialData?.form_id,
        media_id: String(editId),
      }, initialData);

      // Only switch to uploaded_video_path when we actually have a chunk-assembled path
      if (serverPath) {
        formDataVideo.delete("file");
        formDataVideo.append("uploaded_video_path", serverPath as string);
      }
      updateVideo(formDataVideo);
    } else {
      // Use regular toFormData for new uploads
      const formDataVideo = toFormData({
        file: values.file,
        thumbnail_path: values.thumbnail_path,
        image_path: values.image_path,
        pdf: values.pdf,
        year: values.year,
        month: values.month,
        title: values.title,
        description: values.description,
        // mention: mentionStrings,
        // is_featured: values.is_featured,
        form_id: formId,
      });

      formDataVideo.delete("file");
      formDataVideo.append("uploaded_video_path", serverPath as string);
      uploadVideo(formDataVideo, {
        onSuccess: () => {
          localStorage.removeItem("videoTextFormId")
        }
      });
    }
  };

  // Auto-submit after chunking completes with serverPath set
  useEffect(() => {
    if (!submitIntent || !isChunkFinished || !serverPath || !pendingValuesRef.current) return;
    const values = pendingValuesRef.current;
    if (submitIntent === "update" && editId) {
      const formDataVideo = toUpdateFormData({
        file: values.file,
        thumbnail_path: values.thumbnail_path,
        image_path: values.image_path,
        pdf: values.pdf,
        year: values.year,
        month: values.month,
        title: values.title,
        description: values.description,
        // mention: mentionStrings,
        // is_featured: values.is_featured,
        form_id: initialData?.form_id,
        media_id: String(editId),
      }, initialData);

      if (serverPath) {
        formDataVideo.delete("file");
        formDataVideo.append("uploaded_video_path", serverPath);
      }
      updateVideo(formDataVideo);
    } else if (submitIntent === "create") {
      const formDataVideo = toFormData({
        file: values.file,
        thumbnail_path: values.thumbnail_path,
        image_path: values.image_path,
        pdf: values.pdf,
        year: values.year,
        month: values.month,
        title: values.title,
        description: values.description,
        // mention: mentionStrings,
        // is_featured: values.is_featured,
        form_id: formId,
      });
      formDataVideo.delete("file");
      formDataVideo.append("uploaded_video_path", serverPath);
      uploadVideo(formDataVideo, {
        onSuccess: () => {
          localStorage.removeItem("videoTextFormId")
        }
      });
    }
    // reset intent and pending values
    setSubmitIntent(null);
    pendingValuesRef.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChunkFinished, serverPath]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Video Preview */}
        {isEditVideo && initialData?.file_path && videoSrc ?
          <SecureVideoPlayer
            className="w-full aspect-video mb-4"
            preload="none"
            poster={initialData?.thumbnail_path}
            src={videoSrc}
          />
          : ''}

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <VideoUploadDragDrop value={field.value} onChange={field.onChange} onBlur={field.onBlur} onFileSelected={(file) => addFile(file)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail_path"
          render={({ field }) => (
            <FormItem className="mt-6 mb-4">
              <FormControl>
                <ImageAndFileUpload type="image" value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thumbnail Previwe */}
        {isEditVideo && initialData?.thumbnail_path ?
          (
            <Image
              src={initialData?.thumbnail_path}
              alt={initialData.title}
              width={250}
              height={250}
              quality={75}
              className="w-[250px] h-[250px] object-cover rounded-md"
            />
          )
          : ''}

        <FormField
          control={form.control}
          name="image_path"
          render={({ field }) => (
            <FormItem className="mt-6 mb-4">
              <FormControl>
                <ImageAndFileUpload type="image" value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="Select additional image (JPG, PNG)" buttonLabel="Choose Image" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image path Previwe */}
        {isEditVideo && initialData?.image_path ?
          (
            <Image
              src={initialData?.image_path}
              alt={initialData.title}
              width={250}
              height={250}
              quality={75}
              className="w-[250px] h-[250px] object-cover rounded-md"
            />
          )
          : ''}

        <FormField
          control={form.control}
          name="pdf"
          render={({ field }) => (
            <FormItem className="mt-6 mb-4">
              <FormControl>
                <ImageAndFileUpload type="file" value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="Select PDF file" buttonLabel="Choose PDF" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pdf Previwe */}
        {isEditVideo && initialData?.pdf ?
          (
            <a href={`${initialData?.pdf}`} target="_blank" className="text-h7-semibold text-primary underline">View Pdf</a>
          ) : ''
        }

        <div className="flex sm:flex-row flex-col items-center gap-4 w-full mt-6">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {uploadYears.map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {uploadMonths.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full my-4">
              <FormControl>
                <Input type="text" placeholder="Title" autoComplete="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full my-4">
              <FormControl>
                <RichTextFormField
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="mention"
          render={({ field }) => (
            <FormItem className="w-full my-4">
              <FormControl>
                <MultipleSelector
                  {...field}
                  placeholder="Select frameworks you like..."
                  creatable
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="is_featured"
          render={({ field }) => (
            <FormItem className="w-full flex items-center gpa-3">
              <FormControl>
                <Switch
                  checked={field.value === 1}
                  onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                />
              </FormControl>
              <FormLabel>Is featured</FormLabel>
            </FormItem>
          )}
        /> */}

        {/* Form Modal & Submit */}
        {(!isEditVideo && (!formId || formId === 0)) ? (
          <UploadVideoTextModal>
            <CustomeBtn className="bg-primary py-6 mt-8 text-h8-regular text-white text-center w-full">
              Submit Form
              <MoveRight className="w-5 h-5 text-white" />
            </CustomeBtn>
          </UploadVideoTextModal>
        ) : (
          <CustomeBtn
            type="submit"
            disabled={(isEditVideo ? isUpdateing : isPending) || isChunkUploading || (form.formState.isSubmitted && !form.formState.isValid)}
            className="bg-primary py-6 mt-8 text-h8-regular text-white text-center w-full"
          >
            {(isEditVideo ? isUpdateing : isPending) ? <Spinner /> :
              <>
                {isChunkUploading ? `Uploading: ${progressPercent}%` : (isEditVideo ? "Update Video" : "Upload Video")}
                <MoveRight className="w-5 h-5 text-white" />
              </>}
          </CustomeBtn>
        )}
        {/* Progress bar under the submit button using shadcn/ui */}
        {form.getValues("file") instanceof File ? (
          <div className="mt-3">
            <Progress value={progressPercent} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">{isChunkFinished ? "Upload complete" : isChunkUploading ? `Uploading: ${progressPercent}%` : "Ready to upload"}</span>
              {!isChunkFinished ? (
                <span className="text-primary text-sm">Uploading ....</span>
              ) : null}
              {chunkError ? (
                <button type="button" className="text-primary text-sm" onClick={() => retry()}>Retry</button>
              ) : null}
            </div>
            {(typeof uploadedBytes === 'number' && typeof totalBytes === 'number' && totalBytes > 0) ? (
              <div className="text-xs text-gray-500 mt-1">
                {`${(uploadedBytes / (1024 * 1024)).toFixed(2)} MB / ${(totalBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`}
              </div>
            ) : null}
            {chunkError ? (
              <div className="text-red-500 text-sm mt-2">{chunkError}</div>
            ) : null}
          </div>
        ) : null}
      </form>
    </Form >
  )
}