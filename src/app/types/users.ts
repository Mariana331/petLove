export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  token: string;
  noticesViewed: [];
  noticesFavorite: [];
  pets: [];
};

export type Pet = {
  _id: string;
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
};

export interface EditUserCurrentRequest {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

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
