export interface User {
  id: number;
  name: string | null;
  email: string;
  password: string;
  phone: string | null;
  lastLogIn: Date | null;
  superAdmin: boolean;
}

export interface RegisterUserRequest {
  name: string | null;
  email: string;
  phone: string | null;
  password: string;
  repeatPassword: string;
}
