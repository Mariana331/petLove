import type { NewResult, NewsResponse } from "../types/news";
import axios from "axios";

const url = "https://petlove.b.goit.study/api";

export async function getNews(): Promise<NewResult[]> {
  const res = await axios.get<NewsResponse>(`${url}/news`);
  return res.data.results;
}
