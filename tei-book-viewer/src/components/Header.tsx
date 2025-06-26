import styled from 'styled-components';
import { useViewerStore } from '../store/viewerStore';
import { PageNav } from './PageNav';
import { useDarkMode } from '../hooks/useDarkMode';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-6);
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  height: 64px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const BookTitle = styled.h1`
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--primary-text);
  margin: 0;
  font-family: var(--font-primary);
`;

const BookSubtitle = styled.p`
  font-size: var(--text-sm);
  color: var(--secondary-text);
  margin: 0;
  font-family: var(--font-primary);
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`;


const ThemeButton = styled.button`
  color: var(--primary-text);
  padding: var(--space-2);
  border: none;
  border-radius: 6px;
  background-color: transparent;
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  &:hover {
    background-color: var(--bg-tertiary);
  }

  &:active {
    background-color: var(--bg-secondary);
  }
`;

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { book } = useViewerStore();
  const { isDark, toggleDark } = useDarkMode();
  const title = book?.title || 'Loading...';

  return (
    <HeaderContainer>
      <TitleSection>
        <BookTitle>{title}</BookTitle>
        <BookSubtitle>{book?.metadata?.publicationInfo || 'Digital Edition'}</BookSubtitle>
      </TitleSection>
      <Controls>
        <PageNav />
        <ThemeButton onClick={toggleDark} title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}>
          {isDark ? '☀️' : '🌙'}
        </ThemeButton>
      </Controls>
    </HeaderContainer>
  );
};
