import { useEffect } from 'react';

const useFavicon = (faviconUrl) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/jobsearchsymbol.svg';
    link.type = 'image/svg';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [faviconUrl]);
};

export default useFavicon;
