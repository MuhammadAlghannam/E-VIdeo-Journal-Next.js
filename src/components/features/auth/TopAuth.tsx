import Image from "next/image";

export default function TopAuth() {
  return (
    <>
      {/* Logo */}
      <div>
        <Image
          src={"/images/logos/logo.svg"}
          alt={"HIS logo"}
          width={122}
          height={88}
          className="w-[122px] h-[88px]"
          quality={75}
          priority
        />
      </div>

      {/* Header */}
      <div className="my-5">
        <h2 className="text-black text-h3-semibold">Welcome to HIS ,</h2>
        <p className="text-h8-regular text-text-gray">Welcome! We&apos;re thrilled to have you .</p>
      </div>
    </>
  )
}
