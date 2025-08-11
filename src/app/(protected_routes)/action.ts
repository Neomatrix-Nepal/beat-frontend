import api from "@/src/hooks/useApi";
import { FetchBarGraphParams } from "@/src/types/stats";
import { getServerSession } from "next-auth";

export const getStatGridData = async (token: string) => {
  const response = await api.get(
    "https://bsvzmwz3-8000.inc1.devtunnels.ms/dashboard/stats",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
    `https://bsvzmwz3-8000.inc1.devtunnels.ms/dashboard/sales-performance?productType=${type}&year=${year}&month=${month}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getPieChartData = async (token: string) => {
  const response = await api.get(
    "https://bsvzmwz3-8000.inc1.devtunnels.ms/dashboard/earning-breakdown",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export async function GET(req: Request) {
  const session = await getServerSession();

  const { searchParams } = new URL(req.url);
  const typeParam = searchParams.get("type");
  const monthParam = searchParams.get("month");
  const yearParam = searchParams.get("year");

  // Validate & cast values
  if (
    !typeParam ||
    !["beats", "drip"].includes(typeParam) ||
    !monthParam ||
    !yearParam
  ) {
    return new Response(JSON.stringify({ error: "Invalid parameters" }), { status: 400 });
  }

  const type = typeParam as "beats" | "drip";
  const month = Number(monthParam);
  const year = Number(yearParam);

  // If parsing failed
  if (isNaN(month) || isNaN(year)) {
    return new Response(JSON.stringify({ error: "Month and year must be numbers" }), { status: 400 });
  }

  const data = await getBarGraphData(session!.user.tokens.accessToken, {
    type,
    month,
    year,
  });

  return Response.json(data);
}


