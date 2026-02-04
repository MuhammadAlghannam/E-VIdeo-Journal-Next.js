import Image from "next/image";
import Link from "next/link";

export default function AppDowenload() {
  return (
    <>
      <h3 className="text-h5-semibold text-white pb-1">
        Download HIS App Now !
      </h3>

      {/* <p className="text-h7-regular text-white">
        Lorem ipsum dolor sit amet consectetur. Nunc pulvinar facilisis in tempor facilisi semper.
      </p> */}

      <div className="flex gap-1.5 pt-4">
        <Link
          href="https://apps.apple.com/us/app/his-hypospadias-journals/id6748080285"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/badges/apple-store.svg"
            alt="Download on the App Store"
            width={80}
            height={25}
            quality={75}
            className="w-[80px] h-[25px]"
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
            width={80}
            height={25}
            quality={75}
            className="w-[80px] h-[25px]"
          />
        </Link>
      </div>
    </>
  )
}
