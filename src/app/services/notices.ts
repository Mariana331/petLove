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
}

export async function getNotices({
  page,
  limit,
  keyword,
}: GetNoticeParams): Promise<NoticeResponse> {
  const res = await axios.get<NoticeResponse>(`${url}/notices`, {
    params: { page, limit, keyword },
  });
  return res.data;
}
