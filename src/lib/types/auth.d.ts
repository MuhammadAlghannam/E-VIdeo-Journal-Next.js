declare type ApiUser = {
  id: number;
  name: string;
  email: string;
  profile_image: string | null;
  phone: string;
  email_verified_at: string | null;
  role: string;
  google_id: string | null;
  apple_id: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  fcm_token: string | null;
  academic_title: string | null;
  job_description: string | null;
  year_of_graduation: string | null;
  country_of_practices: string | null;
  institution: string | null;
  department: string | null;
  country_of_graduation: string | null;
};

declare type LoginResponse = {
  user: ApiUser;
  token: string;
  error?: string;
  message?: string;
}

declare type RegisterResponse = {
  user?: {
    id: number;
    role: string;
    name: string;
    email: string;
    phone: string;
    country_of_practices: string;
    academic_title?: string;
    job_description?: string;
    institution?: string;
    department?: string;
    year_of_graduation: string;
    country_of_graduation: string;
    profile_image?: string | null;
    created_at?: string;
    updated_at?: string;
  };
  error?: string;
  token?: string;
  message?: string | {
    email?: string;
    phone?: string;
  };
}
