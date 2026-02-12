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

export type AddPets = {
  _id: string;
  name: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
};

export type AddPetsRequest = {
  title: string;
  name: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
};
