import api from "@/src/hooks/useApi";
import { BlogFormData, FetchBlogsResponse } from "@/src/types";

export const createBlog = async (
  formData: BlogFormData,
  imageFile: File | null,
  token: string
) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("content", formData.content);

    if (imageFile) {
      formDataToSend.append("thumbnail", imageFile);
    }

    const response = await api.post("/blogs", formDataToSend, {
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
    console.error("Failed to create blog:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create blog",
    };
  }
};

export const fetchBlogs = async (
  page: number = 1,
  limit: number = 5
): Promise<FetchBlogsResponse> => {
  try {
    const response = await api.get("/blogs", {
      params: { page, limit },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blogs:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch blogs");
  }
};

export const updateBlog = async (
  id: number,
  formData: BlogFormData,
  imageFile: File | null = null,
  token: string
) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("content", formData.content);

    if (imageFile) {
      formDataToSend.append("thumbnail", imageFile);
    }

    const response = await api.put(`/blogs/${id}`, formDataToSend, {
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
    console.error("Failed to update blog:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update blog",
    };
  }
};

export const deleteBlog = async (id: number, token: string) => {
  try {
    await api.delete(`/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Failed to delete blog:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete blog",
    };
  }
};
