import { footerNavigationLinks } from "@/lib/constants/footerLinks";
import Image from "next/image";
import AppDowenload from "./_components/AppDowenload";
import { CopyRight } from "./_components/CopyRight";
import FooterLinks from "./_components/FooterLinks";

export default function Footer() {
  return (
    <footer>
      {/* main footer */}
      <div
        className="bg-[url('/images/backgrounds/footer_bg.png')] bg-no-repeat bg-cover bg-bottom py-12 rounded-t-3xl">
        <div className="container-1440">
          <div className="flex flex-wrap sm:gap-8 md:gap-12 gap-6">

            {/* Logo + Description */}
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-[26.5%]">
              <Image
                src={"/images/logos/logo.svg"}
                alt={"HIS logo"}
                width={122}
                height={88}
                className="w-[122px] h-[88px]"
                priority
                quality={75}
              />

              <p className="text-h6-regular text-white pt-4">
                The Aim of the  Hypospadias E-Video Journal is to promote scientific and evidence-based clinical and basic science research related to the field of Hypospadias
              </p>
            </div>

            {/* Links */}
            {footerNavigationLinks.map((items, index) => (
              <div key={index} className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/9">
                <FooterLinks items={items} />
              </div>
            ))}

            {/* App Links */}
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4">
              <AppDowenload />
            </div>

          </div>
        </div>
      </div>

      {/* Copyrights */}
      <div className="container-1440 flex-between sm:gap-0 gap-2 sm:flex-row flex-col py-4">
        <CopyRight />
      </div>
    </footer>
  )
}
