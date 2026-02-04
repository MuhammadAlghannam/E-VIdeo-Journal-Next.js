import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About HIS",
  description: "About HIS",
};

export default function Page() {
  return (
    <section className="container-1440 overflow-y-hidden pt-14">
      {/* Head */}
      <div className="mb-12 px-4">
        <h1 className="md:text-h1-semibold text-h2-semibold text-center">
          About Hypospadias e-video Journal
        </h1>
      </div>

      {/* About */}
      <div className="flex flex-col sm:gap-20 gap-13">
        {/* 1st row */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center justify-between">
          {/* Left */}
          <div className="flex-1">
            <p className="mb-3 sm:text-h7-regular text-h8-regular">
              <strong>The Hypospadias E-Video Journal</strong> is the official Journal of the Hypospadias International Society.
            </p>
            <p className="mb-3 sm:text-h7-regular text-h8-regular">
              The Aim of the  Hypospadias E-Video Journal is to promote scientific and evidence-based clinical and basic science research related to the field of Hypospadias
            </p>
            <p className="mb-3 sm:text-h7-regular text-h8-regular">
              It is an <strong>OPEN ACCESS</strong> scientific Journal that aims to spread scientific knowledge all over the world.
            </p>
            <p className="mb-3 sm:text-h7-regular text-h8-regular">
              The Journal welcomes scientific research related to hypospadias from researchers and clinicians from all over world. Each article submitted for publication in the Journal must obtain the institutional ethics committee approval prior to submission. It must be reviewed blindly by at least two competent reviewers before being approved by the editor for publication in the Journal.
            </p>
          </div>

          {/* Right */}
          <div className="flex-1">
            <Image
              width={506}
              height={372}
              src="/images/about/about-1.png"
              alt="About1"
              className="w-full h-auto max-w-full object-contain rounded-3xl"
              priority
            />
          </div>
        </div>

        {/* 2nd row */}
        <div className="flex flex-col-reverse pb-20 lg:flex-row-reverse gap-8 lg:gap-12 items-center justify-between">
          {/* Left */}
          <div className="flex-1">
            <h2 className="sm:text-h2-semibold text-h3-semibold text-black mb-4">Our Mission & Vision</h2>
            <p className="mb-3 sm:text-h7-regular text-h8-regular">
              The mission of the  Hypospadias E-Video Journal is to promote scientific and evidence-based clinical and basic science research related to the field of Hypospadias
            </p>
            <p className="mb-3 sm:text-h7-regular text-h8-regular">
              It is an <strong>OPEN ACCESS</strong> scientific Journal that aims to spread scientific knowledge all over the world.
            </p>
            <p className="sm:text-h7-regular text-h8-regular">The Journal welcomes scientific research related to hypospadias from researchers and clinicians from all over world. Each article submitted for publication in the Journal must obtain the institutional ethics committee approval prior to submission. It must be reviewed blindly by at least two competent reviewers before being approved by the editor for publication in the Journal.</p>
          </div>

          {/* Right */}
          <div className="flex-1">
            <Image
              width={506}
              height={346}
              src="/images/about/about-2.png"
              alt="About2"
              className="w-full h-auto max-w-full object-contain rounded-3xl"
              priority
            />
          </div>
        </div>

        {/* 3rd row */}
        {/* <div className="bg-[url('/images/about/about-bg.png')] bg-no-repeat bg-cover bg-bottom py-12 md:py-16 lg:py-20">
          <div className="container-1440 px-4 w-full lg:w-4/5 mx-auto">
            <h2 className="text-40-semibold text-black text-center">Our Vision</h2>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur. Vel venenatis vel diam
              felis. Mi id ullamcorper nec enim duis tortor. Quis et egestas nisl
              non. In fringilla neque risus dui consectetur fringilla sagittis
              facilisi egestas. Amet nec at elit morbi cras mattis. Id quis sem
              ullamcorper integer orci auctor commodo consequat turpis. Gravida
              consectetur ornare purus et feugiat odio. At eget pretium vitae at
              amet pellentesque posuere feugiat. Sagittis phasellus sed ipsum nibh
              posuere. Purus semper tincidunt a eget ultrices nisi at elementum.
              Gravida et cum ut velit ut lectus.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
