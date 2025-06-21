import { useEffect } from 'react';
import { TEIParser } from '../utils/teiParser';
import { useViewerStore } from '../store/viewerStore';

export const useBookData = () => {
  
  const { 
    book, 
    isLoading, 
    error, 
    setBook, 
    setLoading, 
    setError
  } = useViewerStore();

  useEffect(() => {
    
    const loadBook = async () => {
      if (book) {
        return; // Already loaded
      }

      setLoading(true);
      setError(null);

      try {
        const parser = new TEIParser();
        // Use Vite's base URL so the path works in GitHub Pages
        const basePath = import.meta.env.BASE_URL || '/';
        const bookData = await parser.parseBook(`${basePath}book_data/book.xml`);
        setBook(bookData);
      } catch (err) {
        console.error('Failed to load book:', err);
        setError(err instanceof Error ? err.message : 'Failed to load book');
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [book, setBook, setLoading, setError]);

  return {
    book,
    isLoading,
    error,
  };
}; 