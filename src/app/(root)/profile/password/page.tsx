

import { auth } from "@/lib/auth";
import PasswordForm from "./_compnents/PasswordForm";

export default async function Page() {
  const session = (await auth()) as SessionResponse;
  if (!session) return null;



  return (
    <section className="container-1440 flex flex-col gap-8">
      {/* Title */}
      <h1 className="relative text-h4-semibold md:text-40-semibold ps-6">
        Password
        <span className="before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-10 before:rounded before:bg-primary"></span>
      </h1>

      {/* Form */}
      <div className="flex flex-col gap-6">
        <PasswordForm />
      </div>



    </section>
  )
}
