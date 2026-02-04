declare type VideoLike = {
  id: number;
  user_id: number;
  media_id: number;
  created_at: string;
  updated_at: string;
};

declare type VideoComment = {
  id: number;
  user_id: number;
  media_id: number;
  parent_id: number | null;
  content: string;
  created_at: string;
  updated_at: string;
};

declare type VideoMedia = {
  id: number;
  category_id: number;
  user_id: number;
  sub_category_id: string;
  title: string;
  views: string;
  description: string | null;
  file_path: string;
  assigned_to: number | string | null;
  question_group_id: number | string | null;
  mention: string | null; // stringified JSON array from API
  duration: string;
  pdf: string | null;
  thumbnail_path: string;
  image_path: string;
  status: "published" | "draft" | string;
  is_featured: 0 | 1; // 0 or 1
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  comments_count?: number;
  likes_count?: number;
  is_liked?: boolean;
  is_favorite?: boolean;
  likes?: VideoLike[];
  form_id?: string;
  comments?: VideoComment[];
};

declare type VideoCategory = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  media: VideoMedia[];
};

declare type VideoResponse = {
  success: boolean;
  message: string;
  data: VideoCategory[];
};

// Response for sub_category/details endpoint
declare type SubCategoryVideosResponse = {
  success: boolean;
  message: string;
  data: VideoMedia[];
};

// Lightweight category metadata used inside a single media response
declare type VideoCategoryMeta = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
};

declare type VideoSubCategoryMeta = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
};

// Single media payload with category metadata
declare type SingleVideoMedia = VideoMedia & {
  admin_comment_count?: number;
  category: VideoCategoryMeta;
  sub_category: VideoSubCategoryMeta;
  user: VideoUser;
};

// Response for media_details endpoint
declare type SingleVideoResponse = {
  success: boolean;
  message: string;
  data: SingleVideoMedia;
};

// Video User
declare type VideoUser = {
  id: number;
  name: string | null;
  email: string;
  profile_image: string | null;
  phone: string | null;
  email_verified_at: string | null;
  role: string;
  google_id: string | null;
  apple_id: string | null;
  deleted_at: string | null;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  fcm_token: string | null;
  academic_title: string | null;
  job_description: string | null;
  year_of_graduation: string | null;
  country_of_practices: string | null;
  institution: string | null;
  department: string | null;
  country_of_graduation: string | null;
};

declare type UploadedMedia = Omit<
  VideoMedia,
  | "sub_category_id"
  | "duration"
  | "is_featured"
  | "status"
  | "views"
  | "assigned_to"
  | "question_group_id"
  | "likes"
  | "comments"
  | "comments_count"
  | "likes_count"
  | "is_liked"
  | "is_favorite"
> & {
  form_id: number;
  sub_category_id: number;
  status: "pending" | "published" | "draft" | string;
  is_featured: boolean;
  duration: number;
};

declare type UploadVideoResponse = {
  message: string;
  media: UploadedMedia;
  error?: string;
};
// Video search response
declare type VideoSearchResponse = {
  type: string;
  data: VideoSearchItem[];
};

declare type VideoSearchItem = {
  id: number;
  category_id: number;
  user_id: number;
  sub_category_id: string | number;
  title: string;
  views: string;
  description: string;
  file_path: string;
  assigned_to: string | null;
  question_group_id: number | null;
  mention: string;
  form_id: number | null;
  duration: string;
  pdf: string | null;
  thumbnail_path: string;
  image_path: string;
  status: string;
  is_featured: number;
  created_at: string;
  updated_at: string;
  comments_count: number;
  likes_count: number;
  is_liked: boolean;
  is_favorite: boolean;
  category: MediaCategory;
};

declare type VideoSearchCategory = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

// My Videos Response
declare type MyVideosResponse = {
  success: boolean;
  message: string;
  data: VideosByStatus;
};

declare type MyVideosItem = {
  id: number;
  category_id: number;
  user_id: number;
  sub_category_id: string | null;
  title: string;
  views: string;
  description: string | null;
  file_path: string | null;
  assigned_to: string | null;
  question_group_id: string | null;
  mention: string | null;
  form_id: string | null;
  serial_number: string | null;
  duration: string;
  pdf: string | null;
  thumbnail_path: string | null;
  image_path: string | null;
  status: "pending" | "published" | string;
  is_featured: number;
  created_at: string;
  updated_at: string;
  admin_comment_count?: number; // present only in pending
  comments_count?: number; // present only in published
  likes_count: number;
  is_liked: boolean;
  is_favorite: boolean;
  category: {
    id: number;
    user_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
};
