import React from "react";
import _Client from "./_client";
import { getBeats, getGenre } from "./action";
import { Product, Genre } from "@/src/types";

export default async function BeatsManager({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt((resolvedSearchParams.page as string) || "1", 10);
  const limit = parseInt((resolvedSearchParams.limit as string) || "10", 10);

  let genres: Genre[] = [];
  let beatsResponse: { data: Product[]; meta: any } = {
    data: [],
    meta: { total: 0, page: 1, totalPages: 0 },
  };

  try {
    genres = await getGenre("music");
    beatsResponse = await getBeats("digital-asset", page, limit);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  return <_Client genres={genres} beatData={beatsResponse} />;
}
