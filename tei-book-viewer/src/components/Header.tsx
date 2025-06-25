import styled from 'styled-components';
import { useViewerStore } from '../store/viewerStore';
import { PageNav } from './PageNav';
import { useDarkMode } from '../hooks/useDarkMode';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-8);
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  border-bottom: 2px solid var(--border-color);
  height: 70px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(26, 54, 93, 0.08);
`;

const BookTitle = styled.h1`
  font-size: var(--text-2xl);
  font-weight: 300;
  color: var(--primary-text);
  margin: 0;
  font-family: var(--font-primary);
  letter-spacing: 0.02em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`;

const InfoButton = styled.button`
  color: var(--primary-text);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-tertiary);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: var(--bg-secondary);
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ThemeButton = styled.button`
  color: var(--primary-text);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-tertiary);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: var(--bg-secondary);
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface HeaderProps {
  onInfoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onInfoClick }) => {
  const { book } = useViewerStore();
  const { isDark, toggleDark } = useDarkMode();
  const title = book?.title || 'Loading...';

  return (
    <HeaderContainer>
      <BookTitle>{title}</BookTitle>
      <Controls>
        <PageNav />
        <InfoButton onClick={onInfoClick}>
          Book Info
        </InfoButton>
        <ThemeButton onClick={toggleDark}>
          {isDark ? 'Light' : 'Dark'} Mode
        </ThemeButton>
      </Controls>
    </HeaderContainer>
  );
};
