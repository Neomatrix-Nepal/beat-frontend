import api from "@/src/hooks/useApi";

export const getAllOrders = async (
  token: string,
  page: number = 1,
  limit: number = 10
) => {
  const response = await api.get("payment/", {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const changeStatus = async (
  id: string,
  status: string,
  token: string
) => {
  const response = await api.patch(
    "payment/" + id,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteOrder = async (id: string, token: string) => {
  const response = await api.delete("payment/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
