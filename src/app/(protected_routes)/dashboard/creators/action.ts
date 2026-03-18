import api from "@/src/hooks/useApi";
import { FetchCreatorsResponse } from "@/src/types/creator";

export const fetchCreators = async (
  token: string,
  page: number = 1,
  limit: number = 10
): Promise<FetchCreatorsResponse> => {
  try {
    const response = await api.get("/producer-request", {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch creators:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch creators"
    );
  }
};

export const deleteCreator = async (id: number, token: string) => {
  try {
    const response = await api.delete(`/producer-request/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Failed to delete creator:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete creator",
    };
  }
};

export const changeCreatorStatus = async (
  producerRequestId: number,
  status: { status: string },
  token: string
) => {
  try {
    const response = await api.patch(
      "/producer-request/change-user-role/" + producerRequestId,
      status,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to approve creator:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Failed to approve creator",
    };
  }
};
