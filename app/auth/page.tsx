'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function Registerpage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/register')
  }, [router])
  return <p>loading...</p>
}

