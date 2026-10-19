'use client'
import { useRouter } from 'next/navigation'

export default function Registerpage() {
  const router = useRouter()

  router.push('/auth/register')
  return
}

