import React from 'react';
import styled from 'styled-components';
import { useViewerStore } from '../store/viewerStore';

interface MetadataSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isPersistent?: boolean;
}

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen', 'isPersistent'].includes(prop),
})<{ isOpen: boolean; isPersistent?: boolean }>`
  position: ${props => props.isPersistent ? 'static' : 'fixed'};
  top: 0;
  right: ${props => props.isPersistent ? 'auto' : '0'};
  width: ${props => props.isPersistent ? '100%' : '400px'};
  height: ${props => props.isPersistent ? '100%' : '100vh'};
  background: ${props => props.isPersistent ? 'var(--bg-secondary)' : 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)'};
  border-left: ${props => props.isPersistent ? 'none' : '2px solid var(--border-color)'};
  box-shadow: ${props => props.isPersistent ? 'none' : '-4px 0 20px rgba(26, 54, 93, 0.15)'};
  transform: ${props => props.isPersistent ? 'none' : `translateX(${props.isOpen ? '0' : '100%'})`};
  transition: ${props => props.isPersistent ? 'none' : 'transform 0.3s ease'};
  z-index: ${props => props.isPersistent ? 'auto' : '1001'};
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: ${props => props.isPersistent ? '100%' : '100%'};
  }
`;

const SidebarHeader = styled.div`
  padding: var(--space-4);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-primary);
`;

const SidebarTitle = styled.h2`
  font-family: var(--font-primary);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--primary-text);
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: var(--secondary-text);
  font-size: var(--text-xl);
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-secondary);
    color: var(--primary-text);
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: var(--space-4);
  overflow-y: auto;
`;

const MetadataSection = styled.div`
  margin-bottom: var(--space-6);
`;

const SectionTitle = styled.h3`
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--primary-text);
  margin: 0 0 var(--space-3) 0;
`;

const MetadataItem = styled.div`
  margin-bottom: var(--space-3);
`;

const MetadataLabel = styled.dt`
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: var(--space-1);
`;

const MetadataValue = styled.dd`
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--secondary-text);
  line-height: var(--leading-normal);
  margin: 0;
`;

const StatsList = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin: 0;
`;

const StatItem = styled.div`
  text-align: center;
  padding: var(--space-4);
  background-color: var(--bg-tertiary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
`;

const StatValue = styled.div`
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: var(--space-1);
`;

const StatLabel = styled.div`
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--secondary-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const MetadataSidebar: React.FC<MetadataSidebarProps> = ({ isOpen, onClose, isPersistent = false }) => {
  const { book, currentPage } = useViewerStore();

  if (!book) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isPersistent) {
      onClose();
    }
  };

  return (
    <>
      {!isPersistent && <SidebarOverlay isOpen={isOpen} onClick={handleOverlayClick} />}
      <SidebarContainer isOpen={isOpen} isPersistent={isPersistent}>
        <SidebarHeader>
          <SidebarTitle>Metadata</SidebarTitle>
          {!isPersistent && (
            <CloseButton onClick={onClose} aria-label="Close sidebar">
              ×
            </CloseButton>
          )}
        </SidebarHeader>
        
        <SidebarContent>
          <MetadataSection>
            <SectionTitle>Bibliographic Information</SectionTitle>
            
            <MetadataItem>
              <MetadataLabel>Title</MetadataLabel>
              <MetadataValue>{book.title}</MetadataValue>
            </MetadataItem>

            {book.metadata.publicationInfo && (
              <MetadataItem>
                <MetadataLabel>Publication Info</MetadataLabel>
                <MetadataValue>{book.metadata.publicationInfo}</MetadataValue>
              </MetadataItem>
            )}

            {book.metadata.source && (
              <MetadataItem>
                <MetadataLabel>Source</MetadataLabel>
                <MetadataValue>{book.metadata.source}</MetadataValue>
              </MetadataItem>
            )}
          </MetadataSection>

          <MetadataSection>
            <SectionTitle>Statistics</SectionTitle>
            <StatsList>
              <StatItem>
                <StatValue>{book.totalPages}</StatValue>
                <StatLabel>Total Pages</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{currentPage}</StatValue>
                <StatLabel>Current Page</StatLabel>
              </StatItem>
            </StatsList>
          </MetadataSection>

          <MetadataSection>
            <SectionTitle>Technical Details</SectionTitle>
            
            <MetadataItem>
              <MetadataLabel>Format</MetadataLabel>
              <MetadataValue>TEI (Text Encoding Initiative)</MetadataValue>
            </MetadataItem>

            <MetadataItem>
              <MetadataLabel>Encoding</MetadataLabel>
              <MetadataValue>UTF-8</MetadataValue>
            </MetadataItem>

            {book.pages.length > 0 && book.pages[currentPage - 1]?.surface && (
              <>
                <MetadataItem>
                  <MetadataLabel>Image Source</MetadataLabel>
                  <MetadataValue>{book.pages[currentPage - 1].surface.source}</MetadataValue>
                </MetadataItem>
                
                {book.pages[currentPage - 1].surface.zones.length > 0 && (
                  <MetadataItem>
                    <MetadataLabel>Text Zones on Page</MetadataLabel>
                    <MetadataValue>
                      {book.pages[currentPage - 1].surface.zones.filter(z => z.type === 'textline').length} text lines
                    </MetadataValue>
                  </MetadataItem>
                )}
              </>
            )}
          </MetadataSection>
        </SidebarContent>
      </SidebarContainer>
    </>
  );
};