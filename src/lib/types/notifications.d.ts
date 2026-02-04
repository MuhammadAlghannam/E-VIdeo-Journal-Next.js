declare type NotificationSender = {
  id: number;
  name: string;
  email: string;
  profile_image: string | null;
  phone: string | null;
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

declare type NotificationItem = {
  id: number;
  title: string;
  body: string;
  route: string;
  sender_id: number;
  receiver_id: number;
  article_id: number | null;
  media_id: number | null;
  seen: number;
  created_at: string;
  updated_at: string;
  sender: NotificationSender;
};

declare type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

declare type NotificationsPage = {
  current_page: number;
  data: NotificationItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

declare type NotificationsResponse = {
  message: string;
  data: NotificationsPage;
};
