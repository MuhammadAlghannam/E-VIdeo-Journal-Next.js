import CustomeBtn from "@/components/shared/CustomeBtn";
import Image from "next/image";

export default function GoogleAppBtn() {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <CustomeBtn variant="outline" className="w-full !bg-transparent text-black border py-6">
        <Image
          src="/images/auth/google.svg"
          alt="Google"
          width={25}
          height={24}
          quality={75}
          className="w-[25px] h-[24px]"
        />
        <span className="text-black">Continue with Google</span>
      </CustomeBtn>
      <CustomeBtn variant="outline" className="w-full !bg-transparent border py-6">
        <Image
          src="/images/auth/apple.svg"
          alt="Apple"
          width={25}
          height={30}
          quality={75}
          className="w-[25px] h-[30px]"
        />
        <span className="text-black">Continue with Apple</span>
      </CustomeBtn>
    </div>

  )
}
