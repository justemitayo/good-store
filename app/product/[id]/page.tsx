'use client'
import { useGetProduct } from '@/app/hook/product/query'
import { useParams } from 'next/navigation'
import { CircleChevronLeft, Trash2 } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { SquarePen } from 'lucide-react'
import { useDelProduct } from '@/app/hook/product/mutate'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ProductId() {
  const {id} = useParams()
  const {data, isLoading, isError} = useGetProduct(id as string)
  const product = data?.data
  const router = useRouter()
  const delProduct = useDelProduct()

  const [selected, setSelected] = React.useState<{[key: string]: string}>({});
  const [readMore, setReadMore] = React.useState(false);

  
  const handleDelete = () => {
    if(!product?._id) return

    if(!confirm('Are you sure you want to delete this product?')) return
    
    delProduct.mutate({
      _id: product?._id
    }, {
      onSuccess: () => {
        router.back()
      }
    })
  }

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
    <div className='w-[100%] mt-3 flex flex-col gap-[2rem] w-full'>
      <div className='flex items-center justify-between'>
      <CircleChevronLeft  size={30} className='cursor-pointer' onClick={() => router.back()}/>
      <div className='flex gap-[1.5rem]'>
        <SquarePen size={30} className='cursor-pointer hover:text-green-500 transition-colors' onClick={() => router.push(`/product/${id}/edit`)}/>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash2 size={30} className='cursor-pointer hover:text-red-500 transition-colors'/>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this product.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      </div>
      <div className=' md:flex md:items-start md:justify-between md:gap-[2rem]'>
        <div className=' relative md:w-[70%]'> 
        <img alt={product?.name} src={product?.image.url} className='md:h-[70vh] w-full object-cover '/>

        {product?.quantity === 0 && (
          <div className='absolute inset-0 bg-black/50 dark:bg-white/50 flex items-center justify-center'>
            <span className='font-semibold text-white dark:text-black text-4xl'>
              Out of Stock
            </span>
          </div>
        )}
        </div>
        <div className='md:w-[35%]'>
        <div className='flex items-center justify-between mt-2'>
          <h1 className='text-3xl font-bold truncate'>{product?.name}</h1>
          <p className='flex shrink-0'>{product?.updatedAt ? new Date(product!.updatedAt).toLocaleDateString('en-US') : new Date(product!.createdAt).toLocaleDateString('en-US')}</p>
        </div>

        <div className='mt-2 mb-1'>
          {product?.option.map((opt, index) => (
            <div key={index} className='flex items-center gap-[1rem] '>
              <h1 className='text-lg font-bold '>{opt.title}:</h1>
              <div className='flex gap-2'>
                {opt?.value.map((value, index) => (
                  <div key={index} className='mt-2 mb-1' >
                    <button
                    className={`w-[3rem] h-[3rem] bg-violet-600/50 text-sm rounded-lg ${selected[opt.title] === value ? 'ring ring-purple-500 ring-offset-2 rounded-lg' : ''}`}
                    style={opt.title?.toLowerCase() === 'color' ? {backgroundColor: value} : {}}
                      onClick={() => {
                        if(selected[opt.title] === value) {
                          setSelected((prev) => {
                            const next = {...prev}
                            delete next[opt.title]
                            return next
                          })
                        } else {
                          setSelected((prev) => ({...prev, [opt.title]:value}))
                        }
                      }}
                    >
                      {value}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
          
          }
        </div>
        <div  className='flex items-center gap-[1rem]'>
        <h1 className='text-lg'>Price:</h1>
        <h2 className='text-lg flex items-center'><span className='text-2xl'>$</span>{product?.price}</h2>
        </div>
        <div className='flex items-center md:justify-center mb-2'>
        {product?.quantity === 0 ? 
          <button 
              className='w-[13rem] h-[3rem] text-lg flex items-center justify-center bg-purple-500/20  p-1 rounded-lg cursor-not-allowed'
            >Out of Stock</button>
            : <button 
            onClick={(e) => {e.stopPropagation()}}
            className='w-[13rem] h-[3rem] text-lg flex items-center justify-center bg-purple-500 p-1 rounded-lg cursor-pointer hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700'
          >Add</button>
          }
        </div>
        <div>
        <p>{readMore ? product?.description : product?.description?.slice(0, 300)}</p>
        {(product?.description?.length ?? 0)> 300 && (
        <button onClick={() => setReadMore(!readMore)} className='text-violet-600 dark:text-purple-500'>
          {readMore ? 'read less' : 'read more'}
        </button>
        )}
      </div>
    </div>
    </div>
    </div>
  )
}







