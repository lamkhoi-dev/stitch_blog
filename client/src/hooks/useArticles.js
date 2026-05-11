import { useState, useEffect } from 'react';
import articleService from '../services/articleService';

export const useArticles = (params = {}) => {
  const [data, setData] = useState({ articles: [], total: 0, page: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const responseData = await articleService.getArticles(params);
        if (isMounted) {
          setData(responseData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || 'Lỗi tải bài viết');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(params)]); // re-fetch when params change

  return { ...data, isLoading, error };
};

export const useArticleBySlug = (slug) => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    
    let isMounted = true;
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await articleService.getArticleBySlug(slug);
        if (isMounted) {
          setArticle(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || 'Lỗi tải bài viết');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchArticle();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { article, isLoading, error };
};
