import api from "@/src/hooks/useApi";
import { FetchLatestWorksResponse, Platform } from "@/src/types";
export interface FormData {
  title: string;
  platform: Platform | "";
  workLink: string;
  description: string;
}

export const createLatestWork = async (
  formData: FormData,
  imageFile: File | null,
  token: string
) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("platform", formData.platform);
    formDataToSend.append("workLink", formData.workLink);
    formDataToSend.append("description", formData.description);

    if (imageFile) {
      formDataToSend.append("images", imageFile);
    }

    const response = await api.post("/latest-works", formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Failed to create latest work:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create latest work",
    };
  }
};

export const fetchLatestWorks = async (
  page: number = 1,
  limit: number = 2
): Promise<FetchLatestWorksResponse> => {
  try {
    const response = await api.get("/latest-works/all", {
      params: { page, limit },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch latest works:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch latest works"
    );
  }
};

export const deleteLatestWork = async (id: number, token: string) => {
  try {
    const response = await api.delete(`/latest-works/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Failed to delete latest work:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete latest work",
    };
  }
};
