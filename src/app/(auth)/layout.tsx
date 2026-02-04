import LeftAuthImage from "@/components/features/auth/LeftAuthImage";
import TopAuth from "@/components/features/auth/TopAuth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "HIS",
    template: "%s | HIS",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="md:my-0 my-auto relative h-full flex flex-col md:flex-row items-start gap-15">
      {/* Fixed left image on desktop, hidden on tablet/mobile */}
      <LeftAuthImage />

      {/* Content shifts right on desktop to avoid overlay */}
      <section className="relative w-full h-full my-auto md:w-[60%] md:pr-24 p-6 ">

        {/* Top Head Form */}
        <TopAuth />

        {children}

      </section>
    </main>
  );
}
