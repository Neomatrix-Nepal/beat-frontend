import { Product } from "@/src/types";
import _Client from "./_client";
import { getBeats } from "./action";

export default async function BeatsManager({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt((resolvedSearchParams.page as string) || "1", 10);
  const limit = parseInt((resolvedSearchParams.limit as string) || "10", 10);

  let dripsResponse: { data: Product[]; meta: any } = {
    data: [],
    meta: { total: 0, page: 1, totalPages: 0 },
  };

  try {
    dripsResponse = await getBeats("drip", page, limit);
  } catch (error) {
    console.error("Failed to parse drips:", error);
  }
  return <_Client dripsData={dripsResponse} />;
}
