

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import getPolicy from "@/lib/apis/profile/policy.api";
import { auth } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Help Center Page",
};

export default async function Page() {

  // Session
  const session = await auth();
  if (!session) return null;

  // Fetch policy
  const policy = await getPolicy()

  // Group by category title
  const groupedByCategory = policy.data.reduce<Record<string, typeof policy.data>>((acc, p) => {
    const key = p.category?.title ?? "Uncategorized";
    (acc[key] ??= []).push(p);
    return acc;
  }, {});


  return (
    <section className="container-1440 flex flex-col gap-8">
      {/* Title */}
      <h1 className="relative text-h4-semibold md:text-40-semibold ps-6">
        Help Center & Privacy
        <span className="before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-10 before:rounded before:bg-primary"></span>
      </h1>

      {/* Content */}
      <div className="flex flex-col gap-4">

        {/* Accordion*/}
        {Object.entries(groupedByCategory).map(([categoryTitle, items]) => (
          <div className="px-6 py-2 border border-border rounded-xl mb-1" key={categoryTitle}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`cat-${categoryTitle}`}>
                <AccordionTrigger className="text-h4-semibold">
                  {categoryTitle}
                </AccordionTrigger>

                <AccordionContent className="flex flex-col text-h7-regular gap-6">
                  {items.map((item) => (
                    <div className="flex flex-col" key={item.id}>
                      <h2 className="text-h6-semibold">{item.title}</h2>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </section >
  )
}
