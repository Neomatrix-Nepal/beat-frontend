import api from '@/hooks/useApi';
import { CreatorEntry, FetchCreatorsResponse } from '@/types/creator';

export const fetchCreators = async (page: number = 1, limit: number = 10): Promise<FetchCreatorsResponse> => {
  try {
    const response = await api.get('/producer-request', {
      params: { page, limit },
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch creators:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch creators');
  }
};

export const deleteCreator = async (id: number) => {
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

export const deleteMultipleCreators = async (ids: number[]) => {
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

export const approveCreator = async (userId: number, producerRequestId: number) => {
   try {
    console.log(`Sending request with userId: ${userId}, producerRequestId: ${producerRequestId}`);
    const response = await api.patch(
      '/producer-request/change-user-role',
      { userId, producerRequestId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Response:', response);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Failed to approve creator:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to approve creator',
    };
  }
};