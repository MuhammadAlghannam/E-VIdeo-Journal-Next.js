import getUserInfo from "@/lib/apis/profile/user-info.api";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import DeleteAccountBtn from "./_components/DeleteAccountBtn";
import ImageForm from "./_components/ImageForm";
import ProfileForm from "./_components/ProfileForm";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your account profile",
};

export default async function Page() {

  // Session
  const session = await auth();
  if (!session) return null;

  // Get user info
  const initialUser = await getUserInfo();

  return (
    <section className="flex flex-col gap-8">
      {/* Title */}
      <h1 className="relative text-h4-semibold md:text-40-semibold ps-6">
        Profile information
        <span className="before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-10 before:rounded before:bg-primary"></span>
      </h1>

      {/* Form */}
      <div className="flex flex-col gap-6">
        <ImageForm initialUser={initialUser} />

        {/* Inputs & Lables */}
        <ProfileForm initialUser={initialUser} />

        <DeleteAccountBtn />
      </div>
    </section >
  )
}
