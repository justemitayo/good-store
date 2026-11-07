'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface  props {
  category: string,
  setCategory:  React.Dispatch<React.SetStateAction<string>>
}
export default function Minibar({ category, setCategory}: props) {
  return (
    <div className=" flex items-center gap-[1rem] md:gap-[3rem]"> 
      <Button variant='ghost' onClick={() => setCategory('')} className={cn("font-bold text-lg", category === '' &&  "!text-purple-500" )}>All</Button>
      <Button variant='ghost' onClick={() => setCategory('Clothes')} className={cn("font-bold text-lg", category === 'Clothes' &&  "!text-purple-500" )}>Clothes</Button>
      <Button variant='ghost' onClick={() => setCategory('Tech')} className={cn("font-bold text-lg", category === 'Tech' &&  "!text-purple-500" )}>Tech</Button>


    </div>
    
    
  )
}
