import Image from 'next/image'

export default function LeftAuthImage() {
  return (
    <div className="hidden md:block md:sticky md:top-0 md:h-screen md:w-[40%] shrink-0">
      <div className="relative h-full w-full">
        <Image
          src="/images/auth/auth-image.png"
          alt="Auth Background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-r-3xl"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-end px-8 pb-8">
          <p className="text-h5-semibold text-white w-3/4">
            Access cutting-edge medical content, research, and educational resources from leading healthcare professionals worldwide.
          </p>
        </div>
      </div>
    </div>
  )
}
