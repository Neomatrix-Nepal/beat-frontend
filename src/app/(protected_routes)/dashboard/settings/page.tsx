import { authOptions } from "@/src/app/api/auth/option";
import { Coupon } from "@/src/types";
import { getServerSession } from "next-auth";
import _Client from "./_Client";
import { getSettings } from "./action";
import { Setting } from "@/src/types/setting.type";

export default async function SettingManager() {
  const session = await getServerSession(authOptions);
  let fetchedSettings: Setting | null = null;
  try {
    const fetchedSetting = await getSettings(
      session?.user?.tokens.accessToken!
    );
    fetchedSettings = fetchedSetting;
  } catch (error) {
    console.error("Failed to fetch coupons:", error);
  }

  return <_Client settings={fetchedSettings} />;
}
