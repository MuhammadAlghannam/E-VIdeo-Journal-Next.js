declare type LikeResponse = {
  success: boolean;
  message: string;
  error?: string;
  data: {
    like_id: number;
    comment_id: string;
  };
}