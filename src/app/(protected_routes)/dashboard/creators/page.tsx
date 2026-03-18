import React from "react";
import CreatorsClient from "./_client";
import { fetchCreators } from "./action";
import { CreatorEntry } from "@/src/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";

export default async function CreatorManager({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  const resolvedSearchParams = await searchParams;
  const page = parseInt((resolvedSearchParams.page as string) || "1", 10);
  const limit = parseInt((resolvedSearchParams.limit as string) || "10", 10);

  let creatorsResponse: { data: CreatorEntry[]; meta: any } = {
    data: [],
    meta: { total: 0, page: 1, totalPages: 0 },
  };

  try {
    creatorsResponse = await fetchCreators(
      session?.user?.tokens.accessToken!,
      page,
      limit
    );
  } catch (error) {
    console.error("Failed to fetch creators:", error);
  }

  return <CreatorsClient creatorsData={creatorsResponse} />;
}