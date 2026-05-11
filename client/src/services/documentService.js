import apiClient from './apiClient';

const documentService = {
  getDocuments: async (params = {}) => {
    const response = await apiClient.get('/documents', { params });
    return response.data; // { documents, total, page, totalPages }
  },

  getDocumentBySlug: async (slug) => {
    const response = await apiClient.get(`/documents/slug/${slug}`);
    return response.data;
  },

  getDocumentById: async (id) => {
    const response = await apiClient.get(`/documents/${id}`);
    return response.data;
  }
};

export default documentService;
