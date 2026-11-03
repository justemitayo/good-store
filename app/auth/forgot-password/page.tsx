'use client'

import { useResetPasswordOTP } from '@/app/hook/user/mutate'
import { Input } from '@/components/primitives/input';
import { alerProp, Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { validateEmail } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function ForgotPassWordPage() {
  const resetPasswordOTP = useResetPasswordOTP()
  const router = useRouter()
  const [alert , setAlert] = useState<alerProp | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const isEmailValid = validateEmail(email)
    if(!isEmailValid) {
      setEmailError(true);
      return
    } else {
      setEmailError(false)
    }
    localStorage.setItem('userMail', email)
    resetPasswordOTP.mutate(
      {email},
      {
        onSuccess: () => {
          router.push('/auth/verify-otp?flow=reset-password')
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
      onSubmit={handleReset}
      className="w-full max-w-[400px] space-y-10 rounded-2xl border border-b border-purple-500 bg-transparent px-6 py-10 shadow-sm"
    >
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
         Forgot your Password?
        </h2>
        <p className="text-sm text-muted-foreground">
          We got you, enter your email address to receive your one-time password.
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


      <Button
        type="submit"
        disabled={resetPasswordOTP.isPending}
        className="w-full font-medium"
      >
        {resetPasswordOTP.isPending ? 'loading...' : 'Reset OTP'}
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
