import api from "@/src/hooks/useApi";

export const deleteMixingOrder = async (id: number) => {
  try {
    await api.delete(`/mixing-order/${id}`);
  } catch (error) {
    console.error("Error deleting mixing order:", error);
    throw new Error("Failed to delete mixing order. Please try again.");
  }
};
