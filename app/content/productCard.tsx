

import { products } from '../types'
import { useRouter } from 'next/navigation'

interface prop {
  product: products
}

export default function ProductCard({product}: prop) {
  const router = useRouter()
  return (
    <div className='bg-purple-50/80 dark:bg-purple-950/50 border border-purple-500/50 dark:border-purple-800/30 rounded-xl max-w-[25rem] h-[27rem] w-full rounded-lg '
     onClick={() => router.push(`product/${product._id}`)}>
      <div className='relative'>
      <img alt={product.name} src={product.image.url} className='w-full object-cover h-[14rem] rounded-t-lg'/>

      {product.quantity === 0 && (
        <div className='absolute inset-0 bg-black/50 dark:bg-white/50 flex items-center justify-center'>
          <span className='font-semibold text-white dark:text-black text-3xl'>
            Out of Stock
          </span>
        </div>
      )}
      </div>
      <div className='flex flex-col gap-[3rem]'>
      <div className='flex items-center justify-between p-3 gap-[1rem]'>
        <h2 className='text-lg truncate'>{product.name}</h2>
        <p className='flex shrink-0'>{product?.updatedAt ? new Date(product.updatedAt).toLocaleDateString('en-US') : new Date(product.createdAt).toLocaleDateString('en-US')}</p>
      </div>
      <div className='flex items-center justify-between p-3 gap-[1rem]'>
        <h2 className='text-lg flex items-center'><span className='text-2xl'>$</span>{product.price}</h2>
        {product.quantity === 0 ? 
          <button 
            className='w-[5rem] bg-purple-500/20 p-1 rounded-lg cursor-not-allowed'
          >Add</button>:
          <button 
          onClick={(e) => {e.stopPropagation()}}
          className='w-[5rem] bg-purple-500 p-1 rounded-lg cursor-pointer hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700'
        >Add</button>
        }     
      </div>
      </div>
    </div>
  )
}

