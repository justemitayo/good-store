import React from 'react'
import { CartCard } from '../content/cartCard'

export default function CartPage () {
  return (
    <div className='container-layout flex items-center justify-center p-9 w-full overflow-hidden'>
      <div className='px-section'>
        <div  className='h-[15%] bg-blue-900'>
          <h1>Your Selection</h1>
        </div>  
        <div className='h-[60%]'>
          <CartCard />
        </div>
        
      </div>
    </div>
  )
}
