declare type BookmarkAddResponse = {
  status: string;
  message: string;
  data: {
    user_id: number;
    flag: number;
    media_id: number;
    updated_at: string;
    created_at: string;
    id: number;
  };
};

// Response for fetching a user's bookmarks list
declare type BookmarkItem = {
  id: number;
  user_id: number;
  article_id: number | null;
  media_id: number | null;
  flag: string; // API returns string like "1"
  created_at: string;
  updated_at: string;
  media?: VideoMedia; // imported from video.d.ts ambient type
};

declare type GetBookmarksResponse = {
  status: string; // e.g., "success"
  data: {
    bookmarks: BookmarkItem[];
  };
};