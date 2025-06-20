import { useEffect } from 'react';
import { TEIParser } from '../utils/teiParser';
import { useViewerStore } from '../store/viewerStore';

export const useBookData = () => {
  console.log('useBookData hook called'); // DEBUG LOG
  
  const { 
    book, 
    isLoading, 
    error, 
    setBook, 
    setLoading, 
    setError
  } = useViewerStore();

  useEffect(() => {
    console.log('useBookData useEffect triggered, book:', book); // DEBUG LOG
    console.log('Book details:', book ? {
      title: book.title,
      totalPages: book.totalPages,
      pages: book.pages.map(p => ({ number: p.number, segments: p.textSegments.length }))
    } : 'null'); // DEBUG LOG
    
    const loadBook = async () => {
      if (book) {
        console.log('Book already loaded, skipping'); // DEBUG LOG
        return; // Already loaded
      }

      console.log('Starting to load book...'); // DEBUG LOG
      setLoading(true);
      setError(null);

      try {
        const parser = new TEIParser();
        console.log('TEIParser created, calling parseBook...'); // DEBUG LOG
        const bookData = await parser.parseBook('/book_data/book.xml');
        console.log('Book data received:', bookData); // DEBUG LOG
        console.log('Book pages:', bookData.pages.map(p => ({ number: p.number, segments: p.textSegments.length }))); // DEBUG LOG
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