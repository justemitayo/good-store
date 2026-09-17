import { delProduct, postProduct, updProduct } from "@/app/api/product";
import { createProduct, createProductResponse, deleteProduct, deleteProductResponse, updateProduct, updateProductReponse } from "@/app/types/product";
import { useQueryClient, UseMutationResult, useMutation } from "@tanstack/react-query";

export const usePostProduct = ():UseMutationResult< createProductResponse , Error, createProduct > => {
  const queryClient = useQueryClient()
  return useMutation<createProductResponse, Error, createProduct> ({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']})
    }
  })
};

export const useUpdProduct = (): UseMutationResult<updateProductReponse, Error, updateProduct> => {
  const queryClient = useQueryClient()
  return useMutation<updateProductReponse, Error, updateProduct>({
    mutationFn: updProduct,
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({queryKey: ['getProducts']})
      queryClient.invalidateQueries({queryKey: ['getProduct', payload._id]})
    }
  })
}

export const useDelProduct = ():UseMutationResult<deleteProductResponse, Error, deleteProduct> =>  {
  const queryClient = useQueryClient()
  return useMutation<deleteProductResponse, Error, deleteProduct>({
    mutationFn: delProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getProduts']})
    }
  })
}