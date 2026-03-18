import { authOptions } from "@/src/app/api/auth/option";
import { Commission as CommissionDto } from "@/src/types";
import { getServerSession } from "next-auth";
import CommissionClient from "./_Client";
import { getAllCommissions } from "./action";

export default async function Commission({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  const resolvedSearchParams = await searchParams;
  const page = parseInt((resolvedSearchParams.page as string) || "1", 10);
  const limit = parseInt((resolvedSearchParams.limit as string) || "10", 10);

  let commissionsResponse: { data: CommissionDto[]; meta: any } = {
    data: [],
    meta: { total: 0, page: 1, totalPages: 0 },
  };

  try {
    commissionsResponse = await getAllCommissions(
      session?.user.tokens.accessToken as string,
      page,
      limit
    );
  } catch (error) {
    console.error("Failed to fetch commission:", error);
  }
  return <CommissionClient commissionsData={commissionsResponse} />;
}
