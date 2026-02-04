"use client";
import CustomeBtn from "@/components/shared/CustomeBtn";
import { useRouter } from "next/navigation";

export default function LoginButton({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function handleClick() {
    const href = window.location.href;
    localStorage.setItem("prevUrl", href);
    // ✅ manually navigate to login page
    router.push("/login");
  }

  return (
    <CustomeBtn onClick={handleClick}>
      {children}
    </CustomeBtn>
  );
}
