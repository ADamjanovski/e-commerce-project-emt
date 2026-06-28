// src/api/endpoints.ts
import api from '.';
import {
  type DisplayProductDto,
  type Category,
  type ShoppingCartDto,
  type CreateCategoryDto,
  type CreateProductDto,
  type LoginUserDto,
  type LoginResponseDto,
  type CreateUserDto,
  type DisplayUserDto,
} from '../types/api';

export const ProductApi = {
  findAll: () => api.get<DisplayProductDto[]>('/products'),
  findPaginated: (page = 0, size = 10) =>
    api.get('/products/paginated', { params: { page, size } }),
  findByCategory: (id: number, page = 0, size = 10) =>
    api.get(`/products/by-category/${id}`, {
      params: { page, size },
    }),
  findRecommended: () => api.get<DisplayProductDto[]>('/products/recommended'),
  findOne: (id: number) => api.get<DisplayProductDto>(`/products/${id}`),
  create: (dto: CreateProductDto) => api.post('/products/add', dto),
  update: (id: number, dto: CreateProductDto) => api.put(`/products/edit/${id}`, dto),
  remove: (id: number) => api.delete(`/products/delete/${id}`),
};

export const CategoryApi = {
  findAll: () => api.get<Category[]>('/categories'),
  create: (dto: CreateCategoryDto) => api.post('/categories/add', dto),
  update: (id: number, dto: CreateCategoryDto) =>
    api.put(`/categories/edit/${id}`, dto),
  remove: (id: number) => api.delete(`/categories/delete/${id}`),
};

export const CartApi = {
  me: () => api.get<ShoppingCartDto>('/shopping-cart'),
  add: (id: number) => api.post<ShoppingCartDto>(`/shopping-cart/add-product/${id}`),
  remove: (id: number) => api.post<ShoppingCartDto>(`/shopping-cart/remove-product/${id}`),
  checkout: (cartId: number) => api.post(`/shopping-cart/checkout/${cartId}`),
  past: () => api.get<ShoppingCartDto[]>(`/shopping-cart/past-carts`),
  details: (id: number) => api.get<ShoppingCartDto>(`/shopping-cart/${id}`),
};

export const AuthApi = {
  login: (dto: LoginUserDto) => api.post<LoginResponseDto>('/user/login', dto),
  register: (dto: CreateUserDto) => api.post('/user/register', dto),
  logout: () => api.get('/user/logout'),
  info: () => api.get<DisplayUserDto>('/user/info'),
};
