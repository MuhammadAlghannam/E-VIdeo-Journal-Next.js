"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import MainAvatar from "@/components/shared/MainAvatar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileImageFields, ProfileImageSchema } from "@/lib/schema/profile.schema";
import { resolveProfileImageSrc, toFormData } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useUpdateProfileImage from "../_hooks/use-profile-image";
// import useUpdateProfileImage from "../_hooks/useUpdateProfileImage";

export default function ImageForm({ initialUser }: { initialUser?: ApiUser }) {
  const { data: session } = useSession();

  const profileImg = resolveProfileImageSrc(initialUser?.profile_image ?? null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isPending } = useUpdateProfileImage();

  const form = useForm<ProfileImageFields>({
    resolver: zodResolver(ProfileImageSchema),
    defaultValues: {
      profile_image: undefined as unknown as File,
    },
    mode: "onBlur",
  });


  const onSubmit: SubmitHandler<ProfileImageFields> = async (values) => {
    if (!session?.user?.id) return;

    const formData = toFormData({
      user_id: session?.user?.id,
      profile_image: values.profile_image,
    });

    uploadImage(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <MainAvatar src={profileImg} className="size-[68px]" />

          <div className="flex items-center gap-3">
            {/* Hidden file input, controlled via RHF */}
            <FormField
              control={form.control}
              name="profile_image"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                            // Auto submit when file is selected
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                        {...field}
                        ref={fileInputRef}
                      />
                      <CustomeBtn
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-full !py-5 !px-6"
                        disabled={isPending}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {isPending ? "Uploading..." : "Upload new picture"}
                      </CustomeBtn>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}