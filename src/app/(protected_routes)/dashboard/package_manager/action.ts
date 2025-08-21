import api from "@/src/hooks/useApi";
import { Package } from "@/src/types";

export const fetchPackages = async () => {
  try {
    const response = await api.get("/packages");
    const data = response.data;

    return data;
  } catch (error: any) {
    console.error("Failed to fetch packages:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch packages"
    );
  }
};

export const uploadPackage = async (dto: Package, token: string) => {
  try {
    const response = await api.post("/packages", dto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

    return data;
  } catch (error: any) {
    console.error("Failed to upload packages:", error);
    throw new Error(
      error.response?.data?.message || "Failed to upload packages"
    );
  }
};

export const updatePackage = async (
  dto: Package,
  id: string,
  token: string
) => {
  try {
    const response = await api.patch("/packages/" + id, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

    return data;
  } catch (error: any) {
    console.error("Failed to upload packages:", error);
    throw new Error(
      error.response?.data?.message || "Failed to upload packages"
    );
  }
};

export const deletePackage = async (
  id: string,
  token: string
) => {
  try {
    const response = await api.delete("/packages/" + id,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

    return data;
  } catch (error: any) {
    console.error("Failed to upload packages:", error);
    throw new Error(
      error.response?.data?.message || "Failed to upload packages"
    );
  }
};

