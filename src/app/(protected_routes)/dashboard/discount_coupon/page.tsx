import { authOptions } from "@/src/app/api/auth/option";
import { Coupon } from "@/src/types";
import { getServerSession } from "next-auth";
import _Client from "./_Client";
import { getAllCoupons } from "./action";

export default async function PackageManager() {
  const session = await getServerSession(authOptions);
  let coupons: Coupon[] = [];
  try {
    const fetchCoupons = await getAllCoupons(
      session?.user?.tokens.accessToken!
    );
    coupons = fetchCoupons;
  } catch (error) {
    console.error("Failed to fetch coupons:", error);
  }

  return <_Client coupons={coupons} />;
}
