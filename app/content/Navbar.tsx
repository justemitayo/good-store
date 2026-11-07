'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { X, Sun, Moon } from 'lucide-react';
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react'
import { useAuthStore } from '../store/auth.store';

//set onclick on everything should have setopen(false) 
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const {theme, setTheme} = useTheme();
  const auth = useAuthStore().auth


  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  return (
    <div className='h-18 top-0 sticky z-50 flex justify-between items-center border-b-4 border-purple-500 w-full px-4 sm:px-12 lg:px-16 bg-white/80 dark:bg-black/80 backdrop-blur-md'>
      <Link className='text-3xl text-purple-500 font-bold' href='/' >Goodstore</Link>
      <div className='flex items-center gap-[1rem]'>
      {mounted && (
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'light' ?  <Moon size={20} /> : <Sun size={20}/> }
      </button>
    )}
      <ul className='hidden md:block'>
        <li className='flex items-center gap-[1rem] '>
          <DropdownMenu>
                <DropdownMenuTrigger className='hover:text-purple-100'>Currency</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>$ USD</DropdownMenuItem>
                  <DropdownMenuItem>£ GBP</DropdownMenuItem>
                  <DropdownMenuItem>A$ AUD</DropdownMenuItem>
                  <DropdownMenuItem>¥ JYP</DropdownMenuItem>
                  <DropdownMenuItem>₽ RUB</DropdownMenuItem>
                </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/cart" className='hover:text-purple-500'>Cart</Link>
          {auth ?   (
              <Link href="/new" className='hover:text-purple-100'>New</Link>
              ):  <></>  }
              {auth ? (
                <Link href="/account" className='hover:text-purple-100'>Account</Link>): (
                <Link href='/auth/register' className='hover:text-purple-100'>Sign in</Link>)

              }

            
        </li>
      </ul>

      <button
        onClick={() => setOpen(!open)}
        className='md:hidden'
        aria-label='Toggle Menu'
      >
        {open ? <X size={20}/> : <Menu size={20}/> }
      </button>
      </div>
      {open && (
        <div className='absolute top-full right-0 w-[70%] bg-purple-500 rounded-sm py-4' >
          <ul className='md:hidden'>
            <li className='flex flex-col items-center gap-[1rem] '>
              <DropdownMenu>
                <DropdownMenuTrigger className='hover:text-purple-100'>Currency</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>$ USD</DropdownMenuItem>
                  <DropdownMenuItem>£ GBP</DropdownMenuItem>
                  <DropdownMenuItem>A$ AUD</DropdownMenuItem>
                  <DropdownMenuItem>¥ JYP</DropdownMenuItem>
                  <DropdownMenuItem>₽ RUB</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/cart" className='hover:text-purple-100'>Cart</Link>
              {auth ?   (
              <Link href="/new" className='hover:text-purple-100'>New</Link>
              ):  <></>  }
              {auth ? (
                <Link href="/account" className='hover:text-purple-100'>Account</Link>): (
                <Link href='/auth/register' className='hover:text-purple-100'>Sign in</Link>)

              }

              
            </li>
          </ul>
        </div>
      )

      }
    </div>
  )
}
