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
