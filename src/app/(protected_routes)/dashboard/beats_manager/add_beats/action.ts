import api from "@/src/hooks/useApi";

export const getGenre = async (slug: string) => {
  const response = await api.get("categories/slug/" + slug);
  return response.data;
};

export const uploadProduct = async (formData: FormData) => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const uploadBeat = async (formData: FormData) => {
  const response = await api.post("/stream/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
