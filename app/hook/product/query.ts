import { getProduct, getProducts } from "@/app/api/product";
import { getProductResponse, getProductsResponse } from "@/app/types/product";
import { useInfiniteQuery, useQuery, type InfiniteData } from "@tanstack/react-query";


export const useGetProducts = ({ limit, search}: {limit: number, search: string}) => {
  return useInfiniteQuery<getProductsResponse, Error, InfiniteData<getProductsResponse>, [string, string], number>({
    queryKey: ['getProducts', search],
    initialPageParam: 1,
    queryFn: ({pageParam = 1}) => getProducts({
      search: search,
      page: pageParam,
      limit: limit || 6
    }),
    getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
    refetchIntervalInBackground: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,

  })
}
export const useGetProduct = (id: string) => {
  return useQuery<getProductResponse, Error>({
    queryKey: ['getProduct', id],
    queryFn: () => getProduct(id),
    enabled: !!id
  })
}
