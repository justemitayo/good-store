'use client'
import { CircleChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import CreateProductForm from '../content/CreateProductForm'

export default function NewProduct() {
  const router = useRouter()
  return (
    <div className='mt-2'>
      <div className='flex items-center mb-2'>
        <CircleChevronLeft  size={30} className='cursor-pointer' onClick={() => router.back()}/>
        <h1 className='text-center flex-1 text-lg font-bold'>Create Your Own Product</h1>
      </div>
      <CreateProductForm />
    </div>
  )
}
