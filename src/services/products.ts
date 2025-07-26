import { api } from "@/lib/api";
import type { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export interface GetProductsParams {
  limit?: number;
  skip?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export const productsService = {
  // Get products with pagination
  getProducts: async (
    params: GetProductsParams = {}
  ): Promise<ProductsResponse> => {
    const { limit = 30, skip = 0 } = params;

    const response = await api.get<ProductsResponse>("/products", {
      params: { limit, skip },
    });

    return {
      products: response.data.products,
      total: response.data.total || response.data.products.length,
    };
  },

  // Get single product by ID
  getProduct: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (
    query: string,
    params: GetProductsParams = {}
  ): Promise<ProductsResponse> => {
    const { limit = 30, skip = 0 } = params;

    const response = await api.get<ProductsResponse>("/products/search", {
      params: { q: query, limit, skip },
    });

    return {
      products: response.data.products,
      total: response.data.total || response.data.products.length,
    };
  },
};

// Custom hook following React Query conventions
export const useGetProducts = (params: GetProductsParams = {}) => {
  const { limit = 30, skip = 0 } = params;

  return useQuery({
    queryKey: ["products", { limit, skip }],
    queryFn: () => productsService.getProducts({ limit, skip }),
  });
};

// Custom hook for single product
export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsService.getProduct(id),
    enabled: !!id,
  });
};

// Custom hook for search
export const useSearchProducts = (
  query: string,
  params: GetProductsParams = {}
) => {
  const { limit = 30, skip = 0 } = params;

  return useQuery({
    queryKey: ["products", "search", query, { limit, skip }],
    queryFn: () => productsService.searchProducts(query, { limit, skip }),
    enabled: !!query,
  });
};
