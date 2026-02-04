import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { guidelinePublications, type SubSection } from "@/lib/constants/guidelinePublications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guideline Publications",
  description: "Guidelines for Submission of Video PowerPoint presentation to The Hypospadias E-Video Journal",
};

export default function Page() {
  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      {/* Head */}
      <div className="mb-12">
        <h1 className="md:text-h2-semibold text-h4-semibold text-center">
          Guidelines for Submission of Video PowerPoint presentation to The Hypospadias E-Video Journal
        </h1>
        <p className="sm:text-h6-regular text-h7-regular w-full mt-6">
          We invite authors to submit abstracts for a proposed HIS Video PowerPoint presentation to the E-Video Journal issue. Please carefully follow the instructions below to ensure your submission is considered for publication. Once your abstract is approved, you will be asked to submit a video presentation. Acceptance of the abstract does not guarantee acceptance of the video presentation.
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {guidelinePublications.map((section) => (
          <div key={section.id} className="px-6 py-2 border border-border rounded-xl mb-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={section.id}>
                <AccordionTrigger className="sm:text-h4-semibold text-h6-semibold">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col text-h7-regular gap-4">
                  {section.content.type === 'list' && (
                    <ul className="list-disc list-inside space-y-2">
                      {(section.content.data as string[]).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.content.type === 'text' && (
                    <p className="sm:text-h6-regular text-h7-regular">{section.content.data as string}</p>
                  )}

                  {section.content.type === 'subsections' && (
                    <div className="space-y-4">
                      {(section.content.data as SubSection[]).map((subsection, index) => (
                        <div key={index}>
                          <h3 className="sm:text-h6-semibold text-h7-semibold mb-2">{subsection.title}</h3>
                          {Array.isArray(subsection.content) ? (
                            <ul className="list-disc list-inside space-y-1 mt-2">
                              {subsection.content.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="sm:text-h6-regular text-h7-regular">{subsection.content}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </section>
  )
}
