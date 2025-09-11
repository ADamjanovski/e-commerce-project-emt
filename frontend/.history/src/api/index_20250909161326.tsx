import axios from "axios";
import { components } from "../types/api";

// Type aliases for easier use
export type Pageable = components["schemas"]["Pageable"];
export type DisplayProductDto = components["schemas"]["DisplayProductDto"];
export type PageDisplayProductDto = components["schemas"]["PageDisplayProductDto"];
export type DisplayCategoryDto = components["schemas"]["DisplayCategoryDto"];
export type LoginUserDto = components["schemas"]["LoginUserDto"];
export type LoginResponseDto = components["schemas"]["LoginResponseDto"];

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPaginatedProducts = async (pageable: Pageable) => {
  const { data } = await apiClient.get<PageDisplayProductDto>(
    "/api/products/paginated",
    { params: pageable },
  );
  return data;
};

export const getProductsByCategory = async (
  id: number,
  pageable: Pageable,
) => {
  const { data } = await apiClient.get<PageDisplayProductDto>(
    `/api/products/by-category/${id}`,
    { params: pageable },
  );
  return data;
};

export const getAllCategories = async () => {
  const { data } = await apiClient.get<DisplayCategoryDto[]>("/api/categories");
  return data;
};

export const loginUser = async (loginDto: LoginUserDto) => {
  const { data } = await apiClient.post<LoginResponseDto>(
    "/api/user/login",
    loginDto,
  );
  return data;
};