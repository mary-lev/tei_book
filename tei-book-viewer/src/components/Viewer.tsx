import React from 'react';
import styled from 'styled-components';
import { TextPane } from './TextPane';
import { ImagePane } from './ImagePane';

const ViewerContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  flex-direction: row;
  background-color: var(--bg-primary);
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  box-sizing: border-box;

  @media (max-width: 1700px) {
    border-left: none;
    border-right: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 100%;
  }
`;

const TextPaneWrapper = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;

  @media (max-width: 768px) {
    flex-basis: auto;
    width: 100%;
    min-height: 50%;
    height: 50%;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
`;

const ImagePaneWrapper = styled.div`
  flex: 1;
  height: 100%;
  min-width: 0;
  display: flex;
  
  @media (max-width: 768px) {
    width: 100%;
    min-height: 50%;
    height: 50%;
  }
`;

export const Viewer: React.FC = () => {
  const handleZoneClick = (zoneId: string) => {
    console.log('Zone clicked:', zoneId);
  };

  return (
    <ViewerContainer>
      <TextPaneWrapper>
        <TextPane />
      </TextPaneWrapper>
      <ImagePaneWrapper>
        <ImagePane onZoneClick={handleZoneClick} />
      </ImagePaneWrapper>
    </ViewerContainer>
  );
}; 