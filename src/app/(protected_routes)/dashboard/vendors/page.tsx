import React from "react";
import VendorsClient from "./_client";
import { fetchVendors } from "./action";
import { FetchVendorsResponse } from "@/src/types/vendor.type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";

export default async function VendorsManagement({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  const resolvedSearchParams = await searchParams;
  const page = parseInt((resolvedSearchParams.page as string) || "1", 10);
  const limit = parseInt((resolvedSearchParams.limit as string) || "10", 10);

  let vendorsResponse: FetchVendorsResponse = {
    data: [],
    meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
  };

  try {
    vendorsResponse = await fetchVendors(
      session?.user?.tokens.accessToken!,
      page,
      limit
    );
  } catch (error) {
    console.error("Failed to fetch vendors:", error);
  }

  return <VendorsClient vendorsData={vendorsResponse} />;
}
