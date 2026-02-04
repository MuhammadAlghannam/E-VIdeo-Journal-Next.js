import { board } from "@/lib/constants/editorial-board";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Editorial Board",
  description: "Editorial Board",
};

export default function Page() {
  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      {/* Head */}
      <div className="mb-12">
        <h1 className="md:text-h2-semibold text-h4-semibold text-center">
          Editorial Board
        </h1>
        <p className="sm:text-h6-regular text-h7-regular w-full text-center">
          The Editorial Board of the Hypospadias E-Video Journal consists of
        </p>
      </div>

      {/* Board */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {board.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center justify-start text-center"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={200}
              height={200}
              className="rounded-full object-cover mb-6"
            />
            <h2 className="text-h5-semibold mb-1">{member.name}</h2>
            <p className="text-h7-regular text-muted-foreground">
              {member.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
