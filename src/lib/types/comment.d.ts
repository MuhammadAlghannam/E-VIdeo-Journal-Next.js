declare type CreateCommentUser = {
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

declare type CreateCommentData = {
  user_id: string; // API returns numeric IDs as strings
  media_id: string;
  parent_id: string | null; // API returns numeric IDs as strings
  content: string;
  updated_at: string;
  created_at: string;
  id: number;
  user: CreateCommentUser;
};

declare type CreateCommentResponse = {
  status: "success" | "error";
  message: string;
  data: CreateCommentData;
  error?: string;
};

// Get comments (list) response types
declare type CommentReply = {
  id: number;
  user_id: number;
  media_id: number;
  parent_id: number | null;
  content: string;
  created_at: string;
  updated_at: string;
  is_liked: boolean;
  likes_count: number;
  user: CreateCommentUser;
  // Optional nested replies for one additional level
  replies?: CommentReply[];
};

declare type CommentItem = {
  id: number;
  user_id: number;
  media_id: number;
  parent_id: number | null;
  content: string;
  created_at: string;
  updated_at: string;
  is_liked: boolean;
  likes_count: number;
  user: CreateCommentUser;
  replies: CommentReply[];
};

declare type GetCommentsResponse = {
  status: "success" | "error";
  message: string;
  data: CommentItem[];
  error?: string;
};

declare type GetAdminCommentsData = {
  AdminComments: CommentItem[];
};

declare type GetAdminCommentsResponse = {
  success: boolean;
  data: GetAdminCommentsData;
  error?: string;
  message?: string;
};