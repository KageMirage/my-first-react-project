import { useState, useEffect } from 'react';
import axios from 'axios';

export function useApiData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await axios.get(url);
        if (isMounted) setData(res.data?.value ?? res.data ?? []);
      } catch (err) {
        if (isMounted) setError(err.message || 'Ошибка загрузки');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
}