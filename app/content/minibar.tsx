'use client'

interface  props {
  category: string,
  setCategory:  React.Dispatch<React.SetStateAction<string>>
}
export default function Minibar({ setCategory}: props) {
  
  return (
    <div className=" flex items-center gap-[1rem] md:gap-[3rem]"> 
      <button onClick={() => setCategory('')} className="font-bold text-lg">All</button>
      <button onClick={() => setCategory('Clothes')} className="font-bold text-lg">Clothes</button>
      <button onClick={() => setCategory('Tech')} className="font-bold text-lg">Tech</button>


    </div>
    
    
  )
}
