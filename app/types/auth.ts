export interface serverResponse {
  message: string,
  success: boolean
}
export interface Auth {
  accessToken?: string,
  userInfo?: {
    email?: string
  }
}