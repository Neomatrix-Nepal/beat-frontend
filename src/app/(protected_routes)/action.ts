import api from "@/src/hooks/useApi";

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

export const getBarGraphData = async (token: string) => {
  const response = await api.get(
    "https://bsvzmwz3-8000.inc1.devtunnels.ms/dashboard/sales-performance",
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
