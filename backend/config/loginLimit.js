import rateLimit from 'express-rate-limit'

export const loginLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 5, 
  message: { success: false, message: 'Too many login attempts. Try again after 24 hours' },
  standardHeaders: true,
  legacyHeaders: false
})