'use client'


interface  props {
  search: string,
  setSearch:  React.Dispatch<React.SetStateAction<string>>
}

export default function SearchModal({search, setSearch}: props) {
 
  return (
    <div className="border border-purple-500 h-9 rounded-lg flex items-center ">
      <input 
      placeholder='search for products...'
      value={search}
      onChange={( (e) => setSearch( e.target.value))}
      className="text-center border-none outline-none"
      />

    </div>
  )
}
