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
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 1700px) {
    border-left: none;
    border-right: none;
  }
`;


export const Viewer: React.FC = () => {
  const handleZoneClick = (zoneId: string) => {
    // future hook for handling zone interactions
  };

  return (
    <ViewerContainer>
      <SplitPane initialSize={50} minSize={30} maxSize={50}>
        <TextPane />
        <ImagePane onZoneClick={handleZoneClick} />
      </SplitPane>
    </ViewerContainer>
  );
};
