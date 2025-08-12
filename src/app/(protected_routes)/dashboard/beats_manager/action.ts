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

export const uploadProduct = async (formData: FormData, token: string) => {
  const response = await api.post("/products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProduct = async (
  formData: FormData,
  productId: string,
  token: string
) => {
  const response = await api.patch("/products/" + productId, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (productId: string, token: string) => {
  const response = await api.delete("/products/" + productId, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const uploadMusic = async (formData: FormData, token: string) => {
  const response = await api.post("/stream/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
