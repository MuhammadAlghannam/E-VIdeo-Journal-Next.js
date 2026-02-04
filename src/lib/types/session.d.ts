declare type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;

  academic_title: string;
  apple_id: string | null;
  country_of_graduation: string | null;
  country_of_practices: string | null;
  created_at: string; // ISO datetime
  deleted_at: string | null; // ISO datetime or null
  department: string | null;
  email_verified_at: string | null; // ISO datetime or null
  fcm_token: string | null;
  google_id: string | null;
  institution: string | null;
  job_description: string | null;
  profile_image: string | null;
  updated_at: string; // ISO datetime
  year_of_graduation: string | null; // ISO date
  image?: string | null;
};

declare type SessionResponse = {
  expires: string; // ISO datetime
  token: string;
  user: User;
};
