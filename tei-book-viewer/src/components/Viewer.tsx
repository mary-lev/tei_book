import React from 'react';
import styled from 'styled-components';
import { TextPane } from './TextPane';
import { ImagePane } from './ImagePane';
import { SplitPane } from './SplitPane';
import { MetadataSidebar } from './MetadataSidebar';

const ViewerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: var(--bg-primary);
  box-sizing: border-box;
`;

const MetadataPanel = styled.div`
  width: 320px;
  min-width: 280px;
  max-width: 400px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  flex-shrink: 0;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  min-width: 0;
`;


export const Viewer: React.FC = () => {
  const handleZoneClick = (zoneId: string) => {
    // future hook for handling zone interactions
  };

  return (
    <ViewerContainer>
      <MetadataPanel>
        <MetadataSidebar isOpen={true} onClose={() => {}} isPersistent={true} />
      </MetadataPanel>
      <ContentArea>
        <SplitPane initialSize={50} minSize={30} maxSize={70}>
          <TextPane />
          <ImagePane onZoneClick={handleZoneClick} />
        </SplitPane>
      </ContentArea>
    </ViewerContainer>
  );
};
