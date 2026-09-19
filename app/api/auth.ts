import api from '@/lib/axios'
import { authResponse, getOTPRequest, getOTPResponse, loginRequest, registerUser, verifyOTPRequest, verifyOTPResponse } from '../types/auth'

export const loginUser = async(payload: loginRequest): Promise<authResponse> => {
  const res = await api.post('/auth/login', payload)
  return res.data
}

export const getOTP = async(payload: getOTPRequest): Promise<getOTPResponse> => {
  const res = await api.post('/auth/sendOTP', payload)
  return res.data
}

export const verifyOTP = async(payload: verifyOTPRequest): Promise<verifyOTPResponse> => {
  const res = await api.post('/auth/verify', payload)
  return res.data
}

export const resetPasswordOTP = async(payload: verifyOTPRequest): Promise<verifyOTPResponse>  => {
  const res = await api.post('/auth/resetOTP', payload)
  return res.data
}

export const resetPassword = async(payload: loginRequest): Promise<authResponse> => {
  const res = await api.post('/auth/resetPassword', payload)
  return res.data
}

export const register = async(payload: registerUser): Promise<authResponse> => {
  const data = new FormData()
  data.append('username', payload.username)
  data.append('email', payload.email)
  data.append('password', payload.password)

  const res = await api.post('/auth/register', data)
  return res.data
}

export const logout = async(): Promise<authResponse> => {
  const res = await api.post('/auth/logout')
  return res.data
}