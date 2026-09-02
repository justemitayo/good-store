import api from "@/lib/axios";
import { createProduct, createProductResponse, deleteProduct, deleteProductResponse, getProductResponse, getProductsResponse, updateProduct, updateProductReponse } from "../types";


export const getProducts = async(): Promise<getProductsResponse> => {
  const res = await api.get('/products')
  return res.data
};

export const getProduct = async(id: string): Promise<getProductResponse> => {
  const res = await api.get(`/products/${id}`)
  return res.data
};

export const postProduct = async(payload: createProduct): Promise<createProductResponse> => {
  const res = await api.post('/products', payload)
  return res.data
};

export const updProduct = async(payload: updateProduct): Promise<updateProductReponse> => {
  const res =  await api.put('/products', payload)
  return res.data
};

export const delProduct = async(payload: deleteProduct): Promise<deleteProductResponse> => {
  const res = await api.delete('/product', {data: payload})
  return res.data
};