import type { Notice } from "../types/notices";
import axios from "axios";
import { URL } from "./api";

export interface NoticeResponse {
  results: Notice[];
  totalPages: number;
}

interface GetNoticeParams {
  page: number;
  limit: number;
  keyword: string;
  category: string;
  species: string;
  sex: string;
  locationId: string;
  byPopularity: boolean | null;
  byPrice: boolean | null;
}

export async function getNotices({
  page,
  limit,
  keyword,
  category,
  species,
  sex,
  locationId,
  byPopularity,
  byPrice,
}: GetNoticeParams): Promise<NoticeResponse> {
  const res = await axios.get<NoticeResponse>(`${URL}/notices`, {
    params: {
      page,
      limit,
      keyword,
      category,
      species,
      sex,
      locationId,
      byPopularity,
      byPrice,
    },
  });
  return res.data;
}

export async function getNoticeById(id: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");
  const res = await axios.get(`${URL}/notices/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function addFavorite(id: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");
  const res = await axios.post(
    `${URL}/notices/favorites/add/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}

export async function deleteFavorite(id: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");
  const res = await axios.delete(`${URL}/notices/favorites/remove/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
