import axios from "axios";
import { URL } from "./api";
import type {
  RegistrationRequest,
  LoginRequest,
  AddPetsRequest,
  EditUserCurrentRequest,
} from "../types/users";

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
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");
  await axios.post(
    `${URL}/users/signout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function GetUserCurrent() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");
  const res = await axios.get(`${URL}/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function GetUserFull() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");
  const res = await axios.get(`${URL}/users/current/full`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function EditUserCurrent(data: EditUserCurrentRequest) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");
  const res = await axios.patch(
    `${URL}/users/current/edit`,
    {
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}

export async function AddPets(data: AddPetsRequest) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");
  const res = await axios.post(
    `${URL}/users/current/pets/add`,
    {
      title: data.title,
      name: data.name,
      imgURL: data.imgURL,
      species: data.species,
      birthday: data.birthday,
      sex: data.sex,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}

export async function DeletePets(id: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");
  const res = await axios.delete(`${URL}/users/current/pets/remove/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
