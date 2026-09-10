import React from 'react'
import { products } from '../types'
import { useUpdProduct } from '../hook/product/mutate'
import { SquarePlus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface prop {
  product: products
}
export default function ProductForm({product}: prop) {

  const updProduct = useUpdProduct();
  const router = useRouter()

  const [name, setName] = React.useState( product?.name ?? '')
  const [category, setCategory] = React.useState(product?.category ?? '')
  const [price, setPrice] = React.useState(String(product?.price ?? ''))
  const [description, setDescription] = React.useState(product?.description ?? '')
  const [quantity, setQuantity] = React.useState(String(product?.quantity ?? ''))
  const [image, setImage] = React.useState(product?.image ?? {
    url: '',
    publicId: ''
  })
  const [previewImage, setPreviewImage] = React.useState<File>()
  const [option, setOption] = React.useState<{title:string; value:string[]}[]>(product?.option ?? []);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    updProduct.mutate({
      _id: product._id,
      name,
      category,
      price: Number(price),
      description,
      quantity: Number(quantity),
      image: previewImage,
      option
    }, {
      onSuccess: () => {
        router.back()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className='mt-3 mb-3'>
      <div className='w-[100%] mt-3 md:flex gap-[2rem] w-full'>
        <div className='md:w-[60%]'>
          <input
            type='file'
            accept='image/*'
            className='cursor-pointer w-[50%] h-[2rem] px-2 border rounded-lg outline-2 outline-purple-500 mb-2'
            onChange={(e) => {
              const file = e.target.files?.[0]

              if(!file) return

              setPreviewImage(file)
            }}
          />
          {previewImage ?  (
            <img src={URL.createObjectURL(previewImage)}
            alt='New Product'
            className='md:h-[70vh] w-full object-cover '
            /> 
          ) : (
            <img src={image.url}
            alt={product.name}
            className='md:h-[70vh] w-full object-cover '
            /> 
          )}
        </div>

        <div className='md:w-[40%] flex flex-col gap-2'>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-lg font-bold'>Name:</label>
            <input 
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-[100%] h-[3rem] px-2 border rounded-lg outline-2 outline-purple-500'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='cayegory' className='text-lg font-bold'>Category:</label>
            <input 
              id='category'
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-[100%] h-[3rem] px-2 border rounded-lg outline-2 outline-purple-500'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='price' className='text-lg font-bold'>Price:</label>
            <input 
              id='price'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='w-[100%] h-[3rem] px-2 border rounded-lg outline-2 outline-purple-500'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='quantity' className='text-lg font-bold'>Quantity:</label>
            <input 
              id='quantity'
              type='number'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='w-[100%] h-[3rem] px-2 border rounded-lg outline-2 outline-purple-500'
            />
          </div>

      


            {/* options subheading */}
            <div>
              <div className='flex items-center justify-between mb-2'>
                <h3 className='text-lg font-bold'>Options</h3>
                <button
                  type = 'button'
                  onClick={() => setOption((prev) => [...prev, {title: '', value: ['']}])}
                  className='flex items-center justify-center text-lg font-bold gap-1 cursor-pointer '
                >
                  <SquarePlus size={20} />
                </button>
              </div>
              {/* the title for each option */}
              {option.map((opt, i) => (
                <div key={i} className='flex flex-col gap-2'>

                  <div className='flex items-center justify-between gap-[2rem] mt-1 relative'> 
                    <input 
                      type='text'
                      placeholder='Option Name...'
                      className='w-[100%] h-[2rem] px-2 pr-10 border rounded-lg outline-2 outline-purple-500'
                      value={opt.title ?? ''}
                      onChange={(e) => {setOption((prev) => 
                        prev.map((item, index) => index === i ? {...item, title: e.target.value} : item
                      ))}}
                    />
                    <button 
                      type = 'button'
                      onClick={() => setOption((prev) => 
                        prev.filter((_, index) => index !== i )
                      )}
                      className='absolute right-2 top-1/2 -translate-y-1/2'
                    >
                      <Trash2 size={25} className='cursor-pointer  hover:text-red-500 transition-colors' />
                    </button>
                  </div>

                  <div className='mt-1 mb-3 '>
                    {/* the value for each option  */}
                    {opt?.value.map((value, valIndex) => (
                      <div key={valIndex} className='flex items-center justify-between gap-[2rem] mb-2 relative w-[50%]'>
                        <input 
                          type='text'
                          value={value ?? ''}
                          placeholder='value'
                                              className='w-full h-[2rem] pr-10 px-2 border rounded-lg outline-2 outline-violet-500 '
                          onChange={(e) => setOption((prev) => 
                            prev.map((item, index) => index === i ? 
                              {...item, value: item.value.map((currValue, index) => index === valIndex ?
                                e.target.value : currValue
                              )} 
                              : item) 
                          )}  
                        />
                        <button
                          type = 'button'
                          onClick={() => setOption((prev) => 
                            prev.map((item, index) => index === i ?
                            {...item, value: item.value.filter((_, index) =>  index !== valIndex)} : item))}
                            className='absolute right-2 top-1/2 -translate-y-1/2'
                        >
                          <Trash2 size={25} className='cursor-pointer  hover:text-red-500 transition-colors' /> 
                        </button>
                      </div>
                    ))}
                    <div className='flex items-center justify-center'>
                    <button
                      type = 'button'
                    onClick={() => setOption((prev) => 
                      prev.map((item, index) => index === i ? {...item, value: [...item.value, '']} : item))}
                      className='flex items-center justify-center text-lg  gap-1 cursor-pointer w-[13rem] h-[2rem] bg-purple-500 p-1 rounded-lg hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700'
                    >
                      Add More 
                    </button>

                    </div>
                  </div>

                </div>
              ))}

            </div>

            <div className='flex flex-col'>
              <label htmlFor='description' className='text-lg font-bold'>Description:</label>
              <textarea 
                id='description' 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-[100%] h-[15rem] px-2 py-2 border rounded-lg outline-2 outline-purple-500'
              />
          </div>

        </div>
      </div>
      <div className='mt-3 mb-5 flex items-center justify-center'>
        <button type='submit'
        className ='w-[13rem] h-[3rem] text-lg flex items-center justify-center bg-purple-500 p-1 rounded-lg cursor-pointer hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700'
        >Edit Product</button>
      </div>
    </form>
  
  )


}
