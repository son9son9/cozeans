export interface ILoginRequest {
  userId: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  isInvalid?: boolean;
  sessionInfo?: any;
}
