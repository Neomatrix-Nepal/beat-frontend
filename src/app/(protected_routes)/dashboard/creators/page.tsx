import React from "react";
import CreatorsClient from "./_client";
import { fetchCreators } from "./action";
import { CreatorEntry } from "@/src/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";

export default async function CreatorManager() {
  const session = await getServerSession(authOptions);
  let creators: CreatorEntry[] = [];
  try {
    const response = await fetchCreators(session?.user?.tokens.accessToken!);
    creators = response.data;
  } catch (error) {
    console.error("Failed to parse creators:", error);
  }

  return <CreatorsClient creators={creators} />;
}
