declare type CategorySubcategory = {
  id: number;
  name: string;
  description: string;
  category_id: number;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
};

declare type CategoryItem = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  subcategories: CategorySubcategory[];
};

declare type CategoriesData = {
  categories: CategoryItem[];
};

declare type CategoriesResponse = {
  success?: boolean;
  message?: string;
  data: CategoriesData;
};


