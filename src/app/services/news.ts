import type { NewResult } from "../types/news";
import axios from "axios";

const url = "https://petlove.b.goit.study/api";

export interface NewsResponse {
  results: NewResult[];
  totalPages: number;
}

interface getNewsParams {
  page?: number;
  limit: number;
  keyword: string;
}

export async function getNews({
  page,
  limit,
  keyword,
}: getNewsParams): Promise<NewsResponse> {
  const res = await axios.get<NewsResponse>(`${url}/news`, {
    params: { page, limit, keyword },
  });
  return res.data;
}
