import api from "@/src/hooks/useApi";

export const deleteMixingOrder = async (id: number, token: string) => {
  try {
    await api.delete(`/mixing-order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting mixing order:", error);
    throw new Error("Failed to delete mixing order. Please try again.");
  }
};
