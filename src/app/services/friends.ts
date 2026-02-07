import type { Friend } from "../types/friends";
import axios from "axios";

const url = "https://petlove.b.goit.study/api";

export async function getFriends(): Promise<Friend[]> {
  const res = await axios.get<Friend[]>(`${url}/friends`);
  return res.data;
}
