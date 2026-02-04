"use client"
import CustomeBtn from "@/components/shared/CustomeBtn";
import Spinner from "@/components/shared/Spinner";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UploadVideoTextFields, UploadVideoTextSchema } from "@/lib/schema/upload-video.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAddVideoTextForm from "../_hooks/useAddVideoTextForm";

interface UploadVideoTextFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData?: VideoTextForm | null; // ⬅️ new prop
};

export default function UploadVideoTextForm({ setOpen, formData }: UploadVideoTextFormProps) {
  const { id: editId } = formData || {};

  const isEditTextForm = Boolean(editId);

  // Mutation
  const { addVideoTextForm, isPending } = useAddVideoTextForm();

  const form = useForm<UploadVideoTextFields>({
    resolver: zodResolver(UploadVideoTextSchema),
    defaultValues: {
      // Author Information
      full_academic_name: formData?.full_academic_name || "",
      academic_title: formData?.academic_title || "",
      given_names: formData?.given_names || "",
      orcid: formData?.orcid || "",
      professional_email: formData?.professional_email || "",
      department: formData?.department || "",
      institution: formData?.institution || "",
      country: formData?.country || "",
      city: formData?.city || "",
      corresponding_author: formData?.corresponding_author || "no",
      correspondence_address: formData?.correspondence_address || "",
      research_interests: formData?.research_interests || "",

      // Authors’ Contributions
      conceptualisation: formData?.conceptualisation || "",
      surgical_procedure_and_video: formData?.surgical_procedure_and_video || "",
      abstract_preparation: formData?.abstract_preparation || "",
      editing_and_narration: formData?.editing_and_narration || "",
      final_approval: formData?.final_approval || "",

      // Acknowledgements
      acknowledgements: formData?.acknowledgements || "",

      // Declarations
      declarations: (formData?.declarations === "Informed consent obtained from the patient(s) or legal guardian(s) for use of clinical materials, images, and video" ||
        formData?.declarations === "Not applicable (no identifiable patient data).")
        ? formData.declarations
        : "Informed consent obtained from the patient(s) or legal guardian(s) for use of clinical materials, images, and video",

      // Institutional / Ethical approval (choose one)
      ethical_approval_institution: (formData?.ethical_approval_institution === "Approval granted by ___________ (institutional review board / equivalent)" ||
        formData?.ethical_approval_institution === "Not applicable for educational content / anonymised retrospective case")
        ? formData.ethical_approval_institution
        : "Approval granted by ___________ (institutional review board / equivalent)",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UploadVideoTextFields> = async (values) => {
    addVideoTextForm(values, {
      onSuccess: (response) => {
        // Save the Add Video Text form id to the localStorage
        if (typeof window !== "undefined" && response?.data?.id != null) {
          localStorage.setItem("videoTextFormId", String(response.data.id));
        }

        setOpen(false)
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        {/* Author Information */}
        <div className="mb-6">
          <h2 className="text-h5-semibold text-black">01 . Author Information</h2>
          <p className="text-h8-regular text-text-gray-dark">Please provide your author information below .</p>
        </div>

        <div className="p-5 border border-border bg-[#FCFCFC] rounded-lg space-y-4">

          <div className="flex sm:flex-row flex-col items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="full_academic_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Full academic name" autoComplete="name" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="academic_title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Academic title" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex sm:flex-row flex-col items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="given_names"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Given name(s)" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="orcid"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="ORCID (0000-0000-0000-000X)" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="professional_email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input type="email" placeholder="Professional email" autoComplete="email" readOnly={isEditTextForm} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex sm:flex-row flex-col items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Department" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Institution" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex sm:flex-row flex-col items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CountryDropdown
                      placeholder="Country"
                      defaultValue={field.value}
                      disabled={isEditTextForm}
                      onChange={(country) => {
                        field.onChange(country.name)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="City" autoComplete="address-level2" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="corresponding_author"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Corresponding Author</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                    disabled={isEditTextForm}
                    className="flex items-center gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="corresponding-yes" />
                      <label htmlFor="corresponding-yes" className="text-sm text-black">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="corresponding-no" />
                      <label htmlFor="corresponding-no" className="text-sm text-black">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correspondence_address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input type="text" placeholder="Correspondence address" readOnly={isEditTextForm} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="research_interests"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input type="text" placeholder="Research interests" readOnly={isEditTextForm} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Authors’ Contributions */}
        <div className="mb-6 mt-8">
          <h2 className="text-h5-semibold text-black">02 . Authors’ Contributions</h2>
          <p className="text-h8-regular text-text-gray-dark">Please outline the contribution of each author using initials.</p>
        </div>

        <div className="p-5 border border-border bg-[#FCFCFC] rounded-lg space-y-4">

          <div className="flex sm:flex-row flex-col items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="conceptualisation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Conceptualisation" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surgical_procedure_and_video"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Surgical Procedure and Video" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex sm:flex-row flex-col items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="abstract_preparation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Abstract Preparation" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="editing_and_narration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Editing and Narration" readOnly={isEditTextForm} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="final_approval"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input type="text" placeholder="Final Approval" readOnly={isEditTextForm} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Acknowledgements */}
        <div className="mb-6 mt-8">
          <h2 className="text-h5-semibold text-black">03. Acknowledgements</h2>
          <p className="text-h8-regular text-text-gray-dark">Acknowledge any individual, department, or organisation who contributed but is not listed as an author.</p>
        </div>

        <FormField
          control={form.control}
          name="acknowledgements"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Acknowledgements"
                  className="resize-none"
                  rows={6}
                  readOnly={isEditTextForm}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Declarations */}
        <FormField
          control={form.control}
          name="declarations"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="!text-h5-semibold text-black mt-8">04 . Declarations ( Choose )</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                  disabled={isEditTextForm}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Informed consent obtained from the patient(s) or legal guardian(s) for use of clinical materials, images, and video" id="declarations-consent-yes" />
                    <label htmlFor="declarations-consent-yes" className="text-sm text-black">Informed consent obtained from the patient(s) or legal guardian(s) for use of clinical materials, images, and video</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Not applicable (no identifiable patient data)." id="declarations-consent-no" />
                    <label htmlFor="declarations-consent-no" className="text-sm text-black">Not applicable (no identifiable patient data).</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Institutional / Ethical approval (choose one) */}
        <FormField
          control={form.control}
          name="ethical_approval_institution"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="!text-h5-semibold text-black mt-8">05 . Institutional / Ethical approval ( Choose )</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                  disabled={isEditTextForm}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Approval granted by ___________ (institutional review board / equivalent)" id="approval-granted-yes" />
                    <label htmlFor="approval-granted-yes" className="text-sm text-black">Approval granted by ___________ (institutional review board / equivalent)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Not applicable for educational content / anonymised retrospective case" id="not-applicable-no" />
                    <label htmlFor="not-applicable-no" className="text-sm text-black">Not applicable for educational content / anonymised retrospective case</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isEditTextForm && (
          <CustomeBtn
            type="submit"
            disabled={isPending || form.formState.isSubmitted && !form.formState.isValid}
            className="bg-primary py-6 mt-8 text-h8-regular text-white text-center w-full"
          >
            {isPending ? <Spinner /> :
              <>
                Submit
                <MoveRight className="w-5 h-5 text-white" />
              </>}
          </CustomeBtn>
        )}
      </form>
    </Form>
  )
}
