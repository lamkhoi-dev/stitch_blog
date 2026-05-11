import { useState, useEffect } from 'react';
import documentService from '../services/documentService';

export const useDocuments = (params = {}) => {
  const [data, setData] = useState({ documents: [], total: 0, page: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchDocs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const responseData = await documentService.getDocuments(params);
        if (isMounted) {
          setData(responseData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || 'Lỗi tải tài liệu');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDocs();

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(params)]);

  return { ...data, isLoading, error };
};

export const useDocumentBySlug = (slug) => {
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    
    let isMounted = true;
    const fetchDoc = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await documentService.getDocumentBySlug(slug);
        if (isMounted) {
          setDocument(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || 'Lỗi tải tài liệu');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDoc();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { document, isLoading, error };
};
