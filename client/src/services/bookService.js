import apiClient from './apiClient';

const bookService = {
  getBooks: async (params = {}) => {
    const response = await apiClient.get('/books', { params });
    return response.data; // { books, total, page, totalPages }
  },

  getBookBySlug: async (slug) => {
    const response = await apiClient.get(`/books/slug/${slug}`);
    return response.data;
  },
};

export default bookService;
