import api from '@/hooks/useApi';

export interface CreatorEntry {
  id: string;
  producername: string;
  paymentMethod: string;
  demoBeat: string;
  stripeFullName: string | null;
  stripeCardLast4: string | null;
  stripeAccountId: string | null;
  paypalEmailOrRef: string | null;
  sociamediaurl: string;
  producerStyle: string;
  created_at: string;
  updated_at: string;
}

export interface FetchCreatorsResponse {
  data: CreatorEntry[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const fetchCreators = async (page: number = 1, limit: number = 10): Promise<FetchCreatorsResponse> => {
  try {
   
    const response = await api.get('/producer-request', {
      params: { page, limit },
    });
     console.log(response)
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch creators:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch creators');
  }
};

export const deleteCreator = async (id: string) => {
  try {
    const response = await api.delete(`/producer-request/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Failed to delete creator:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete creator',
    };
  }
};

export const deleteMultipleCreators = async (ids: string[]) => {
  try {
    const deletePromises = ids.map(id => api.delete(`/producer-request/${id}`));
    await Promise.all(deletePromises);
    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Failed to delete multiple creators:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete multiple creators',
    };
  }
};

export const approveCreator = async (id: string, role: string) => {
  try {
    const response = await api.patch(`/producer-request/change-user-role`, { id, role });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Failed to approve creator:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to approve creator',
    };
  }
};