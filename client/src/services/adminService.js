import apiClient from './apiClient';

const adminService = {
  // Articles
  getArticles: async (params = {}) => {
    const response = await apiClient.get('/articles', {
      params: { ...params, status: params.status || undefined },
    });
    return response.data;
  },

  getArticleById: async (id) => {
    const response = await apiClient.get(`/articles/${id}`);
    return response.data;
  },

  createArticle: async (data) => {
    const response = await apiClient.post('/articles', data);
    return response.data;
  },

  updateArticle: async (id, data) => {
    const response = await apiClient.put(`/articles/${id}`, data);
    return response.data;
  },

  deleteArticle: async (id) => {
    const response = await apiClient.delete(`/articles/${id}`);
    return response.data;
  },

  // Topics
  getTopics: async (parentCategory) => {
    const params = parentCategory ? { parentCategory } : {};
    const response = await apiClient.get('/topics', { params });
    return response.data;
  },

  createTopic: async (data) => {
    const response = await apiClient.post('/topics', data);
    return response.data;
  },

  updateTopic: async (id, data) => {
    const response = await apiClient.put(`/topics/${id}`, data);
    return response.data;
  },

  deleteTopic: async (id) => {
    const response = await apiClient.delete(`/topics/${id}`);
    return response.data;
  },

  // Books
  getBooks: async (params = {}) => {
    const response = await apiClient.get('/books', {
      params: { ...params, status: params.status ?? '' },
    });
    return response.data;
  },

  getBookById: async (id) => {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },

  createBook: async (data) => {
    const response = await apiClient.post('/books', data);
    return response.data;
  },

  updateBook: async (id, data) => {
    const response = await apiClient.put(`/books/${id}`, data);
    return response.data;
  },

  deleteBook: async (id) => {
    const response = await apiClient.delete(`/books/${id}`);
    return response.data;
  },

  // Documents
  getDocuments: async (params = {}) => {
    const response = await apiClient.get('/documents', {
      params: { ...params, status: params.status ?? '' },
    });
    return response.data;
  },

  getDocumentById: async (id) => {
    const response = await apiClient.get(`/documents/${id}`);
    return response.data;
  },

  createDocument: async (data) => {
    const response = await apiClient.post('/documents', data);
    return response.data;
  },

  updateDocument: async (id, data) => {
    const response = await apiClient.put(`/documents/${id}`, data);
    return response.data;
  },

  deleteDocument: async (id) => {
    const response = await apiClient.delete(`/documents/${id}`);
    return response.data;
  },

  // Upload
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Dashboard stats
  getStats: async () => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },
};

export default adminService;
