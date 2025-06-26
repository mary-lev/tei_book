import { useBookData } from './hooks/useBookData';
import { Header } from './components/Header';
import { Viewer } from './components/Viewer';
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
  useBookData();

  return (
    <AppContainer>
      <GlobalStyles />
      <Header />
      <MainContent>
        <Viewer />
      </MainContent>
    </AppContainer>
  );
}

export default App; 