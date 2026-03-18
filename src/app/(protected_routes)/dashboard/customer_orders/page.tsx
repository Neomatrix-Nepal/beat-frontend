import React from "react";
import CustomerOrdersClient from "./_Client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";
import { getAllOrders } from "./action";
import { Order } from "@/src/types";

interface PaginationMetadata {
  page: number;
  pageSize?: number;
  total: number;
  totalPages: number;
}

export default async function ClientOrder({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const session = await getServerSession(authOptions);
  const page = parseInt((resolvedSearchParams.page as string) || "1", 10);
  const limit = parseInt((resolvedSearchParams.limit as string) || "10", 10);
  
  let orders: Order[] = [];
  let metadata: PaginationMetadata = {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  };

  try {
    const response = await getAllOrders(
      session?.user.tokens.accessToken as string,
      page,
      limit
    );
    orders = response.data || [];
    metadata = response.metadata || metadata;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }

  return <CustomerOrdersClient orders={orders} metadata={metadata} />;
}
