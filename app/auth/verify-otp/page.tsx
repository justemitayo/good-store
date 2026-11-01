'use client'

import { useGetOTP, useResetPasswordOTP, useVerifyOTP } from '@/app/hook/user/mutate';
import { Alert } from '@/components/ui/alert';
import { OTPField, OTPFieldInput } from '@/components/ui/OTP';
import { useRouter, useSearchParams } from 'next/navigation';
import  React, { useEffect, useState } from 'react'

type alerProp = {
  title: string
  description: string
}

type switchCase = 'register' | 'reset-password';

export default function VerifyOTPPage() {
  const [timer, setTimer] = useState(60);
  const [noResend, setNoResend] = useState(true);
  const [alert, setAlert] = useState<alerProp | null>(null); 
  const [email, setEmail] = useState('')
  const router = useRouter();
  const searchParams = useSearchParams()
  const getOTP = useGetOTP();
  const resetPasswordOTP = useResetPasswordOTP()
  const verifyOTP = useVerifyOTP();

  const flow = (searchParams.get('flow') as switchCase) || 'register'

  const otpLength = 6
  const id = React.useId()
  const descriptionId = `${id}-description`;

  const handleSwitch = (switchCase: switchCase) => {
    switch(switchCase) {
      case 'register': 
        return(
          getOTP.mutate(
            {email},
            {
              onSuccess: () => {
                setAlert({
                title: 'success', 
                description: 'OTP resent successfully'
              })},
              onError: () => {
                  setAlert({
                    title:'Error',
                    description:'Failed to resend OTP. Please wait before trying again.'
                  })
              }
            }
          )
        );
      case 'reset-password': 
        return (
          resetPasswordOTP.mutate(
            {email},
            {
              onSuccess: () => {
                setAlert({
                title: 'success', 
                description: 'OTP resent successfully'
              })},
              onError: () => {
                  setAlert({
                    title:'Error',
                    description:'Failed to resend OTP. Please wait before trying again.'
                  })
              }
            }
          )
        )
      default:
        return false

    }
  }

  const handleRoute = (switchCase: switchCase) => {
    switch(switchCase) {
      case 'register': 
        return router.push('/auth/new-reg');
      case 'reset-password': 
        return router.push('/auth/reset-password');


      default: 
        return false
    }
  }
  
  const handleResendOTP = () => {
    setNoResend(true)
    setTimer(60)
    handleSwitch(flow)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const otp = formData.get('otp') as string

    if(!email || !otp) {
      setAlert({
        title: 'Missing Information',
        description: 'Please provide both email and OTP.',
      });
      return
    }
    verifyOTP.mutate(
      {email, otp},
      {
        onSuccess: () => {
         handleRoute(flow)
        }, 
        onError: () => {
          setAlert({
              title:"Invalid OTP",
              description: "The OTP you entered is incorrect. Please try again."
          })
        }
      }
    )
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem('userMail') || ''
    if (savedEmail !== '') {
          // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(savedEmail)
    }
  }, [])

  useEffect(() => {
    if(!noResend || timer <= 0) return
    const interval = setInterval(() => {
      setTimer((prev) => {
      if(prev <= 1) {
        setNoResend(false)
        clearInterval(interval)
        return 0
      }
      return prev-1
    })
    }, 1000)

    return () => clearInterval(interval);

  }, [noResend, timer])
  return (
    
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] space-y-10 rounded-2xl border border-b border-purple-500 bg-transparent px-6 py-10 shadow-sm"
      >
        <div>
         <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Verify OTP
          </h2>
          <p className="text-sm text-muted-foreground">
          {`Enter the OTP sent to ${email}`}
          </p>
        </div>
        <div>
          <OTPField length={otpLength} id={id}>
            {Array.from({length: otpLength}, (_, index) => (
            <OTPFieldInput 
            aria-label={index === 0 ? undefined : `character ${index + 1} of ${otpLength}`}
              key={index}  />
            ))}
          </OTPField>
          <span id={descriptionId} className="hidden m-0 text-sm text-neutral-600 dark:text-neutral-400">Enter the 6-character code we sent to your device.</span>
        </div>
        </div>
        <div>
          <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded">
          {verifyOTP.isPending ? 'Verifying...' : 'Verify OTP'}
          </button>
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={noResend || getOTP.isPending || resetPasswordOTP.isPending}
              className={`text-sm ${
                noResend 
                  ? 'text-muted-foreground cursor-not-allowed' 
                  : 'text-purple-500 hover:underline cursor-pointer'
              }`}
            >
              {noResend ? `Resend OTP in ${timer}s` : 'Resend OTP'}
            </button>
          </div>
        </div>

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
