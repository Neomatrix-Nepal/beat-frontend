import { authOptions } from "@/src/app/api/auth/option";
import { Commission as CommissionDto } from "@/src/types";
import { getServerSession } from "next-auth";
import CommissionClient from "./_Client";
import { getAllCommissions } from "./action";

export default async function Commission() {
  const session = await getServerSession(authOptions);
  let commissions: CommissionDto[] = [];
  try {
    commissions = (
      await getAllCommissions(session?.user.tokens.accessToken as string)
    ).data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
  return <CommissionClient commissions={commissions} />;
}
