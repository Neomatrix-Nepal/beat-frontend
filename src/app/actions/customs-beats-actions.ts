import api from "@/src/hooks/useApi";
import { FetchCustomBeatsResponse } from "@/src/types/custom-beats";

export const fetchCustomBeats = async (
  page: number = 1,
  limit: number = 2,
  callback?: (response: FetchCustomBeatsResponse) => void
): Promise<FetchCustomBeatsResponse> => {
  try {
    const response = await api.get("/custom-beats", {
      params: { page, limit },
    });
    const data = response.data;
    if (callback) {
      callback(data);
    }
    return data;
  } catch (error: any) {
    console.error("Failed to fetch custom beats:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch custom beats"
    );
  }
};

export const updateCustomBeatStatus = async (
  id: number,
  status: "pending" | "completed" | "in_progress",
  token: string
) => {
  try {
    const response = await api.patch(
      `/custom-beats/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Failed to update custom beat status:", error);

    return {
      success: false,
      error:
        error.response?.data?.message || "Failed to update custom beat status",
    };
  }
};

export const deleteCustomBeat = async (id: number, token: string) => {
  try {
    const response = await api.delete(`/custom-beats/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Failed to delete custom beat:", error);

    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete custom beat",
    };
  }
};
