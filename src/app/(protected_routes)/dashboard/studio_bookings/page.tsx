import React from "react";
import _client from "./_Client";
import { Package } from "@/src/types";
import { StudioBooking as StudioBookingDto } from "@/src/types/studio-booking";
import { fetchBookings } from "./action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";

export default async function StudioBooking({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  const resolvedSearchParams = await searchParams;
  const page = parseInt((resolvedSearchParams.page as string) || "1", 10);
  const limit = parseInt((resolvedSearchParams.limit as string) || "10", 10);

  let bookingsResponse: { data: StudioBookingDto[]; meta: any } = {
    data: [],
    meta: { total: 0, page: 1, totalPages: 0 },
  };

  try {
    bookingsResponse = await fetchBookings(
      session?.user.tokens.accessToken!,
      page,
      limit
    );
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
  }
  console.log("STUDIO BOOKING", bookingsResponse)

  return <_client bookingsData={bookingsResponse} />;
}
