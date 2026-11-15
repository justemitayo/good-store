'use client'
import React from 'react'
import { useCartStore } from '../store/cart.store'
import { Trash2 } from 'lucide-react'

export const CartCard = () => {
  const {cart, increaseQty, decreaseQty, removeFromCart} = useCartStore()
  return (
    <div>
      {
        cart.map((cart) => (
          <div key={cart.cartId} className='ma-w-[400px] h-[50px] bg-transparent border border-purple-600 rounded-lg flex items-center gap-4 '>
            <img alt='' src={cart.image?.url} className='w-[20%] h-full object-cover rounded-l-lg' />
            <div>
              <div className='flex items-center justify-between w-full'>
                <h3>{cart.name}</h3>
                <Trash2 size={16} onClick={() => removeFromCart(cart.cartId)} className='cursor-pointer'/>
              </div>
              <div className='flex flex-col gap-1'>
              {
                cart.option.map((option, index) => (
                  <p key={index}>
                    {option.title}: {option.value}
                  </p>
                )
                )
              }
              </div>
              <div className='w-full flex items-center justify-between'>
                <div className='w-[5.5rem] h-[2rem] bg-purple-600 flex items-center p-[5px] justify-between rounded-lg'>
                  <span className='w-[1.75rem] h-[1.75rem] flex items-center justify-center text-lg cursor-pointer bg-none text-[#d8b4fe' onClick={() => decreaseQty(cart.cartId)}>-</span>
                  <p className='text-white text-xs'>{cart.cartQuantity}</p>
                  <span  className='w-[1.75rem] h-[1.75rem] flex items-center justify-center text-lg cursor-pointer bg-none text-[#d8b4fe' onClick={() => increaseQty(cart.cartId)}>+</span>
                </div>
                <h2 className='text-lg flex items-center'><span className='text-2xl'>$</span>{cart.price}</h2>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
