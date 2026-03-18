import React from "react";
import _client from "./_client";
import { fetchPackages } from "./action";
import { Package } from "@/src/types";

export default async function PackageManager({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt((resolvedSearchParams.page as string) || "1", 10);
  const limit = parseInt((resolvedSearchParams.limit as string) || "20", 20);
  let packagesResponse: { data: Package[]; meta: any } = {
    data: [],
    meta: { total: 0, page: 1, totalPages: 0 },
  };



  try {
    packagesResponse = await fetchPackages(page, limit);
  } catch (error) {
    console.error("Failed to fetch packages:", error);
  }

  return <_client packagesData={packagesResponse} />;
}
