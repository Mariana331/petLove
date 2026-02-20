import type { NewResult } from "../types/news";
import axios from "axios";
import { URL } from "./api";

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
  const res = await axios.get<NewsResponse>(`${URL}/news`, {
    params: { page, limit, keyword },
  });
  return res.data;
}
