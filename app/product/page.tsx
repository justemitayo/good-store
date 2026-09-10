'use client'
import React, { useEffect } from 'react'
import { useGetProducts } from '../hook/product/query'
import ProductCard from '../content/productCard'
import Minibar from '../content/minibar'
import SearchModal from '../content/SearchModal'

export default function ProductPage() {
  const [search, setSearch] = React.useState('')
  const [debouncedSearch, setDebouncedSearch] = React.useState("")
  const [category, setCategory] = React.useState('');



  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const {data, isLoading, isError, hasNextPage, fetchNextPage } = useGetProducts({
    limit: 6,
    search: debouncedSearch
  })
  
  if(isLoading) {
    return <p>loading...</p>
  }
  if(isError) {
    return <p>Error loading product card...</p>
  }

  const products = data?.pages.flatMap((data) => data.data ) ?? []
  const filteredProducts = (category ? products.filter((product) => product.category === category) : products).sort((a, b) => new Date(b?.updatedAt).getTime() - new Date(a?.updatedAt).getTime() )
 
  return (
    <div className=' w-[100%] mb-8' >
      <div className='flex items-center justify-between sticky h-16 z-50 top-18 bg-white/80 dark:bg-black/80 backdrop-blur-md '>
        <Minibar category={category} setCategory={setCategory} />
        <SearchModal search={search} setSearch={setSearch} />
      </div>

      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem] max-w-5xl mx-auto max-w-sm md:max-w-none px-4 w-full'>
        {filteredProducts?.map((product) => {
          return(
            <ProductCard key={product._id} product={product}/> 
          )
        })}
      </div>
      {hasNextPage && (
        <div   className='flex items-center justify-center mt-2'>
        <button onClick={() => fetchNextPage()}
          className='cursor-pointer'
        >
          load more
        </button>
        </div>
      )}

    </div> 
  )
}



