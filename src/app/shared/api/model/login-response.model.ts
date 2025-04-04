export interface LoginResponse {
  jwtToken: string;
  expiresAt: Date;
  userId: number;
}
