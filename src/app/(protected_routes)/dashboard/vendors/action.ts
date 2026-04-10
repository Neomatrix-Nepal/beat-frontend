"use server";
import api from "@/src/hooks/useApi";
import { FetchVendorsResponse } from "@/src/types/vendor.type";

export const fetchVendors = async (
  token: string,
  page: number = 1,
  limit: number = 10
): Promise<FetchVendorsResponse> => {
  try {
    const response = await api.get("/user/admin/vendors", {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch vendors:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch vendors"
    );
  }
};

export const toggleVendorStatus = async (id: number, token: string) => {
  try {
    const response = await api.patch(
      `/user/admin/toggle-status/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to toggle vendor status:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to toggle status",
    };
  }
};
