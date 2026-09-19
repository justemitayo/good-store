import { getOTP, loginUser, logout, register, resetPassword, resetPasswordOTP, verifyOTP } from "@/app/api/auth";
import { authResponse, getOTPRequest, getOTPResponse, loginRequest, registerUser, verifyOTPRequest, verifyOTPResponse } from "@/app/types/auth";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useLoginUser = ():UseMutationResult<authResponse, Error, loginRequest> => {
  return useMutation<authResponse, Error, loginRequest> ({
    mutationFn: loginUser
  })
}

export const useGetOTP = (): UseMutationResult<getOTPResponse, Error, getOTPRequest> => {
  return useMutation<getOTPResponse, Error, getOTPRequest> ({
    mutationFn: getOTP
  })
}

export const useVerifyOTP = (): UseMutationResult<verifyOTPResponse, Error, verifyOTPRequest> => {
  return useMutation<verifyOTPResponse, Error, verifyOTPRequest> ({
    mutationFn: verifyOTP
  })
}

export const useResetPassword = (): UseMutationResult<authResponse, Error, loginRequest> => {
  return useMutation<authResponse, Error, loginRequest> ({
    mutationFn: resetPassword
  })
}

export const useResetPasswordOTP = (): UseMutationResult<verifyOTPResponse, Error, verifyOTPRequest> => {
  return useMutation<verifyOTPResponse, Error, verifyOTPRequest> ({
    mutationFn: resetPasswordOTP
  })
}

export const useRegister = (): UseMutationResult<authResponse, Error, registerUser> => {
  return useMutation<authResponse, Error, registerUser> ({
    mutationFn: register
  })
}

export const useLogout = (): UseMutationResult<authResponse, Error, void> => {
  return useMutation<authResponse, Error, void> ({
    mutationFn: logout
  })
}