export interface User {
  email: string;
  nickname: string;
}

export interface UserResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: User;
}
