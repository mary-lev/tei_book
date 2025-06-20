import { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
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

const ImageWrapper = styled.div`
  position: relative;
  line-height: 0; /* a little trick to remove extra space below the image */
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const PageImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ZoneOverlay = styled.div<{ 
  isActive: boolean; 
  left: number; 
  top: number; 
  width: number; 
  height: number; 
}>`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.isActive ? 'var(--highlight-zone)' : 'transparent'};
  border: 2px solid ${props => props.isActive ? 'var(--accent-color)' : 'rgba(52, 152, 219, 0.3)'};
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.15s ease;
  pointer-events: auto;
  
  &:hover {
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
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageScale, setImageScale] = useState(1);

  useLayoutEffect(() => {
    const calculateScale = () => {
      if (imageRef.current && currentPage) {
        const image = imageRef.current;
        const naturalWidth = currentPage.surface.width;
        const renderedWidth = image.offsetWidth;
        
        if (naturalWidth > 0 && renderedWidth > 0) {
          const scale = renderedWidth / naturalWidth;
          setImageScale(scale);
          console.log(`Image scale calculated: ${scale} (Rendered: ${renderedWidth}, Natural: ${naturalWidth})`);
        }
      }
    };
    
    // Recalculate scale on window resize
    window.addEventListener('resize', calculateScale);
    
    // Also calculate on initial load
    calculateScale();
    
    return () => window.removeEventListener('resize', calculateScale);
  }, [currentPage]);

  const handleZoneClick = (zoneId: string) => {
    setActiveZone(zoneId);
    onZoneClick?.(zoneId);
  };

  const renderZoneOverlays = () => {
    if (!currentPage) return null;
    
    return currentPage.surface.zones
      .filter(zone => zone.type === 'textline')
      .map((zone) => {
        const isActive = zone.id === activeZoneId;
        
        const left = zone.ulx * imageScale;
        const top = zone.uly * imageScale;
        const width = (zone.lrx - zone.ulx) * imageScale;
        const height = (zone.lry - zone.uly) * imageScale;

        return (
          <ZoneOverlay
            key={zone.id}
            isActive={isActive}
            left={left}
            top={top}
            width={width}
            height={height}
            onClick={() => handleZoneClick(zone.id)}
            title={`Click to highlight corresponding text: ${zone.type}`}
          />
        );
      });
  };

  return (
    <ImagePaneContainer>
      <ImageContainer>
        {currentPage ? (
          <ImageWrapper>
            <PageImage 
              ref={imageRef}
              src={`/book_data/images/${currentPage.surface.source}`}
              alt={`Page ${currentPage.number}`}
              onLoad={() => {
                // Recalculate scale after image loads
                if (imageRef.current && currentPage) {
                  const image = imageRef.current;
                  const naturalWidth = currentPage.surface.width;
                  const renderedWidth = image.offsetWidth;
                  if (naturalWidth > 0 && renderedWidth > 0) {
                    setImageScale(renderedWidth / naturalWidth);
                  }
                }
              }}
            />
            {renderZoneOverlays()}
          </ImageWrapper>
        ) : (
          <EmptyState>No image available for this page</EmptyState>
        )}
      </ImageContainer>
    </ImagePaneContainer>
  );
}; 