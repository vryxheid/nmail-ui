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
  id: number;
  name: string | null;
  email: string;
  password: string;
  phone: string | null;
  lastLogIn: Date | null;
  superAdmin: boolean;
}

export interface UserReduced {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  lastLogIn: Date | null;
  superAdmin: boolean;
}
