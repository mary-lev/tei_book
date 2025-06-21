import React from 'react';
import styled from 'styled-components';
import { TextPane } from './TextPane';
import { ImagePane } from './ImagePane';
import { SplitPane } from './SplitPane';

const ViewerContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  box-sizing: border-box;

  @media (max-width: 1700px) {
    border-left: none;
    border-right: none;
  }
`;


export const Viewer: React.FC = () => {
  const handleZoneClick = (zoneId: string) => {
    console.log('Zone clicked:', zoneId);
  };

  return (
    <ViewerContainer>
      <SplitPane initialSize={50} minSize={20} maxSize={80}>
        <TextPane />
        <ImagePane onZoneClick={handleZoneClick} />
      </SplitPane>
    </ViewerContainer>
  );
};
