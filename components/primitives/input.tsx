import { cn } from '@/lib/utils'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  variant?: 'text' | 'email' | 'password'
}

export function Input({ className, error, variant = 'text', ...props }: InputProps) {
  return (
    <input
      type={variant}
      className={cn(
        'w-full border border-gray/50 rounded-2xl px-3 py-2 text-sm text-black dark:text-white/50 outline-none shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] bg-transparent h-[3.25rem]',
        'focus:border-[var(--color-textarea-focus)] transition-colors',
        'placeholder:text-purple/500',
        error && 'border-red-500',
        className,
      )}
      {...props}
    />
  )
}