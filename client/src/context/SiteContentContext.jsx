import React, { createContext, useContext, useEffect, useState } from 'react';

import { API_URL } from '../config/api';

const SiteContentContext = createContext({
  copy: {},
  loading: true,
  t: (key, fallback = '') => fallback || key
});

export const SiteContentProvider = ({ children }) => {
  const [copy, setCopy] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/site-content`);
        const data = await response.json();
        if (data.success) {
          setCopy(data.data || {});
        }
      } catch (error) {
        console.error('Failed to load site content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const t = (key, fallback = '') => {
    if (copy[key] !== undefined && copy[key] !== null && copy[key] !== '') {
      return copy[key];
    }
    return fallback;
  };

  return (
    <SiteContentContext.Provider value={{ copy, loading, t, setCopy }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);

export default SiteContentContext;
