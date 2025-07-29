import React from "react";
import _client from "./_Client";
import { Package } from "@/src/types";
import { StudioBooking as StudioBookingDto } from "@/src/types/studio-booking";
import { fetchBookings } from "./action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";

export default async function StudioBooking() {
  const session = await getServerSession(authOptions);
  let bookings: StudioBookingDto[] = [];
  try {
    const fetchedBookings = await fetchBookings(
      session?.user.tokens.accessToken!
    );
    bookings = fetchedBookings;
  } catch (error) {
    console.error("Failed to fetch packages:", error);
  }

  return <_client bookings={bookings} />;
}
