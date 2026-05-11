import { useState, useEffect } from 'react';
import bookService from '../services/bookService';

export const useBooks = (params = {}) => {
  const [data, setData] = useState({ books: [], total: 0, page: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const responseData = await bookService.getBooks(params);
        if (isMounted) setData(responseData);
      } catch (err) {
        if (isMounted) setError(err.response?.data?.message || err.message || 'Lỗi tải sách');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBooks();
    return () => { isMounted = false; };
  }, [JSON.stringify(params)]);

  return { ...data, isLoading, error };
};

export const useBookBySlug = (slug) => {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await bookService.getBookBySlug(slug);
        if (isMounted) setBook(data);
      } catch (err) {
        if (isMounted) setError(err.response?.data?.message || err.message || 'Lỗi tải sách');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBook();
    return () => { isMounted = false; };
  }, [slug]);

  return { book, isLoading, error };
};
