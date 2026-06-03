import api from "@/src/hooks/useApi";
import { FetchBarGraphParams } from "@/src/types/stats";
import { getServerSession } from "next-auth";

export const getStatGridData = async (token: string) => {
  const response = await api.get("/dashboard/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getBarGraphData = async (
  token: string,
  {
    type = "beats",
    year = new Date().getFullYear(),
    month = new Date().getMonth() + 1,
  }: FetchBarGraphParams = {}
) => {
  const response = await api.get(
    `/dashboard/sales-performance?productType=${type}&year=${year}&month=${month}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getPieChartData = async (token: string) => {
  const response = await api.get("/dashboard/earning-breakdown", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getBeatDetails = async (token: string) => {
  const response = await api.get("/dashboard/category-breakdown", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getGenreSalesBreakdown = async (token: string) => {
  const response = await api.get("/dashboard/genre-sales-breakdown", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getEarningBreakdown = async (token: string) => {
  const response = await api.get("/dashboard/earning-breakdown", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getTopSellingBeats = async (token: string) => {
  const response = await api.get("/dashboard/top-selling-beats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getRecentOrders = async (token: string) => {
  const response = await api.get("/payment/recent-orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};