'use client'

import { useLoginUser } from '@/app/hook/user/mutate';
import { useAuthStore } from '@/app/store/auth.store';
import { Input } from '@/components/primitives/input'
import { alerProp, Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const loginUser = useLoginUser();
  const updateAuth = useAuthStore().updateAuth
  const [alert, setAlert] = useState<alerProp | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string;
    const password =  formData.get('password') as string
    if(!email || !password) return;

    loginUser.mutate(
      {email: email.trim(), password},
      {
        onSuccess: async(res) => {
          if(res.data?.accessToken){
            updateAuth(res.data)
          }
          router.push('/')
        },
        onError: () => {
          setAlert({
              title:"Login failed",
              description: "Invalid email or password. Please try again."
          })
        }
      }
    )
  } 
  

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
    <form
      onSubmit={handleLogin}
      className="w-full max-w-[400px] space-y-10 rounded-2xl border border-b border-purple-500 bg-transparent px-6 py-10 shadow-sm"
    >
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back to Good Store
        </h2>
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
  
     
        <label
          htmlFor="password"
          className="text-sm font-medium leading-none text-foreground"
        >
          Password
        </label>
        <div className='relative'>
        <Input
          variant="password"
          id="password"
          name="password"
          type= {showPassword ? 'text' : 'password'}
          required
          placeholder="Your password"
          className="w-full"
        />
        <Button
          type='button'
          variant= 'ghost'
          size='icon-lg'
          aria-label={showPassword ? 'hide password' : 'show password'}
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-1 top-1/2 -translate-y-1/2'
        >
          {showPassword ? <EyeClosed size={18}/> : <Eye size={18}/>}
        </Button>
        </div>
        </div>

        <div className='space-y-3 flex justify-between'>
          <div className='flex flex-col gap-2'>
            <Link href='/auth/register' className='text-purple-500 hover:underline cursor-pointer' 
            >register here</Link>
          </div>

     
          
          <Link href='/auth/forgot-password' className='text-purple-500 hover:underline cursor-pointer' 
            >forgot password?</Link>

        </div>

      <Button
        type="submit"
        disabled={loginUser.isPending}
        className="w-full font-medium"
      >
        {loginUser.isPending ? 'loading...' : 'Login'}
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
