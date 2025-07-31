import { Product } from "@/src/types";
import _Client from "./_client";
import { getBeats } from "./action";

export default async function BeatsManager() {
  let drips: Product[] = [];
  try {
    drips = await getBeats("drip");
  } catch (error) {
    console.error("Failed to parse genres:", error);
  }
  return <_Client dripsData={drips} />;
}
