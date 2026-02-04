declare type LikeResponse = {
  success: boolean;
  message: string;
  data: {
    like_id: number;
    media_id: string;
  };
};

declare type UnlikeResponse = {
  success: boolean;
  message: string;
};
