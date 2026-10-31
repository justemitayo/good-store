import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateEmail = (email: string) => {
  if(!email.includes('@')) return false;
  const parts = email.split('@');
  if(parts.length !== 2) return false;
  const [local, domain] = parts;
  if(!local || !domain || domain.split('.').length < 2) return false;
  const noSpacesRegex = /^[^\s@]+$/
  if (!noSpacesRegex.test(local)) return false;
  return true;
}
