declare type User = {
  id: number;
  name: string;
  email: string;
  profile_image: string;
  phone: string;
  email_verified_at: string | null;
  role: string;
  google_id: string | null;
  apple_id: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  fcm_token: string | null;
  academic_title: string;
  job_description: string;
  year_of_graduation: string;
  country_of_practices: string;
  institution: string;
  department: string;
  country_of_graduation: string;
};

declare type ProfileResponse = {
  message: string;
  user: User;
  error?: string;
};
