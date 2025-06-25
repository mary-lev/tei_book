import { useState } from 'react';
import { useBookData } from './hooks/useBookData';
import { Header } from './components/Header';
import { Viewer } from './components/Viewer';
import { MetadataSidebar } from './components/MetadataSidebar';
import { GlobalStyles } from './styles/GlobalStyles';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg-secondary);
`;

const MainContent = styled.main`
  flex-grow: 1;
  overflow: hidden;
`;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useBookData();

  const handleInfoClick = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContainer>
      <GlobalStyles />
      <Header onInfoClick={handleInfoClick} />
      <MainContent>
        <Viewer />
      </MainContent>
      <MetadataSidebar 
        isOpen={isSidebarOpen} 
        onClose={handleSidebarClose} 
      />
    </AppContainer>
  );
}

export default App; 