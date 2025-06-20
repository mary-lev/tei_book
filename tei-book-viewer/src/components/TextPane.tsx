import React from 'react';
import styled from 'styled-components';
import { useViewerStore } from '../store/viewerStore';
import type { TextSegment } from '../types/book';

const TextPaneContainer = styled.div`
  flex: 1;
  min-width: 0;
  background-color: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
`;

const TextContent = styled.div`
  flex: 1;
  padding: var(--space-6);
  overflow-y: auto;
  font-family: 'Crimson Text', 'Times New Roman', serif;
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--primary-text);
`;

const TextSegmentElement = styled.span<{ $isActive: boolean }>`
  cursor: pointer;
  padding: var(--space-1) var(--space-2);
  border-radius: 4px;
  transition: all 0.15s ease;
  background-color: ${props => props.$isActive ? 'var(--highlight-zone)' : 'transparent'};
  border: ${props => props.$isActive ? '1px solid var(--accent-color)' : '1px solid transparent'};
  
  &:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--border-color);
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

const TextSegmentWrapper = styled.div`
  margin-bottom: var(--space-1);
`;

export const TextPane: React.FC = () => {
  const { getCurrentPage, activeZoneId, setActiveZone } = useViewerStore();
  const currentPage = getCurrentPage();

  // Debug logging
  console.log('TextPane - currentPage:', currentPage);
  console.log('TextPane - textSegments:', currentPage?.textSegments);
  console.log('TextPane - textSegments length:', currentPage?.textSegments?.length);

  const handleSegmentClick = (segment: TextSegment) => {
    if (segment.facs) {
      setActiveZone(segment.facs);
    }
  };

  const renderTextSegment = (segment: TextSegment) => {
    const isActive = segment.facs === activeZoneId;
    
    if (segment.type === 'lb') {
      // We can render a space for lb, as segs are now in their own block
      return <span key={segment.id}> </span>;
    }

    return (
      <TextSegmentWrapper key={segment.id}>
        <TextSegmentElement
          $isActive={isActive}
          onClick={() => handleSegmentClick(segment)}
          title={segment.facs ? 'Click to highlight corresponding image region' : undefined}
        >
          {segment.text}
        </TextSegmentElement>
      </TextSegmentWrapper>
    );
  };

  if (!currentPage) {
    return (
      <TextPaneContainer>
        <EmptyState>No text content available for this page</EmptyState>
      </TextPaneContainer>
    );
  }

  return (
    <TextPaneContainer>
      <TextContent>
        {currentPage.textSegments.length > 0 ? (
          currentPage.textSegments.map((segment) => 
            renderTextSegment(segment)
          )
        ) : (
          <EmptyState>No text content for page {currentPage.number}</EmptyState>
        )}
      </TextContent>
    </TextPaneContainer>
  );
}; 