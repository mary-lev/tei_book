import { create } from 'zustand';
import type { ViewerState, Book, Zone } from '../types/book';

interface ViewerStore extends ViewerState {
  book: Book | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setBook: (book: Book) => void;
  clearBook: () => void;
  setCurrentPage: (page: number) => void;
  setActiveZone: (zoneId: string | null) => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  toggleThumbnails: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed
  getCurrentPage: () => Book['pages'][0] | null;
  getActiveZone: () => Zone | null;
}

export const useViewerStore = create<ViewerStore>((set, get) => ({
  // Initial state
  book: null,
  currentPage: 1,
  activeZoneId: null,
  zoom: 1,
  pan: { x: 0, y: 0 },
  showThumbnails: false,
  isLoading: false,
  error: null,

  // Actions
  setBook: (book) => set({ book, error: null }),
  clearBook: () => set({ book: null, error: null }),
  
  setCurrentPage: (page) => {
    const { book } = get();
    if (book && page >= 1 && page <= book.totalPages) {
      set({ currentPage: page, activeZoneId: null });
    }
  },
  
  setActiveZone: (zoneId) => set({ activeZoneId: zoneId }),
  
  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),
  
  setPan: (pan) => set({ pan }),
  
  toggleThumbnails: () => set((state) => ({ showThumbnails: !state.showThumbnails })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),

  // Computed getters
  getCurrentPage: () => {
    const { book, currentPage } = get();
    if (!book) return null;
    const page = book.pages.find(page => page.number === currentPage);
    return page || null;
  },
  
  getActiveZone: () => {
    const { book, currentPage, activeZoneId } = get();
    if (!book || !activeZoneId) return null;
    
    const currentPageData = book.pages.find(page => page.number === currentPage);
    if (!currentPageData) return null;
    
    return currentPageData.surface.zones.find(zone => zone.id === activeZoneId) || null;
  },
})); 