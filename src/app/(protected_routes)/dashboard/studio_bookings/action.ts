import api from "@/src/hooks/useApi";

export const fetchBookings = async (token: string) => {
  try {
    const response = await api.get("/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch creators:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch creators"
    );
  }
};

export const deleteBooking = async (id: number, token: string) => {
  try {
    const response = await api.delete(`/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to delete creator:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete creator",
    };
  }
};

export const changeBookingStatus = async (
  bookingId: number,
  status: { status: string },
  token: string
) => {
  try {
    const response = await api.patch(
      "/bookings/change-booking-status/" + bookingId,
      status,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to approve creator:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    return {
      success: false,
      error: error.response?.data?.message || "Failed to approve creator",
    };
  }
};
