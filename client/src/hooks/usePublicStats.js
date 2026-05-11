import { useState, useEffect } from 'react';
import statsService from '../services/statsService';

export const usePublicStats = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const data = await statsService.getPublicStats();
        if (isMounted) setStats(data);
      } catch {
        // Silently fail — stats are non-critical UI decoration
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchStats();
    return () => { isMounted = false; };
  }, []);

  return { stats, isLoading };
};
