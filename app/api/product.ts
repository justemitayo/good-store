import api from "@/lib/axios";
import { createProduct, createProductResponse, deleteProduct, deleteProductResponse, getProductResponse, getProductsResponse, updateProduct, updateProductReponse } from "../types/product";


export const getProducts = async({page, limit, search} : {page: number, limit: number, search? : string}): Promise<getProductsResponse> => {
  const res = await api.get('/products', {params:{page, limit, search}})
  return res.data
};

export const getProduct = async(id: string): Promise<getProductResponse> => {
  const res = await api.get(`/products/${id}`)
  return res.data
};

export const postProduct = async(payload: createProduct): Promise<createProductResponse> => {
  const formData = new FormData()
  formData.append('name', payload.name)
  formData.append('category', payload.category )
  formData.append('description' , payload.description)
  formData.append('price', String(payload.price))
  formData.append('quantity', String(payload.quantity ))
  formData.append('option', String(payload.option ));
  if(payload.image instanceof File) {
    formData.append('image', payload.image)
  }
  
  const res = await api.post('/products', formData)
  return res.data
};

export const updProduct = async(payload: updateProduct): Promise<updateProductReponse> => {
  const formData = new FormData()
  formData.append('name', payload.name ?? '')
  formData.append('category', payload.category ?? '')
  formData.append('description' , payload.description ?? '')
  formData.append('price', String(payload.price ?? ''))
  formData.append('quantity', String(payload.quantity ?? ''))
  formData.append('option', JSON.stringify(payload.option ?? []))
  if(payload.image instanceof File) {
    formData.append('image', payload.image)
  }
  const res =  await api.put(`/products/${payload._id}`, formData)
  return res.data
};

export const delProduct = async(payload: deleteProduct): Promise<deleteProductResponse> => {
  const res = await api.delete(`/products/${payload._id}`)
  return res.data
};
