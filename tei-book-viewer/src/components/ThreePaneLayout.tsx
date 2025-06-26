import React, { useState } from 'react';
import styled from 'styled-components';
import { TextPane } from './TextPane';
import { ImagePane } from './ImagePane';
import { MetadataSidebar } from './MetadataSidebar';

interface ThreePaneLayoutProps {
  onZoneClick?: (zoneId: string) => void;
}

const LayoutContainer = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const SidebarPanel = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<{ isCollapsed: boolean }>`
  width: ${props => props.isCollapsed ? '0' : '320px'};
  min-width: ${props => props.isCollapsed ? '0' : '280px'};
  max-width: 400px;
  flex-shrink: 0;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  transition: width 0.3s ease;
  overflow: hidden;
  position: relative;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  min-width: 0;
`;

const TextPaneContainer = styled.div`
  flex: 1;
  min-width: 300px;
  overflow: hidden;
  position: relative;
`;

const ResizeHandle = styled.div`
  width: 4px;
  background-color: var(--border-color);
  cursor: col-resize;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
  position: relative;

  &:hover {
    background-color: var(--accent-color);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3px;
    height: 20px;
    background: repeating-linear-gradient(
      to bottom,
      var(--secondary-text) 0px,
      var(--secondary-text) 2px,
      transparent 2px,
      transparent 4px
    );
    opacity: 0.5;
  }
`;

const ImagePaneContainer = styled.div`
  flex: 1;
  min-width: 300px;
  overflow: hidden;
  position: relative;
`;

const CollapseButton = styled.button`
  position: absolute;
  top: var(--space-4);
  right: var(--space-2);
  z-index: 10;
  width: 32px;
  height: 32px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-primary);
  color: var(--secondary-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--primary-text);
  }
`;

export const ThreePaneLayout: React.FC<ThreePaneLayoutProps> = ({ onZoneClick }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [textPaneWidth, setTextPaneWidth] = useState(50); // percentage

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = textPaneWidth;
    
    const handleMouseMove = (e: MouseEvent) => {
      const containerWidth = (e.target as HTMLElement).parentElement?.clientWidth || 1000;
      const delta = ((e.clientX - startX) / containerWidth) * 100;
      const newWidth = Math.min(Math.max(startWidth + delta, 30), 70);
      setTextPaneWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <LayoutContainer>
      <SidebarPanel isCollapsed={isSidebarCollapsed}>
        <CollapseButton onClick={toggleSidebar}>
          {isSidebarCollapsed ? '→' : '←'}
        </CollapseButton>
        <MetadataSidebar isOpen={!isSidebarCollapsed} onClose={() => {}} isPersistent={true} />
      </SidebarPanel>
      
      <MainContent>
        <TextPaneContainer style={{ flex: `${textPaneWidth}` }}>
          <TextPane />
        </TextPaneContainer>
        
        <ResizeHandle onMouseDown={handleResize} />
        
        <ImagePaneContainer style={{ flex: `${100 - textPaneWidth}` }}>
          <ImagePane onZoneClick={onZoneClick} />
        </ImagePaneContainer>
      </MainContent>
    </LayoutContainer>
  );
};