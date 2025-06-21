import styled from 'styled-components';
import { useViewerStore } from '../store/viewerStore';
import { PageNav } from './PageNav';
import { useDarkMode } from '../hooks/useDarkMode';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-4);
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  height: 50px;
  flex-shrink: 0;
`;

const BookTitle = styled.h1`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--primary-text);
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`;

const ThemeButton = styled.button`
  color: var(--primary-text);
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-tertiary);
`;

export const Header: React.FC = () => {
  const { book } = useViewerStore();
  const { isDark, toggleDark } = useDarkMode();
  const title = book?.title || 'Loading...';

  return (
    <HeaderContainer>
      <BookTitle>{title}</BookTitle>
      <Controls>
        <PageNav />
        <ThemeButton onClick={toggleDark}>
          {isDark ? 'Light' : 'Dark'} Mode
        </ThemeButton>
      </Controls>
    </HeaderContainer>
  );
};
