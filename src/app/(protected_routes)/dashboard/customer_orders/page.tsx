import React from "react";
import CustomerOrdersClient from "./_Client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";
import { getAllOrders } from "./action";
import { Order } from "@/src/types";

export default async function ClientOrder() {
  const session = await getServerSession(authOptions);
  let orders: Order[] = [];
  try {
    orders = (await getAllOrders(session?.user.tokens.accessToken as string))
      .data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
  return <CustomerOrdersClient orders={orders} />;
}
