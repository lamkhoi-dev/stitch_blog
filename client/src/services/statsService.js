import apiClient from './apiClient';

const statsService = {
  getPublicStats: async () => {
    const response = await apiClient.get('/stats');
    return response.data;
  },
};

export default statsService;
