export interface serverResponse<T> {
  message: string,
  success: boolean,
  data?: T;
}
export interface Auth {
  accessToken?: string,
  userInfo?: {
    email?: string
  }
}

export interface loginRequest {
  email: string,
  password: string
}


export interface registerUser {
  email: string,
  password: string,
  username: string
}

export interface getOTPRequest {
  email: string
}

export type getOTPResponse = serverResponse<string>

export interface verifyOTPRequest {
  email: string, 
  otp: string
}

export type verifyOTPResponse = serverResponse<boolean>

export type authResponse = serverResponse <{
  accessToken?: string,
  userInfo?: {
    email: string, 
    username: string
  }
}>