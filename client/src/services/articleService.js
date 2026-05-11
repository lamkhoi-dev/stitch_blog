import apiClient from './apiClient';

const articleService = {
  getArticles: async (params = {}) => {
    const response = await apiClient.get('/articles', { params });
    return response.data; // { articles, total, page, totalPages }
  },

  getArticleBySlug: async (slug) => {
    const response = await apiClient.get(`/articles/slug/${slug}`);
    return response.data;
  },

  getTopics: async (parentCategory) => {
    const params = parentCategory ? { parentCategory } : {};
    const response = await apiClient.get('/topics', { params });
    return response.data;
  },

  getTopicBySlug: async (slug) => {
    const response = await apiClient.get(`/topics/${slug}`);
    return response.data;
  }
};

export default articleService;
