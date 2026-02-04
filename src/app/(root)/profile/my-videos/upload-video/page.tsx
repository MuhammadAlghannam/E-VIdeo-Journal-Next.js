import UploadVideoForm from "../_components/UploadVideoForm";

export default function Page() {
  return (
    <section className="flex flex-col gap-8">
      {/* Title & Btn */}
      <h1 className="relative text-h4-semibold md:text-40-semibold ps-6">
        Upload Video
        <span className="before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-10 before:rounded before:bg-primary"></span>
      </h1>

      {/* Form */}
      <UploadVideoForm />
    </section>
  )
}
