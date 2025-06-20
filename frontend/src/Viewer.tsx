import React, { useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';
import { useAppDispatch, useAppSelector } from './hooks';
import { setPage } from './store';

export default function Viewer() {
  const viewerRef = useRef<OpenSeadragon.Viewer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const page = useAppSelector((state) => state.viewer.page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!containerRef.current) return;
    if (!viewerRef.current) {
      viewerRef.current = OpenSeadragon({
        element: containerRef.current,
        prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/',
        tileSources: `/book_data/images/page_${page}.jpg`,
      });
    } else {
      viewerRef.current.open(`/book_data/images/page_${page}.jpg`);
    }
  }, [page]);

  return (
    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <button onClick={() => dispatch(setPage(Math.max(1, page - 1)))}>
          Prev
        </button>
        <span style={{ margin: '0 1rem' }}>Page {page}</span>
        <button onClick={() => dispatch(setPage(page + 1))}>Next</button>
      </div>
      <div ref={containerRef} style={{ height: '100%' }} />
    </div>
  );
}
