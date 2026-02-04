declare type VideoTextForm = {
  full_academic_name: string;
  academic_title: string;
  given_names: string;
  orcid: string;
  professional_email: string;
  department: string;
  institution: string;
  country: string;
  city: string;
  corresponding_author: "yes" | "no";
  correspondence_address: string;
  research_interests: string;
  conceptualisation: string;
  surgical_procedure_and_video: string;
  abstract_preparation: string;
  editing_and_narration: string;
  final_approval: string;
  acknowledgements: string;
  declarations: string;
  ethical_approval_institution: string;
  updated_at: string;
  created_at: string;
  id: number;
  user_id?: number;
};
declare type VideoTextFormResponse = {
  error?: string;
  errors?: string;
  message?: string;
  data: VideoTextForm;
};

