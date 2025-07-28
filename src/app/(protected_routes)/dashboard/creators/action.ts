import api from "@/src/hooks/useApi";
import { FetchCreatorsResponse } from "@/src/types/creator";

export const fetchCreators = async (
  token: string
): Promise<FetchCreatorsResponse> => {
  try {
    const response = await api.get("/producer-request", {
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

export const deleteMultipleCreators = async (ids: number[]) => {
  try {
    const deletePromises = ids.map((id) =>
      api.delete(`/producer-request/${id}`)
    );
    await Promise.all(deletePromises);
    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Failed to delete multiple creators:", error);
    return {
      success: false,
      error:
        error.response?.data?.message || "Failed to delete multiple creators",
    };
  }
};

export const approveCreator = async (
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
