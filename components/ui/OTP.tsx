 import * as React from 'react'
 import { OTPField as OTPFieldPrimitive } from '@base-ui/react'
 import { cn } from '@/lib/utils'

 function OTPField({className, ...props}: OTPFieldPrimitive.Root.Props) {
  return(
     <OTPFieldPrimitive.Root 
     className={cn('flex items-center justify center gap-2 md:gap-4 w-full', className)}
     data-slot="otp-field" {...props} />
  )}

 function OTPFieldInput({className, ...props}: OTPFieldPrimitive.Input.Props) {
  return(
    <OTPFieldPrimitive.Input
    className={cn(
      'h-12 w-10 text-center text-lg font-semibold border rounded-md shadow-xs transition-all outline-none',
      'focus:border-ring focus:ring-2 focus:ring-ring/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      
      'aria-invalid:border-red-500 aria-invalid:text-red-600 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-500/20',
      'data-[invalid]:border-red-500 data-[invalid]:text-red-600 data-[invalid]:focus:border-red-500 data-[invalid]:focus:ring-red-500/20',
      className
    )}
      data-slot='otp-field-input' {...props} />
  )}


  export {OTPField, OTPFieldInput}