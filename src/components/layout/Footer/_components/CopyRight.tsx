import Link from "next/link";

export const CopyRight = () => {
  return (
    <>
      <p className="text-h6-regular text-black" >
        © {new Date().getFullYear()} Copyright <span className="font-bold">HIS</span> - Developed by <Link className="underline decoration-black" href="https://mediacreation.org/" target="blank">MediaCreation.</Link>
      </p>
      <div className=" text-h6-regular text-black flex gap-2">
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </>
  );
};
