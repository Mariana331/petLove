import axios from "axios";
import type {
  RegistrationRequest,
  LoginRequest,
  AddPetsRequest,
} from "../types/users";

const URL = "https://petlove.b.goit.study/api";

export async function SignUp(data: RegistrationRequest) {
  const res = await axios.post(`${URL}/users/signup`, {
    name: data.name,
    email: data.email,
    password: data.password,
  });
  return res.data;
}

export async function SignIn(data: LoginRequest) {
  const res = await axios.post(`${URL}/users/signin`, {
    email: data.email,
    password: data.password,
  });
  return res.data;
}

export async function SignOut() {
  await axios.post(`${URL}/users/signout`);
  localStorage.removeItem("userName");
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
}

export async function AddPets(data: AddPetsRequest) {
  const res = await axios.post(`${URL}/users/current/pet/edd`, {
    title: data.title,
    name: data.name,
    imgURL: data.imgURL,
    species: data.species,
    birthday: data.birthday,
    sex: data.sex,
  });
  return res.data;
}
