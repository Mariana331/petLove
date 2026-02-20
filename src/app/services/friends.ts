import type { Friend } from "../types/friends";
import { URL } from "./api";
import axios from "axios";

export async function getFriends(): Promise<Friend[]> {
  const res = await axios.get<Friend[]>(`${URL}/friends`);
  return res.data;
}
