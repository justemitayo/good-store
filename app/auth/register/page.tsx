'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetOTP } from '@/app/hook/user/mutate'
import { Input } from '@/components/primitives/input'
import { Button } from '@/components/ui/button'
import { alerProp, Alert, } from '@/components/ui/alert'
import { validateEmail } from '@/lib/utils'
import Link from 'next/link'

export default function RegisterPage() {
  const getOTP = useGetOTP()
  const router = useRouter()

  const [alert , setAlert] = useState<alerProp | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState('');



  const handleGetOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isEmailValid = validateEmail(email);
    if(!isEmailValid) {
      setEmailError(true);
      return
    } else{
      setEmailError(false)
    }
    if (!email) return 

    localStorage.setItem('userMail', email)
    getOTP.mutate(
      { email },
      {
        onSuccess: () => {
          router.push('/auth/verify-otp')
        },
        onError: () => {
          setAlert({
              title:"Invalid Email",
              description: "The Email you entered is incorrect. Please try again."
          })
        }
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) setEmailError(false)
            }}
            error= {emailError}
            required
            placeholder="Your email address"
            className="w-full"
          />
        </div>

        <div className='flex gap-2'>
          <span>Already got an account?</span>
          <Link  href='/auth/login' className='text-purple-500 hover:underline cursor-pointer' 
          >login here</Link>
        </div>

        <Button
          type="submit"
          disabled={getOTP.isPending}
          className="w-full font-medium"
        >
          {getOTP.isPending ? 'loading...' : 'Get OTP'}
        </Button>
      </form>
        {alert && (
          <Alert
            title={alert.title}
            description={alert.description}
            onClose={() => setAlert(null)}
                />
              )}
    </div>
  )
}