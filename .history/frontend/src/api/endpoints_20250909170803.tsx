// src/api/endpoints.ts
import api from '.';
import type {
  DisplayProductDto,
  Category,
  ShoppingCartDto,
  CreateCategoryDto,
  CreateProductDto,
  LoginUserDto,
  LoginResponseDto,
  CreateUserDto,
} from '../types/api';

export const ProductApi = {
  findAll: () => api.get<DisplayProductDto[]>('/api/products'),
  findPaginated: (page = 0, size = 12) =>
    api.get('/api/products/paginated', { params: { page, size } }),
  findByCategory: (id: number, page = 0, size = 12) =>
    api.get(`/api/products/by-category/${id}`, {
      params: { page, size },
    }),
  findRecommended: () => api.get<DisplayProductDto[]>('/api/products/recommended'),
  findOne: (id: number) => api.get<DisplayProductDto>(`/api/products/${id}`),
  create: (dto: CreateProductDto) => api.post('/api/products/add', dto),
  update: (id: number, dto: CreateProductDto) => api.put(`/api/products/edit/${id}`, dto),
  remove: (id: number) => api.delete(`/api/products/delete/${id}`),
};

export const CategoryApi = {
  findAll: () => api.get<Category[]>('/api/categories'),
  create: (dto: CreateCategoryDto) => api.post('/api/categories/add', dto),
  update: (id: number, dto: CreateCategoryDto) =>
    api.put(`/api/categories/edit/${id}`, dto),
  remove: (id: number) => api.delete(`/api/categories/delete/${id}`),
};

export const CartApi = {
  me: () => api.get<ShoppingCartDto>('/api/shopping-cart'),
  add: (id: number) => api.post<ShoppingCartDto>(`/api/shopping-cart/add-product/${id}`),
  remove: (id: number) => api.post<ShoppingCartDto>(`/api/shopping-cart/remove-product/${id}`),
};

export const AuthApi = {
  login: (dto: LoginUserDto) => api.post<LoginResponseDto>('/api/user/login', dto),
  register: (dto: CreateUserDto) => api.post('/api/user/register', dto),
  logout: () => api.get('/api/user/logout'),
};