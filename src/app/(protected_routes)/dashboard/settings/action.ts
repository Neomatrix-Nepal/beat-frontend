import api from "@/src/hooks/useApi";
import { FormSetting } from "@/src/types/setting.type";

export const getSettings = async (token: string) => {
  const response = await api.get("/setting", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateSettings = async (
  id: string,
  body: FormSetting,
  token: string
) => {
  const response = await api.patch("/setting/" + id, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getGenres = async (
  token: string,
  slug: string = "music",
  trending?: boolean
) => {
  const response = await api.get(`/categories/slug/${slug}`, {
    params: { trending },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addGenreAction = async (
  token: string,
  data: { name: string; category_id: number; is_trending?: boolean; slug?: string },
  slug: string = "music"
) => {
  const response = await api.post(`/categories/slug/${slug}/subcategories`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateGenreAction = async (
  token: string,
  id: number,
  data: { name?: string; is_trending?: boolean; slug?: string },
  slug: string = "music"
) => {
  const response = await api.patch(`/categories/slug/${slug}/subcategories/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteGenreAction = async (token: string, id: number, slug: string = "music") => {
  const response = await api.delete(`/categories/slug/${slug}/subcategories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCategories = async (token: string) => {
  const response = await api.get("/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
