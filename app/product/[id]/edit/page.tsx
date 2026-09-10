'use client'
import ProductForm from '@/app/content/productForm'
import { useGetProduct } from '@/app/hook/product/query'
import { CircleChevronLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'


export default function EditPage() {

  const {id} = useParams()
  const router = useRouter()
  const {data, isLoading, isError} = useGetProduct(id as string);
  const product = data?.data

  if(isLoading) {
    return(
      <>
      <CircleChevronLeft  size={30} className='cursor-pointer' onClick={() => router.back()}/>
       <p className='cursor-wait'>loading...</p>
       </>
    )
  }
  if(isError) {
    return (
      <>
      <CircleChevronLeft  size={30} className='cursor-pointer' onClick={() => router.back()}/>
      <p>Error loading product card...</p>
      </>
    )
  }

  return (
    <div className='mt-2'>
      <div className='flex items-center mb-2'>
       <CircleChevronLeft  size={30} className='cursor-pointer' onClick={() => router.back()}/>
           <h1 className='text-center flex-1 text-lg font-bold'>Create Your Own Product</h1>
       </div>
      <ProductForm product={product!}/>
    </div>

  )
}
