import api from "@/src/hooks/useApi";

export const getAllCommissions = async (token: string) => {
  const response = await api.get("payment/all-commissions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const changePayoutStatus = async (
  id: string,
  status: string,
  token: string
) => {
  const response = await api.patch(
    "payment/change-payout-status/" + id,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteCommissionDetail = async (id: string, token: string) => {
  const response = await api.delete("payment/commission/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
