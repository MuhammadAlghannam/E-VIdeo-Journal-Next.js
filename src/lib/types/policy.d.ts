declare type PolicyResponse = {
  status: string;
  message: string;
  data: Policy[];
};

declare type Policy = {
  id: number;
  category_id: number;
  title: string;
  body: string;
  added_by: AddedBy;
  created_at: string | null;
  updated_at: string | null;
  category: Category;
};

declare type AddedBy = {
  id: number;
  name: string;
  email: string;
};

declare type Category = {
  id: number;
  title: string;
};
