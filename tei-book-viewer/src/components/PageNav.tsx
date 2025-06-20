import React from 'react';
import styled from 'styled-components';
import { useViewerStore } from '../store/viewerStore';

const PageNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--secondary-text);
`;

const PageInput = styled.input`
  width: 50px;
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  text-align: center;
  font-size: var(--text-sm);
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const NavButton = styled.button`
  padding: var(--space-2) var(--space-3);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--primary-text);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--accent-color);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageNav: React.FC = () => {
  const { book, currentPage, setCurrentPage } = useViewerStore();

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value);
    if (!isNaN(page) && book) {
      setCurrentPage(Math.max(1, Math.min(book.totalPages, page)));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (book && currentPage < book.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!book) return null;

  return (
    <PageNavContainer>
      <NavButton 
        onClick={handlePreviousPage}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        ◀
      </NavButton>
      
      <PageInput
        type="number"
        value={currentPage}
        onChange={handlePageChange}
        min={1}
        max={book.totalPages}
        aria-label="Page number"
      />
      
      <span>of {book.totalPages}</span>
      
      <NavButton 
        onClick={handleNextPage}
        disabled={currentPage >= book.totalPages}
        aria-label="Next page"
      >
        ▶
      </NavButton>
    </PageNavContainer>
  );
}; 