'use client'

import { useRegister } from "@/app/hook/user/mutate";
import { useAuthStore } from "@/app/store/auth.store";
import { Input } from "@/components/primitives/input";
import { alerProp, Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function NewUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter();
  const [alert, setAlert] = useState<alerProp | null>(null);
  const [showPassword, setShowPassword] =useState(false);
  const updateAuth = useAuthStore().updateAuth;
  const register = useRegister();

  const passwordMatch = confirmPassword.length > 0 && password !== confirmPassword

  const handleNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string

    const payload = {
      email: email.trim(),
      username: username.trim(),
      password: password.trim()
    }

    if(password === confirmPassword) {
      register.mutate(
        payload,
        {
          onSuccess: async(res) => {
            if(res.data?.accessToken){
              updateAuth(res.data)
            }
            router.push('/')
          }
        }
      )
    } else {
      setAlert({
        title: 'Registration failed',
        description: 'Invalid password check. Please ensure you confirm the right password'
      })
    }
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem('userMail') || ''
    if (savedEmail !== '') {
          // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(savedEmail)
    }
  }, [])
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
    <form
      onSubmit={handleNewUser}
      className="w-full max-w-[400px] space-y-10 rounded-2xl border border-b border-purple-500 bg-transparent px-6 py-10 shadow-sm"
    >
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome to Good Store
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your email address"
          className="w-full"
        />
  
    
        <label
          htmlFor="username"
          className="text-sm font-medium leading-none text-foreground"
        >
          Username
        </label>
        <Input
          variant="text"
          id="username"
          name="username"
          type= 'text'
          required
          placeholder="Your username"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <label
          htmlFor="confirm-password"
          className="text-sm font-medium leading-none text-foreground"
        >
          Confirm Password
        </label>
        <div className='relative'>
        <Input
          variant="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error= {passwordMatch}
          type= {showPassword ? 'text' : 'password'}
          required
          placeholder="Confirm your password"
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

      <Button
        type="submit"
        disabled={register.isPending}
        className="w-full font-medium"
      >
        {register.isPending ? 'loading...' : 'Create Account'}
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
