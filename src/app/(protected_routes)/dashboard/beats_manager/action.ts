import api from "@/src/hooks/useApi";

export const getGenre = async (slug: string) => {
  const response = await api.get("categories/slug/" + slug);
  return response.data;
};

export const getBeats = async () => {
  const response = await api.get("/products/getall");
  return response.data.data;
};

export const uploadProduct = async (formData: FormData) => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProduct = async (formData: FormData, productId: string) => {
  const response = await api.patch("/products/" + productId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await api.delete("/products/" + productId, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const uploadMusic = async (formData: FormData) => {
  const response = await api.post("/stream/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
