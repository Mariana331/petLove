import type { Notice } from "../types/notices";
import axios from "axios";

const url = "https://petlove.b.goit.study/api";

export interface NoticeResponse {
  results: Notice[];
  totalPages: number;
}

interface GetNoticeParams {
  page: number;
  limit: number;
  keyword: string;
  location: string;
}

export async function getNotices({
  page,
  limit,
  keyword,
  location,
}: GetNoticeParams): Promise<NoticeResponse> {
  const res = await axios.get<NoticeResponse>(`${url}/notices`, {
    params: { page, limit, keyword, location },
  });
  return res.data;
}
