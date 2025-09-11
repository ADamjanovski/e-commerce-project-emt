// src/types/api.ts
export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface DisplayProductDto {
  id: number;
  name: string;
  price: number;
  image_url: string;
  characteristics: string[];
  category: Category;
}

export interface ShoppingCartDto {
  id: number;
  date_created: string;
  user: DisplayUserDto;
  products: DisplayProductDto[];
  status: 'CREATED' | 'CANCELED' | 'FINISHED';
}

export interface DisplayUserDto {
  username: string;
  name: string;
  surname: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}

export interface LoginResponseDto {
  token: string;
}

/* ——— Requests ——— */
export interface CreateProductDto {
  name: string;
  price: number;
  image_url: string;
  characteristics: string[];
  category_id: number;
}

export interface CreateCategoryDto {
  name: string;
  description: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  repeat_password: string;
  name: string;
  surname: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}

export interface LoginUserDto {
  username: string;
  password: string;
}