import { useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';
import styled, { createGlobalStyle } from 'styled-components';
import { useViewerStore } from '../store/viewerStore';

const ImagePaneContainer = styled.div`
  flex: 1;
  min-width: 0;
  background-color: var(--bg-secondary);
  position: relative;
  padding: var(--space-12);
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const OverlayStyles = createGlobalStyle`
  .zone-overlay {
    position: absolute;
    background-color: transparent;
    border: 2px solid rgba(52, 152, 219, 0.3);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.15s ease;
    pointer-events: auto;
  }

  .zone-overlay.active,
  .zone-overlay:hover {
    background-color: var(--highlight-zone);
    border-color: var(--accent-color);
  }
`;


const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--secondary-text);
  font-size: var(--text-lg);
`;

interface ImagePaneProps {
  onZoneClick?: (zoneId: string) => void;
}

export const ImagePane: React.FC<ImagePaneProps> = ({ onZoneClick }) => {
  const { getCurrentPage, activeZoneId, setActiveZone } = useViewerStore();
  const currentPage = getCurrentPage();
  const viewerRef = useRef<OpenSeadragon.Viewer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoneClick = (zoneId: string) => {
    setActiveZone(zoneId);
    onZoneClick?.(zoneId);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (!viewerRef.current) {
      viewerRef.current = OpenSeadragon({
        element: containerRef.current,
        showNavigationControl: false,
        useCanvas: true,
      });
    }

    const viewer = viewerRef.current;

    if (currentPage) {
      viewer.open({
        type: 'image',
        url: `/book_data/images/${currentPage.surface.source}`,
      });
    } else {
      viewer.close();
    }

    return () => {
      viewer.clearOverlays();
    };
  }, [currentPage]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !currentPage) return;

    const addOverlays = () => {
      viewer.clearOverlays();

      currentPage.surface.zones
        .filter((zone) => zone.type === 'textline')
        .forEach((zone) => {
          const rect = new OpenSeadragon.Rect(
            zone.ulx,
            zone.uly,
            zone.lrx - zone.ulx,
            zone.lry - zone.uly
          );
          const el = document.createElement('div');
          el.className = 'zone-overlay' + (zone.id === activeZoneId ? ' active' : '');
          el.title = `Click to highlight corresponding text: ${zone.type}`;
          el.addEventListener('click', () => handleZoneClick(zone.id));
          viewer.addOverlay({ element: el, location: viewer.viewport.imageToViewportRectangle(rect) });
        });
    };

    if (viewer.isOpen()) {
      addOverlays();
    } else {
      viewer.addOnceHandler('open', addOverlays);
    }

    return () => {
      viewer.clearOverlays();
    };
  }, [currentPage, activeZoneId]);

  return (
    <ImagePaneContainer>
      <OverlayStyles />
      <ImageContainer>
        {currentPage ? (
          <ViewerWrapper ref={containerRef} />
        ) : (
          <EmptyState>No image available for this page</EmptyState>
        )}
      </ImageContainer>
    </ImagePaneContainer>
  );
};
