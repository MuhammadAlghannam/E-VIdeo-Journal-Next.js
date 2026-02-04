import CustomeBtn from "@/components/shared/CustomeBtn";
import { auth } from "@/lib/auth";
import { ClipboardCheck, MoveRight } from "lucide-react";

export default async function AccessDashboard() {
  const session = await auth();

  const isAdmin = session?.user?.role === "admin" || session?.user?.role === "reviewer";

  return isAdmin && (
    <section className="container-1440 pb-20">
      <div className="flex-between items-center bg-gradient-1 p-12 rounded-3xl">

        {/* left */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="p-4 bg-[#349AC6] rounded-2xl shadow-xs">
            <ClipboardCheck className="w-10 h-10 text-white" />
          </div>

          {/* Text */}
          <div>
            <h2 className="md:text-h3-semibold text-h4-semibold pb-2 text-white">Access Your Reviewer Dashboard</h2>
            <p className="text-h5-regular text-white">Seamlessly evaluate submissions, manage reviews, and contribute to medical excellence.</p>
          </div>
        </div>

        {/* Right Button */}
        <div>
          <CustomeBtn href="https://his.mc-apps.org/" className="py-6 px-8 !bg-white">
            <span className="text-h7-regular text-primary">Access Dashboard</span>
            <MoveRight className="w-5 h-5 text-primary" />
          </CustomeBtn>
        </div>

      </div>
    </section>
  )
}
