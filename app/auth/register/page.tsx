'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useGetOTP } from '@/app/hook/user/mutate'
import { Input } from '@/components/primitives/input'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const getOTP = useGetOTP()
  const router = useRouter()

  const handleGetOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    if (!email) return 

    localStorage.setItem('userMail', email)
    getOTP.mutate(
      { email },
      {
        onSuccess: () => {
          router.push('/auth/verify-otp')
        },
      }
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleGetOTP}
        className="w-full max-w-[400px] space-y-10 rounded-2xl border border-b border-purple-500 bg-transparent px-6 py-10 shadow-sm"
      >
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome to Good Store
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter your email address to receive your one-time password.
          </p>
        </div>

        <div className="space-y-2 flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none text-foreground"
          >
            Email Address
          </label>
          <Input
            variant="email"
            id="email"
            name="email"
            type="email"
            required
            placeholder="Your email address"
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          disabled={getOTP.isPending}
          className="w-full font-medium"
        >
          {getOTP.isPending ? 'Sending OTP...' : 'Get OTP'}
        </Button>
      </form>
    </div>
  )
}