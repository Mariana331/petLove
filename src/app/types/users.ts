export type User = {
  name: string;
  email: string;
  password: string;
  token: string;
};

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
