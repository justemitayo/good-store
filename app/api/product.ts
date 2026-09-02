import api from "@/lib/axios";
import { createProduct, createProductResponse, deleteProduct, deleteProductResponse, getProductResponse, getProductsResponse, updateProduct, updateProductReponse } from "../types";


export const getProducts = async({page, limit, search} : {page: number, limit: number, search? : string}): Promise<getProductsResponse> => {
  const res = await api.get('/products', {params:{page, limit, search}})
  return res.data
};

export const getProduct = async(id: string): Promise<getProductResponse> => {
  const res = await api.get(`/products/${id}`)
  return res.data
};

export const postProduct = async(payload: createProduct): Promise<createProductResponse> => {
  const res = await api.post('/products/new', payload)
  return res.data
};

export const updProduct = async(payload: updateProduct): Promise<updateProductReponse> => {
  const res =  await api.put(`/products/${payload._id}`, payload)
  return res.data
};

export const delProduct = async(payload: deleteProduct): Promise<deleteProductResponse> => {
  const res = await api.delete(`/product/${payload._id}`)
  return res.data
};
