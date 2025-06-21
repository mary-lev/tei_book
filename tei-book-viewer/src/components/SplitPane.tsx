import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

type Orientation = 'vertical' | 'horizontal';

const Container = styled.div<{ $orientation: Orientation }>`
  display: flex;
  flex-direction: ${props => props.$orientation === 'vertical' ? 'row' : 'column'};
  width: 100%;
  height: 100%;
  position: relative;
`;

const Pane = styled.div<{ $orientation: Orientation; $size: number }>`
  ${props => props.$orientation === 'vertical' ? `
    width: ${props.$size}%;
    height: 100%;
  ` : `
    height: ${props.$size}%;
    width: 100%;
  `}
  flex-shrink: 0;
  display: flex;
  min-width: 0;
  min-height: 0;
`;

const Divider = styled.div<{ $orientation: Orientation }>`
  background-color: var(--border-color);
  ${props => props.$orientation === 'vertical' ? `
    width: 4px;
    cursor: col-resize;
  ` : `
    height: 4px;
    cursor: row-resize;
  `}
  flex-shrink: 0;
`;

interface SplitPaneProps {
  initialSize?: number;
  minSize?: number;
  maxSize?: number;
  children: [React.ReactNode, React.ReactNode];
}

export const SplitPane: React.FC<SplitPaneProps> = ({
  initialSize = 50,
  minSize = 20,
  maxSize = 80,
  children,
}) => {
  const [size, setSize] = useState(initialSize);
  const [orientation, setOrientation] = useState<Orientation>(
    window.innerWidth <= 768 ? 'horizontal' : 'vertical'
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth <= 768 ? 'horizontal' : 'vertical');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (orientation === 'horizontal') return;
    e.preventDefault();
    const move = (ev: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      const percent = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(minSize, Math.min(maxSize, percent));
      setSize(clamped);
    };
    const stop = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mouseup', stop);
      document.removeEventListener('touchend', stop);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    document.addEventListener('mouseup', stop);
    document.addEventListener('touchend', stop);
  };

  const paneSize = orientation === 'horizontal' ? 50 : size;
  const otherSize = orientation === 'horizontal' ? 50 : 100 - size;

  return (
    <Container $orientation={orientation} ref={containerRef}>
      <Pane $orientation={orientation} $size={paneSize}>
        {children[0]}
      </Pane>
      <Divider
        $orientation={orientation}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      />
      <Pane $orientation={orientation} $size={otherSize}>
        {children[1]}
      </Pane>
    </Container>
  );
};
