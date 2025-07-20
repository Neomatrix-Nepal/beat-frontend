import React from "react";
import _client from "./_client";
import { fetchPackages } from "./action";
import { Package } from "@/src/types";

export default async function PackageManager() {
  let packages: Package[] = [];
  try {
    const fetchedPackages = await fetchPackages();
    packages = fetchedPackages;
  } catch (error) {
    console.error("Failed to fetch packages:", error);
  }

  return <_client packages={packages} />;
}
