import Image from "next/image";
import Link from "next/link";

export const AppDownloader = () => {
  return (
    <section className="container-1440 pb-20 pt-20 lg:pt-50">
      <div className="flex items-center lg:items-end lg:flex-row flex-col bg-gradient-2 rounded-2xl">

        <div className="w-full  lg:w-1/2 md:p-10 p-6">

          <h1 className="md:text-h3-semibold text-h4-semibold text-center lg:text-start">
            Get The App And See all Updates and Get Started Through Our App .
          </h1>

          <div className="flex justify-center lg:justify-start gap-1.5 pt-4">
            <Link
              href="https://apps.apple.com/us/app/his-hypospadias-journals/id6748080285"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/badges/apple-store.svg"
                alt="Download on the App Store"
                width={155}
                height={49}
                quality={75}
                className="w-[155px] h-[49px]"
              />
            </Link>

            <Link
              href="https://play.google.com/store/apps/details?id=com.mediacreation.his"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/badges/google-play.svg"
                alt="Get it on Google Play"
                width={155}
                height={49}
                quality={75}
                className="w-[155px] h-[49px]"
              />
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <Image
            src={"/images/logos/mobileApp.png"}
            alt="mobile App"
            width={750}
            height={350}
            className="w-[750px] lg:absolute block bottom-0 right-0 shrink"
            style={{ height: "auto" }}
            priority
          />
        </div>
      </div>
    </section>
  );
};
