'use client'

import { useGetOTP, useVerifyOTP } from '@/app/hook/user/mutate';
import { Alert } from '@/components/ui/alert';
import { OTPField, OTPFieldInput } from '@/components/ui/OTP';
import { useRouter } from 'next/navigation';
import  React, { useEffect, useState } from 'react'

interface alerProp {
  title: string
  description: string
}

export default function VerifyOTPPage() {
  const [timer, setTimer] = useState(60);
  const [noResend, setNoResend] = useState(true);
  const [alert, setAlert] = useState<alerProp | null>(null); 
  const [email, setEmail] = useState('')
  const router = useRouter()
  const getOTP = useGetOTP();
  const verifyOTP = useVerifyOTP();

  const otpLength = 6
  const id = React.useId()
  const descriptionId = `${id}-dexcription`;
  
  const handleResendOTP = () => {
    setNoResend(true)
    setTimer(60)
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
          router.push('/auth/newReg')
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
            Verify OTP
          </button>
          <span
            onClick={noResend === false ? handleResendOTP : undefined}
           className={`mt-2 inline-block cursor-pointer ${
            noResend ? 'text-red-400 cursor-not-allowed' : 'text-purple-500 hover:underline'
          }`}
        >
          {noResend? `Resend OTP in ${timer}` : 'Resend OTP'}
          </span>
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
