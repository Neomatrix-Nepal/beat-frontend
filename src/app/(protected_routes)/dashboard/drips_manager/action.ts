import api from "@/src/hooks/useApi";

export const getGenre = async (slug: string) => {
  const response = await api.get("categories/slug/" + slug);
  return response.data;
};

export const getBeats = async (type: string) => {
  const response = await api.get("/products/getall", {
    params: { type },
  });
  return response.data.data;
};

export const updateProduct = async (formData: FormData, productId: string) => {
  const response = await api.patch("/products/" + productId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
